import "./sass/main.scss";
import axios from "axios";

const refs = {
  form: document.querySelector("#form"),
  input: document.querySelector("#search"),
  container: document.querySelector(".container"),
  more: document.querySelector("#more"),
};

let currenPage = 1;

const gitHendlerSubmit = (e) => {
  e.preventDefault();
  clear();

  const value = refs.input.value;
  axios
    .get(
      `https://api.github.com/search/users?q=${value}&client_id=ae7720860f0738067836$client_secret=b0689fe8e7f0d84114b274f83e0286320d37b254&page=${currenPage}`
    )
    .then((result) => renderGitCollection(result.data.items))
    .then(() => (currenPage += 1))
    .then((err) => console.log(err));
};

// ===axios end

function createGiItem({ avatar_url, login }) {
  const article = `
<article>
<img src="${avatar_url}" alt= "${login} width='700" height='700'>
<p class="coctail-text">${login}</p>
</article>
`;

  refs.container.insertAdjacentHTML("beforeend", article);
}

function renderGitCollection(arr) {
  arr.forEach((el) => createGiItem(el));
}

function clear() {
  refs.input.innerHTML = "";
  refs.container.innerHTML = "";
}

refs.form.addEventListener("submit", gitHendlerSubmit);
refs.more.addEventListener("click", gitHendlerSubmit);
