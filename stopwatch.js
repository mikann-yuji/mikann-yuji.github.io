'use strict';
let hourCount = document.getElementById('hour');
let minCount = document.getElementById('min');
let secCount = document.getElementById('sec');
let startButton = document.getElementById('start');
let stopButton = document.getElementById('stop');
let resetButton = document.getElementById('reset');
let num;
let countId;
let startTime;
let addTime;
let currentTime;
let hours;
let minutes;
let seconds;
let mode;
let stopwatch;
let timer;

stopwatch = 0;
timer = 1;

mode = stopwatch;

hourCount.innerText = '00';
minCount.innerText = '00';
secCount.innerText = '00';
hours = minutes = seconds = 0;

function changeHour(){
  hourCount.innerText = document.getElementById('pullHour').value;
  mode = timer;
}

function changeMin(){
  minCount.innerText = document.getElementById('pullMin').value;
  mode = timer;
}

function changeSec(){
  secCount.innerText = document.getElementById('pullSec').value;
  mode = timer;
}

startButton.onclick = () => {
  if (hourCount.innerText === '00' && minCount.innerText === '00' && secCount.innerText === '00') {
    mode = stopwatch;
  }
  switch (mode) {
    case stopwatch:
      startButton.disabled = true;
      startTime = new Date().getTime();
      addTime = hours * 60 * 60 * 1000 + minutes * 60 * 1000 + seconds * 1000;
      startTime -= addTime;
      startStopwatch();
      countId = setInterval(startStopwatch, 1000);
      stopButton.onclick = () => {
        startButton.disabled = false;
        clearInterval(countId);
      }
      break;
    case timer:
      startButton.disabled = true;
      startTime = new Date().getTime();
      hours = Number(hourCount.innerText);
      minutes = Number(minCount.innerText);
      seconds = Number(secCount.innerText);
      num = hours * 60 * 60 + minutes * 60 + seconds + 1;
      addTime = hours * 60 * 60 * 1000 + minutes * 60 * 1000 + seconds * 1000;
      startTimer();
      countId = setInterval(startTimer, 1000);
      stopButton.onclick = () => {
        startButton.disabled = false;
        clearInterval(countId);
      }
      break;
  }
}

resetButton.onclick = () => {
  startButton.disabled = false;
  hours = minutes = seconds = 0;
  hourCount.innerText = '00';
  minCount.innerText = '00';
  secCount.innerText = '00';
  mode = stopwatch;
  clearInterval(countId);
}

function startStopwatch() {
  currentTime = new Date().getTime(); 
  seconds = Math.round((currentTime - startTime) / 1000) % 60;
  minutes = Math.floor((currentTime - startTime) / 1000 / 60) % 60;
  hours = Math.floor((currentTime - startTime) / 1000 / 60 / 60);
  drawCountTime();
}

function startTimer() {
  currentTime = new Date().getTime(); 
  seconds = Math.round((addTime - (currentTime - startTime)) / 1000) % 60;
  minutes = Math.floor((addTime - (currentTime - startTime)) / 1000 / 60) % 60;
  hours = Math.floor((addTime - (currentTime - startTime)) / 1000 / 60 / 60);
  num -= 1;
  if (num === 0) {
    clearInterval(countId);
    hourCount.innerText = '00';
    minCount.innerText = '00';
    secCount.innerText = '00';
    hours = minutes = seconds = 0;
    startButton.disabled = false;
    mode = stopwatch;
    return;
  }
  drawCountTime();
}

function drawCountTime() {
  hourCount.innerText = hours.toString().replace(/(?<!\d)\d(?!\d)/, '0' + hours.toString());
  minCount.innerText = minutes.toString().replace(/(?<!\d)\d(?!\d)/, '0' + minutes.toString());
  secCount.innerText = seconds.toString().replace(/(?<!\d)\d(?!\d)/, '0' + seconds.toString());
}