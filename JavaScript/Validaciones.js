function validarAge(age) {
    if (age < 1582) {
        console.log("»A partir de 1582 se inicio a ustilizar este calendario.«");
        console.log("Usar años mayores a 1582");
        return false
    }
    return true
};

function validarMes(mes) {
    if (mes > 12) {
        console.log("Recuerde que el año tiene 12 meses");
        return false;
    }
    return true;
}

function validarDia(dia, diaFinal) {
    if (dia > diaFinal) {
        console.log("Excedio la cantidad de días de este mes");
        return false;
    }
    return true;
}

function esBisiesto(age) {
    if (!validarAge(age))
        return -1;
    else if (age % 400 == 0)
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
    else if(mes < 8)
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
    var tempAge = fecha[0]
    var tempMes = fecha[1]
    var tempDia = fecha[2]
    var diaFinal = 0
    //Verifica si el mes y el año son correctos
    if (!validarAge(tempAge) || !validarMes(tempMes))
        return false;
    diaFinal = obtenerCantidadDiasDelMes(tempMes, tempAge) //Obtengo los días de ese mes.
    //Verifica si el dia es válido.
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
    var diaFinal = obtenerCantidadDiasDelMes(mes, age) // Obtengo los días de ese mes.
    var nuevaFecha = incrementarDia(diaFinal, dia, mes, age) // Aumente un día.
    return nuevaFecha
}

async function contarDiasPasados(fecha) {
    var dias = 0
    var fechaInicial = [fecha[0], 1, 1]
    if (!esFechaValida(fecha))
        return -1
    while (!(fecha[0] == fechaInicial[0] && fecha[1] == fechaInicial[1] && fecha[2] == fechaInicial[2])) {
        dias += 1
        fechaInicial = obtenerDiaSiguiente(fechaInicial) // Obtiene el día siguiente.
    }
    return dias
}


function obtenerDiaPrimeroDeEnero(age) {
    ageInicio = 1582
    dia = 2
    if (!validarAge(age))
        return -1
    while (ageInicio < age) {
        if (esBisiesto(ageInicio) || (ageInicio % 100 == 0))
            dia += 2
        else
            dia += 1
        dia = dia % 7
        ageInicio += 1
    }
    return dia
}

module.exports = { esBisiesto, esFechaValida, obtenerDiaSiguiente, contarDiasPasados, obtenerDiaPrimeroDeEnero};