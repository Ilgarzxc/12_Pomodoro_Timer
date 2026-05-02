// setting the variables for the elements of html
const start = document.getElementById("start");
const stop = document.getElementById("stop");
const reset = document.getElementById("reset");
const timer = document.getElementById("timer");

// session end signal
const workSound = new Audio("sounds/work.mp3");
const shortBreakSound = new Audio("sounds/pause.mp3");
const longBreakSound = new Audio("sounds/longbreak.mp3");


//default variables for segment durations
let workDuration = 25;
let shortBreak = 5;
let longBreak = 15;
let sessionsBeforeLong = 4;

// variable for left time (25 minutes)
let timeLeft = workDuration * 60; 
let interval;


// function for update the timer
const updateTimer = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    timer.innerHTML = 
    `${minutes.toString().padStart(2,"0")}
    :
    ${seconds.toString().padStart(2,"0")}`;
};

// function for start timer and decrease remaining time constantly
const startTimer = () => {
    if (interval){
        clearInterval(interval); // clear any existing interval
    };

    interval = setInterval(() => {
        timeLeft--;
        updateTimer();
        
        if(timeLeft === 0){
            switchMode();
        }
    }, 
    1000)
};

// function for timer stop
const stopTimer = () => clearInterval(interval);

// function for timer reset
const resetTimer = () => {
    clearInterval(interval);
    timeLeft = workDuration * 60;
    updateTimer();
};

// buttons-events (start, stop, reset)
start.addEventListener("click", startTimer);
stop.addEventListener("click", stopTimer);
reset.addEventListener("click", resetTimer);

// sessionid logic
let workSessionCount = 1;

const updateSession = () => {
    document.getElementById("sessionid").innerHTML = `Session №${workSessionCount}`;
};

// function for mode switching (work, short break, long break) and the reference variable
let mode = "work";

const switchMode = () => {
    if (mode === "work") {
        // working session completed - increment take place
        workSessionCount++;
        updateSession();

        //defining what kind of break will happen next
        if (workSessionCount % sessionsBeforeLong === 0) {
            mode = 'longBreak';
            longBreakSound.currentTime = 0;
            longBreakSound.play();
            timeLeft = longBreak * 60;
        } else {
            mode = 'shortBreak';
            shortBreakSound.currentTime = 0;
            shortBreakSound.play();
            timeLeft = shortBreak * 60;
        }
    }
    else {
        // break completed - start a new working session
        mode = "work";
        workSound.currentTime = 0;
        workSound.play(); // sound of new work session
        timeLeft = workDuration * 60;
    }
    updateModeLabel();
    updateTimer();
};

//update mode lable in UI depending on the current status
const updateModeLabel = () => {
    const label = document.getElementById("modeLabel");

    if (mode === "work") label.textContent = "Work";
    if (mode === "shortBreak") label.textContent = "Short Break";
    if (mode === "longBreak") label.textContent = "Long Break";
};

// modal window for timer configuration. on-click 'settings'
const settingsBtn = document.getElementById("settings");
const modal = document.getElementById("settingsModal");
const saveBtn = document.getElementById("saveSettings");

// open pop-up
settingsBtn.addEventListener("click", () => {
    // current (default) values of every segment
    document.getElementById("workDuration").value = workDuration;
    document.getElementById("shortBreak").value = shortBreak;
    document.getElementById("longBreak").value = longBreak;
    document.getElementById("sessionsCount").value = sessionsBeforeLong;

    modal.style.display = "flex";
    modal.classList.add("show");
});


//define function for closure of modal window
function closeModal() {
    modal.classList.remove("show");
    setTimeout(() => {
        modal.style.display = "none";
    }, 200);
}

// close pop-up with 'Save' button
saveBtn.addEventListener("click", () => {
    workDuration = parseInt(document.getElementById("workDuration").value);
    shortBreak = parseInt(document.getElementById("shortBreak").value);
    longBreak = parseInt(document.getElementById("longBreak").value);
    sessionsBeforeLong = parseInt(document.getElementById("sessionsCount").value);

    //update timer based on provided information
    timeLeft = workDuration * 60;
    updateTimer();
    closeModal();
});

// close modal window with click outside of the window or 'escape' button
modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal();
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeModal();
});