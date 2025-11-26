// Данные пользователей
let usersData = [
    {
        id: 1,
        login: "admin_ivanov",
        fullName: "Иванов Иван Иванович",
        email: "i.ivanov@lbcontrol.ru",
        phone: "+7 (912) 345-67-89",
        role: "Администратор",
        lab: "Химическая лаборатория №1"
    },
    {
        id: 2,
        login: "chem_petrov",
        fullName: "Петров Петр Петрович",
        email: "p.petrov@lbcontrol.ru",
        phone: "+7 (923) 456-78-90",
        role: "Химик",
        lab: "Химическая лаборатория №2"
    },
    {
        id: 3,
        login: "lab_sidorova",
        fullName: "Сидорова Мария Сергеевна",
        email: "m.sidorova@lbcontrol.ru",
        phone: "+7 (934) 567-89-01",
        role: "Лаборант",
        lab: "Исследовательский центр"
    },
    {
        id: 4,
        login: "research_kuznetsov",
        fullName: "Кузнецов Алексей Владимирович",
        email: "a.kuznetsov@lbcontrol.ru",
        phone: "+7 (945) 678-90-12",
        role: "Исследователь",
        lab: "Исследовательский центр"
    },
    {
        id: 5,
        login: "qc_nikolaeva",
        fullName: "Николаева Елена Дмитриевна",
        email: "e.nikolaeva@lbcontrol.ru",
        phone: "+7 (956) 789-01-23",
        role: "Контроль качества",
        lab: "Лаборатория контроля качества"
    },
    {
        id: 6,
        login: "chem_orlova",
        fullName: "Орлова Анна Павловна",
        email: "a.orlova@lbcontrol.ru",
        phone: "+7 (967) 890-12-34",
        role: "Химик",
        lab: "Химическая лаборатория №1"
    },
    {
        id: 7,
        login: "lab_fedorov",
        fullName: "Федоров Дмитрий Игоревич",
        email: "d.fedorov@lbcontrol.ru",
        phone: "+7 (978) 901-23-45",
        role: "Лаборант",
        lab: "Химическая лаборатория №2"
    },
    {
        id: 8,
        login: "research_popova",
        fullName: "Попова Ольга Викторовна",
        email: "o.popova@lbcontrol.ru",
        phone: "+7 (989) 012-34-56",
        role: "Исследователь",
        lab: "Исследовательский центр"
    }
];

// Данные истории действий пользователей
let userHistoryData = [
    {
        id: 1,
        userId: 1,
        timestamp: "2024-01-15T10:30:00",
        action: "Вход в систему",
        details: "Успешная аутентификация",
        ip: "192.168.1.100"
    },
    {
        id: 2,
        userId: 1,
        timestamp: "2024-01-15T11:15:00",
        action: "Изменение настроек",
        details: "Обновлены параметры безопасности",
        ip: "192.168.1.100"
    },
    {
        id: 3,
        userId: 2,
        timestamp: "2024-01-15T09:20:00",
        action: "Вход в систему",
        details: "Успешная аутентификация",
        ip: "192.168.1.101"
    },
    {
        id: 4,
        userId: 2,
        timestamp: "2024-01-15T10:45:00",
        action: "Просмотр отчетов",
        details: "Просмотр химических анализов",
        ip: "192.168.1.101"
    },
    {
        id: 5,
        userId: 3,
        timestamp: "2024-01-15T08:45:00",
        action: "Вход в систему",
        details: "Успешная аутентификация",
        ip: "192.168.1.102"
    },
    {
        id: 6,
        userId: 3,
        timestamp: "2024-01-15T09:30:00",
        action: "Добавление данных",
        details: "Внесены результаты измерений",
        ip: "192.168.1.102"
    }
];

let currentUserId = null;
let filteredUsers = [...usersData];