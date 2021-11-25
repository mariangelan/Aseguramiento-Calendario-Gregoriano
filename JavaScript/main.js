//create by Johel

class Dia { //clase para guardar los datos de un dia
    constructor(dia, fecha) {
        this.dia = dia //numero del dia(0 Domingo, 1 Lunes, ...)
        this.fecha = fecha
    }
    diaFecha() {
        return this.fecha[2] //String del dia
    }
}

class Semana { //clase para guardar los datos de una semana
    constructor() {
        this.diasSemana = []
    }
    addDia(diaNuevo) {
        this.diasSemana.push(diaNuevo)
    }
    imprimirSemana(){ //Metodo que da el formato a los dias de la semana
        var strSemana = ""
        var numEspacio
        if (this.diasSemana.length < 7 && this.diasSemana.length > 0 && this.diasSemana[0].dia > 0) { //Cuantos espacios adelante se ocupan
            numEspacio = this.diasSemana[0].dia //Cantidadde espacios que se deja
            for (var i = 0; i < numEspacio; i++)
                strSemana += '     |'
                //strSemana += '\u{0009}'.format("")
        }
        this.diasSemana.forEach(function (dia, index) {
            strSemana += '  '.concat(dia.fecha).padEnd(5) + '|'
            }
            //strSemana += '\u{0009}'.format((this.diaFecha()))
        )
        return ' '+strSemana
    }
}

class Mes { //clase que representa a un mes del calendario
    constructor(nombre, numeroMes) {
        this.nombre = nombre    //nombre del mes
        this.numMes = numeroMes //numero que representa ese mes
        this.semanas = []       //Lista de sus respectivas semanas
    }
    addSemana(semanaNueva) {
        this.semanas.push(semanaNueva)
    }
    imprimirSemanaMes(semana) {
        var strSemana = ""
        if (semana < this.semanas.length) {
            strSemana = this.semanas[semana].imprimirSemana()
            if (semana == this.semanas.length - 1) {
                var espacios = 7-this.semanas[semana].diasSemana.length
                for (var i = 0; i < espacios; i++) {
                    strSemana += '     |'
                }
            }
        }
        else if (semana >= this.semanas.length) {
            strSemana = '     |'.repeat(7)
            
        }
        return strSemana
    }
    imprimirInfoMes() { //Retornar un string con el formato de los días
        return ' '.concat("  ", "D", '  |  ', "L", '  |  ', "K", '  |  ', "M", '  |  ', "J", '  |  ', "V", '  |  ', "S", '  |')
    }
    imprimirNombre() { //Retorna el nombre del mes
        var tam = 22 - this.nombre.length
        return this.nombre.padStart(22).padEnd(42).concat("|")
    }
}

class Calendario { //clase que representa a un calendario
    constructor(age) {
        this.age = age //posee un año y una lista de meses
        this.meses = []
    }
    addMes(mesNuevo) {
        this.meses.push(mesNuevo)
    }
    imprimirCalendarioInfo() { //Titulo del claendario
        var string = ' '.repeat(40).concat('Calendario del año ', this.age)
        console.log(string)
    }
    imprimirMes(ini, fin) { //inicio debe ser menor que fin y debe de ser menor a 12 y mayo a 1
        var linea = ""                 //Se busca que se imprima los meses que desee el usuario
        for (var i = ini; i < fin; i++)
            linea += this.meses[i].imprimirNombre()
        console.log(linea)
        linea = ""
        for (var i = ini; i < fin; i++) 
            linea += this.meses[i].imprimirInfoMes()
        console.log(linea)
        linea = ""
        for (var j = 0; j < 6; j++){
            for (var i = ini; i < fin; i++)
                linea += this.meses[i].imprimirSemanaMes(j)
            console.log(linea)
            linea = ""
        }
    }
}

