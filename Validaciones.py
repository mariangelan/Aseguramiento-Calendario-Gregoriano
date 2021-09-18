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


    def esBisiesto(self, año):
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
            if (self.esBisiesto(año)):
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


    def esFechaValida(self, fecha):
        
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
    def obtenerDiaSiguiente(self, fecha):
        año = fecha[0]
        mes = fecha[1]
        dia = fecha[2]
        diaFinal = 0
        nuevaFecha = (0,0,0)

        if (not self.esFechaValida(fecha)):
            return (-1, -1, -1)
        diaFinal = self.obtenerCantidadDiasDelMes(mes, año) # Obtengo los días de ese mes.
        nuevaFecha = self.incrementarDia(diaFinal, dia, mes, año) # Aumente un día.
        return nuevaFecha


    # Contar el número de días que hay desde el primer día de Enero de ese año.
    def contarDiasPasados(self, fecha):
        dias = 0
        fechaInicial = (0,0,0)
        
        if (not self.esFechaValida(fecha)):
            return -1
        fechaInicial = (fecha[0], 1, 1)
        while(fecha != fechaInicial):
            dias += 1
            fechaInicial = self.obtenerDiaSiguiente(fechaInicial) # Obtiene el día siguiente.
        return dias



    def obtenerDiaPrimeroDeEnero(self, año):
        añoInicio = 1582
        dia = 2
        if (not self.validarAño(año)):
            return -1
        while(añoInicio < año):
            if (self.esBisiesto(añoInicio) or (añoInicio % 100 == 0)):
                dia += 2
            else:
                dia += 1
            dia = dia % 7
            añoInicio += 1
        return dia
