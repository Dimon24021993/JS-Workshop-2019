const searchForm = document.getElementById('search-form');
const movie = document.getElementById('movies');
const apiKey = '67052673bb356cf1a6e9736d875f4551';
const imagePath = 'https://image.tmdb.org/t/p/w500';

function apiSearch(e) {
    const searchText = document.querySelector('#search-text').value,
        url = `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&language=ru-Ru&query=${searchText}&include_adult=true`
    requestApi("GET", url);
    e.preventDefault();
}
searchForm.addEventListener('submit', apiSearch);

function requestApi(method, url, data) {
    var request = new XMLHttpRequest();
    request.open(method, url);
    request.addEventListener('readystatechange', r => {
        if (request.readyState !== 4 || request.status !== 200) return;
        const output = JSON.parse(request.responseText);
        console.log(output)
        movie.innerHTML = output.results.map(m => {
            return `<div class="col-12 col-md-6 col-lg-4 col-xl-3">
            <img src='${imagePath+m.poster_path}'/>
            <span>${m.name||m.title}</span>
            </div>`;
        }).join('');
    });
    request.send(data);
}