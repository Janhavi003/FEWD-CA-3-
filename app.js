// Random image with image name

async function fetchRandomImage() {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const data = await response.json();
    const mealData = data.meals[0];
    const imageUrl = mealData.strMealThumb;
    const imageName = mealData.strMeal;
    return { imageUrl, imageName };
}

function updateImage(imageUrl, imageName) {
    const imageElement = document.getElementById('random-image');
    const nameElement = document.getElementById('image-name');
    imageElement.src = imageUrl;
    nameElement.innerText = imageName;
}

async function handleRefresh() {
    const { imageUrl, imageName } = await fetchRandomImage();
    updateImage(imageUrl, imageName);
}

window.onload = handleRefresh;

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

