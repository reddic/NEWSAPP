const news = document.getElementById("news-container");
news.innerHTML = "";

axios.get("https://newsapi.org/v2/top-headlines?country=id&apiKey=08ec938e6dff4a6f96104876b1d33c8d")
        .then(response => {
            const articles = response.data.articles;
            displayNews(articles);
        })
        .catch(error => console.error("Error fetching data:", error));


function displayNews(articles) {
    const newsContainer = document.getElementById("news-container");

    
    articles.forEach(article => {
        const newsCard = document.createElement("div");
        newsCard.classList.add("news-card");

        if (article.urlToImage) {
            const image = document.createElement("img");
            image.src = article.urlToImage;
            image.alt = "News Image";
            newsCard.appendChild(image);
        }else{
            const image = document.createElement("img");
            image.src = "https://picsum.photos/200/100";
            image.alt = "News Image";
            newsCard.appendChild(image);
        }

        const title = document.createElement("h3");
        title.textContent = article.title;

        const publishedAt = document.createElement("p");
        publishedAt.textContent = formatDate(article.publishedAt);

        const description = document.createElement("p");
        description.textContent = article.description;

        const sources = document.createElement("p");  // Corrected variable name
        sources.textContent = `Source: ${article.source.name}`;


        const readMoreButton = document.createElement("button");
        readMoreButton.textContent = "Read more";
        readMoreButton.addEventListener("click", function () {
            window.open(article.url, "_blank");
        });

        
        newsCard.appendChild(title);
        newsCard.appendChild(publishedAt);
        newsCard.appendChild(description);
        newsCard.appendChild(sources);  // Corrected variable name
        newsCard.appendChild(readMoreButton);

        newsContainer.appendChild(newsCard);
    });
}


function formatDate(originalDate) {
    const date = new Date(originalDate);

    // Atur format tanggal yang diinginkan (contoh: "DD MMM YYYY")
    const options = { day: 'numeric', month: 'short', year: 'numeric' };

    return date.toLocaleDateString('en-US', options);
}





document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    // const newsContainer = document.getElementById('searchResults');
    const newsList = document.getElementById('newsList');
    const loadingIndicator = document.getElementById('loadingIndicator');

    searchInput.addEventListener('input', handleSearch);

    
    async function handleSearch() {
        const query = searchInput.value.trim();
        // if (!query) {
        //     searchNews.innerHTML = '';
        //     return;
        // }
        if (query.length === 0) {
            newsList.innerHTML = '';
            return;
        }
        showLoadingIndicator();
        try {
            const response = await axios.get(`https://newsapi.org/v2/everything?q=${query}&apiKey=08ec938e6dff4a6f96104876b1d33c8d`);
            const articles = response.data.articles;
            displayNews(articles);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            hideLoadingIndicator();
        }
    }

    function displayNews(articles) {
    const newsContainer = document.getElementById("searchResults");

    
    articles.forEach(article => {
        const newsCard = document.createElement("div");
        newsCard.classList.add("news-card");

        if (article.urlToImage) {
            const image = document.createElement("img");
            image.src = article.urlToImage;
            image.alt = "News Image";
            newsCard.appendChild(image);
        }else{
            const image = document.createElement("img");
            image.src = "https://picsum.photos/200/100";
            image.alt = "News Image";
            newsCard.appendChild(image);
        }

        const title = document.createElement("h3");
        title.textContent = article.title;

        const publishedAt = document.createElement("p");
        publishedAt.textContent = formatDate(article.publishedAt);

        const description = document.createElement("p");
        description.textContent = article.description;

        const sources = document.createElement("p");  // Corrected variable name
        sources.textContent = `Source: ${article.source.name}`;


        const readMoreButton = document.createElement("button");
        readMoreButton.textContent = "Read more";
        readMoreButton.addEventListener("click", function () {
            window.open(article.url, "_blank");
        });

        
        newsCard.appendChild(title);
        newsCard.appendChild(publishedAt);
        newsCard.appendChild(description);
        newsCard.appendChild(sources);  // Corrected variable name
        newsCard.appendChild(readMoreButton);

        newsContainer.appendChild(newsCard);
    });
    }

    function formatDate(originalDate) {
    const date = new Date(originalDate);

    // Atur format tanggal yang diinginkan (contoh: "DD MMM YYYY")
    const options = { day: 'numeric', month: 'short', year: 'numeric' };

    return date.toLocaleDateString('en-US', options);
    }

    function showLoadingIndicator() {
        loadingIndicator.style.display = 'block';
    }

    function hideLoadingIndicator() {
        loadingIndicator.style.display = 'none';
    }
});

  