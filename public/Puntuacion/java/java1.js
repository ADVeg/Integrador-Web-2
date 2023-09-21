async function puestos() {
    $.ajax({
        type: 'get',
        url: '/puestos',
        success: function (data) {
            let pos = 1;
            var container = $('#container');
            var row; // Variable para controlar las filas

            data.puestos.forEach(function(element, index) {
                if (index % 5 === 0) {
                    // Crea una nueva fila después de cada grupo de 5 elementos
                    row = $('<div class="row">');
                    container.append(row);
                }

                var puestoDiv = $('<div class="col puntuacion-box">');
                puestoDiv.html('Puntuacion:<br>' + element.puntuacion+'<br><br>Nombre:<br>' + element.nombre);

                row.append(puestoDiv);
            });
        }
    })
}

puestos();