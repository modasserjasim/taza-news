// Fetch the data from API 
const loadAllCategories = async() =>{
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = await res.json();
    return data.data.news_category;
}
const displayCategories = async() =>{
    const categories = await loadAllCategories();
    // console.log(categories);
    const categoriesMenuContainer = document.getElementById('categories-menu');
    categories.forEach(category => {
        // console.log(category);
        const newButton = document.createElement('div');
        newButton.innerHTML = `
        <button onclick="loadCategoriesNews('${category.category_id}')" class="category-btn text-secondary">${category.category_name}</button>`;
        categoriesMenuContainer.appendChild(newButton);
    });
}
displayCategories();

const loadCategoriesNews = async(category_id) =>{
    console.log(category_id);
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayCategoriesNews(data.data);
}

const displayCategoriesNews = newsCard =>{
    console.log(newsCard);
    const categoriesContainer = document.getElementById('categories-container');
    newsCard.forEach(news => {
        console.log(news);
        const createCard = document.createElement('div');
        createCard.classList.add('card shadow-sm border-0 rounded-4 mb-4');
        createCard.innerHTML = `
        
        `;
    });
}