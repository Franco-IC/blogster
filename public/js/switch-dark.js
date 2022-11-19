const btnSwitch = document.querySelector('#switch');
const table = document.querySelector('#users');

btnSwitch.addEventListener('click', (e) => {
    document.body.classList.toggle('dark');
    btnSwitch.classList.toggle('active');
    if (table) table.classList.toggle('table-dark');

    if (document.body.classList.contains('dark')) {
        localStorage.setItem('dark-mode', 'true');
    } else {
        localStorage.setItem('dark-mode', 'false');
    }
})

if (localStorage.getItem('dark-mode') === 'true') {
    document.body.classList.add('dark');
    btnSwitch.classList.add('active');
    if (table) table.classList.add('table-dark');
} else {
    document.body.classList.remove('dark');
    btnSwitch.classList.remove('active');
    if (table) table.classList.remove('table-dark');
}