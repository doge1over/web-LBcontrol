// Данные для партий реактивов
const batchesData = {
    'Соляная кислота': [
        {
            quantity: 5,
            unit: 'л',
            receiptDate: '2024-01-15',
            supplier: 'himsnab',
            shelfLifeAfterOpening: '12 месяцев',
            expiryDate: '2025-01-15',
            manufactureDate: '2024-01-01',
            openingDate: '2024-02-10',
            manufacturer: 'ХимПром Завод',
            room: '4.20',
            location: 'Шкаф А, полка 3',
            status: 'available'
        }
    ],
    'Ацетон': [
        {
            quantity: 10,
            unit: 'л',
            receiptDate: '2024-01-10',
            supplier: 'labreagents',
            shelfLifeAfterOpening: '24 месяца',
            expiryDate: '2026-01-10',
            manufactureDate: '2024-01-01',
            openingDate: '2024-03-01',
            manufacturer: 'ЛабХим Производство',
            room: '3.27',
            location: 'Шкаф Б, полка 1',
            status: 'available'
        }
    ],
    'Этанол': [
        {
            quantity: 8,
            unit: 'л',
            receiptDate: '2023-12-01',
            supplier: 'biohim',
            shelfLifeAfterOpening: '18 месяцев',
            expiryDate: '2024-06-01',
            manufactureDate: '2023-11-15',
            openingDate: '2024-01-20',
            manufacturer: 'БиоХим Производство',
            room: '4.15',
            location: 'Шкаф В, полка 2',
            status: 'expiring'
        }
    ],
    'Серная кислота': [
        {
            quantity: 4,
            unit: 'л',
            receiptDate: '2024-02-01',
            supplier: 'himsnab',
            shelfLifeAfterOpening: '18 месяцев',
            expiryDate: '2025-08-01',
            manufactureDate: '2024-01-15',
            openingDate: '2024-03-10',
            manufacturer: 'ХимПром Завод',
            room: '4.20',
            location: 'Шкаф А, полка 4',
            status: 'available'
        }
    ],
    'Перекись водорода': [
        {
            quantity: 6,
            unit: 'л',
            receiptDate: '2024-01-20',
            supplier: 'biohim',
            shelfLifeAfterOpening: '6 месяцев',
            expiryDate: '2024-07-20',
            manufactureDate: '2024-01-01',
            openingDate: '2024-02-15',
            manufacturer: 'БиоХим Производство',
            room: '3.27',
            location: 'Шкаф В, полка 1',
            status: 'available'
        }
    ],
    'Гидроксид натрия': [
        {
            quantity: 7,
            unit: 'кг',
            receiptDate: '2024-02-28',
            supplier: 'himsnab',
            shelfLifeAfterOpening: '36 месяцев',
            expiryDate: '2027-02-28',
            manufactureDate: '2024-02-01',
            openingDate: '-',
            manufacturer: 'ХимПром Завод',
            room: '4.20',
            location: 'Шкаф Б, полка 1',
            status: 'available'
        }
    ],
    'Метанол': [
        {
            quantity: 4,
            unit: 'л',
            receiptDate: '2024-01-25',
            supplier: 'labreagents',
            shelfLifeAfterOpening: '24 месяца',
            expiryDate: '2026-01-25',
            manufactureDate: '2024-01-10',
            openingDate: '2024-03-05',
            manufacturer: 'ЛабХим Производство',
            room: '3.27',
            location: 'Шкаф Г, полка 2',
            status: 'available'
        }
    ],
    'Азотная кислота': [
        {
            quantity: 3,
            unit: 'л',
            receiptDate: '2024-02-10',
            supplier: 'himsnab',
            shelfLifeAfterOpening: '12 месяцев',
            expiryDate: '2025-02-10',
            manufactureDate: '2024-01-20',
            openingDate: '-',
            manufacturer: 'ХимПром Завод',
            room: '4.20',
            location: 'Шкаф А, полка 5',
            status: 'available'
        }
    ],
    'Хлорид натрия': [
        {
            quantity: 10,
            unit: 'кг',
            receiptDate: '2024-01-05',
            supplier: 'biohim',
            shelfLifeAfterOpening: '60 месяцев',
            expiryDate: '2029-01-05',
            manufactureDate: '2023-12-15',
            openingDate: '2024-02-01',
            manufacturer: 'БиоХим Производство',
            room: '3.27',
            location: 'Шкаф Д, полка 1',
            status: 'available'
        }
    ]
};

// Текущий выбранный реактив
let currentReagent = null;
let selectedBatchIndex = null;

