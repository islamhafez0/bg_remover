const addCard = document.getElementById("addCard");
const displayCard = document.getElementById("displayCard");
const loadingCard = document.getElementById("loadingCard");
const downloadCard = document.getElementById("downloadCard");
const fileInput = document.getElementById("fileInput");
const prevImage = document.getElementById("display-img");
const array = [addCard, displayCard, loadingCard, downloadCard];
const startBtn = document.getElementById("startBtn");
const imageAfter = document.querySelector(".image-after");
const smallImage = downloadCard.querySelector(".image-before");
const uploadAnother = document.getElementById("uploadAnother");
const downloadHref = document.getElementById("downloadHref");
const loader = document.querySelector(".loaderWrapper");
const API_KEY = "YHgYGZjraGhPUtdjzADkVG1J";
const API_URL = "https://api.remove.bg/v1.0/removebg";

const showCurrentScreen = (screen) => {
  array.forEach((ele) => {
    ele.style.display = "none";
  });
  screen.style.display = "flex";
};
showCurrentScreen(addCard);

let file = null;
const fileReader = new FileReader();
const formData = new FormData();

fileInput.addEventListener("input", (e) => {
  file = e.target.files[0];
  fileReader.readAsDataURL(file);
  fileReader.onloadend = () => {
    prevImage.src = fileReader.result;
  };
  showCurrentScreen(displayCard);
});

startBtn.addEventListener("click", () => {
  formData.append("image_file", file);
  showCurrentScreen(loadingCard);
  try {
    loader.style.display = "flex";
    fetch(API_URL, {
      method: "POST",
      headers: {
        "X-Api-Key": API_KEY,
      },
      body: formData,
    })
      .then((res) => res.blob())
      .then((data) => {
        fileReader.readAsDataURL(data);
        fileReader.onloadend = () => {
          imageAfter.src = fileReader.result;
          smallImage.src = prevImage.src;
          downloadHref.setAttribute("href", fileReader.result);
        };
      })
      .finally(() => {
        loader.style.display = "none";
      });
  } catch (error) {
    console.log(error);
    loader.style.display = "none";
  }
  showCurrentScreen(downloadCard);
});

uploadAnother.onclick = function () {
  fileInput.value = "";
  formData.delete("image_file");
  prevImage.src = "";
  imageAfter.src = "";
  smallImage.src = "";
  downloadHref.removeAttribute("href");
  showCurrentScreen(addCard);
};
