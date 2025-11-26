console.log('=== ADMIN UNITS DATA ЗАГРУЖЕН ===');

// Расширенные данные единиц измерения
const extendedUnitsData = [
    {
        id: 1,
        name: 'килограмм',
        symbol: 'кг',
        type: 'Масса',
        quantitative: true
    },
    {
        id: 2,
        name: 'грамм',
        symbol: 'г',
        type: 'Масса',
        quantitative: true
    },
    {
        id: 3,
        name: 'миллиграмм',
        symbol: 'мг',
        type: 'Масса',
        quantitative: true
    },
    {
        id: 4,
        name: 'литр',
        symbol: 'л',
        type: 'Объем',
        quantitative: true
    },
    {
        id: 5,
        name: 'миллилитр',
        symbol: 'мл',
        type: 'Объем',
        quantitative: true
    },
    {
        id: 6,
        name: 'микролитр',
        symbol: 'мкл',
        type: 'Объем',
        quantitative: true
    },
    {
        id: 7,
        name: 'штука',
        symbol: 'шт',
        type: 'Количество',
        quantitative: true
    },
    {
        id: 8,
        name: 'упаковка',
        symbol: 'уп',
        type: 'Количество',
        quantitative: false
    },
    {
        id: 9,
        name: 'метр',
        symbol: 'м',
        type: 'Длина',
        quantitative: true
    },
    {
        id: 10,
        name: 'сантиметр',
        symbol: 'см',
        type: 'Длина',
        quantitative: true
    },
    {
        id: 11,
        name: 'комплект',
        symbol: 'компл',
        type: 'Количество',
        quantitative: false
    },
    {
        id: 12,
        name: 'набор',
        symbol: 'наб',
        type: 'Количество',
        quantitative: false
    }
];

// Безопасное получение данных единиц измерения
function getUnitsData() {
    return extendedUnitsData;
}