const btnSubmit = document.getElementById("form");
const imgInput = document.getElementById("img");
const nameInput = document.getElementById("name");
const movieList = document.getElementById("movieList");
const clear = document.getElementById("clear");

let movieUrl;
let movieName;
let movies = [];

imgInput.addEventListener("input", (e) => {
  movieUrl = e.target.value;
});

nameInput.addEventListener("input", (e) => {
  movieName = e.target.value;
});

btnSubmit.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!movieUrl || !movieName) {
    alert("fields are both required.");
    return;
  }
  movies.push({
    id: Date.now(),
    name: movieName,
    url: movieUrl,
  });

  imgInput.value = "";
  nameInput.value = "";
  movieUrl = "";
  movieName = "";
  UpdateUi();
});

function UpdateUi() {
  movieList.innerHTML = "";

  movieElements = movies.map((movie) => {
    const movieItem = document.createElement("div");
    movieItem.classList.add("movie-item");

    const img = document.createElement("img");
    img.src = movie.url;
    img.alt = movie.name;

    const name = document.createElement("p");
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "remove";
    deleteBtn.classList.add('remove');
    deleteBtn.addEventListener("click", () => deleteItem(movie.id));
    name.textContent = movie.name;
    movieItem.appendChild(img);
    movieItem.appendChild(name);
    movieItem.appendChild(deleteBtn);

    return movieItem;
  });

  movieElements.forEach((movieItem) => {
    movieList.appendChild(movieItem);
  });
}

function clearMovieList() {
  movies = [];
  UpdateUi();
}

clear.addEventListener("click", clearMovieList);

const deleteItem = function (id) {
  movies = movies.filter((movie) => movie.id !== id);
  UpdateUi();
};
