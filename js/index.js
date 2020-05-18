const LS_KEY = "MSI_test";

const apiRandom = "https://api.chucknorris.io/jokes/random";
const apiCategories = "https://api.chucknorris.io/jokes/categories";

const input = document.querySelectorAll(".jokes__input");

updateFavSection();

let categoriesFromApi;
fetch(apiCategories)
  .then((responce) => responce.json())
  .then((data) => (categoriesFromApi = data));

const categoriesList = document.querySelector(".categories-from-api");

const fromCategories = document.querySelector("#categories");

fromCategories.addEventListener("click", handleCategoriesClick);
function handleCategoriesClick() {
  if (fromCategories.checked) {
    categoriesList.classList.add("active");
    categoriesList.innerHTML = "";
    const temp = categoriesFromApi.reduce((acc, el) => {
      acc += `<div class="category-api">${el}</div>`;
      return acc;
    }, "");
    categoriesList.insertAdjacentHTML("beforeend", temp);
    searchInput.classList.remove("active");
  }
}

categoriesList.addEventListener("click", categorieClickSearch);
function categorieClickSearch(event) {
  if (event.target.classList.value.includes("category-api")) {
    event.target.classList.toggle("checked");
  }
}

const random = document.querySelector("#random");

random.addEventListener("click", handleRandomClick);
function handleRandomClick() {
  categoriesList.classList.remove("active");
  searchInput.classList.remove("active");
}

const search = document.querySelector("#search");
const searchInput = document.querySelector(".search-input");

search.addEventListener("click", handleSearchClick);
function handleSearchClick() {
  if (search.checked) {
    categoriesList.classList.remove("active");
    searchInput.classList.add("active");
  }
}

const getJoke = document.querySelector(".js-get-joke");
getJoke.addEventListener("click", getANewJoke);
function getANewJoke() {
  input.forEach((el) => {
    if (el.checked && el.id === "random") {
      fetch(apiRandom)
        .then((responce) => {
          return responce.json();
        })
        .then((data) => {
          const { id, value, url, updated_at, categories } = data;
          createJoke(id, url, value, categories, updated_at);
        });
      return;
    }
    if (el.checked && el.id === "categories") {
      const checkedCategories = Array.from(
        document.querySelectorAll(".checked")
      );
      const catNames = checkedCategories.map((el) => el.textContent);
      if (!catNames.length) {
        alert("You havent checked any categories!");
        return;
      }
      const categorie =
        catNames[Number.parseInt(Math.random() * catNames.length)];
      const api = `https://api.chucknorris.io/jokes/random?category=${categorie}`;
      fetch(api)
        .then((responce) => responce.json())
        .then((data) => {
          const { id, value, url, updated_at, categories } = data;
          createJoke(id, url, value, categories, updated_at);
        });
      return;
    }
    if (el.checked && el.id === "search") {
      const input = document.querySelector(".forsearch");
      const inputQuery = input.value;
      if (!inputQuery) {
        alert("I dont know what to search");
        return;
      }
      const apiForSearch = `https://api.chucknorris.io/jokes/search?query=${inputQuery}`;
      fetch(apiForSearch)
        .then((responce) => responce.json())
        .then((data) => {
          input.value = "";
          if (data.result.length === 0) {
            alert("There is nothing connected with your query. Sorry :(");
            return;
          }
          const posts = data.result;
          let amountOfPosts = posts.length;
          posts.forEach((post) => {
            const { id, value, url, updated_at, categories } = post;
            createJoke(
              id,
              url,
              value,
              categories,
              updated_at,
              true,
              posts.length,
              amountOfPosts
            );
            amountOfPosts--;
          });
        });
    }
  });
}

const jokes = document.querySelector(".js-jokes");

