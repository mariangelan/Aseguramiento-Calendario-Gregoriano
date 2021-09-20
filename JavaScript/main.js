const validar = require('./Validaciones');
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

async function solicitarAge(){
    var age = 0
    try {
        age = Number(await inputLine("Digite el año: "));
        if (age <= 0) {
            console.log("Se necesita un numero mayor a cero");
            return false;
        }
    } catch (e) {
        console.error(e);
        return false;
    }
    return age;
};

async function solicitarDiaMesAge() {
    var age, mes, dia = 0
    try {
        age = parseInt(await inputLine("Digite el año (ejm:2021): "), 10);
        mes = parseInt(await inputLine("Digite el mes(ejm: 2): "), 10);
        dia = parseInt(await inputLine("Digite el día(ejm:20): "), 10);
        if (age <= 0 || mes <= 0 || dia <= 0) {
            console.log("Se necesita un numero mayor a cero");
            return false;
        }
    } catch (e) {
        console.error(e);
        return false;
    }
    console.log("La fecha actual es:", [age, mes, dia])
    return [age, mes, dia];
}

async function consultarBisiestos() { 
    var age = await solicitarAge();
    var bisiesto = validar.esBisiesto(age);
    if (age == false || bisiesto == -1)
        return false;
    bisiesto = validar.esBisiesto(age);
    if (bisiesto == true)
        console.log("»Es bisiesto \n");
    else if(bisiesto == false)
        console.log("»No es bisiesto \n");
    return true;
};

async function consultarFecha() {
    var fechaValida = await solicitarDiaMesAge();
    console.log(fechaValida);
    var valida = validar.esFechaValida(fechaValida)
    if (fechaValida == false)
        return false
    else if (valida) {
        console.log("»Es una fecha válida.");
        return true;
    }
    return false;
};

async function consultarSiguiente() {
    var fechaValida = await solicitarDiaMesAge();
    if (fechaValida == false)
        return false;
    //Obtenga una nueva fecha.
    nuevaFecha = validar.obtenerDiaSiguiente(fechaValida)
    if (!nuevaFecha)
        return false;
    console.log("»El siguiente día es: ", nuevaFecha);
    return true;
}

async function contarDias() {
    var fechaValida = await solicitarDiaMesAge();
    if (fechaValida == false)
        return false;
    //Obtenga los días que han pasado.
    var diasTotales = await validar.contarDiasPasados(fechaValida)

    if (diasTotales >= 0) {
        console.log("»Han pasado: ", diasTotales, " días");
        return true;
    }
    return false;
}

async function diaSemana() {
    var age = await solicitarAge();
    if (age == false)
        return false;
    var text = "»El 1 de Enero del  (" + age + ") tiene como día"
    var dia = validar.obtenerDiaPrimeroDeEnero(age)
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
    console.log(text);
    return true;
}

const main = async () => {

    var estado = true;
    var opcion = 0;

    console.log("Bienvenido a la aplicación Calendario Gregoriano en JavaScript")
    while (estado) {
        var estadoConsulta = false;
        console.log("Opciones")
        console.log("1) Determinar si este año especifico es bisiesto ")
        console.log("2) Validar Fecha ")
        console.log("3) Día siguiente de una fecha ")
        console.log("4) Determinar los días que han pasado desde el primero de ese año. ")
        console.log("5) Dia específico del primero de enero dado un año. ")
        console.log("*) Pulsa cualquier tecla para salir del programa. ")
        try {
            opcion = await inputLine("Por favor, elija la opción que desea:");
            switch (opcion) {
                case '1':
                    while (!estadoConsulta)
                        estadoConsulta = await consultarBisiestos();
                    break;
                case '2':
                    while (!estadoConsulta)
                        estadoConsulta = await consultarFecha();
                    break;
                case '3':
                    while (!estadoConsulta)
                        estadoConsulta = await consultarSiguiente();
                    break;
                case '4':
                    while (!estadoConsulta)
                        estadoConsulta = await contarDias();
                    break;
                case '5':
                    while (!estadoConsulta)
                        estadoConsulta = await diaSemana();
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
