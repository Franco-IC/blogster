const editPostForm = document.querySelector('#edit-post-form');

function confirmEdit() {
    Swal.fire({
        title: '¿Editar post?',
        showDenyButton: true,
        icon: 'warning',
        confirmButtonColor: '#ffc107',
        confirmButtonText: `Editar`,
        denyButtonText: 'Cancelar',
        denyButtonColor: '#3085d6'
    }).then((result) => {
        if (result.isConfirmed) {
            editPostForm.submit();
        } else if (result.isDenied) {
            Swal.fire('No se guardaron los cambios', '', 'info')
        }
    })
}