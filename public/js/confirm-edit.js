function confirmEdit(formID) {
    const form = document.querySelector(formID);

    Swal.fire({
        title: '¿Guardar los cambios?',
        showDenyButton: true,
        icon: 'warning',
        confirmButtonColor: '#ffc107',
        confirmButtonText: `Editar`,
        denyButtonText: 'Cancelar',
        denyButtonColor: '#3085d6'
    }).then((result) => {
        if (result.isConfirmed) {
            form.submit();
        } else if (result.isDenied) {
            Swal.fire('No se guardaron los cambios', '', 'info')
        }
    })
}