import unittest
from main import siguiente, diaSemana, imprimir_3x4, dias_entre

class TestMain(unittest.TestCase):
    def test_DiaSiguiente(self):
        self.assertRaises(TypeError, siguiente, (1990, -3, -31))
        self.assertRaises(TypeError, siguiente, (1581, 3, 1))
        self.assertRaises(TypeError, siguiente, (-1999, 9, 9))
        self.assertRaises(TypeError, siguiente, (-2002, -9, -9))
        self.assertAlmostEqual(siguiente((2002, 9, 9)),(2002, 9, 10))
        self.assertAlmostEqual(siguiente((2020, 8, 15)),(2020, 8, 16))
        self.assertRaises(TypeError, siguiente, (2020, 8, 33))
        self.assertRaises(TypeError, siguiente, (2020, 8, "1c"))

    def test_DiaPrimeroDeEnero(self):
        self.assertFalse(diaSemana(1510))
        self.assertFalse(diaSemana(-1500))
        self.assertFalse(diaSemana(1222))
        self.assertFalse(diaSemana(0))
        self.assertTrue(diaSemana(2020))
        self.assertFalse(diaSemana("202p"))

    def test_crearCalendario(self):
        self.assertFalse(imprimir_3x4(1510))
        self.assertFalse(imprimir_3x4(-1500))
        self.assertFalse(imprimir_3x4(1222))
        self.assertFalse(imprimir_3x4(0))
        self.assertTrue(diaSemana(2020))
        self.assertFalse(diaSemana("202p"))

    def test_contarDiasPasados(self):
        self.assertFalse(dias_entre((1990, 3, -31), (1992, 3, 1)))
        self.assertFalse(dias_entre((1819, 3, 1), (1320, 12, 31)))
        self.assertFalse(dias_entre((2021, 9, 31), (2021, 10, 9)))
        self.assertAlmostEqual(dias_entre((2021, 2, 28), (2021, 3, 3)),3)
        self.assertAlmostEqual(dias_entre((2020, 8, 28), (2021, 3, 3)),187)
        self.assertFalse(dias_entre((2021, 8, 33), (2022, 2, 8)))
        self.assertFalse(dias_entre((2020, 8, "1c"), (2021, 8, 3)))
