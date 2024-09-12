const form = document.querySelector('form');
const input = document.querySelector('form input');
const dataListEl = document.querySelector('.data-list'); // ul

// Create a event listener for form submit
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const reloading = `<h2 style="text-align:center;">Searching...</h2>`;
  dataListEl.innerHTML = reloading;
  const search_keyword = input.value;
  ListRecipes(search_keyword);
})

async function ListRecipes(keyword) {
  const appId = "c1543a13";
  const appKey = "5873ed0a3118eff32dcb0aad9f1c006f";
  const URL = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${appId}&app_key=${appKey}&q=${keyword}`;
  const response = await fetch(URL);
  const responseObject = await response.json();
  addRecipesToDOM(responseObject.hits);
}

function addRecipesToDOM(recipes) {
  if (recipes.length < 1) {
    dataListEl.innerHTML = "No result! Please search for a diffrent keyword.";
    return;
  }

  dataListEl.innerHTML = "";

  recipes.map((recipeObj) => {
    const recipeHtml = `
      <li class="data">
        <img src=${recipeObj.recipe.image} alt="recipe-image">
        <div class="content-container">
          <h2><a href=${recipeObj.recipe.url}>${recipeObj.recipe.label}</a></h2>
          <ul>
            ${recipeObj.recipe.ingredientLines.map(ingredient => `<li>${ingredient}</li>`).join('')}
          </ul>
        </div>
      </li>
  `;
    dataListEl.innerHTML += recipeHtml;
  });

}
