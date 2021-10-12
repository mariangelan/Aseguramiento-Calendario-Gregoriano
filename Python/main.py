
#create by Mariangela
class Dia: #clase para guardar los datos de un dia
    def __init__(self, dia, fecha):
        self.dia = dia #numero del dia (0 Domingo, 1 Lunes, ...)
        self.fecha = fecha
    def diaFecha(self):
        return str(self.fecha[2]) #String del dia

class Semana: #clase para guardar los datos de una seman
    def __init__(self):
        self.diasSemana = []
    def addDia(self,diaNuevo):
        self.diasSemana.append(diaNuevo)
    def imprimirSemana(self): #Metodo que da el formato a los dias de la semana
        strSemana = ""   
        if(len(self.diasSemana) < 7 and len(self.diasSemana) > 0 and  self.diasSemana[0].dia > 0): #Cuantos espacios adelante se ocupan
            numEspacio = self.diasSemana[0].dia#Cantidadde espacios que se deja
            for i in range(0,numEspacio):
                strSemana += '{:>3}'.format("")
        for dia in self.diasSemana: #dias de la semana
                strSemana += '{:>3}'.format(str(dia.diaFecha()))
        
        return '{:<21}'.format(strSemana)+" |"

class Mes: #clase que representa a un mes del calendario
    def __init__(self,nombre,numeroMes):
        self.nombre = nombre #nombre del mes
        self.numMes = numeroMes #numero que representa ese mes
        self.semanas = [] #Lista de sus respectivas semanas
    def addSemana(self,semanaNueva):
        self.semanas.append(semanaNueva)
    def imprimirSemanaMes(self,semana):
        strSemana = ""
        if(semana < len(self.semanas)):
            strSemana = self.semanas[semana].imprimirSemana()
        elif(semana >= len(self.semanas)):
            strSemana = '{:<21}'.format(strSemana)+" |"
        return strSemana
    def imprimirInfoMes(self): #Retornar un string con el formato de los días
        return '{:>3}'.format("D")+'{:>3}'.format("L")+'{:>3}'.format("K")+'{:>3}'.format("M")+'{:>3}'.format("J")+'{:>3}'.format("V")+'{:>3}'.format("S")+" |"
    def imprimirNombre(self): #Retorna el nombre del mes 
        return '{:^21}'.format(str(self.nombre))+" |"

class Calendario: #clase que representa a un calendario
    def __init__(self,año):
        self.año = año #posee un año y una lista de meses
        self.meses = []
    def addMes(self, mesNuevo):
        self.meses.append(mesNuevo)
    def imprimirCalendarioInfo(self): #Titulo del claendario
        print('{:^87}'.format("Calendario del año "+str(self.año)))
    def imprimirMes(self, ini, fin): #inicio debe ser menor que fin y debe de ser menor a 12 y mayo a 1
        linea = ""                   #Se busca que se imprima los meses que desee el usuario
        for i in range(ini, fin):
            linea += self.meses[i].imprimirNombre() 
        print(linea)
        linea = ""
        for i in range(ini, fin):
            linea += self.meses[i].imprimirInfoMes() 
        print(linea)
        linea = ""
        for j in range(0,6):
            for i in range(ini,fin):    
                linea += self.meses[i].imprimirSemanaMes(j)
            print(linea)
            linea = ""
class CrearCalendario : 
       
#Crear Calendario
#Dado un año se crea los meses y dias que este posee
#Para esto se usan las clasesx Día, Semana, Mes
    def crearCalendario(año):
        nuevoCalen = Calendario(año)
        ##Se procede a crear los meses
        ##Se tiene una lista de los mese
        mesesNom = ["Enero","Febrero","Marzo", "Abril", "Mayo", "Junio",
                    "Julio", "Agosto","Septiembre", "Octubre", "Noviembre", "Diciembre"]
        contadorDiaSemana = Validaciones.primero_enero(nuevoCalen.año)
        for i in range(0, len(mesesNom)):
            contadorDiaSemana = CrearCalendario.crearMes(mesesNom[i],i+1,nuevoCalen, contadorDiaSemana) #Se pasa el calendario para trabajar por refernecia
        return nuevoCalen

    #Se crea un Mes, para ser agregado al Calendario
    def crearMes(nombreMes, numeroMes, calendario, diaSemana):
        nuevoMes = Mes(nombreMes, numeroMes)
        ##Se procede a crear las semanas del mes nuevo

        diaSemana = CrearCalendario.crearSemanasMes(nuevoMes, calendario.año, diaSemana)
            
        ##Se agrega el mes al Calendario
        calendario.addMes(nuevoMes)
        return diaSemana #Contador de que dia sigue para el siguiente Mes

    def crearSemanasMes(mesAct, año, diaSemanaAct):
        contadorDiasMes = cantidadDiasMes(mesAct.numMes, año)
        semana = Semana()
        for diaActFecha in range(1, contadorDiasMes+1): #Se crean los dias de ese mes
            #Se crea un nuevo Dia
            nuevoDia = Dia(diaSemanaAct, (año,mesAct.numMes,diaActFecha))
            semana.addDia(nuevoDia) #Se agrega el dia a la semana
            if(diaSemanaAct == 6): #Si ya el dia es 6, se crea una nueva semana
                diaSemanaAct = 0 #Se vuelve el día lunes
                mesAct.addSemana(semana)#Se agrega la semana al mes
                semana = Semana() #Se crea una nueva semana
            else:
                diaSemanaAct += 1 #Si es otro dia solo se suma el contador
        if(diaSemanaAct <= 6):
            mesAct.addSemana(semana)
        return diaSemanaAct
                
    

#Esta funcion me da el contador de dias, dependiendo del mes y año dado
def cantidadDiasMes(numMes, año):
    meses31 = {1,3,5,7,8,10,12} ##Meses que poseen 31 dias
    meses30 = {4,6,9,11} ##Meses que poseen 30 dias
    dias = 0 
    if(numMes in meses31):
        dias = 31  
    elif(numMes in meses30):
        dias = 30
    elif(numMes == 2): # es febrero
        
            bisiesto = validar.Bisiesto(año)
            if (bisiesto == True):
                dias = 29
            else:
                dias = 28
    return dias
    

        
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
    def primero_enero(año):
        if type (año) != int or año < 1583:
            return -1
        else:
            a = (14 - 1) // 12
            y = año - a
            m = 1 + 12 * a - 2
            d = (1 + y + (y//4) - (y//100) + (y//400) + ((31 * m)//12)) % 7
        return d


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


def imprimir_3x4(año): ##
    calend= CrearCalendario.crearCalendario(año) ##Se crea la estructura de un calendario
    calend.imprimirCalendarioInfo()
    calend.imprimirMes(0,4)
    calend.imprimirMes(4,8)
    calend.imprimirMes(8,12)

 





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
    print("6) Ver calnedario de un año. ")
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
        elif (opcion == 6):
            año = int(input("Digite el año: "))
            imprimir_3x4(año)             
        elif (opcion == 0):
            estado = False
        else:
            print("ERROR \n")
    except ValueError:
        print("ERROR \n")

