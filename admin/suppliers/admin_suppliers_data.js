// Переменная для хранения текущего выбранного поставщика
let currentSupplierId = null;

// Локальные данные поставщиков (резервные, если глобальные не загружены)
const localSuppliersData = [
    {
        id: 1,
        name: "ХимСнаб Плюс",
        contact: "+7 (495) 111-22-33",
        email: "info@himsnab.ru",
        website: "himsnab.ru",
        status: "active"
    },
    {
        id: 2,
        name: "Реактив Трейд",
        contact: "+7 (495) 222-33-44",
        email: "sales@reaktiv.ru",
        website: "reaktiv.ru",
        status: "active"
    },
    {
        id: 3,
        name: "ЛабСервис",
        contact: "+7 (495) 333-44-55",
        email: "order@labservice.ru",
        website: "labservice.ru",
        status: "active"
    }
];

// Локальные данные продукции поставщиков
const localSupplierProductsData = [
    {
        id: 1,
        supplierId: 1,
        name: "Дистиллированная вода",
        code: "WATER-001",
        description: "Высокоочищенная дистиллированная вода"
    },
    {
        id: 2,
        supplierId: 1,
        name: "Этиловый спирт",
        code: "ALC-001",
        description: "Этиловый спирт 96%"
    },
    {
        id: 3,
        supplierId: 2,
        name: "Хлорид натрия",
        code: "NACL-001",
        description: "Химически чистый хлорид натрия"
    }
];

// Безопасное получение данных поставщиков
function getSuppliersData() {
    console.log('=== ПРОВЕРКА ДАННЫХ ПОСТАВЩИКОВ ===');

    // Проверяем глобальные данные
    if (typeof adminSuppliersData !== 'undefined' && Array.isArray(adminSuppliersData)) {
        console.log('✅ Используем глобальные данные поставщиков');
        return adminSuppliersData;
    }

    console.log('⚠️ Используем локальные данные поставщиков');
    return localSuppliersData;
}

// Безопасное получение данных продукции
function getSupplierProductsData() {
    if (typeof adminSupplierProductsData !== 'undefined' && Array.isArray(adminSupplierProductsData)) {
        return adminSupplierProductsData;
    }
    return localSupplierProductsData;
}