//Crear Calendario
//Dado un año se crea los meses y dias que este posee
//Para esto se usan las clasesx Día, Semana, Mes
function crearCalendario(age) {
    var nuevoCalen = new Calendario(age)
    mesesNom = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
    contadorDiaSemana = obtenerDiaPrimeroDeEnero(age)
    for (var i = 0; i < 12; i++)
        contadorDiaSemana = crearMes(mesesNom[i], i + 1, nuevoCalen, contadorDiaSemana) //Se pasa el calendario para trabajar por refernecia
    return nuevoCalen
}
//Se crea un Mes, para ser agregado al Calendario
function crearMes(nombreMes, numeroMes, calendario, diaSemana) {
    var nuevoMes = new Mes(nombreMes, numeroMes)
    //Se procede a crear las semanas del mes nuevo
    diaSemana = crearSemanasMes(nuevoMes, calendario.age, diaSemana)
    //Se agrega el mes al Calendario
    calendario.addMes(nuevoMes)
    return diaSemana //Contador de que dia sigue para el siguiente Mes
}

function crearSemanasMes(mesAct, age, diaSemanaAct) {
    contadorDiasMes = cantidadDiasMes(mesAct.numMes, age)
    var semana = new Semana()  
    for (var diaActFecha = 1; diaActFecha < contadorDiasMes + 1; diaActFecha++){ //Se crean los dias de ese mes
        //Se crea un nuevo Dia
        var nuevoDia = new Dia(diaSemanaAct, (age, mesAct.numMes, diaActFecha))
        semana.addDia(nuevoDia)         //Se agrega el dia a la semana
        if (diaSemanaAct == 6) {        //Si ya el dia es 6, se crea una nueva semana
            diaSemanaAct = 0            //Se vuelve el día lunes
            mesAct.addSemana(semana)    //Se agrega la semana al mes
            semana = new Semana()       //Se crea una nueva semana
        }
        else
            diaSemanaAct += 1           //Si es otro dia solo se suma el contador
    }
    if (diaSemanaAct <= 6)
        mesAct.addSemana(semana)
    return diaSemanaAct
}

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
        dias = Number(await inputLine("Digite la cantidad de días: "));
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
        age = Number(await inputLine("Digite el año: "));
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
        age = parseInt(await inputLine("Digite el año (ejm:2021): "), 10);
        mes = parseInt(await inputLine("Digite el mes(ejm: 2): "), 10);
        dia = parseInt(await inputLine("Digite el día(ejm:20): "), 10);
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
        console.log("El siguiente día es: ", nuevaFecha, "\n");
    return nuevaFecha;
}

