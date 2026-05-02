// setting the variables for the elements of html
const start = document.getElementById("start");
const stop = document.getElementById("stop");
const reset = document.getElementById("reset");
const timer = document.getElementById("timer");

// variable for left time (25 minutes)
let timeLeft = 1500; 
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
    }

    interval = setInterval(() => {
        timeLeft--;
        updateTimer();
        
        if(timeLeft === 0){
            switchMode();
        }
    }, 
    1000)

}

// function for timer stop
const stopTimer = () => clearInterval(interval);

// function for timer reset
const resetTimer = () => {
    clearInterval(interval);
    timeLeft = 1500;
    updateTimer();
}

// buttons-events (start, stop, reset)
start.addEventListener("click", startTimer);
stop.addEventListener("click", stopTimer);
reset.addEventListener("click", resetTimer);

// sessionid logic
let workSessionCount = 1;

const updateSession = () => {
    document.getElementById("sessionid").innerHTML = `Session №${workSessionCount}`;
}

// function for mode switching (work, short break, long break) and the reference variable
let mode = "work";

const switchMode = () => {
    if(mode === 'work' && workSessionCount % 4 == 0){ //if worksession number can be divided by 4 - long break should start
        workSessionCount++;
        updateSession();
        mode = 'longBreak';
        timeLeft = 900;
        updateTimer();
    } else if(mode == 'work' && workSessionCount % 4 != 0){ // short break if we are still in 1-3 worksession cycle
        workSessionCount++;
        updateSession();
        mode = 'shortBreak';
        timeLeft = 300;
        updateTimer();
    } else if(mode == 'shortBreak' || mode == 'longBreak'){ // just a switch from break to work mode
        mode = 'work';
        timeLeft = 1500;
        updateTimer();
    }
}