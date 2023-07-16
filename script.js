// Variabel global
var shotClockInterval;
var shotClockTime = 24;
var isClockRunning = false;
var startTime = 0;

// Ambil referensi elemen-elemen UI
var shotClockElement = document.getElementById("shotClock");
var startButton24 = document.getElementById("startButton24");
var startButton14 = document.getElementById("startButton14");
var customStartButton = document.getElementById("customStartButton");
var continueButton = document.getElementById("continueButton");
var stopButton = document.getElementById("stopButton");
var resetButton = document.getElementById("resetButton");
var customTimeInput = document.getElementById("customTimeInput");
var audioElement = new Audio("alarm.mp3");

// Fungsi untuk memperbarui tampilan Shot Clock
function updateShotClock() {
  shotClockElement.textContent = shotClockTime;

  if (isClockRunning && shotClockTime <= 5) {
    shotClockElement.classList.add("red");
  } else {
    shotClockElement.classList.remove("red");
  }

  if (shotClockTime === 0) {
    audioElement.play();
  }
}

// Fungsi untuk mengatur waktu pada Shot Clock saat tombol Start ditekan
function setShotClockTime(time) {
  shotClockTime = time;
  updateShotClock();
}

// Fungsi untuk mengurangi waktu Shot Clock
function decreaseTime() {
  shotClockTime--;

  if (shotClockTime < 0) {
    clearInterval(shotClockInterval);
    shotClockTime = 0;
  }

  updateShotClock();
}

// Event listener untuk tombol Start dengan waktu 24 detik
startButton24.addEventListener("click", function() {
  clearInterval(shotClockInterval);
  setShotClockTime(24);
  isClockRunning = false;
  startTime = 0;
  shotClockInterval = setInterval(decreaseTime, 1000);
});

// Event listener untuk tombol Start dengan waktu 14 detik
startButton14.addEventListener("click", function() {
  clearInterval(shotClockInterval);
  setShotClockTime(14);
  isClockRunning = false;
  startTime = 0;
  shotClockInterval = setInterval(decreaseTime, 1000);
});

// Event listener untuk tombol Start Custom
customStartButton.addEventListener("click", function() {
  clearInterval(shotClockInterval);
  var customTime = parseInt(customTimeInput.value, 10);
  if (!isNaN(customTime) && customTime > 0) {
    setShotClockTime(customTime);
    isClockRunning = false;
    startTime = 0;
    shotClockInterval = setInterval(decreaseTime, 1000);
    customTimeInput.value = "";
  }
});

// Event listener untuk tombol Continue
continueButton.addEventListener("click", function() {
  if (!isClockRunning) {
    clearInterval(shotClockInterval);
    isClockRunning = true;
    shotClockInterval = setInterval(decreaseTime, 1000);
  }
});

// Event listener untuk tombol Stop
stopButton.addEventListener("click", function() {
  clearInterval(shotClockInterval);
  isClockRunning = false;
  startTime = shotClockTime;
});

// Event listener untuk tombol Reset
resetButton.addEventListener("click", function() {
  clearInterval(shotClockInterval);
  setShotClockTime(24);
  isClockRunning = false;
  startTime = 0;
});

// Fungsi untuk mereset Shot Clock
function resetShotClock() {
  clearInterval(shotClockInterval);
  setShotClockTime(24);
  isClockRunning = false;
  startTime = 0;
}

// Memperbarui tampilan awal Shot Clock
updateShotClock();
