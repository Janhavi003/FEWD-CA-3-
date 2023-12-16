
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


