document.addEventListener("DOMContentLoaded", function () {
    const apiKey = '2a981b6864814c5f8d6de418993214ac'; // Replace with your News API key
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

    // Make sure to use the correct version of Axios
    axios.get("https://newsapi.org/v2/everything?q=stock&apiKey=2a981b6864814c5f8d6de418993214ac")
        .then(response => {
            const articles = response.data.articles;
            displayNews(articles);
        })
        .catch(error => console.error("Error fetching data:", error));
});

function displayNews(articles) {
    const newsContainer = document.getElementById("news-container");

    // Display news in grid or card
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

        const description = document.createElement("p");
        description.textContent = article.description;

        const sources = document.createElement("p");  // Corrected variable name
        sources.textContent = `Source: ${article.source.name}`;

        // const link = document.createElement("a");
        // link.href = article.url;
        // link.textContent = "Read more";

        const readMoreButton = document.createElement("button");
        readMoreButton.textContent = "Read more";
        readMoreButton.addEventListener("click", function () {
            window.open(article.url, "_blank");
        });

        
        newsCard.appendChild(title);
        newsCard.appendChild(description);
        newsCard.appendChild(sources);  // Corrected variable name
        newsCard.appendChild(readMoreButton);

        newsContainer.appendChild(newsCard);
    });
}
