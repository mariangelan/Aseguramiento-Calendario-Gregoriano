//create by Johel

const { read } = require('node:fs');

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

const getLine = (function (text) {
    console.log(text);
    const getLineGen = (async function* () {
        for await (const line of readline) {
            yield line;
        }
    })();
    return async () => ((await getLineGen.next()).value);
})();

async function inputLine(text) {
    console.log(text);
    return await getLine();
}

async function solicitarDias() {
    var dias = 0
    try {
        dias = Number(await inputLine("Digite la cantidad de d�as: "));
    } catch (e) {
        console.error(e)
        return false;
    }
    if (dias >= 0) {
        return dias;
    }
    else
        return false;
};

async function solicitarAge(){
    var age = 0
    try {
        age = Number(await inputLine("Digite el a�o: "));
    } catch (e) {
        console.error(e);
        return false;
    }
    if (validarAge(age)) {
        return age;
    }
    else
        return false;
};

async function solicitarDiaMesAge() {
    var age, mes, dia = 0
    try {
        age = parseInt(await inputLine("Digite el a�o (ejm:2021): "), 10);
        mes = parseInt(await inputLine("Digite el mes(ejm: 2): "), 10);
        dia = parseInt(await inputLine("Digite el d�a(ejm:20): "), 10);
    } catch (e) {
        console.error(e);
        return false;
    }
    fecha = [age, mes, dia];
    var valida = esFechaValida(fecha)
    if (valida) {
        console.log("La fecha escrita es: ", fecha)
        return fecha;
    }
    else
        return false;
}

async function bisiesto() {
    var age = await solicitarAge();
    var bisiesto = esBisiesto(age);
    if (age == false) {
        console.log("Intente de nuevo");
        return false;
    }
    if (bisiesto == true)
        console.log("Es bisiesto \n");
    else if(bisiesto == false)
        console.log("No es bisiesto \n");
    return true;
};

async function fecha_es_valida() {
    var fechaValida = await solicitarDiaMesAge();
    if (!fechaValida) {
        console.log("Intente de nuevo");
        return fechaValida;
    }
    console.log("Fecha valida \n");
    return true;
};

async function dia_siguiente() {
    var fechaValida = await solicitarDiaMesAge();
    if (!fechaValida) {
        console.log("Intente de nuevo");
        return fechaValida;
    }
    nuevaFecha = obtenerDiaSiguiente(fechaValida)
    if (nuevaFecha)
        console.log("El siguiente d�a es: ", nuevaFecha, "\n");
    return nuevaFecha;
}

async function dias_desde_primero_enero() {
    var fechaValida = await solicitarDiaMesAge();
    if (!fechaValida) {
        console.log("Intente de nuevo");
        return fechaValida;
    }
    var diasTotales = await contarDiasPasados(fechaValida);
    if (diasTotales >= 0) {
        console.log("Han pasado: ", diasTotales, " d�as \n");
        return true;
    }
    console.log("Intente de nuevo");
    return false;
}

async function dia_primero_enero() {
    var age = await solicitarAge();
    if (!age) {
        console.log("Intente de nuevo");
        return age;
    }
    var text = "El 1 de Enero del  (" + age + ") tiene como d�a"
    var dia = obtenerDiaPrimeroDeEnero(age)
    switch (dia) {
        case 0:
            text += " Domingo";
            break;
        case 1:
            text += " Lunes";
            break;
        case 2:
            text += " Martes";
            break;
        case 3:
            text += " Miercoles";
            break;
        case 4:
            text += " Jueves";
            break;
        case 5:
            text += " Viernes";
            break;
        case 6:
            text += " Sabado";
            break;
        default:
            false;
    }
    console.log(text, '\n');
    return true;
}

async function fecha_futura() {
    var fecha = await solicitarDiaMesAge();
    var dias = await solicitarDias();
    if (!fecha || !dias) {
        console.log("Intente de nuevo");
        return false;
    }
    var nuevafecha = obtenerFechaFutura(fecha, dias);
    console.log("La fecha futura es: ", nuevafecha);
    return true;
}

function validarAge(age) {
    if (age < 1582 || Number.isNaN(age)) {
        console.log("A partir de 1582 se inicio a ustilizar este calendario.");
        console.log("Use a�os mayores a 1582.");
        return false;
    }
    return true
};

function validarMes(mes) {
    if (mes < 1 || mes > 12 || Number.isNaN(mes)) {
        console.log("Los valores para los meses comprenden valores enteros entre 1 y 12");
        return false;
    }
    return true;
}

function validarDia(dia, diaFinal) {
    if (dia < 1 || dia > diaFinal || Number.isNaN(dia)) {
        console.log("Los valores para este mes comprenden valores enteros entre 1 y ", diaFinal);
        return false;
    }
    return true;
}

