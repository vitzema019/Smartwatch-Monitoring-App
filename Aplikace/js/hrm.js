var hrmData = document.getElementById("hrmData"); //získání elementu pro zápisování hodnot
var startBtn = document.getElementById("startBtn"); //získání elementu tlačítka pro spuštění
var stopBtn = document.getElementById("stopBtn"); //získání elementu tlačítka pro zastavení
var isMonitoring = false; // přidáme proměnnou pro sledování, zda probíhá měření
var lastBPM = document.getElementById("lastBMP");
var errorStat = false; //proměnná uložení stavu erroru
var animationStat = 1;

var hrmSum = 0; // proměnná pro uchování součtu naměřených tepů
var hrmCount = 0; // proměnná pro uchování počtu naměřených tepů
//var mesureAnimationStat = false; //proměnná pro uchování stavu animace

var maxCount = 80; // proměnná pro omezení počtu měření

var zeroCount = 0; //proměnná pro počítání nulových a záporných hodnot při měření 

var hrmAvg = 0; //proměnná pro uchování průměrného tepu z posledního měření

var errorStat = false;

//funkce pro animaci textu
function mesureAnimation() {
    if (isMonitoring) {
        //console.log(animationStat);
        switch (animationStat) {
            case 1:
                hrmData.innerHTML = "Probíhá měření. ‎ ‎";
                break;
            case 10:
                hrmData.innerHTML = "Probíhá měření.. ‎";
                break;
            case 20:
                hrmData.innerHTML = "Probíhá měření...";
                break;
            case 30:
                hrmData.innerHTML = "Probíhá měření. ‎ ‎";
                break;
            default:
                break;
        }
        if (animationStat === 30) {
            animationStat = 1;
        } else {
            animationStat++;
        }

    }
}

//měření průměrného tepu a zachytávání errorů
function mesureHRM(hrm) {
    mesureAnimation();
    //console.log(zeroCount);

    //pokud je hodnota hrm větší jak nula, zahájí se výpočet průměrného tepu
    if (hrm > 0) {
        zeroCount = 0; //nastavím proměnnou na výchozí hodnotu
        //hrmData.innerHTML = "Měření: " + hrm; //zobrazování průběžné hodnoty při probíhajicím měření
        hrmSum = hrmSum + hrm;
        hrmCount++;
        if (hrmCount === maxCount) {
            isMonitoring = false;
            hrmAvg = hrmSum / hrmCount; //vypočtení průměru z naměřených hodnot
            stopMonitoring(); //zastavení měření
            //hrmData.innerHTML = "Srdeční tep: " + hrmAvg.toFixed(0); //vypsání hodnoty uživateli
            lastBPM.innerHTML = hrmAvg.toFixed(0) + " BPM"; //vypsání hodnoty uživateli
            localStorage.setItem("avgHRM", hrmAvg.toFixed(0).toString()); //uložení hodnoty do lokálního úložiště pod klíčem "avgHRM"
        }
    } else //když je hodnota hmr menší jak 1, znamená to že senzor nedokáže v momentální chvíli nezaznamenává žádný tep
    {
        //postupně budu testovat zda senzor stále nezaznamenává žádné hodnoty
        zeroCount++;
        if (zeroCount > 250) //pokud po určeném počtu pokusů stále nic nezaznamenává ukončím měření a zobrazím chybovou hlášku
        {
            errorStat = true;
            stopMonitoring();
            zeroCount = 0;
            isMonitoring = false;
        }
    }
}

// Funkce pro zpracování úspěšného získání dat srdečního tepu
function onsuccessHRM(hrmInfo) {
    var hrm = hrmInfo.heartRate;
    mesureHRM(hrm);
    //hrmData.innerHTML = "Srdeční tep: " + hrm;
}

//Funkce pro zpracování změny dat srdečního tepu
function onchangedHRM(hrmInfo) {
    var hrm = hrmInfo.heartRate;
    mesureHRM(hrm);
    //hrmData.innerHTML = "Srdeční tep: " + hrm;
}


// Funkce pro zpracování chyby při získávání dat srdečního tepu
function onerror(error) {
    console.log("Chyba: " + error.message);
    hrmData.innerHTML = "Chyba: " + error.message;
    isMonitoring = false;
}

//Funkce pro spuštění senzoru a zahájení sledování srdečního tepu
function startMonitoring() {
    try {
        isMonitoring = true; // nastavíme proměnnou pro sledování na true
        hrmData.innerHTML = "Příprava měření";
        stopBtn.innerHTML = "Zrušit";
            // Spuštění sledování senzoru a zobrazení informace
        tizen.humanactivitymonitor.start("HRM", onchangedHRM, onerror, {
            batchInterval: 100
        });

        // Získání dat ze senzoru a zobrazení informace
        tizen.humanactivitymonitor.getHumanActivityData("HRM", onsuccessHRM, onerror);

        // Zobrazení informace o neschopnosti měření senzoru
        //tizen.humanactivitymonitor.addUnavailableListener(onunavailableSensor);

    } catch (error) {
        console.log("Chyba: " + error.message);
        hrmData.innerHTML = "Chyba: " + error.message;
        isMonitoring = false;
    }
}

//funkce pro zasavení měření srdečního tepu
function stopMonitoring() {
    tizen.humanactivitymonitor.stop("HRM"); // Zastavení sledování senzoru

    //Nastavení proměnných na výchozí hodnoty
    hrmSum = 0;
    hrmCount = 0;
    zeroCount = 0;
    //isMonitoring = false;
    //mesureAnimationStat = false;

    /*if(message === undefined) // Pokud při volání funkce není přidaná žádná zpráva zobrazí se defaultní hodnota pro zastevení měření
	{
		hrmData.innerHTML = "Měření zasteveno";
	}
	else
	{
		hrmData.innerHTML = message;
	}*/
    if (errorStat === false && isMonitoring === false) {
        StopMessage("Měření proběhlo úspěšně");
    } else if (errorStat === false && isMonitoring === true) {
        StopMessage("Měření zastaveno");
    } else if (errorStat === true) {
        StopMessage("Při měření došlo k chybě, opakujte akci!!");
    }
    errorStat = false;
    isMonitoring = false;
}

function StopMessage(message) {
    //var myPopup = document.querySelector('#popup');
    hrmData.innerHTML = message;
    stopBtn.innerHTML = "Zpět";
    //tau.widget.Popup(myPopup).close();
}

// Přidání posluchačů na tlačítka pro spuštění monitorování srdečního tepu
startBtn.addEventListener("click", function() {
    if (!isMonitoring) { // pokud měření již běží, nevytvoříme další instanci
        startMonitoring();
    }
});

//Přidání posluchačů na tlačítka pro zastevní monitorování srdečního tepu
stopBtn.addEventListener("click", function() {
    if (isMonitoring) {
        stopMonitoring();
        stopBtn.innerHTML = "Zpět";
    } else {
        var myPopup = document.querySelector('#popup');
        tau.widget.Popup(myPopup).close();
    }

});



document.addEventListener("tizenhwkey", function(event) {
    if (event.keyName === "back" && isMonitoring === true) { // pokud stiskneme hardwarové tlačítko back
        stopMonitoring();
    }
});

//Ošetření události "visibilitychange"
document.addEventListener("visibilitychange", function() {
    if (document.hidden) {
        // Zastavení senzoru
        stopMonitoring();
    }
});