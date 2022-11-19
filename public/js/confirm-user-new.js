function confirmNewUser(formID) {
    let form = document.querySelector(formID);
    Swal.fire({
        title: '¿Crear Usuario?',
        icon: 'info',
        showDenyButton: true,
        confirmButtonColor: '#198754',
        confirmButtonText: 'Crear',
        denyButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            form.submit();
        }
    })
}