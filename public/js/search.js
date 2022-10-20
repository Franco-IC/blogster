const btn = document.querySelector('#search-btn');
const form = document.querySelector('#search-form');

btn.addEventListener('click', (e) => {
    e.preventDefault();
    form.submit();
})