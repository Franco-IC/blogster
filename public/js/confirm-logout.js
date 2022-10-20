const logoutBtn = document.querySelector('.logout-btn')

logoutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    confirmLogout();
})

function confirmLogout() {
    Swal.fire({
        title: '¿Estás seguro?',
        text: "Tendrás que iniciar sesión nuevamente",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Cerrar Sesión',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.replace('/logout');
        }
    })
}