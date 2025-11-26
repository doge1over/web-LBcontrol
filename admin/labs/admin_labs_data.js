// Данные лабораторий
let labsData = [
    {
        id: 1,
        name: "Химическая лаборатория №1",
        code: "LAB-001"
    },
    {
        id: 2,
        name: "Химическая лаборатория №2",
        code: "LAB-002"
    },
    {
        id: 3,
        name: "Исследовательский центр",
        code: "LAB-003"
    },
    {
        id: 4,
        name: "Лаборатория контроля качества",
        code: "LAB-004"
    }
];

// Данные персонала лабораторий
let staffData = [
    {
        id: 1,
        labId: 1,
        labCode: "LAB-001",
        fullName: "Иванов Алексей Петрович",
        role: "Руководитель лаборатории",
        status: "active"
    },
    {
        id: 2,
        labId: 1,
        labCode: "LAB-001",
        fullName: "Петрова Светлана Ивановна",
        role: "Старший химик",
        status: "active"
    },
    {
        id: 3,
        labId: 2,
        labCode: "LAB-002",
        fullName: "Сидоров Владимир Константинович",
        role: "Лаборант",
        status: "active"
    },
    {
        id: 4,
        labId: 3,
        labCode: "LAB-003",
        fullName: "Козлов Михаил Сергеевич",
        role: "Исследователь",
        status: "active"
    },
    {
        id: 5,
        labId: 4,
        labCode: "LAB-004",
        fullName: "Смирнова Ольга Викторовна",
        role: "Специалист по контролю качества",
        status: "active"
    }
];

let currentLabId = null;
let filteredLabs = [...labsData];