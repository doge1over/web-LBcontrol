// Переменная для хранения текущего выбранного производителя
let currentManufacturerId = null;

// Данные производителей
let manufacturersData = [
    {
        id: 1,
        name: "ХимРеактив Пром",
        contact: "+7 (495) 123-45-67",
        email: "info@himreaktiv.ru",
        website: "himreaktiv.ru",
        status: "active"
    },
    {
        id: 2,
        name: "ЛабТехника",
        contact: "+7 (495) 234-56-78",
        email: "sales@labtech.ru",
        website: "labtech.ru",
        status: "active"
    },
    {
        id: 3,
        name: "Научные Реактивы",
        contact: "+7 (495) 345-67-89",
        email: "order@nauka-react.ru",
        website: "nauka-react.ru",
        status: "active"
    },
    {
        id: 4,
        name: "Аналитик Прибор",
        contact: "+7 (495) 456-78-90",
        email: "support@analit-pribor.ru",
        website: "analit-pribor.ru",
        status: "inactive"
    }
];

// Данные продукции производителей
let productsData = [
    {
        id: 1,
        manufacturerId: 1,
        name: "Соляная кислота",
        code: "HCL-001",
        description: "Концентрированная соляная кислота"
    },
    {
        id: 2,
        manufacturerId: 1,
        name: "Серная кислота",
        code: "H2SO4-001",
        description: "Техническая серная кислота"
    },
    {
        id: 3,
        manufacturerId: 2,
        name: "Аналитические весы",
        code: "AW-2000",
        description: "Электронные аналитические весы"
    },
    {
        id: 4,
        manufacturerId: 2,
        name: "pH-метр",
        code: "PH-100",
        description: "Лабораторный pH-метр"
    },
    {
        id: 5,
        manufacturerId: 3,
        name: "Буферные растворы",
        code: "BR-7.0",
        description: "Буферный раствор pH 7.0"
    }
];