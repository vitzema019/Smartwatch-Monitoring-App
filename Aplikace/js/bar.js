var barData = document.getElementById("barData"); //získání elementu pro zobrazení naměřených hodnot
var startBtnBar = document.getElementById("startBtnBar"); //získání elementu tlačítka pro spuštění měření
var stopBtnBar = document.getElementById("stopBtnBar"); //získání elementu tlačítka pro zastavení měření
var lastBar = document.getElementById("lastBar"); //získání elementu pro zobrazení poslední naměřené hodnoty
var pressureSensor = tizen.sensorservice.getDefaultSensor("PRESSURE"); //uložení senzoru do proměnné pro pozdější manipulaci
var barUnit = " hPa"; //jednotka naměřené hodnoty

function onsuccessCB() { //tato funkce se zavolá, pokud start senzoru proběhl úspěšně
    pressureSensor.getPressureSensorData(onGetSuccessCB); //zavolání funkce pro uložení a zobrazení naměřených hodnot
    pressureSensor.stop(); //zastavení senzor
}

function onGetSuccessCB(sensorData) {
    var bar = sensorData.pressure.toFixed(0); //odstranění plovoucí řádové čárky z naměřené hodnoty
    barData.innerHTML = "Atmosférický tlak: " + bar + barUnit; //zobrazení naměřených dat, včetně jednotky
    lastBar.innerHTML = bar + barUnit; //vypsaní naměřených dat do elementu, který zobrazuje hodnoty z posledního měření
    localStorage.setItem("bar", bar); //uložení hodnoty do lokálního úložiště pod klíčem "bar"
}

// po stisknutí tlačítka start se spustí měření
startBtnBar.addEventListener("click", function() {
    try {
        pressureSensor.start(onsuccessCB); //spuštení senzoru
    } catch (error) {
        //console.log("Error: " + error.message);
        barData.innerHTML = "Error: " + error.message; //zprazení chybové zprávy
    }
});

stopBtnBar.addEventListener("click", function() { //funkce pro ukončení popup okna
    //tizen.humanactivitymonitor.stop("BAROMETER");
    //barData.innerHTML = "";
    var barPopup = document.querySelector('#popupBar'); //zíksání elementu popup okna
    tau.widget.Popup(barPopup).close(); //zavření popup okna
});