async function dias_desde_primero_enero() {
    var fechaValida = await solicitarDiaMesAge();
    if (!fechaValida) {
        console.log("Intente de nuevo");
        return fechaValida;
    }
    var diasTotales = await contarDiasPasados([fecha[0], 1, 1], fechaValida);
    if (diasTotales >= 0) {
        console.log("Han pasado: ", diasTotales, " días \n");
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
    var text = "El 1 de Enero del  (" + age + ") tiene como día"
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

async function dias_entre() {
    var fechaInicial = await solicitarDiaMesAge();
    var fechaFinal = await solicitarDiaMesAge();
    if (!fechaInicial || !fechaFinal) {
        console.log("Intente de nuevo");
        return false;
    }
    var cantdias = await contarDiasPasados(fechaInicial, fechaFinal);
    console.log("La cantidad de dias entre las fechas es: ", cantdias);
    return true;
}

function validarAge(age) {
    if (age < 1582 || Number.isNaN(age)) {
        console.log("A partir de 1582 se inicio a ustilizar este calendario.");
        console.log("Use años mayores a 1582.");
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
    //Verifica si el mes y el año son correctos'
    if (!validarAge(age) || !validarMes(mes))
        return false;
    diaFinal = obtenerCantidadDiasDelMes(mes, age) //Obtengo los días de ese mes.
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

function imprimir_3x4(age) {
    if (validarAge(age)) {
        var calend = crearCalendario(age) //Se crea la estructura de un calendario
        calend.imprimirCalendarioInfo()
        calend.imprimirMes(0, 3)
        calend.imprimirMes(3, 6)
        calend.imprimirMes(6, 9)
        calend.imprimirMes(9, 12)
        return true
    } else { return false }
}

function cantidadDiasMes(numMes, age) {
    var meses31 = [1, 3, 5, 7, 8, 10, 12]  // Meses que poseen 31 dias
    var meses30 = [4, 6, 9, 11]            // Meses que poseen 30 dias
    var dias = 0
    if (meses31.includes(numMes))
        dias = 31
    else if (meses30.includes(numMes))
        dias = 30
    else if (numMes == 2) { // aggefebrero
        bisiesto = esBisiesto(age)
        if (bisiesto == true)
            dias = 29
        else
            dias = 28
    }
    return dias
}

function moduloMes(mes, age) {
    var resultado = 0
    if (mes >= 1 && mes <= 12) {
        for (var i = 1; i < mes; i++)
            resultado = resultado + cantidadDiasMes(i, age) % 7
        resultado = resultado % 7
    }
    return resultado
}

async function dia_semana(){
    var fechaValida = await solicitarDiaMesAge()
    if (fechaValida == false)
        return false;
    var modMes = moduloMes(fechaValida[1], fechaValida[0])
    var agedecre = fechaValida[0] - 1
    //              ((annodecre % 7) + (((annodecre//4) -(3 * (((annodecre//100) + 1) // 4)))%7) + modMes + (fechaValida[2] % 7)) % 7
    var resultado = ((agedecre % 7) + (((agedecre / 4 | 0) - (3 * (((agedecre / 100 | 0) + 1) / 4 | 0))) % 7) + modMes + (fechaValida[2] % 7)) % 7
    resultado = parseInt(resultado, 10)
    //console.log(resultado)
    switch (resultado) {
        case 0:
            console.log("Domingo");
            break;
        case 1:
            console.log("Lunes");
            break;
        case 2:
            console.log("Martes");
            break;
        case 3:
            console.log("Miercoles");
            break;
        case 4:
            console.log("Jueves");
            break;
        case 5:
            console.log("Viernes");
            break;
        case 6:
            console.log("Sabado");
            break;
        default:
            console.log("No existe");
            break;
    }
    return true;
}



function fechaMayor(fechaInicial, fechaFinal) {
    if (fechaInicial[0] > fechaFinal[0])        // Compara años
        return fechaInicial
    else if (fechaInicial[1] > fechaFinal[1] && fechaInicial[0] >= fechaFinal[0])   // Compara meses
        return fechaInicial
    else if (fechaInicial[2] > fechaFinal[2] && fechaInicial[1] >= fechaFinal[1] && fechaInicial[0] >= fechaFinal[0])   // Compara dias
        return fechaInicial
    return fechaFinal
}

function contarDiasPasados(fechaInicial, fechaFinal) {
    if (esFechaValida(fechaInicial) && esFechaValida(fechaFinal)) {
        var dias = 0
        var fechaM = fechaMayor(fechaInicial, fechaFinal)
        if (fechaM == fechaInicial) {
            var tempfechaIni = fechaInicial
            fechaInicial = fechaFinal
            fechaFinal = tempfechaIni
        }
        while (!(fechaFinal[0] == fechaInicial[0] && fechaFinal[1] == fechaInicial[1] && fechaFinal[2] == fechaInicial[2])) {
            dias += 1
            fechaInicial = obtenerDiaSiguiente(fechaInicial) // Obtiene el día siguiente.
        }
        return dias
    } else {
        return false
    }    
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

    console.log("Bienvenido a la aplicación Calendario Gregoriano en JavaScript")
    while (estado) {
        var estadoConsulta = false;
        console.log("Opciones: ")
        console.log("1) Determinar si un año es bisiesto. ")
        console.log("2) Validar fecha. ")
        console.log("3) Día siguiente de una fecha. ")
        console.log("4) Determinar los días que han pasado desde el primero de ese año. ")
        console.log("5) Dia específico del primero de enero dado un año. ")
        console.log("6) Ver calnedario de un año. ")
        console.log("7) Ver el día de una fecha. ")
        console.log("8) Fecha Futura. ")
        console.log("9) Cantidad de días entre dos fechas. ")
        console.log("*) Pulsa cualquier tecla para salir del programa. ")
        try {
            opcion = await inputLine("Por favor, elija la opción que desea: ");
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
                case '6':
                    while (!estadoConsulta)
                        estadoConsulta = await imprimir_3x4();
                    break;
                case '7':
                    while (!estadoConsulta)
                        estadoConsulta = await dia_semana();
                    break;
                case '8':
                    while (!estadoConsulta)
                        estadoConsulta = await fecha_futura();
                    break;
                case '9':
                    while (!estadoConsulta)
                        estadoConsulta = await dias_entre();
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

//main();


module.exports = { obtenerDiaSiguiente, obtenerDiaPrimeroDeEnero, imprimir_3x4, contarDiasPasados };