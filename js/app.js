function getData(keyword) {
  const APP_ID = "c1543a13";
  const APP_KEY = "5873ed0a3118eff32dcb0aad9f1c006f";
  const URL = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${APP_ID}&app_key=${APP_KEY}&q=${keyword}`;
  fetch(URL)
    .then(res => res.json())
    .then(data => {
      data.hits.forEach(element => {
        const div = document.createElement("div");
        const a = document.createElement('a');
        const h2 = document.createElement('h2');
        const ul = document.createElement('ul');
        const img = document.createElement('img');
        let ingredients = "";

        a.href = element.recipe.url;
        h2.innerText = element.recipe.label;
        element.recipe.ingredients.forEach((ing, index) => {
          ingredients += `<li>${ing.text}</li>`;
        })
        ul.innerHTML = ingredients;
        img.src = element.recipe.image;

        a.append(h2);
        div.append(img);
        div.append(a);
        div.append(ul);

        document.body.append(div)
      });
    })
    .catch(err => console.log(err))
}

getData("egg");
