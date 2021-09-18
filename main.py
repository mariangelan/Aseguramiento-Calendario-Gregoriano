
#create by Mariangela
from Validaciones import Validaciones

validar = Validaciones()

def solicitarDiaMesAño():
    año = mes = dia = 0
    print("░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░♠░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ ")
    print("\n")
    try:
        año = int(input("Digite el año (ejm:2021): "))
        mes = int(input("Digite el mes (ejm:2): "))
        dia = int(input("Digite el día(ejm:20): "))
        if (año <= 0 or mes <= 0 or dia <= 0):
            print("Se necesita un numero mayor a cero")
            return False
    except ValueError:
        print("Error")
        return False
    print("\n")
    return (año, mes, dia)

def solicitarAño():
    año = 0
    print("░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░♠░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ ")
    print("\n")
    try:
        año = int(input("Digite el año: "))
        if (año <= 0):
            print("Se necesita un numero mayor a cero")
            
            return False
    except ValueError:
        print("Error intente de nuevo")
        return False
    print("\n")
    return año



def consultarFecha():
    fechaValida = (0, 0, 0)
    valida = False
    fechaValida = solicitarDiaMesAño()
    if (fechaValida == False):
        return False
    valida = validar.esFechaValida(fechaValida)
    if (valida):
        print("»Es una fecha válida.")
        return True
    return False

def siguiente():
    fechaValida = (0, 0, 0)
    nuevaFecha = (0, 0, 0)
    fechaValida = solicitarDiaMesAño()
    if (fechaValida == False):
        return False
    # Obtenga una nueva fecha.
    nuevaFecha = validar.obtenerDiaSiguiente(fechaValida)
    if (nuevaFecha == (-1, -1, -1)):
        return False
    print("»El siguiente día es: " + str(nuevaFecha))
    return True

def contarDias():
    fechaValida = (0, 0, 0)
    fechaValida = solicitarDiaMesAño() 
    if (fechaValida == False):
        return False
    # Obtenga los días que han pasado.
    diasTotales = validar.contarDiasPasados(fechaValida)
    if (diasTotales >= 0):
        print("»Han pasado : " + str(diasTotales)+ " días")
        return True
    return False

def diaSemana():
    dia = 0
    año = solicitarAño() 
    if (año == False):
        return False
    text = "»El primero de la semana del (" + str(año) + ")"
    dia = validar.obtenerDiaPrimeroDeEnero(año)
    if (dia == 0):
        text += " es Domingo \n"
    elif (dia == 1):
        text += " es Lunes \n"
    elif (dia == 2):
        text += " es Martes \n"
    elif (dia == 3):
        text += " es Miércoles \n"
    elif (dia == 4):
        text += " es Jueves \n"
    elif (dia == 5):
        text += " es Viernes \n"
    elif (dia == 6):
        text += " es Sabado \n"
    else:
        return False
    print(text)
    return True

def consultarBisiestos():
    bisiesto = False
    año = solicitarAño() 
    if (año == False):
        return False

    bisiesto = validar.esBisiesto(año)
    if (bisiesto == True):
        print("»Es bisiesto \n")
    elif (bisiesto == False):
        print("»No es bisiesto \n")
    return True
estado = True
opcion = 0
print("░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░♠░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ ")
print("Bienvenido a la aplicación Calendario Gregoriano \n")
print("░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░♠░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ ")
while(estado):
    print("\n")
    print("Por favor, elija la opción que desea: \n")
    print("1) Determinar si este año especifico es bisiesto ")
    print("2) Validar Fecha ")
    print("3) Día siguiente de una fecha ")
    print("4) Determinar los días que han pasado desde el primero de ese año. ")
    print("5) Dia específico del primero de enero dado un año. ")
    print("0) Salir del programa. ")
    print("\n")
    try:
        opcion = int(input("Digite el número que desea: "))
        print("\n")
        if (opcion == 1):
            estadoConsulta = consultarBisiestos()
            while(not estadoConsulta):
                estadoConsulta = consultarBisiestos()
        elif (opcion == 2):
            estadoConsulta = consultarFecha()
            while (not estadoConsulta):
                estadoConsulta = consultarFecha()
        elif (opcion == 3):
            estadoConsulta = siguiente()
            while (not estadoConsulta):
                estadoConsulta = siguiente()
        elif (opcion == 4):
            estadoConsulta = contarDias()
            while (not estadoConsulta):
                estadoConsulta = contarDias()
        elif (opcion == 5):
            estadoConsulta = diaSemana()
            while (not estadoConsulta):
                estadoConsulta = diaSemana()
        elif (opcion == 0):
            estado = False
        else:
            print("ERROR \n")
    except ValueError:
        print("ERROR \n")