function createJoke(
  id,
  url,
  value,
  categories,
  updated_at,
  isSearch = false,
  numberOfPosts,
  jokesLeft
) {
  if (!isSearch) {
    jokes.innerHTML = "";
  } else {
    if (numberOfPosts === jokesLeft) {
      jokes.innerHTML = "";
    }
  }

  // const today = new Date();
  // const date =
  //   today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  // const time =
  //   today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  // const dateTime = date + " " + time;

  const timeNow = Date.now();
  const updated = new Date(updated_at);
  const timePassed = Number.parseInt(
    (timeNow - updated.getTime()) / (1000 * 60 * 60)
  );

  if (categories[0]) {
    jokes.insertAdjacentHTML(
      "beforeend",
      `
    <div class="joke__container">
                <img src="./img/heart.svg" alt="" class="heart" />
                <div class="joke_content">
                  <div class="joke__ID">
                    ID:
                    <a class="joke__ID-link js_ID" href="${url}" target="_blank"
                      >${id}</a
                    >
                  </div>
                  <div class="joke__value">
                    ${value}
                  </div>
                  <div class="joke__info">
                    <div class="joke__last-update">
                      Last update: <span class="time-passed">${timePassed}</span> hours ago
                    </div>
                    <div class="joke__category">${categories[0]}</div>
                  </div>
                </div>
              </div>
    `
    );
  } else {
    jokes.insertAdjacentHTML(
      "beforeend",
      `
    <div class="joke__container">
                <img src="./img/heart.svg" alt="" class="heart" />
                <div class="joke_content">
                  <div class="joke__ID">
                    ID:
                    <a class="joke__ID-link js_ID" href="${url}" target="_blank"
                      >${id}</a
                    >
                  </div>
                  <div class="joke__value">
                    ${value}
                  </div>
                  <div class="joke__info">
                    <div class="joke__last-update">
                      Last update: <span class="time-passed">${timePassed}</span> hours ago
                    </div>
                  </div>
                </div>
              </div>
    `
    );
  }
}

// fav-section open/close

const favouriteSectionBtn = document.querySelector(".fav-section");
favouriteSectionBtn.addEventListener("click", handleFavClick);
function handleFavClick(event) {
  const falloutDark = document.querySelector(".favourite__section-dark");
  const fallout = document.querySelector(".favourite__section");
  falloutDark.classList.toggle("fallout-active");
  fallout.classList.toggle("fallout-active");
  // if (fallout.classList.value.includes("fallout-active")) {
  const firstLine = document.querySelector(".circle__rect--top");
  const secondLine = document.querySelector(".circle__rect--bot");
  firstLine.classList.toggle("make-cross");
  secondLine.classList.toggle("make-cross");
  const circleCross = document.querySelector(".circle__cross");
  circleCross.classList.toggle("fallout-active");
  // }
}

//fav-section  adding
jokes.addEventListener("click", handleJokeClick);
function handleJokeClick(event) {
  if (event.target.classList.value.includes("heart")) {
    if (event.target.src.includes("img/heart.svg")) {
      event.target.src = "./img/full-heart.png";
      addToFav(event.target.parentNode);
      updateFavSection();
    } else {
      event.target.src = "./img/heart.svg";
      addToFav(event.target.parentNode);
      updateFavSection();
    }
  }
}

function addToFav(post) {
  const id = post.querySelector(".js_ID").textContent;
  const url = post.querySelector(".js_ID").href;
  const value = post.querySelector(".joke__value").textContent.trim();
  const lastUpdate = post.querySelector(".time-passed").textContent;
  setToLocalStorage(id, url, value, lastUpdate);
}

const lsItem = localStorage.getItem(LS_KEY);
let lsObj = lsItem ? JSON.parse(lsItem) : {};

function setToLocalStorage(id, url, value, lastUpdate) {
  const favObj = { id, url, value, lastUpdate };
  // lsObj[id] = lsObj[id] ? delete lsObj[id] : favObj;
  if (lsObj[id]) {
    delete lsObj[id];
  } else {
    lsObj[id] = favObj;
  }
  console.log(lsObj);
  const lsObjJson = JSON.stringify(lsObj);
  localStorage.setItem(LS_KEY, lsObjJson);
  // const favObj = localStorage.getItem(LS_KEY);
}

// fav section rendering
function updateFavSection() {
  const sectionFolder = document.querySelector(".section__folder");
  sectionFolder.innerHTML = "";
  const lsContent = JSON.parse(localStorage.getItem(LS_KEY));
  if (lsContent) {
    const posts = Object.values(lsContent);
    const content = posts.reduce((acc, el) => {
      acc += `
      <div class="joke__container joke__container--fav">
        <img src="./img/full-heart.png" alt="" class="heart" />
        <div class="joke_content">
          <div class="joke__ID">
            ID:
            <a class="joke__ID-link js_ID" href="${el.url}" target="_blank"
              >${el.id}</a>
          </div>
          <div class="joke__value">
            ${el.value}
          </div>
          <div class="joke__info">
            <div class="joke__last-update">
              Last update: <span class="time-passed">${el.lastUpdate}</span> hours ago
            </div>
          </div>
        </div>
      </div>
      `;
      return acc;
    }, "");
    sectionFolder.insertAdjacentHTML("afterbegin", content);
  }
}
