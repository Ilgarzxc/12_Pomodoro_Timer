// setting the variables for the elements of html
const start = document.getElementById("start");
const stop = document.getElementById("stop");
const reset = document.getElementById("reset");
const timer = document.getElementById("timer");

// variable for left time (25 minutes)
let timeLeft = 1500; 
let interval;

// function to update the timer
const updateTimer = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    timer.innerHTML = 
    `${minutes.toString().padStart(2,"0")}
    :
    ${seconds.toString().padStart(2,"0")}`;
};

// function to start timer and decrease remaining time constantly
const startTimer = () => {
    if (interval){
        clearInterval(interval); //Clear any existing interval
    }

    interval = setInterval(() => {
        timeLeft--;
        updateTimer();
        
        if(timeLeft === 0){
            clearInterval(interval)
            alert("Time`s up!");
            timeLeft = 1500; //Reset to 25 minutes
            updateTimer();
        }
    }, 
    1000)

}

const stopTimer = () => clearInterval(interval);

const resetTimer = () => {
    clearInterval(interval);
    timeLeft = 1500;
    updateTimer();
}

start.addEventListener("click", startTimer);
stop.addEventListener("click", stopTimer);
reset.addEventListener("click", resetTimer);