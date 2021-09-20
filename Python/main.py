
#create by Mariangela
class Validaciones:
    def __init__(self):
        self.fechas = []

    def validarAño(self, año):
        if (año < 1582):
            print("»A partir de 1582 se inicio a ustilizar este calendario.«")
            print("Usar años mayores a 1582")
            return False
        return True

    def validarMes(self, mes):
        if (mes > 12):
            print("Recuerde que el año tiene 12 meses")
            return False
        return True

    def validarDia(self, dia, diaFinal):
        if (dia > diaFinal):
            print("Exedio la cantidad de días de ese mes")
            return False
        return True


    def Bisiesto(self, año):
        if (not self.validarAño(año)):
            return -1
        if (año % 400 == 0):
            return True
        else:
            if (año % 4 == 0 and año % 100 != 0):
                return True
        return False


    def obtenerCantidadDiasDelMes(self, mes, año):
        if (mes == 2):
            if (self.Bisiesto(año)):
                return 29
            else:
                return 28
        elif (mes < 8):
            if (mes % 2 == 1):
                return 31
            else:
                return 30
        else:
            if (mes % 2 == 0):
                return 31
            else:
                return 30


    def fecha_es_tupla(self, fecha):
        
        tempAño = fecha[0]
        tempMes = fecha[1]
        tempDia = fecha[2]
        diaFinal = 0
        # Verifique si el mes y el año son correctos
        if (not self.validarAño(tempAño) or not self.validarMes(tempMes)):
            return False
        diaFinal = self.obtenerCantidadDiasDelMes(tempMes, tempAño) # Obtengo los días de ese mes.
        # Verifica si el dia es válido.
        if (not self.validarDia(tempDia, diaFinal)):
            return False
        self.fechas.append(fecha)
        return True

    # Buscar la tupla del día siguiente.
    def incrementarDia(self, diaFinal, dia, mes, año):
        if (dia == diaFinal):
            mes += 1
            dia = 1
        else:
            dia += 1
        if (mes > 12):
            año += 1
            mes = 1

        return (año, mes, dia)


    # Obtiene el día siguiente.
    def DiaSiguiente(self, fecha):
        año = fecha[0]
        mes = fecha[1]
        dia = fecha[2]
        diaFinal = 0
        nuevaFecha = (0,0,0)

        if (not self.fecha_es_tupla(fecha)):
            return (-1, -1, -1)
        diaFinal = self.obtenerCantidadDiasDelMes(mes, año) # Obtengo los días de ese mes.
        nuevaFecha = self.incrementarDia(diaFinal, dia, mes, año) # Aumente un día.
        return nuevaFecha


    # Contar el número de días que hay desde el primer día de Enero de ese año.
    def dias_desde_primero_enero(self, fecha):
        dias = 0
        fechaInicial = (0,0,0)
        
        if (not self.fecha_es_tupla(fecha)):
            return -1
        fechaInicial = (fecha[0], 1, 1)
        while(fecha != fechaInicial):
            dias += 1
            fechaInicial = self.DiaSiguiente(fechaInicial) # Obtiene el día siguiente.
        return dias



    def dia_primero_enero(self, año):
        añoInicio = 1582
        dia = 2
        if (not self.validarAño(año)):
            return -1
        while(añoInicio < año):
            if (self.Bisiesto(añoInicio) or (añoInicio % 100 == 0)):
                dia += 2
            else:
                dia += 1
            dia = dia % 7
            añoInicio += 1
        return dia







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
    valida = validar.fecha_es_tupla(fechaValida)
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
    nuevaFecha = validar.DiaSiguiente(fechaValida)
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
    diasTotales = validar.dias_desde_primero_enero(fechaValida)
    if (diasTotales >= 0):
        print("»Han pasado : " + str(diasTotales)+ " días")
        return True
    return False

def diaSemana():
    dia = 0
    año = solicitarAño() 
    if (año == False):
        return False
    text = "»El 1 de Enero del  (" + str(año) + ") tiene como día"
    dia = validar.dia_primero_enero(año)
    if (dia == 0):
        text += "  Domingo \n"
    elif (dia == 1):
        text += "  Lunes \n"
    elif (dia == 2):
        text += "  Martes \n"
    elif (dia == 3):
        text += "  Miércoles \n"
    elif (dia == 4):
        text += "  Jueves \n"
    elif (dia == 5):
        text += "  Viernes \n"
    elif (dia == 6):
        text += "  Sabado \n"
    else:
        return False
    print(text)
    return True

def consultarBisiestos():
    bisiesto = False
    año = solicitarAño() 
    if (año == False):
        return False

    bisiesto = validar.Bisiesto(año)
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

