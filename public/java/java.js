let op;
let res;
let cont = 0;

function verificar(params) {
    if (params === $('#bt-1').text()) {
        $('#bt-1').css('background-color', 'green');
    } else if (params === $('#bt-2').text()) {
        $('#bt-2').css('background-color', 'green');
    } else if (params === $('#bt-3').text()) {
        $('#bt-3').css('background-color', 'green');
    } else {
        $('#bt-4').css('background-color', 'green');
    }
}

$('#bt-5').on('click', function () { //cancelar
    window.location.href = '/';
});

$('#bt-6').on('click', function () { //siguiente
    postP(res);
});

$('#bt-1, #bt-2, #bt-3, #bt-4').on('click', function () { ///botones respuestas
    $('#bt-1, #bt-2, #bt-3, #bt-4').css({ 'background-color': 'red' });
    res = $(this).text();
    verif(res); ///enviar respuesta
    $('#bt-1, #bt-2, #bt-3, #bt-4').prop('disabled', true);
    $('#container1').css('display', 'block');
});

$('#bt-log').on('click', function (event) { //boton enviar log
    event.preventDefault(); //Evitar envio formulario
    let nom = $('#inlineFormInputGroupUsername').val().trim();
    if (nom.length > 5) {   //Control de longitud
        post(nom);
    } else {
        verifcantcaracteres();
    }
});

function verif(res) {
    $.ajax({
        type:'get',
        url:'/verif',
        success:function(data){
            console.log(data.respuesta);
            if (data.respuesta===res) {
                $('#mensaje1').text('respuesta correcta').css({'display': 'block','font-weight': 'bold','margin-top': '10px', 'background-color': 'green'});
                verificar(res);
            } else {
                $('#mensaje1').text('respuesta incorrecta').css({'display': 'block','font-weight': 'bold','margin-top': '10px', 'background-color': 'red'});
                verificar(data.respuesta);
            }
        },
        error:function(error){
            console.error("Error:", error);
        }
    })
}

function postP(res) {
    $.ajax({
        type: 'POST',
        url: '/postP',
        data: { respuesta: res },
        success: function (data) {
            vistapostP(data); ///vista postP
        },
        error: function (error) {
            console.error("Error:", error);
        }
    });
}

function vistapostP(data) { ////vista postP
    $('#bt-1, #bt-2, #bt-3, #bt-4').css({ 'width': '14.063rem', 'max-witdth': '100%', 'background-color': '' }).prop('disabled', false);
    $('#container1').css('display', 'none');
    $('#mensaje1').css('display', 'none');
    if (data.op === 0) {
        $('#pregunta').text('¿DE QUE PAIS ES LA BANDERA?');
        cargarvistapostP(data);
    } else if (data.op === 1) {
        $('#pregunta').text('¿CUAL ES LA CAPITAL DE ' + data.psa + '?');
        cargarvistapostP(data);
    } else {
        $('#container').css({'display': 'none'});
        $('#container2').css({'display': 'block'});
        $('#nom').text('Felicidades '+data.nombre);
        $('#punt').text('Su puntuacion fue '+data.puntuacion);
        ////cambiar todo a felicitar -------------------------------------------------------------------------------------------------
    }
}

async function cargarvistapostP(data) {
    if (data.op===0) {
        completarpaises(data);
    } else {
        completarcapitales(data);
    }
    await $('#bandera').attr('src', data.img).css({'height': '10rem', 'width': '20rem'});
}

function post(nom) {
    $.ajax({
        type: 'POST',
        url: '/post',
        data: { nombre: nom },
        success: function (data) {
            vistaPost(data); ///vista post
        },
        error: function (error) {
            console.error("Error:", error);
        }
    });
}

async function vistaPost(data) { ///vista post
    if (data.respuesta < 1) {
        await $('#bandera').attr('src', data.img).css({'height': '10rem', 'width': '20rem'}); //cargar bandera
        $('#container-login').css('display', 'none');
        $('#container').css({ 'display': 'block', 'text-align': 'center', 'background-color': '#949494d3', 'padding': '20px', 'border': '1px solid #949494', 'border-radius': '5px', 'width': '31.25rem' });
        $('#bt-1, #bt-2, #bt-3, #bt-4').css({ 'width': '14.063rem', 'max-witdth': '100%', 'background-color': '' });
        completarpaises(data); //completar paises
    } else if (data.respuesta < 2) { //si nombre ya existe
        $('#mensaje').text('* El nombre ya existe').css({
            'display': 'block',
            'background-color': '#5e5e5ec2',
            'color': 'red',
            'font-weight': 'bold',
            'margin-top': '15px'
        });
        $('#inlineFormInputGroupUsername').focus();
    } else {
        verifcantcaracteres(); //Control de longitud server
    }
}

function verifcantcaracteres() { ///si nombre tiene menos de 6 caracteres
    $('#mensaje').text('* El nombre debe tener al menos 6 caracteres').css({
        'display': 'block',
        'background-color': '#5e5e5ec2',
        'color': 'red',
        'font-weight': 'bold',
        'margin-top': '15px'
    });
    $('#inlineFormInputGroupUsername').focus();
}

function completarpaises(data) { ///completar paises
    data.opciones.forEach(element => {
        completar(element);
    })
}

function completarcapitales(data) { ///completar capitales
    data.opciones.forEach(element => {
        completarcap(element);
    })
}

function completar(params) { ///cargar paises
    function c(params) {
        console.log(params.common);
        if (cont === 0) {
            $('#bt-1').text(params.common);
        } else if (cont === 1) {
            $('#bt-2').text(params.common);
        } else if (cont === 2) {
            $('#bt-3').text(params.common);
        } else {
            $('#bt-4').text(params.common);
            cont = -1;
        }
    }
    if (typeof params.common==='undefined') {
        c('No tiene');
    } else {
        c(params);
    }
    cont++;
}
function completarcap(params) { ///cargar capitales
    function s(params) {
        console.log(params);
        if (cont === 0) {
            $('#bt-1').text(params);
        } else if (cont === 1) {
            $('#bt-2').text(params);
        } else if (cont === 2) {
            $('#bt-3').text(params);
        } else {
            $('#bt-4').text(params);
            cont = -1;
        }
    }
    if (typeof params[0]==='undefined') {
        s('No tiene');
    } else {
        s(params[0]);
    }
    cont++;
}