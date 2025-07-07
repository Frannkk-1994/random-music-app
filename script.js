// 🎵 Lista original de canciones
const allSongs = [
  {
    title: "Por el Momento",
    artist: "Nicky Jam",
    src: "music/Por el momento - Nicky jam.mp3",
    img: "images/francis.jpg"
  },
  {
    title: "Que Va",
    artist: "Ozuna",
    src: "music/Que Va - Ozuna.mp3",
    img: "images/francis.jpg"
  },
  {
    title: "Maquillaje",
    artist: "Anuel AA",
    src: "music/Maquillaje - Anuel AA.mp3",
    img: "images/francis.jpg"
  },
  {
    title: "El Amante",
    artist: "Nicky Jam",
    src: "music/El Amante - Nicky Jam.mp3",
    img: "images/francis.jpg"
  },
  {
    title: "Quiereme",
    artist: "Jacob Forever",
    src: "music/Quiereme - Jacob Forever.mp3",
    img: "images/francis.jpg"
  },
  {
    title: "La Curiosidad",
    artist: "Myke Towers",
    src: "music/La Curiosidad - Myke Towers.mp3",
    img: "images/francis.jpg"
  },
  {
    title: "Cosa Linda",
    artist: "lucky Brown",
    src: "music/Cosa Linda - Lucky Brown.mp3",
    img: "images/francis.jpg"
  },
   {
    title: "Aullando",
    artist: "Wisin",
    src: "music/Aullando - Wisin.mp3",
    img: "images/francis.jpg"
  },
  {
    title: "Adicto",
    artist: "Anuel AA",
    src: "Adicto - Anuel AA.mp3",
    img: "images/francis.jpg"
  },
  {
    title: "La Falda",
    artist: "Myke Towers",
    src: "music/La Falda - Myke Towers.mp3",
    img: "images/francis.jpg"
  },
  {
    title: "Voy a Beber",
    artist: "Nicky Jam",
    src: "music/Voy a Beber - Nicky Jam.mp3",
    img: "images/francis.jpg"
  },
  {
    title: "Quiero Repetir",
    artist: "Ozuna",
    src: "Quiero Repetir - Ozuna.mp3",
    img: "images/francis.jpg"
  },
  {
    title: "Me Niego",
    artist: "Reik",
    src: "Me Niego - Reik.mp3",
    img: "images/francis.jpg"
  },
  {
    title: "Obsesionado",
    artist: "Farruko",
    src: "Obsesionado - Farruko.mp3",
    img: "images/francis.jpg"
  },
  {
    title: "Fanatica Sensual",
    artist: "Plan B",
    src: "Fanatica Sensual - Plan B.mp3",
    img: "images/francis.jpg"
  },
  {
    title: "Elegi",
    artist: "Rauw Alejandro",
    src: "Elegi - Rauw Alejandro.mp3",
    img: "images/francis.jpg"
  },
  {
    title: "Desesperados",
    artist: "Rauw Alejandro",
    src: "Desesperados - Rauw Alejandro.mp3",
    img: "images/francis.jpg"
  },
   {
    title: "El Perdon",
    artist: "Nicky Jam",
    src: "El Perdon - Nicky Jam.mp3",
    img: "images/francis.jpg"
  },
  {
    title: "Escapate Conmigo",
    artist: "Wisin",
    src: "Escapate Conmigo - Wisin.mp3",
    img: "images/francis.jpg"
  },
  {
    title: "Baby",
    artist: "Nicky Jam",
    src: "music/Baby - Nicky Jam.mp3",
    img: "images/francis.jpg"
  }
];

// 📦 Estado global
const userData = {
  songs: [...allSongs],
  currentSongIndex: 0,
  isShuffle: false,
  isRepeat: false
};

// 🎯 DOM
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

// 🔘 Reset
const resetButton = document.createElement("button");
resetButton.id = "reset";
resetButton.ariaLabel = "Reset playlist";
resetButton.textContent = "Reset Playlist";

// ▶️ Reproducir canción
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

// ✅ Resaltar activa
function highlightActiveSong(index) {
  const items = document.querySelectorAll("#playlistSongs li.song-item");
  items.forEach((item) => item.classList.remove("active"));
  if (items[index]) items[index].classList.add("active");
}

// 🔁 Reset
resetButton.addEventListener("click", () => {
  userData.songs = [...allSongs];
  userData.currentSongIndex = 0;
  renderSongs(userData.songs);
  playSongAtIndex(0);
});

// 📋 Renderizar canciones
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

// 🔁 PLAY/PAUSE
playPauseBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    updatePlayIcon(true);
  } else {
    audio.pause();
    updatePlayIcon(false);
  }
});

// ⏮ ANTERIOR
prevBtn.addEventListener("click", () => {
  const prevIndex = userData.currentSongIndex - 1;
  playSongAtIndex(prevIndex >= 0 ? prevIndex : userData.songs.length - 1);
});

// ⏭ SIGUIENTE
nextBtn.addEventListener("click", playNextSong);

// ⏯ Cambiar icono
function updatePlayIcon(isPlaying) {
  playPauseBtn.classList.toggle("fa-play", !isPlaying);
  playPauseBtn.classList.toggle("fa-pause", isPlaying);
}

// 🕒 Progreso
audio.addEventListener("timeupdate", () => {
  if (!audio.duration) return;
  const percent = (audio.currentTime / audio.duration) * 100;
  progress.style.width = `${percent}%`;
  currentTimeEl.textContent = formatTime(audio.currentTime);
  durationEl.textContent = formatTime(audio.duration);
});

// ⏩ Click barra
progressContainer.addEventListener("click", (e) => {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  if (audio.duration) audio.currentTime = (clickX / width) * audio.duration;
});

// 🔄 Siguiente automática
audio.addEventListener("ended", () => {
  if (userData.isRepeat) {
    audio.currentTime = 0;
    audio.play();
  } else {
    playNextSong();
  }
});

// 🔁 Shuffle
shuffleBtn.addEventListener("click", () => {
  userData.isShuffle = !userData.isShuffle;
  shuffleBtn.classList.toggle("active", userData.isShuffle);
});

// 🔁 Repeat
repeatBtn.addEventListener("click", () => {
  userData.isRepeat = !userData.isRepeat;
  repeatBtn.classList.toggle("active", userData.isRepeat);
});

// ⏭ Función siguiente
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

// ⏱ Formatear mm:ss
function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = String(Math.floor(time % 60)).padStart(2, "0");
  return `${minutes}:${seconds}`;
}

// 🚀 Iniciar
renderSongs(userData.songs);
playSongAtIndex(userData.currentSongIndex);

// 🔄 Asegurar que el ícono esté en estado "play" al iniciar
updatePlayIcon(false); // false = mostrar ícono de "play"