// Fetch the data from API 
const loadAllCategories = async() =>{
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = await res.json();
    return data.data.news_category;
}
const displayCategories = async() =>{
    const categories = await loadAllCategories();
    console.log(categories);
    const categoriesMenuContainer = document.getElementById('categories-menu');
    categories.forEach(category => {
        // console.log(category);
        const newButton = document.createElement('a');
        newButton.innerHTML = `
        <button class="category-btn px-4 mx-2 text-secondary">${category.category_name}</button>`;
        categoriesMenuContainer.appendChild(newButton);
    });
}
displayCategories();