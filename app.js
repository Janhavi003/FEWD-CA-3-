
async function fetchRandomImage() {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const data = await response.json();
    const imageUrl = data.meals[0].strMealThumb;
    return imageUrl;
   }
   function updateImage(imageUrl) {
    const imageElement = document.getElementById('random-image');
    imageElement.src = imageUrl;
   }
   async function handleRefresh() {
    const imageUrl = await fetchRandomImage();
    updateImage(imageUrl);
   }
   window.onload = handleRefresh;
