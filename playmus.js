"use strict";
const musicTitleEl = document.getElementById("music_title");
const playerProgressEl = document.getElementById("player_progress");
const progressEl = document.getElementById("progress");
const currentTimeEl = document.getElementById("current_time");
const durationEl = document.getElementById("duration");
const prevBtnEl = document.getElementById("prev");
const playvBtnEl = document.getElementById("play");
const nextvBtnEl = document.getElementById("next");
const songs = [
  {
    path: "music/prospoy.mp3",
    displayName: "Проснись и пой",
  },
  {
    path: "music/mirneprost.mp3",
    displayName: "Мир не прост",
  },
  {
    path: "music/vspnenado.mp3",
    displayName: "Вспоминать и не надо",
  },
  {
    path: "music/bezvesny.mp3",
    displayName: "Разлука",
  },
  {
    path: "music/gdezivesh.mp3",
    displayName: "Где живёшь",
  },
  {
    path: "music/poslraz.mp3",
    displayName: "В последний раз",
  },
  {
    path: "music/snegkruz.mp3",
    displayName: "Снег кружится",
  },
  {
    path: "music/uprirodi.mp3",
    displayName: "У природы нет плохой погоды",
  },
  {
    path: "music/uhleto.mp3",
    displayName: "Уходило лето",
  },
  {
    path: "music/olimp.mp3",
    displayName: "Олимпийская",
  },
  {
    path: "music/zaviruha.mp3",
    displayName: "Завируха",
  },
  {
    path: "music/brichmulla.mp3",
    displayName: "Брич-Мулла",
  },
  {
    path: "music/nikogo.mp3",
    displayName: "Никого",
  },
  {
    path: "music/kvart45.mp3",
    displayName: "Девчонка из квартиры 45",
  },
  {
    path: "music/ubabuski.mp3",
    displayName: "Я у бабушки живу",
  },
  {
    path: "music/alexandra.mp3",
    displayName: "Александра",
  },
];
const music = new Audio();
let musicIndex = 0;
let isPlaying = false;
//================== Play Song  True or False====================
function togglePlay() {
  if (isPlaying) {
    pauseMusic();
  } else {
    playMusic();
  }
}
//================== Play Music====================
function playMusic() {
  isPlaying = true;
  playvBtnEl.classList.replace("fa-play", "fa-pause");
  playvBtnEl.setAttribute("title", "pause");
  music.play();
}
//================== Pause Music====================
function pauseMusic() {
  isPlaying = false;
  playvBtnEl.classList.replace("fa-pause", "fa-play");
  playvBtnEl.setAttribute("pause", "title");
  music.pause();
}
//================== Load Songs ====================
function loadMusic(songs) {
  music.src = songs.path;
  musicTitleEl.textContent = songs.displayName;
}
//================== Change Music ====================
function changeMusic(direction) {
  musicIndex = musicIndex + direction + (songs.length % songs.length);
  loadMusic(songs[musicIndex]);
  playMusic();
}
//================== Set Progress ====================
function setProgressBar(e) {
  const width = playerProgressEl.clientWidth;
  const xValue = e.offsetX;
  music.currentTime = (xValue / width) * music.duration;
}
//================== Set Progress ====================
function updateProgressBar() {
  const { duration, currentTime } = music;
  const ProgressPercent = (currentTime / duration) * 100;
  progressEl.style.width = `${ProgressPercent}%`;
  const formattime = (timeRanges) =>
    String(Math.floor(timeRanges)).padStart(2, "0");
  durationEl.textContent = `${formattime(duration / 60)} : ${formattime(
    duration % 60,
  )}`;
  currentTimeEl.textContent = `${formattime(currentTime / 60)} : ${formattime(
    currentTime % 60,
  )}`;
}
//================= Btn Events========================
const btnEvents = () => {
  playvBtnEl.addEventListener("click", togglePlay);
  nextvBtnEl.addEventListener("click", () => changeMusic(1));
  prevBtnEl.addEventListener("click", () => changeMusic(-1));
  //========= Progressbar===========================
  music.addEventListener("ended", () => changeMusic(1));
  music.addEventListener("timeupdate", updateProgressBar);
  playerProgressEl.addEventListener("click", setProgressBar);
};
//================= Btn Events========================
document.addEventListener("DOMContentLoaded", btnEvents);
//============ Calling Load Music
loadMusic(songs[musicIndex]);

