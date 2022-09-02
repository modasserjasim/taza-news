// Fetch the data from API 
const loadAllCategories = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = await res.json();
    return data.data.news_category;
}
const displayCategories = async () => {
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

const loadCategoriesNews = async (category_id) => {
    console.log(category_id);
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayCategoriesNews(data.data);
}

const displayCategoriesNews = newsCard => {
    console.log(newsCard);
    const categoriesContainer = document.getElementById('categories-container');
    categoriesContainer.innerHTML = '';
    newsCard.forEach(news => {
        console.log(news);
        const createCard = document.createElement('div');
        createCard.innerHTML = `
            <div class="card shadow-sm border-0 rounded-4 mb-4">
                <div class="row p-3 d-flex align-items-center">
                    <div class="col-md-3">
                        <img src="images/thumb.jpg" class="card-img" alt="...">
                    </div>
                    <div class="col-md-9">
                        <div class="card-body">
                            <h4 class="card-title">The best fashion influencers to follow for sartorial inspiration</h4>
                            <div class="d-flex align-items-center gap-3 py-3">

                                <div class="d-flex align-items-center gap-2">
                                    <img src="images/Rectangle 19.png" style="margin-top: -10px;" alt="author">
                                    <p>Jane Cooper</p>
                                </div>
                                <div>
                                    <p class=""><i class="fa-sharp fa-solid fa-calendar-days me-1"></i> Jan 10, 2022</p>
                                </div>
                            </div>
                            <p class="card-text text-secondary">From our favourite UK influencers to the best missives
                                from Milan and the coolest New Yorkers, read on some of the best fashion blogs out
                                there, and for even more inspiration, do head to our separate black fashion influencer
                                round-up. <br> <br>

                                Fancy some shopping deals? Check out these amazing sales: Zara Black Friday, ASOS Black
                                Friday, Missoma Black Friday and Gucci Black Friday...</p>
                            <div>
                                <ul class="d-flex justify-content-between list-unstyled pt-3">
                                    <li><i class="fas fa-tag me-1"></i>  Category</li>
                                    <li><i class="fa-regular fa-eye me-1"></i>  1.5M</li>
                                    <li >Rating <i class="fa-solid fa-star ms-1"></i></li>
                                    <li class="text-info" role="button"><i class="fa fa-arrow-right"></i>  Continue Reading</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        categoriesContainer.appendChild(createCard);
    });
}