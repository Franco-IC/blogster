const newPostForm = document.querySelector('#new-post-form');

function confirmPost() {
    Swal.fire({
        title: '¿Crear un nuevo post?',
        icon: 'info',
        showDenyButton: true,
        confirmButtonColor: '#198754',
        confirmButtonText: `Postear`,
        denyButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            newPostForm.submit();
        }
    })
}