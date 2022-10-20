function confirmDelete(form) {
    Swal.fire({
        title: '¿Estás seguro?',
        text: "Esta acción es irreversible",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Borrar post',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                '¡Listo!',
                'Se borró el post.',
                'success'
            )
            setTimeout(() => {
                form.submit();
            }, 3000)
        }
    })
}