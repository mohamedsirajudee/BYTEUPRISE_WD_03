let isRunning = false;
let lapCounter = 1;
let timerInterval;
let startTime;
let lapTimes = [];

function formatTime(time) {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function updateTimer() {
  const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
  document.getElementById('timer').textContent = formatTime(elapsedTime);
}

function toggleTimer() {
  if (isRunning) {
    clearInterval(timerInterval);
  } else {
    startTime = Date.now() - (lapTimes.reduce((sum, lap) => sum + lap, 0) * 1000);
    timerInterval = setInterval(updateTimer, 1000);
  }
  isRunning = !isRunning;
}

function addLap() {
  if (isRunning) {
    const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    lapTimes.push(elapsedTime);
    const lapList = document.getElementById('lap-list');
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${lapCounter++}: ${formatTime(elapsedTime)}`;
    lapList.appendChild(lapItem);
  }
}

function clearLaps() {
  lapCounter = 1;
  lapTimes = [];
  document.getElementById('lap-list').innerHTML = '';
}

function resetTimer() {
  clearInterval(timerInterval);
  isRunning = false;
  lapCounter = 1;
  lapTimes = [];
  document.getElementById('timer').textContent = '00:00:00';
  document.getElementById('lap-list').innerHTML = '';
}
