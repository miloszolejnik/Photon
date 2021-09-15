const auth = "563492ad6f917000010000013c989ddd42dc448a8d3b13760ab4f2d2";
const gallery = document.querySelector('.gallery');
const searchInput = document.querySelector('.search-input');
const form = document.querySelector('form');
const more = document.querySelector('.more');

let serachValue;
let page = 1;
let fetchLink;
let currateSearch;

//Event Listeners
searchInput.addEventListener('input', updateInput);
form.addEventListener('submit', (e) => {
    e.preventDefault();
    currateSearch = serachValue;
    searchPhotos(serachValue);
})

more.addEventListener("click", loadMore)

function updateInput(e) {
    serachValue = e.target.value;
}

async function fetchAPI(url) {
    const dataFetch = await fetch(url, {
        method: 'GET',
        cache: "no-cache",
        headers: {
            Accept: 'application/json',
            Authorization: auth
        }
    });
    const data = await dataFetch.json();
    return data;
}

function generatePictures(data) {
    data.photos.forEach(photo => {
        const galleryImg = document.createElement('div');
        galleryImg.classList.add("gallery-img");
        galleryImg.innerHTML = `
        <div class="gallery-info">
        <p>${photo.photographer}</p>
        <a href=${photo.src.original}>Download</a>
        </div>
        <img src=${photo.src.large}> </img>
        `;
        gallery.appendChild(galleryImg);
    })
}

async function curratedPhotos() {
    fetchLink = "https://api.pexels.com/v1/curated?per_page=15";
    const data = await fetchAPI(fetchLink);
    generatePictures(data);
}

async function searchPhotos(querry) {
    clear();
    fetchLink = `https://api.pexels.com/v1/search?query=${querry}&per_page=15`;
    const data = await fetchAPI(fetchLink);
    generatePictures(data);
}

function clear() {
    gallery.innerHTML = "";
    searchInput.value = "";
}

async function loadMore() {
    page++;
    if (currateSearch) {
        const querry = currateSearch;
        fetchLink = `https://api.pexels.com/v1/search?query=${querry}&per_page=15&page=${page}`;
    } else {
        fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=${page}`;
    }
    const data = await fetchAPI(fetchLink);
    generatePictures(data);
}

curratedPhotos();
