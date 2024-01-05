// získání odkazů na prvky HTML stránky
var lightData = document.getElementById("lightData");
var startBtnLight = document.getElementById("startBtnLight");
var stopBtnLight = document.getElementById("stopBtnLight");
var lastLight = document.getElementById("lastLight");
var lightSensor = tizen.sensorservice.getDefaultSensor('LIGHT');

function onsuccessLightCB() {
    lightSensor.getLightSensorData(onGetSuccessLightCB);
    lightSensor.stop();
}

function onGetSuccessLightCB(sensorData) {
    var light = sensorData.lightLevel.toFixed(0);
    lightData.innerHTML = "Úroveň světla: " + light + " Lux";
    lastLight.innerHTML = light + " Lux"; //vypsání hodnoty uživateli
    localStorage.setItem("light", light); //uložení hodnoty do lokálního úložiště pod klíčem "bar"
}

// po stisknutí tlačítka start se spustí měření
startBtnLight.addEventListener("click", function() {
    try {
        lightSensor.start(onsuccessLightCB);
    } catch (error) {
        console.log("Error: " + error.message);
        lightData.innerHTML = "Error: " + error.message;
    }
});

//po stisknutí tlačítka stop
stopBtnLight.addEventListener("click", function() {
    //tizen.humanactivitymonitor.stop("BAROMETER");
    //barData.innerHTML = "";
    var lightPopup = document.querySelector('#popupLight');
    tau.widget.Popup(lightPopup).close();
});