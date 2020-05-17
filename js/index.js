const apiRandom = "https://api.chucknorris.io/jokes/random";
const apiCategories = "https://api.chucknorris.io/jokes/categories";

const input = document.querySelectorAll(".jokes__input");

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
    }
  });
}

function createJoke(id, url, value, categories, updated_at) {
  const jokes = document.querySelector(".js-jokes");
  jokes.innerHTML = "";

  const today = new Date();
  const date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  const time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const dateTime = date + " " + time;

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
                      Last update: 1923 hours ago
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
                      Last update: 1923 hours ago
                    </div>
                  </div>
                </div>
              </div>
    `
    );
  }
}