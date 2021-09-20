// Save HTML elements in variables.
var actText = document.getElementById("act-text");
var actCron = document.getElementById("act-cron");
var actToggleBtn = document.getElementById("act-toggle-btn");
var atcSaveBtn = document.getElementById("act-save-btn");
var savedActTimes = document.getElementById("saved-act-times");
// Init hour, minute and second.
var h = 0;
var m = 0;
var s = 0;
// Define counter interval.
var countTime;
// Create control variable.
var stop = false;

// Toggle button's function.
function toggleCron() {
    // User wants to stop the cron.
    if(stop) {
        // Update text content button.
        actToggleBtn.textContent = "Start";
        actToggleBtn.style.backgroundColor = "green";
        actToggleBtn.style.borderColor = "green";
        // Remove counter interval.
        clearInterval(countTime);
        // Update control variable.
        stop = false;
        // Enable save button.
        enableSaveBtn();
    } else {
        // Update text content button.
        actToggleBtn.textContent = "Stop";
        actToggleBtn.style.backgroundColor = "red";
        actToggleBtn.style.borderColor = "red";

        // Divide cron's text content in tree parts.
        var cron = actCron.textContent.split(":");

        // Convert units to int.
        h = parseInt(cron[0]);
        m = parseInt(cron[1]);
        s = parseInt(cron[2]);

        // Add interval.
        countTime = setInterval(function(){
            
            // Update unit values.
            if(s < 59) {
                s++;
            } else {
                s = 0;
                if(m < 59) {
                    m++;
                } else {
                    m = 0;
                    h++;
                }
            }

            // Format units.
            if(h.toString().length == 1) {
                h = "0" + h.toString();
            }
            if(m.toString().length == 1) {
                m = "0" + m.toString();
            }
            if(s.toString().length == 1) {
                s = "0" + s.toString();
            }

            // Update text content cron.
            actCron.textContent = h + ":" + m + ":" + s;
        
        }, 1000);
        stop = true;
    }
}

function toggleFocusActText() {
    var value = actText.value;
    if (value == "") {
        actText.value = value.replace("", "Type here what are you doing...");
        actText.style.fontStyle = "italic";
        actText.style.color = "grey";
    } else if(value == "Type here what are you doing...") {
        actText.value = value.replace("Type here what are you doing...", "");
        actText.style.fontStyle = "normal";
        actText.style.color = "black";
    } else {
        actText.style.fontStyle = "normal";
        actText.style.color = "black";
    }
}

function saveTime() {
    var newActivity = document.createElement("span");
    newActivity.classList.add("saved-activity");
    newActivity.style.display = "block";
    newActivity.style.padding = "5px";
    
    var activityText = document.createElement("span");
    activityText.appendChild(document.createTextNode(actText.value));
    activityText.classList.add("info");

    var time = document.createElement("span");
    time.appendChild(document.createTextNode(actCron.textContent));
    time.classList.add("info");

    newActivity.appendChild(activityText);
    newActivity.appendChild(time);

    savedActTimes.appendChild(newActivity);
    disabledSaveBtn();
    actCron.textContent = "00:00:00";
}

function enableSaveBtn() {
    atcSaveBtn.disabled = false;
    atcSaveBtn.style.backgroundColor = "rgb(0, 119, 255)";
    atcSaveBtn.style.border = "2px solid rgb(0, 119, 255)";
    atcSaveBtn.style.borderRadius = "2.5px";
    atcSaveBtn.style.color = "white";
    atcSaveBtn.style.fontWeight = "bold";
    atcSaveBtn.style.cursor = "pointer";
}

function disabledSaveBtn() {
    atcSaveBtn.disabled = true;
    atcSaveBtn.style.backgroundColor = "transparent";
    atcSaveBtn.style.border = "1px solid grey";
    atcSaveBtn.style.borderRadius = "2.5px";
    atcSaveBtn.style.color = "grey";
    atcSaveBtn.style.fontWeight = "normal";
    atcSaveBtn.style.cursor = "not-allowed";
}