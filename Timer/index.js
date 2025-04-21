const timersContainer = document.querySelector(".timers_container");
const hours = document.querySelector(".hours");
const minutes = document.querySelector(".minutes");
const seconds = document.querySelector(".seconds");
const startTimerbtn = document.querySelector(".start_timer");
let timersRunning = false;
noActiveTimers();

startTimerbtn.addEventListener("click", (e) => {
  validateInput(e);
});

function noActiveTimers() {
  if (timersContainer.children.length === 0) {
    timersRunning = false;
    const noTimersText = document.createElement("div");
    noTimersText.className = "no_timers";
    noTimersText.innerText = "No Active Timers";
    timersContainer.append(noTimersText);
  }
}

function removeNoTimersText() {
  const removeNode = timersContainer?.querySelector(".no_timers");
  removeNode?.remove();
}

const validateInput = (e) => {
  e.preventDefault();
  const hh = parseInt(hours.value) || 0;
  const mm = parseInt(minutes.value) || 0;
  const ss = parseInt(seconds.value) || 0;

  if (isNaN(hh) || isNaN(mm) || isNaN(ss)) {
    // popup.style.display = "flex"; //show modal if any of the values are not a number
    return;
  }
  const totalSeconds = hh * 3600 + mm * 60 + ss;
  createTimer(totalSeconds);
};

//format Time
function formatTime(totalSeconds) {
  if (totalSeconds <= 0) {
    noActiveTimers();
    return;
  }
  const hh = parseInt(totalSeconds / 3600);
  const mm = parseInt((totalSeconds % 3600) / 60);
  const ss = parseInt(totalSeconds % 60);

  return `${String(hh).padStart(
    2,
    0
  )} <span class="subtle_text">Hours</span> : ${String(mm).padStart(
    2,
    0
  )} <span class="subtle_text">Minutes</span> : ${String(ss).padStart(
    2,
    0
  )} <span class="subtle_text">Seconds</span> `;
}

const createTimer = (totalSeconds) => {
  if (totalSeconds <= 0) {
    // popup.style.display = "flex"; //show modal if any of the values are not a number
    return;
  }
  if (!timersRunning) {
    timersRunning = true;
    removeNoTimersText();
  }

  const timerContainer = document.createElement("div");
  timerContainer.className = "timer_container";
  const timeLeft = document.createElement("div");
  timeLeft.className = "time_left";

  //Timer
  let timerpaused = false;
  let isStopped = false;
  let timerId;

  const startTimer = () => {
    timerId = setInterval(() => {
      if (totalSeconds <= 0) {
        clearInterval(timerId);
        timeLeft.innerHTML = "Time's Up !";
        timeLeft.style.color = "#f0f757";
        controls.querySelector(".stop_btn").style.display = "none";
        controls.querySelector(".pause_btn").style.display = "none";
      } else {
        const time_left = formatTime(totalSeconds);
        timeLeft.innerHTML = time_left;
        totalSeconds--;
      }
    }, 1000);
  };

  startTimer();

  //Controls
  const controls = document.createElement("div");
  controls.className = "controls_container";
  controls.innerHTML = `<button class="controls pause_btn"><img class="pause_img" src="./assets/pause.png"></button>
  <button class="controls stop_btn"><img class="stop_img" src="./assets/stop.png"></button>
  <button class="controls delete_btn"><img class="delete_img" src="./assets/delete.png"></button>
  `;
  controls.addEventListener("click", (e) => {
    handleControls(e);
  });

  const handleControls = (e) => {
    if (
      e.target.classList.contains("delete_btn") ||
      e.target.classList.contains("delete_img")
    ) {
      timerContainer.remove();
      clearInterval(timerId);
      noActiveTimers();
    } else if (
      e.target.classList.contains("stop_btn") ||
      e.target.classList.contains("stop_img")
    ) {
      clearInterval(timerId);
      timeLeft.style.color = "gray";
      isStopped = true;
    } else if (
      e.target.classList.contains("pause_btn") ||
      e.target.classList.contains("pause_img")
    ) {
      const pauseBtnImg = controls.querySelector(".pause_img");
      if (!isStopped) {
        if (timerpaused) {
          startTimer();
          pauseBtnImg.src = "./assets/pause.png";
          pauseBtnImg.alt = "pause";
          timerpaused = false;
        } else {
          clearInterval(timerId);
          pauseBtnImg.src = "./assets/resume.png";
          pauseBtnImg.alt = "resume";
          timerpaused = true;
        }
      }
    }
  };

  timerContainer.append(timeLeft);
  timerContainer.append(controls);
  timersContainer.append(timerContainer);
};
