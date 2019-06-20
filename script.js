const searchForm = document.getElementById('search-form');
const movie = document.getElementById('movies');
const apiKey = '67052673bb356cf1a6e9736d875f4551';
const imagePath = 'https://image.tmdb.org/t/p/w500';

function apiSearch(e) {
    e.preventDefault();
    const searchText = document.querySelector('#search-text').value,
        url = `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&language=ru-Ru&query=${searchText}&include_adult=true`

    fetch(url)
        .then(function (value) {
            if (value.status !== 200) {
                return Promise.reject(value);
            }
            return value.json();
        })
        .then(function (output) {
                movie.innerHTML = output.results.map(m => {
                    return '<div class="col-12 col-md-6 col-lg-4 col-xl-3 item">' +
                        (m.poster_path ? `<img src='${imagePath+m.poster_path}' class="img"/>` : "<div class='img'></div>") +
                        `<span>${m.name||m.title}</span>
            </div>`;
                }).join('');
            },
            function (reason) {
                movie.innerHTML = 'Oops, some-thing goes wrong!';
                console.log('error: ' + reason.status);
            }).catch(er => {
            console.warn(`error in render block`);
        });
}
searchForm.addEventListener('submit', apiSearch);