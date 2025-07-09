// 🎵 Lista original de canciones
const allSongs = [
  {
    title: "Alter Ego",
    artist: "Diego Nava",
    src: "music/Alter Ego - Diego Nava.mp3",
    img: "images/francis.jpg"
  },
  {
    title: "Autofahren",
    artist: "Mauro Urina",
    src: "music/Autofahren - Mauro Urbina.mp3",
    img: "images/francis.jpg"
  },
  {
    title: "Batir El Descanso",
    artist: "Alejandro Magaña",
    src: "music/Batir El Descanso - Alejandro Magaña.mp3",
    img: "images/francis.jpg"
  },
  {
    title: "Bosque En Ascenso",
    artist: "Diego Nava",
    src: "music/Bosque En Ascenso - Diego Nava.mp3",
    img: "images/francis.jpg"
  },
  {
    title: "Curiosidad",
    artist: "Diego Nava",
    src: "music/Curiosidad - Diego Nava.mp3",
    img: "images/francis.jpg"
  },
  {
    title: "El Tiempo Cura",
    artist: "Michael Ramir",
    src: "music/El Tiempo Cura - Michael Ramir.mp3",
    img: "images/francis.jpg"
  },
  {
    title: "Game Boy",
    artist: "Diego Nava",
    src: "music/Game Boy - Diego Nava.mp3",
    img: "images/francis.jpg"
  },
  {
    title: "Esa Tarde en Yelapa",
    artist: "Mauro Urbina",
    src: "music/Esa Tarde En Yelapa - Mauro Urbina.mp3",
    img: "images/francis.jpg"
  },
  {
    title: "Karma",
    artist: "Michael Ramir",
    src: "music/Karma - Michael Ramir.mp3",
    img: "images/francis.jpg"
  },
  {
    title: "Mañana De Trance Lento",
    artist: "Alejandro Magaña",
    src: "music/Mañana De Trance Lento - Alejandro Magaña.mp3",
    img: "images/francis.jpg"
  },
  {
    title: "Manzana Prohibida",
    artist: "Michael Ramir",
    src: "music/Manzana Prohibida - Michael Ramir.mp3",
    img: "images/francis.jpg"
  },
  {
    title: "Moda",
    artist: "Arulo",
    src: "music/Moda - Arulo.mp3",
    img: "images/francis.jpg"
  },
  {
    title: "Nacido",
    artist: "Eugenio Mininni",
    src: "music/Nacido - Eugenio Mininni.mp3",
    img: "images/francis.jpg"
  },
  {
    title: "Noches Con Ga",
    artist: "Eugenio Mininni",
    src: "music/Noches Con Ga - Eugenio Mininni.mp3",
    img: "images/francis.jpg"
  },
  {
    title: "Rutina Del Viernes",
    artist: "Michael Ramir",
    src: "music/Rutina Del Viernes - Michael Ramir.mp3",
    img: "images/francis.jpg"
  },
  {
    title: "Nuestras Noches ",
    artist: "Eugenio Mininni",
    src: "music/Nuestras Noches - Eugenio Mininni.mp3",
    img: "images/francis.jpg"
  },
  {
    title: "Surco Infeccioso",
    artist: "Alejandro Magaña",
    src: "music/Surco Infeccioso - Alejandro Magaña.mp3",
    img: "images/francis.jpg"
  },
  {
    title: "Urbano Profundo",
    artist: "Eugenio Mininni",
    src: "music/Urbano Profundo - Eugenio Mininni.mp3",
    img: "images/francis.jpg"
  }
];
// 📦 Estado global del reproductor
const userData = {
  songs: [...allSongs],
  currentSongIndex: 0,
  isShuffle: false,
  isRepeat: false
};

// 🎯 Referencias al DOM
const playlistSongs = document.getElementById("playlistSongs");
const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");
const playPauseBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const shuffleBtn = document.getElementById("shuffle");
const repeatBtn = document.getElementById("repeat");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");

// 🔘 Botón para resetear playlist
const resetButton = document.createElement("button");
resetButton.id = "reset";
resetButton.ariaLabel = "Reset playlist";
resetButton.textContent = "Reset Playlist";

