// Данные помещений
const extendedRoomsData = [
    {
        id: 1,
        number: '4.20',
        name: 'Основная химическая лаборатория',
        type: 'лаборатория',
        area: '45',
        lab: 'Химическая лаборатория №1',
        seats: 'с2п2, х1',
        status: 'active'
    },
    {
        id: 2,
        number: '3.27',
        name: 'Лаборатория органической химии',
        type: 'лаборатория',
        area: '35',
        lab: 'Химическая лаборатория №2',
        seats: 'с3п1, х2, м1',
        status: 'active'
    },
    {
        id: 3,
        number: '2.15',
        name: 'Хранилище реактивов',
        type: 'хранилище',
        area: '25',
        lab: 'Химическая лаборатория №1',
        seats: 'с4, п0, ш2',
        status: 'active'
    },
    {
        id: 4,
        number: '1.08',
        name: 'Биохимическая лаборатория',
        type: 'лаборатория',
        area: '40',
        lab: 'Биохимическая лаборатория',
        seats: 'с4п4, х3, ц1',
        status: 'active'
    },
    {
        id: 5,
        number: '5.12',
        name: 'Склад оборудования',
        type: 'склад',
        area: '60',
        lab: 'Исследовательская лаборатория',
        seats: 'с6, п0, пк2',
        status: 'active'
    },
    {
        id: 6,
        number: '3.33',
        name: 'Аналитическая лаборатория',
        type: 'лаборатория',
        area: '30',
        lab: 'Лаборатория органической химии',
        seats: 'с2п2, х1, а1',
        status: 'inactive'
    },
    {
        id: 7,
        number: '4.25',
        name: 'Лаборатория контроля качества',
        type: 'лаборатория',
        area: '28',
        lab: 'Лаборатория контроля качества',
        seats: 'с3п3, х2, т1',
        status: 'active'
    },
    {
        id: 8,
        number: '2.09',
        name: 'Хранилище опасных веществ',
        type: 'хранилище',
        area: '20',
        lab: 'Химическая лаборатория №1',
        seats: 'с2, п0, х1',
        status: 'maintenance'
    }
];

// Безопасное получение данных помещений
function getRoomsData() {
    return extendedRoomsData;
}