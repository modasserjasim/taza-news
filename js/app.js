// Fetch the data from API 
const loadAllCategories = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        return data.data.news_category;
    } catch (error) {
        console.log(error);
    }

}

// display categories menu
const displayCategories = async () => {
    const categories = await loadAllCategories();
    const categoriesMenuContainer = document.getElementById('categories-menu');

    categories.forEach(category => {
        const newButton = document.createElement('div');
        newButton.innerHTML = `
        <button onclick="loadCategoriesNews('${category.category_id}')" class="category-btn text-secondary">${category.category_name}</button>`;
        categoriesMenuContainer.appendChild(newButton);
    });

    // Get all buttons inside the container to active the button
    var btns = categoriesMenuContainer.getElementsByClassName("category-btn");
    // Loop through the buttons and add the active class to the current/clicked button
    for (var i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function () {
            var current = document.getElementsByClassName("category-btn-active");

            // set the active class on menu
            if (current.length > 0) {
                current[0].className = current[0].className.replace(" category-btn-active", "");
            }

            // Add the active class to the current/clicked button
            this.className += " category-btn-active";
        });
    }
}
displayCategories();

// Load categories info using category id 
const loadCategoriesNews = async (category_id) => {
    // Toggle Spinner stop loader
    toggleSpinner(true);

    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayCategoriesNews(data.data);
    } catch (error) {
        console.log(error);
    }
}

// display news cards
const displayCategoriesNews = (newsCard) => {

    // Make the MostViewed news on first using sort method
    newsCard.sort((a, b) => b.total_view - a.total_view);


    //set news cards on the container
    const categoriesContainer = document.getElementById('categories-container');
    categoriesContainer.innerHTML = '';
    newsCard.forEach(news => {
        const createCard = document.createElement('div');
        createCard.innerHTML = `
            <div onclick="loadNewsDetails('${news._id}')" class="card shadow-sm border-0 rounded-4 mb-4" role="button" data-bs-toggle="modal" data-bs-target="#newsDetailsModal">
                <div class="row p-3 d-flex align-items-center">
                    <div class="col-md-3">
                        <img src="${news.thumbnail_url}" class="card-img" alt="...">
                    </div>
                    <div class="col-md-9">
                        <div class="card-body">
                            <h4 class="card-title">${news.title}</h4>
                            <div class="d-flex align-items-center flex-wrap gap-3 py-3">

                                <div class="d-flex align-items-center gap-2">
                                    <img class="rounded-pill" src="${news.author.img}" style="margin-top: -10px; width:40px; height: 40px;" alt="author">
                                    <p>${news.author.name === null || news.author.name === '' ? news.author.name = 'Name not found' : news.author.name}</p>
                                </div>
                                <div>
                                    <p class=""><i class="fa-sharp fa-solid fa-calendar-days me-1"></i> ${news.author.published_date === null ? 'Date not found' : news.author.published_date}</p>
                                </div>
                            </div>
                            <p class="card-text text-secondary">${news.details.length > 350 ? news.details.slice(0, 350) + '...' : news.details}</p>
                            <div>
                                <ul class="d-flex justify-content-between flex-wrap list-unstyled pt-3">
                                    <li><i class="fa-regular fa-eye me-1"></i>  ${news.total_view === null ? news.total_view = 'The view is not found' : news.total_view}</li>
                                    <li >${news.rating.number} <i class="fa-solid fa-star ms-1"></i></li>
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

    //Set Items found div
    const itemsFound = document.getElementById('items-found');
    if (newsCard.length > 0) {
        itemsFound.classList.remove('d-none')
        itemsFound.innerText = `${newsCard.length} news found in this category`;
    } else {
        itemsFound.classList.remove('d-none')
        itemsFound.innerText = `Oops! No news found in this category`;
    }

    // Toggle Spinner stop loader
    toggleSpinner(false);
}

// LOAD News details by news_id
const loadNewsDetails = async (news_id) => {
    const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayNewsDetails(data.data[0]);
    } catch (error) {
        console.log(error);
    }
}
// display news details on modal
const displayNewsDetails = (news) => {
    const newsPopoupBody = document.getElementById('modal-body');
    newsPopoupBody.innerHTML = `
        <div class="card border-0">
        <div class="row p-3 d-flex align-items-center">
            <div class="col-md-12 text-center">
                <img src="${news.image_url}" class="card-img" alt="News Image">
            </div>
            <div class="col-md-12">
                <div class="card-body">
                    <h4 class="card-title">${news.title}</h4>
                    <div class="d-flex align-items-center flex-wrap gap-3 py-3">

                        <div class="d-flex align-items-center gap-2">
                            <img class="rounded-pill" src="${news.author.img}" style="margin-top: -10px; width:40px; height: 40px;" alt="author">
                            <p>${news.author.name === null || news.author.name === '' ? news.author.name = 'Name not found' : news.author.name}</p>
                        </div>
                        <div>
                            <p class=""><i class="fa-sharp fa-solid fa-calendar-days me-1"></i> ${news.author.published_date === null ? 'date not found' : news.author.published_date}</p>
                        </div>
                    </div>
                    <p class="card-text text-secondary">${news.details}</p>
                    <div>
                        <ul class="d-flex justify-content-between flex-wrap list-unstyled pt-3">
                            <li><i class="fa-regular fa-eye me-1"></i>  ${news.total_view === null ? news.total_view = 'The view is not found' : news.total_view}</li>
                            <li >${news.rating.number} <i class="fa-solid fa-star ms-1"></i></li>
                            <li > <i class="fa fa-arrow-trend-up"></i> IsTrending: ${news.others_info.is_trending === true ? 'Yes' : 'No'}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
        
        `;
}

const toggleSpinner = isLoading => {
    const spinnerSection = document.getElementById('spinner');
    if (isLoading) {
        spinnerSection.classList.remove('d-none');
    } else {
        spinnerSection.classList.add('d-none');
    }
}

loadCategoriesNews('01')