function confirmReset(form) {
    Swal.fire({
        title: '¿Reiniciar formulario?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ffc107',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Reiniciar',
        cancelButtonText: 'Cancelar'
    })
        .then((result) => {
            if (result.isConfirmed) {
                Swal.fire('Formulario reiniciado', '', 'success');
                setTimeout(() => {
                    form.reset()
                }, 1000)
            }
        })
}