// Инициализация страницы
function initializePage() {
    // Получаем данные о выбранном реактиве из localStorage
    const savedReagent = localStorage.getItem('selectedReagent');

    if (savedReagent) {
        currentReagent = JSON.parse(savedReagent);
        displayReagentInfo();
        loadBatchesData();
        updatePageTitle();
    } else {
        // Если данных нет, возвращаемся назад
        alert('Реактив не выбран');
        goBack();
    }
}

// Отображение информации о реактиве
function displayReagentInfo() {
    if (!currentReagent) return;

    // Для реактивов из таблицы учета используем lab как категорию
    const category = currentReagent.category || currentReagent.lab || 'Химические реактивы';
    const series = currentReagent.series || 'S-' + new Date().getFullYear() + '-001';

    document.getElementById('reagentGroup').textContent = category;
    document.getElementById('reagentName').textContent = currentReagent.name;
    document.getElementById('reagentNumber').textContent = currentReagent.code;
    document.getElementById('reagentSeries').textContent = series;
}

// Загрузка данных партий
function loadBatchesData() {
    const reagentName = currentReagent.name;
    const batches = batchesData[reagentName] || [];
    const tbody = document.getElementById('batchesTableBody');

    if (batches.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align: center; padding: 40px; color: #cccccc;">
                    📭 Партии не найдены. Добавьте первую партию.
                </td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = batches.map((batch, index) => {
        const statusClass = getStatusClass(batch.status);
        return `
            <tr onclick="selectBatch(${index})" class="${selectedBatchIndex === index ? 'selected' : ''}">
                <td>
                    <div style="font-weight: bold; font-size: 16px;">${batch.quantity}</div>
                    <span class="status-badge ${statusClass}">${getStatusText(batch.status)}</span>
                </td>
                <td style="font-weight: 600;">${batch.unit}</td>
                <td>${formatDate(batch.receiptDate)}</td>
                <td>
                    <span style="font-weight: 600;">${getSupplierName(batch.supplier)}</span>
                </td>
                <td>${batch.shelfLifeAfterOpening}</td>
                <td>
                    <div>${formatDate(batch.expiryDate)}</div>
                    ${batch.status === 'expiring' ? '<div style="color: #f39c12; font-size: 11px; margin-top: 2px;">⚠️ Скоро истекает</div>' : ''}
                    ${batch.status === 'expired' ? '<div style="color: #e74c3c; font-size: 11px; margin-top: 2px;">🚫 Просрочен</div>' : ''}
                </td>
            </tr>
        `;
    }).join('');

    // Добавляем стили для кликабельных строк
    addTableRowStyles();
}

// Добавление стилей для строк таблицы
function addTableRowStyles() {
    const rows = document.querySelectorAll('#batchesTableBody tr');
    rows.forEach(row => {
        row.style.cursor = 'pointer';
        row.style.transition = 'all 0.3s ease';

        row.addEventListener('mouseenter', function() {
            if (!this.classList.contains('selected')) {
                this.style.backgroundColor = 'rgba(26, 167, 236, 0.1)';
            }
        });

        row.addEventListener('mouseleave', function() {
            if (!this.classList.contains('selected')) {
                this.style.backgroundColor = '';
            }
        });
    });
}

// Выбор партии
function selectBatch(index) {
    selectedBatchIndex = index;

    // Обновляем выделение в таблице
    document.querySelectorAll('#batchesTableBody tr').forEach((row, i) => {
        if (i === index) {
            row.classList.add('selected');
        } else {
            row.classList.remove('selected');
        }
    });

    // Показываем детальную информацию
    showBatchDetails(index);
}

// Показать детальную информацию о партии
function showBatchDetails(index) {
    const batches = batchesData[currentReagent.name] || [];
    const batch = batches[index];

    if (!batch) return;

    const detailsDiv = document.getElementById('selectedBatchInfo');

    // Заполняем данные
    document.getElementById('manufactureDate').textContent = formatDate(batch.manufactureDate);
    document.getElementById('openingDate').textContent = batch.openingDate === '-' ? 'Не вскрыта' : formatDate(batch.openingDate);
    document.getElementById('expiryDate').textContent = formatDate(batch.expiryDate);
    document.getElementById('manufacturer').textContent = batch.manufacturer;
    document.getElementById('room').textContent = batch.room;
    document.getElementById('location').textContent = batch.location;

    // Показываем блок с деталями
    detailsDiv.style.display = 'block';

    // Добавляем анимацию появления
    detailsDiv.style.animation = 'fadeIn 0.5s ease-in-out';
}

// Функции для кнопок
function addBatch() {
    alert('Функция "Добавить партию" - в разработке');
}

function editReagent() {
    if (!currentReagent) {
        alert('Реактив не выбран');
        return;
    }
    alert(`Функция "Изменить реактив" - в разработке\nБудет открыто окно редактирования: ${currentReagent.name}`);
}

function deleteReagent() {
    if (!currentReagent) {
        alert('Реактив не выбран');
        return;
    }

    if (confirm(`Вы уверены, что хотите удалить реактив "${currentReagent.name}" и все связанные партии?\n\nЭто действие нельзя будет отменить!`)) {
        alert(`Реактив "${currentReagent.name}" и все партии удалены`);
        goBack();
    }
}

function writeOffBatch() {
    if (selectedBatchIndex === null) {
        alert('Выберите партию для списания');
        return;
    }

    const batches = batchesData[currentReagent.name] || [];
    const batch = batches[selectedBatchIndex];

    if (!batch) {
        alert('Партия не найдена');
        return;
    }

    if (confirm(`Вы уверены, что хотите списать выбранную партию?\n\nРеактив: ${currentReagent.name}\nКоличество: ${batch.quantity} ${batch.unit}\nПартия от: ${formatDate(batch.receiptDate)}`)) {
        alert('Партия успешно списана');
        batch.status = 'expired';
        loadBatchesData();
        document.getElementById('selectedBatchInfo').style.display = 'none';
        selectedBatchIndex = null;
    }
}

function showWriteOffArchive() {
    if (!currentReagent) {
        alert('Реактив не выбран');
        return;
    }

    const expiredBatches = (batchesData[currentReagent.name] || []).filter(batch =>
        batch.status === 'expired'
    );

    if (expiredBatches.length === 0) {
        alert('Нет списанных партий для этого реактива');
        return;
    }

    alert(`Функция "Архив списаний" - в разработке\nНайдено списанных партий: ${expiredBatches.length}`);
}

function showDocuments() {
    if (selectedBatchIndex === null) {
        alert('Выберите партию для просмотра документов');
        return;
    }

    const batches = batchesData[currentReagent.name] || [];
    const batch = batches[selectedBatchIndex];

    if (!batch) {
        alert('Партия не найдена');
        return;
    }

    alert(`Функция "Документы" - в разработке\nБудет показана документация для партии`);
}

// Вспомогательные функции
function getStatusClass(status) {
    switch(status) {
        case 'available': return 'status-available';
        case 'expiring': return 'status-expiring';
        case 'expired': return 'status-expired';
        default: return 'status-available';
    }
}

function getStatusText(status) {
    switch(status) {
        case 'available': return 'В наличии';
        case 'expiring': return 'Скоро истекает';
        case 'expired': return 'Просрочен';
        default: return 'В наличии';
    }
}

function formatDate(dateString) {
    if (!dateString || dateString === '-') return '-';
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString('ru-RU');
    } catch (e) {
        return dateString;
    }
}

