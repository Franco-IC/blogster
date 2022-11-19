function confirmUserDelete(form) {
    Swal.fire({
        title: '¿Estás seguro?',
        text: "Esta acción es irreversible",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Eliminar Usuario',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                '¡Listo!',
                'Se eliminó el usuario.',
                'success'
            )
            setTimeout(() => {
                form.submit();
            }, 3000)
        }
    })
}