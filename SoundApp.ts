const body = document.querySelector("body") as HTMLBodyElement;

const bgImage = document.createElement("img") as HTMLImageElement;
bgImage.className = "bgImage";
bgImage.src = "./images/bgImage.jpg";
bgImage.alt = "backGroundImage";

const cardContainer = document.createElement("div") as HTMLDivElement;
cardContainer.className = "card-container";

type SoundsType = "ocean" | "forest" | "rain";

interface SoundsCard {
  srcImg: string;
  alt: string;
  name: SoundsType;
  audio: string;
  icon: string;
}

const sounds: SoundsCard[] = [
  {
    srcImg: "./images/cardImg/743f456589.png",
    alt: "ocean-img",
    name: "ocean",
    audio: "./sounds/ocean.wav",
    icon: "./icons/ocean.svg",
  },
  {
    srcImg: "./images/cardImg/prirodookhrannye-lesa-1.webp",
    alt: "forest-img",
    name: "forest",
    audio: "./sounds/forest.wav",
    icon: "./icons/sun.svg",
  },
  {
    srcImg: "./images/cardImg/rain-2179933_1280.jpg",
    alt: "rain-img",
    name: "rain",
    audio: "./sounds/rain.wav",
    icon: "./icons/cloud-rain.svg",
  },
];

let currentAudio: HTMLAudioElement | null = null;

sounds.forEach((sound) => {
  const audio = new Audio(sound.audio);
  audio.title = sound.name;

  const card = document.createElement("div") as HTMLDivElement;
  card.className = "card";
  audio.title = sound.name;

  const imgWrapper = document.createElement("div") as HTMLDivElement;
  imgWrapper.className = "img-wrapper";

  const img = document.createElement("img");
  img.className = "cardImg";
  img.src = sound.srcImg;
  img.alt = sound.alt;
  img.dataset.name = sound.name;

  const icon = document.createElement("img") as HTMLImageElement;
  icon.className = "icon";
  icon.dataset.name = sound.name;
  icon.src = sound.icon;
  icon.alt = `${sound.name}-icon`;

  imgWrapper.appendChild(img);
  imgWrapper.appendChild(icon);

  const input = document.createElement("input") as HTMLInputElement;
  input.type = "range";
  input.name = sound.name;
  input.min = "0";
  input.max = "1";
  input.step = "0.01";
  input.value = "0.5";

  input.dataset.name = sound.name;

  imgWrapper.addEventListener("click", () => {
    bgImage.src = sound.srcImg;
    if (currentAudio && currentAudio !== audio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }
    if (currentAudio === audio) {
      if (audio.paused) {
        audio.play();
      } else {
        icon.src = sound.icon;
        audio.pause();
      }
    } else {
      audio.play();
      currentAudio = audio;
    }
  });

  input.addEventListener("input", ({ target }) => {
    const range = target as HTMLInputElement;
    audio.volume = Number(range.value);
  });

  card.appendChild(imgWrapper);
  card.appendChild(input);
  cardContainer.append(card);
});

body.append(bgImage);
body.appendChild(cardContainer);