function getSupplierName(supplierId) {
    const suppliers = {
        'himsnab': 'ХимСнаб Плюс',
        'labreagents': 'Лабораторные Реактивы',
        'biohim': 'БиоХим Трейд'
    };
    return suppliers[supplierId] || supplierId;
}

// Обновление заголовка страницы
function updatePageTitle() {
    if (currentReagent && currentReagent.name) {
        document.title = `LBcontrol - Партии ${currentReagent.name}`;

        const titleElement = document.querySelector('.batches-title');
        if (titleElement) {
            titleElement.textContent = `Партии: ${currentReagent.name}`;
        }
    }
}

// Функция возврата назад - ИСПРАВЛЕННАЯ
function goBack() {
    // Получаем данные о источнике перехода
    const savedReagent = localStorage.getItem('selectedReagent');

    if (savedReagent) {
        const reagentData = JSON.parse(savedReagent);
        // Возвращаемся туда, откуда пришли
        if (reagentData.source === 'suppliers') {
            window.location.href = 'suppliers.html';
        } else {
            window.location.href = 'reagents.html';
        }
    } else {
        // По умолчанию возвращаемся к поставщикам
        window.location.href = 'suppliers.html';
    }
}

// Добавляем CSS анимацию
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    initializePage();

    // Обработка формы поддержки
    const supportForm = document.querySelector('.support-form');
    if (supportForm) {
        supportForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Сообщение отправлено в поддержку!');
            closeSupportModal();
            this.reset();
        });
    }
});

// Функции для модального окна поддержки
function openSupportModal() {
    const modal = document.getElementById('supportModal');
    if (modal) {
        modal.style.display = 'flex';
    }
}

function closeSupportModal() {
    const modal = document.getElementById('supportModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Закрытие модального окна при клике вне его
window.onclick = function(event) {
    const modal = document.getElementById('supportModal');
    if (event.target == modal) {
        closeSupportModal();
    }
}