// ▶️ Reproduce una canción según el índice
function playSongAtIndex(index) {
  const song = userData.songs[index];
  if (!song) return;

  userData.currentSongIndex = index;
  audio.src = song.src;
  cover.src = song.img;
  title.textContent = song.title;
  artist.textContent = song.artist;

  audio.play();
  updatePlayIcon(true);
  highlightActiveSong(index);
}


// ✅ Resalta la canción actualmente activa en la lista
function highlightActiveSong(index) {
  const items = document.querySelectorAll("#playlistSongs li.song-item");
  items.forEach((item) => item.classList.remove("active"));
  if (items[index]) items[index].classList.add("active");
}

// 🔁 Botón de reset para volver al inicio
resetButton.addEventListener("click", () => {
  userData.songs = [...allSongs];
  userData.currentSongIndex = 0;
  renderSongs(userData.songs);
  playSongAtIndex(0);
});

// 📋 Renderiza las canciones en la interfaz
function renderSongs(songs) {
  playlistSongs.innerHTML = "";
  playlistSongs.appendChild(resetButton);

  songs.forEach((song, index) => {
    const li = document.createElement("li");
    li.textContent = `${song.title} - ${song.artist}`;
    li.classList.add("song-item");

    if (index === userData.currentSongIndex) li.classList.add("active");

    li.addEventListener("click", () => playSongAtIndex(index));
    playlistSongs.appendChild(li);
  });
}

// 🔁 Control de reproducción/pausa
playPauseBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    updatePlayIcon(true);
  } else {
    audio.pause();
    updatePlayIcon(false);
  }
});

// ⏮ Reproduce la canción anterior
prevBtn.addEventListener("click", () => {
  const prevIndex = userData.currentSongIndex - 1;
  playSongAtIndex(prevIndex >= 0 ? prevIndex : userData.songs.length - 1);
});

// ⏭ Reproduce la siguiente canción
nextBtn.addEventListener("click", playNextSong);

// 🎚 Cambia el ícono según estado
function updatePlayIcon(isPlaying) {
  playPauseBtn.classList.toggle("fa-play", !isPlaying);
  playPauseBtn.classList.toggle("fa-pause", isPlaying);
}

// 🕒 Actualiza el tiempo de reproducción y duración
audio.addEventListener("timeupdate", () => {
  if (!audio.duration) return;
  const percent = (audio.currentTime / audio.duration) * 100;
  progress.style.width = `${percent}%`;
  currentTimeEl.textContent = formatTime(audio.currentTime);
});

// ⏱ Muestra duración al cargar metadata
audio.addEventListener("loadedmetadata", () => {
  durationEl.textContent = formatTime(audio.duration);
});

// 📍 Permite al usuario avanzar con clic
progressContainer.addEventListener("click", (e) => {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  if (audio.duration) audio.currentTime = (clickX / width) * audio.duration;
});

// 🔁 Al terminar, pasa a la siguiente (o repite)
audio.addEventListener("ended", () => {
  if (userData.isRepeat) {
    audio.currentTime = 0;
    audio.play();
  } else {
    playNextSong();
  }
});

// 🔀 Activa o desactiva modo aleatorio
shuffleBtn.addEventListener("click", () => {
  userData.isShuffle = !userData.isShuffle;
  shuffleBtn.classList.toggle("active", userData.isShuffle);
});

// 🔁 Activa o desactiva modo repetir
repeatBtn.addEventListener("click", () => {
  userData.isRepeat = !userData.isRepeat;
  repeatBtn.classList.toggle("active", userData.isRepeat);
});

// ⏭ Función para reproducir la siguiente canción
function playNextSong() {
  if (userData.isShuffle) {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * userData.songs.length);
    } while (randomIndex === userData.currentSongIndex);
    playSongAtIndex(randomIndex);
  } else {
    const nextIndex = (userData.currentSongIndex + 1) % userData.songs.length;
    playSongAtIndex(nextIndex);
  }
}

// 🕒 Convierte segundos a formato mm:ss
function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = String(Math.floor(time % 60)).padStart(2, "0");
  return `${minutes}:${seconds}`;
}

// 🚀 Inicialización
renderSongs(userData.songs);
// Solo mostramos la información sin reproducir
const song = userData.songs[userData.currentSongIndex];
audio.src = song.src;
cover.src = song.img;
title.textContent = song.title;
artist.textContent = song.artist;
updatePlayIcon(false);
highlightActiveSong(userData.currentSongIndex);