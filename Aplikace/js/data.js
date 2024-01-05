var BPMVal = document.getElementById("BPMVal"); // získání elemntu pro zápis hodnoty srdečního tepu
var BarVal = document.getElementById("BarVal"); // získání elemntu pro zápis hodnoty atmosferického tlaku
var LightVal = document.getElementById("LightVal"); // získání elemntu pro zápis hodnoty indexu světla
var lastBPM = document.getElementById("lastBPM"); // získání elemntu pro poslední naměřené hodnoty
var lastBar = document.getElementById("lastBar"); // získání elemntu pro poslední naměřené hodnoty
var lastLight = document.getElementById("lastLight"); // získání elemntu pro poslední naměřené hodnoty
var openBPM = document.getElementById("openBPM"); //získání elementu tlačítka, pro aktualizování hodnot
var openBar = document.getElementById("openBar"); //získání elementu tlačítka, pro aktualizování hodnot
var openStats = document.getElementById("openStats"); //získání elementu tlačítka, pro aktualizování hodnot
var openLight = document.getElementById("openLight"); //získání elementu tlačítka, pro aktualizování hodnot
var dataSend = document.getElementById("sendBtn"); //získání elementu tlačítka pro odesílání hodnot
var backBtn = document.getElementById("backBtnData"); //získání elementu tlačítka pro uzavření popup okna
var messageData = document.getElementById("messageData"); //získání elementu pro zápis zprávy

//delkarování proměnných, aby byly přístupé z celého dokumentu
var avgHRM;
var bar;
var light;

//Přidání posluchače pro stisknutí tlačítka
openStats.addEventListener("click", function() {

    avgHRM = localStorage.getItem("avgHRM"); //zobrazím data s klíčem avgHRM z lokálního úložiště
    bar = localStorage.getItem("bar"); //zobrazím data s klíčem bar z lokálního úložiště
    light = localStorage.getItem("light"); //zobrazím data s klíčem light z lokálního úložiště

    console.log(avgHRM);
    if (avgHRM !== null) //pokud není NaN (ještě nebyla nahrána žádná hodnota pod tímto klíčem
    {
        BPMVal.innerHTML = avgHRM + " BPM"; //zobrazím získaná data uživateli
    } else { //jinak nahraj do proměnné string "none" (nutné pro defaultní hodnotu při POST)
        avgHRM = "none";
    }

    if (bar !== null) //pokud není NaN (ještě nebyla nahrána žádná hodnota pod tímto klíčem
    {
        BarVal.innerHTML = bar + " hPa"; //zobrazím získaná data uživateli
    } else { //jinak nahraj do proměnné string "none" (nutné pro defaultní hodnotu při POST)
        bar = "none";
    }

    if (light !== null) //pokud není NaN (ještě nebyla nahrána žádná hodnota pod tímto klíčem
    {
        LightVal.innerHTML = light + " Lux"; //zobrazím získaná data uživateli
    } else { //jinak nahraj do proměnné string "none" (nutné pro defaultní hodnotu při POST)
        light = "none";
    }

});

//Přidání posluchače pro stisknutí tlačítka
openBPM.addEventListener("click", function() {
    avgHRM = parseInt(localStorage.getItem("avgHRM")); //zobrazím data s klíčm avgHRM z lokálního úložiště
    if (!isNaN(avgHRM)) //pokud není NaN (ještě nebyla nahrána žádná hodnota pod tímto klíčem
    {
        lastBPM.innerHTML = avgHRM + " BPM"; //zobrazím získaná data uživateli
    }

});

//Přidání posluchače pro stisknutí tlačítka
openBar.addEventListener("click", function() {
    bar = parseInt(localStorage.getItem("bar")); //zobrazím data s klíčm bar z lokálního úložiště
    if (!isNaN(bar)) //pokud není NaN (ještě nebyla nahrána žádná hodnota pod tímto klíčem
    {
        lastBar.innerHTML = bar + " hPa"; //zobrazím získaná data uživateli
    }

});

//Přidání posluchače pro stisknutí tlačítka
openLight.addEventListener("click", function() {
    light = parseInt(localStorage.getItem("light")); //zobrazím data s klíčm light z lokálního úložiště
    if (!isNaN(light)) //pokud není NaN (ještě nebyla nahrána žádná hodnota pod tímto klíčem
    {
        lastLight.innerHTML = light + " Lux"; //zobrazím získaná data uživateli
    }

});

dataSend.addEventListener("click", function() { //event pro zmáčknutí tlačítka
    sendData(); //volní funkce pro odesílání dat

});

backBtn.addEventListener("click", function() { //event pro zmáčknutí tlačítka
    var dataPopup = document.querySelector('#popupData'); //uložení popup okna do proměnné, podle id
    tau.widget.Popup(dataPopup).close(); //zavření popup okna
});


function sendData() { //funkce pro odesálání dat (POST)
    messageData.innerHTML = "Odesílání..."; //zobrazení zprávy

    var now = new Date(); //vytvoření nového data
    //Tento kód vytvoří aktuální datum a čas ve formátu "YYYY-MM-DDTHH:mm:ss.sssZ", což je požadovaný formát pro API v C#.
    //Při použití této metody si všimněte, že měsíc a den jsou získány pomocí metod getMonth() a getDate() třídy Date. Tyto metody vrací měsíc a den jako čísla začínající od 0, takže musíte přidat 1 k měsíci a výsledek použít s metodou slice() pro formátování.
    var formattedDate = now.getFullYear() + '-' + ('0' + (now.getMonth() + 1)).slice(-2) + '-' + ('0' + now.getDate()).slice(-2) + 'T' + ('0' + now.getHours()).slice(-2) + ':' + ('0' + now.getMinutes()).slice(-2) + ':' + ('0' + now.getSeconds()).slice(-2) + '.' + ('00' + now.getMilliseconds()).slice(-3) + 'Z';
    console.log(formattedDate);
    fetch("https://watchapi20230314070640.azurewebsites.net/api/Watch", { //navázání spojení s endpointem
            method: "POST", //nastavení metody na POST
            headers: {
                "Content-Type": "application/json" //formát dat určený v hlavičce
            },
            body: JSON.stringify({ //určení dat, které se budou posílat v těle požadavku
                "bpm": String(avgHRM),
                "pressure": String(bar),
                "light": String(light),
                "date": formattedDate
            })
        })
        .then(function(response) { //co se má stát, pokud požadavek na REST API přoběhne v pořádku
            console.log(response);
            messageData.innerHTML = response.status + ": " + response.statusText; //zobrazení HTTP status kódu a HTTM status zprávy
        })
        .catch(function(error) { //proběhne, pokud nastane problém při komunikaci s REST API (API je vypnuté, hodinky nejsou připojeny k síti)
            messageData.innerHTML = "Chyba při spojení s API"; //zobrazení chybové hlášky
        });


}