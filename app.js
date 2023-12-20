let id;
// ---- Random Image functionality starts ----
// Function to fetch Random image with image name.
async function fetchRandomImage() {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const data = await response.json();
    const mealData = data.meals[0];
    const imageUrl = mealData.strMealThumb;
    const imageName = mealData.strMeal;
    id = mealData.idMeal
    return { imageUrl, imageName };
}
// Function to update random image and its name.
function updateImage(imageUrl, imageName) {
    const imageElement = document.getElementById('random-image');
    const nameElement = document.getElementById('image-name');
    imageElement.src = imageUrl;
    nameElement.innerText = imageName;
}
// Function to handle the updation of image on refreshing the website.
async function handleRefresh() {
    const { imageUrl, imageName } = await fetchRandomImage();
    updateImage(imageUrl, imageName);
}
window.onload = handleRefresh;
//---- Random Image functionality ends ----

//  ---- Search result Images functionality starts ----
// Function for fetching the images upon searching specific category.
async function searchImages() {
    const searchInput = document.getElementById('search_bar').value;
    const apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${searchInput}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        displayResults(data.meals);
    } catch (error) {
        console.error('Error fetching images:', error);
    }
}
// Function for displaying the images on searching in search bar.
function displayResults(meals) {
    const resultsContainer = document.getElementById('search_results');
    resultsContainer.innerHTML = '';

    meals.forEach(meal => {
        const imgElement = document.createElement('img');
        imgElement.src = meal.strMealThumb;

        const textElement = document.createElement('p');
        textElement.textContent = meal.strMeal;

        const resultItem = document.createElement('div');
        resultItem.appendChild(imgElement);
        resultItem.appendChild(textElement);

        resultsContainer.appendChild(resultItem);
    });
}
//  ---- Search result Images functionality ends ----

// ---- Modal containing ingredients of random image starts ----
// Getting the elements by their ids.
const RandonImg = document.getElementById("random-image")
const modal = document.getElementById("modal")
const ingredientsList = document.getElementById("Ingredients")
// function for fetching and displaying the ingredients.
async function getIngredients(e) {
    ingredientsList.innerHTML = ""
    try {
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${e}`)
        let data = await response.json();
        for (let i = 1; i < 21; i++) {
            if (data.meals[0][`strIngredient${i}`] != "") {
                let a = data.meals[0][`strIngredient${i}`]
                console.log(a)
                ingredientsList.innerHTML += `<li>${a}</li>`
            }
        }
        
    }
    catch (error) {
        console.log("Error fetching data:", error)
    }
}
// Onclick function for modal to display on clicking the image.
RandonImg.addEventListener('click', function () {
    getIngredients(id)
    modal.style.display = "block";
})
// Onclick function for modal to close on clicking the closebtn.
const closeBtn = document.getElementById("closeBtn")
closeBtn.addEventListener('click', function () {
    modal.style.display = "none"
})
// ---- Modal containing ingredients of random image ends ----

//  ~~~~~~~ Javascript ends here ~~~~~~~~