function esBisiesto(age) {
    if (age % 400 == 0)
        return true;
    else
        if (age % 4 == 0 && age % 100 != 0)
            return true;
    return false;
};

function obtenerCantidadDiasDelMes(mes, age) {
    if (mes == 2)
        if (esBisiesto(age))
            return 29
        else
            return 28
    else if (mes < 8)
        if (mes % 2 == 1)
            return 31
        else
            return 30
    else
        if (mes % 2 == 0)
            return 31
        else
            return 30
}

function esFechaValida(fecha) {
    var age = fecha[0]
    var mes = fecha[1]
    var tempDia = fecha[2]
    var diaFinal = 0
    //Verifica si el mes y el a�o son correctos'
    if (!validarAge(age) || !validarMes(mes))
        return false;
    diaFinal = obtenerCantidadDiasDelMes(mes, age) //Obtengo los d�as de ese mes.
    //Verifica si el dia es v�lido.
    if (!validarDia(tempDia, diaFinal))
        return false;
    return true;
}

function incrementarDia(diaFinal, dia, mes, age) {
    if (dia == diaFinal) {
        mes += 1;
        dia = 1;
    }
    else
        dia += 1;
    if (mes > 12) {
        age += 1;
        mes = 1;
    }
    return [age, mes, dia];
}

function obtenerDiaSiguiente(fecha) {
    var age = fecha[0]
    var mes = fecha[1]
    var dia = fecha[2]
    if (!esFechaValida(fecha))
        return false;
    var diaFinal = obtenerCantidadDiasDelMes(mes, age) // Obtengo los d�as de ese mes.
    var nuevaFecha = incrementarDia(diaFinal, dia, mes, age) // Aumente un d�a.
    return nuevaFecha
}

async function contarDiasPasados(fecha) {
    var dias = 0
    var fechaInicial = [fecha[0], 1, 1]
    while (!(fecha[0] == fechaInicial[0] && fecha[1] == fechaInicial[1] && fecha[2] == fechaInicial[2])) {
        dias += 1
        fechaInicial = obtenerDiaSiguiente(fechaInicial) // Obtiene el d�a siguiente.
    }
    return dias
}

function obtenerDiaPrimeroDeEnero(age) {
    ageInicio = 1582
    dia = 2
    if (!validarAge(age))
        return -1;
    while (ageInicio < age) {
        if (esBisiesto(ageInicio) || (ageInicio % 100 == 0))
            dia += 2;
        else
            dia += 1;
        dia = dia % 7;
        ageInicio += 1;
    }
    return dia
}

function obtenerFechaFutura(fecha, dias) {
    var nuevaFecha = fecha;
    for (var i = 0; i < dias; i++) {
        nuevaFecha = obtenerDiaSiguiente(nuevaFecha);
    }
    return nuevaFecha;
}

const main = async () => {

    var estado = true;
    var opcion = 0;

    console.log("Bienvenido a la aplicaci�n Calendario Gregoriano en JavaScript")
    while (estado) {
        var estadoConsulta = false;
        console.log("Opciones")
        console.log("1) Determinar si un a�o es bisiesto ")
        console.log("2) Validar Fecha ")
        console.log("3) D�a siguiente de una fecha ")
        console.log("4) Determinar los d�as que han pasado desde el primero de ese a�o. ")
        console.log("5) Dia espec�fico del primero de enero dado un a�o. ")
        console.log("6)  ")
        console.log("7)  ")
        console.log("8) Fecha futura dada una cantidad de d�as")
        console.log("9)  ")
        console.log("*) Pulsa cualquier tecla para salir del programa. ")
        try {
            opcion = await inputLine("Por favor, elija la opci�n que desea:");
            switch (opcion) {
                case '1':
                    while (!estadoConsulta)
                        estadoConsulta = await bisiesto();
                    break;
                case '2':
                    while (!estadoConsulta)
                        estadoConsulta = await fecha_es_valida();
                    break;
                case '3':
                    while (!estadoConsulta)
                        estadoConsulta = await dia_siguiente();
                    break;
                case '4':
                    while (!estadoConsulta)
                        estadoConsulta = await dias_desde_primero_enero();
                    break;
                case '5':
                    while (!estadoConsulta)
                        estadoConsulta = await dia_primero_enero();
                    break;
                case '8':
                    while (!estadoConsulta)
                        estadoConsulta = await fecha_futura();
                    break;
                default:
                    estado = false;
                    break;
            };
        } catch (e) {
            console.error("Error: " + e);
        }
    }
    process.exit(0);
};

main();