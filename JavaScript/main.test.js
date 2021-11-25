//JavaScript source code
const { obtenerDiaSiguiente, obtenerDiaPrimeroDeEnero, imprimir_3x4, contarDiasPasados }  = require('./main');

describe('R3 DiaSiguiente', function () {
    test('CP1 DiaSiguiente fail 1', () => {

        expect(obtenerDiaSiguiente([1990, -3, -31])).toBe(false);
    });

    test('CP2 DiaSiguiente fail 2', () => {

        expect(obtenerDiaSiguiente([1581, 3, 1])).toBe(false);
    });

    test('CP3 DiaSiguiente fail 3', () => {

        expect(obtenerDiaSiguiente([-1999, 9, 9])).toBe(false);
    });

    test('CP4 DiaSiguiente fail 4', () => {

        expect(obtenerDiaSiguiente([-2002, -9, -9])).toBe(false);
    });

    test('CP5 DiaSiguiente success 1', () => {

        expect(obtenerDiaSiguiente([2002, 9, 9])).toStrictEqual([2002, 9, 10]);
    });

    test('CP6 DiaSiguiente success 2', () => {

        expect(obtenerDiaSiguiente([2020, 8, 15])).toStrictEqual([2020, 8, 16]);
    });

    test('CP7 DiaSiguiente fail 5', () => {

        expect(obtenerDiaSiguiente([2020, 8, 33])).toBe(false);
    });

    test('CP8 DiaSiguiente fail 6', () => {

        expect(obtenerDiaSiguiente([2020, 8, "1c"])).toBe(false);
    });
});

describe('R5 DiaPrimeroDeEnero', function () {
    test('CP1 DiaPrimeroDeEnero fail 1', () => {

        expect(obtenerDiaPrimeroDeEnero(1510)).toBe(-1);
    });

    test('CP2 DiaPrimeroDeEnero fail 2', () => {

        expect(obtenerDiaPrimeroDeEnero(-1500)).toBe(-1);
    });

    test('CP3 DiaPrimeroDeEnero fail 3', () => {

        expect(obtenerDiaPrimeroDeEnero(1222)).toBe(-1);
    });

    test('CP4 DiaPrimeroDeEnero fail 4', () => {

        expect(obtenerDiaPrimeroDeEnero(0)).toBe(-1);
    });

    test('CP5 DiaPrimeroDeEnero success 1', () => {

        expect(obtenerDiaPrimeroDeEnero(2020)).toStrictEqual(3);
    });

    test('CP6 DiaPrimeroDeEnero fail 2', () => {

        expect(obtenerDiaPrimeroDeEnero("202p")).toBe(-1);
    });
});

describe('R6 crearCalendario', function () {
    test('CP1 crearCalendario fail 1', () => {

        expect(imprimir_3x4(1510)).toBe(false);
    });

    test('CP2 crearCalendario fail 2', () => {

        expect(imprimir_3x4(-1500)).toBe(false);
    });

    test('CP3 crearCalendario fail 3', () => {

        expect(imprimir_3x4(1222)).toBe(false);
    });

    test('CP4 crearCalendario fail 4', () => {

        expect(imprimir_3x4(0)).toBe(false);
    });

    test('CP5 crearCalendario success 1', () => {

        expect(imprimir_3x4(2020)).toStrictEqual(true);
    });

    test('CP6 crearCalendario fail 5', () => {

        expect(imprimir_3x4("202p")).toStrictEqual(false);
    });
});

describe('R9 contarDiasPasados', function () {
    test('CP1 contarDiasPasados fail 1', () => {

        expect(contarDiasPasados([1990, 3, -31], [1992, 3, 1])).toStrictEqual(false);
    });

    test('CP2 contarDiasPasados fail 2', () => {

        expect(contarDiasPasados([1819, 3, 1], [1320, 12, 31])).toStrictEqual(false);
    });

    test('CP3 contarDiasPasados fail 3', () => {

        expect(contarDiasPasados([2021, 9, 31], [2021, 10, 9])).toStrictEqual(false);
    });

    test('CP4 contarDiasPasados success 1', () => {

        expect(contarDiasPasados([2021, 2, 28], [2021, 3, 3])).toStrictEqual(3);
    });

    test('CP5 contarDiasPasados success 2', () => {

        expect(contarDiasPasados([2020, 8, 28], [2021, 3, 3])).toStrictEqual(187);
    });

    test('CP6 contarDiasPasados fail 4', () => {

        expect(contarDiasPasados([2021, 8, 33], [2022, 2, 8])).toStrictEqual(false);
    });

    test('CP7 contarDiasPasados fail 5', () => {

        expect(contarDiasPasados([2020, 8, "1c"], [2021, 8, 3])).toStrictEqual(false);
    });
});