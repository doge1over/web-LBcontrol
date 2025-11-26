// Глобальные переменные
let allReagents = [];
let filteredReagents = [];
let currentPage = 1;
const itemsPerPage = 10;

// Функция получения уникальных реактивов (по названию и номеру)
function getUniqueReagents(reagentsArray) {
    const uniqueKeys = new Set();
    const uniqueReagents = [];

    reagentsArray.forEach(reagent => {
        const key = `${reagent.name}-${reagent.number}`;
        if (!uniqueKeys.has(key)) {
            uniqueKeys.add(key);
            uniqueReagents.push(reagent);
        }
    });

    return uniqueReagents;
}

// Функция обновления статистики
function updateStats() {
    const resultsCount = document.getElementById('resultsCount');
    const totalCount = document.getElementById('totalCount');

    // Получаем уникальные реактивы для подсчета
    const uniqueFilteredReagents = getUniqueReagents(filteredReagents);
    const uniqueAllReagents = getUniqueReagents(allReagents);

    if (resultsCount) {
        resultsCount.textContent = uniqueFilteredReagents.length;
    }

    if (totalCount) {
        totalCount.textContent = uniqueAllReagents.length;
    }
}

// Функция показа сообщения когда нет результатов
function showNoResultsMessage() {
    const noResults = document.getElementById('noResultsMessage');
    if (!noResults) return;

    if (filteredReagents.length === 0) {
        noResults.style.display = 'block';
    } else {
        noResults.style.display = 'none';
    }
}

// Применение фильтров для реактивов
function applyFilters() {
    const labFilter = document.getElementById('labFilter')?.value;
    const searchFilter = document.getElementById('searchInput')?.value.toLowerCase();
    const statusFilter = document.querySelector('input[name="statusFilter"]:checked')?.value;

    if (!allReagents.length) return;

    filteredReagents = allReagents.filter(reagent => {
        // Фильтр по лаборатории
        if (labFilter && reagent.lab !== getLabName(labFilter)) return false;

        // Поиск по всем полям
        if (searchFilter) {
            const searchable = `${reagent.name} ${reagent.number} ${reagent.series} ${reagent.room} ${reagent.lab}`.toLowerCase();
            if (!searchable.includes(searchFilter)) return false;
        }

        // Фильтр по статусу
        if (statusFilter && statusFilter !== 'all' && reagent.status !== statusFilter) return false;

        return true;
    });

    currentPage = 1;
    renderTable();
    updatePagination();
    updateStats();
    showNoResultsMessage();
}

function getLabName(labKey) {
    const labs = {
        'lab1': 'Химическая лаборатория №1',
        'lab2': 'Биохимическая лаборатория',
        'lab3': 'Лаборатория органической химии',
        'lab4': 'Исследовательская лаборатория'
    };
    return labs[labKey] || labKey;
}

// Функция очистки поиска
function clearSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.value = '';
        applyFilters();
    }
}

// Функция обновления видимости кнопки очистки
function updateClearButtonVisibility() {
    const searchInput = document.getElementById('searchInput');
    const clearButton = document.querySelector('.clear-search-btn');

    if (searchInput && clearButton) {
        if (searchInput.value.trim() !== '') {
            clearButton.style.display = 'flex';
        } else {
            clearButton.style.display = 'none';
        }
    }
}

function resetFilters() {
    const labFilter = document.getElementById('labFilter');
    const filterAll = document.getElementById('filterAll');

    if (labFilter) labFilter.value = '';
    if (filterAll) filterAll.checked = true;

    applyFilters();
}

function changePage(direction) {
    const totalPages = Math.ceil(filteredReagents.length / itemsPerPage);
    const newPage = currentPage + direction;

    if (newPage >= 1 && newPage <= totalPages) {
        currentPage = newPage;
        renderTable();
        updatePagination();
    }
}

function renderTable() {
    const tbody = document.getElementById('reagentsTableBody');
    if (!tbody) return;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageData = filteredReagents.slice(startIndex, endIndex);

    if (pageData.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align: center; padding: 40px; color: #cccccc;">
                    📭 Реактивы не найдены. Попробуйте изменить параметры фильтрации.
                </td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = pageData.map(reagent => {
        // Определяем статус бейджа на основе данных партий
        let statusBadge = '';
        if (reagent.status === 'archive') {
            statusBadge = '<div class="archive-badge">📁 Архив</div>';
        } else if (reagent.batches.available === 0 && reagent.batches.writtenOff > 0) {
            statusBadge = '<div class="expired-badge">⏰ Закончился</div>';
        } else if (reagent.batches.available > 0 && reagent.batches.writtenOff > reagent.batches.available) {
            statusBadge = '<div class="expiring-badge">⚠️ Заканчивается</div>';
        } else {
            statusBadge = '<div class="available-badge">✅ В наличии</div>';
        }

        // Считаем общее количество партий для этого реактива
        const totalBatches = reagent.batches.available + reagent.batches.writtenOff;

        return `
        <tr onclick="goToReagentBatches('${reagent.name}', '${reagent.number}', '${reagent.series}', '${reagent.lab}')" 
            class="${reagent.status === 'archive' ? 'archived' : ''}">
            <td>
                <div class="reagent-name">${reagent.name}</div>
                ${statusBadge}
            </td>
            <td>${reagent.number}</td>
            <td>${reagent.series}</td>
            <td>
                <div class="batches-column">
                    <div class="batch-section">
                        <div class="batch-count">${reagent.batches.available}</div>
                        <div class="batch-label">В НАЛИЧИИ</div>
                    </div>
                    <div class="batch-section">
                        <div class="batch-count">${reagent.batches.writtenOff}</div>
                        <div class="batch-label">СПИСАНО</div>
                    </div>
                    <div class="batch-section">
                        <div class="batch-count">${totalBatches}</div>
                        <div class="batch-label">ВСЕГО</div>
                    </div>
                </div>
            </td>
            <td>${reagent.room}</td>
            <td>
                <span class="lab-badge">${reagent.lab}</span>
            </td>
        </tr>
        `;
    }).join('');

    addClickableRowStyles();
}

// Функция для добавления стилей кликабельным строкам
function addClickableRowStyles() {
    const rows = document.querySelectorAll('#reagentsTableBody tr');
    rows.forEach(row => {
        if (!row.classList.contains('archived')) {
            row.style.cursor = 'pointer';
            row.style.transition = 'all 0.3s ease';
        }
    });
}

function updatePagination() {
    const pageInfo = document.getElementById('pageInfo');
    const prevBtn = document.getElementById('prevPage');
    const nextBtn = document.getElementById('nextPage');

    if (!pageInfo || !prevBtn || !nextBtn) return;

    const totalPages = Math.ceil(filteredReagents.length / itemsPerPage);

    pageInfo.textContent = `Страница ${currentPage} из ${totalPages}`;
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages || totalPages === 0;
}

// Функции для управления реактивами
function addReagent() {
    alert('Функция "Добавить реактив" - в разработке');
}

function showProperties() {
    alert('Функция "Свойства реактива" - в разработке');
}

function deleteReagent() {
    if (confirm('Вы уверены, что хотите удалить выбранный реактив?')) {
        alert('Реактив удален');
    }
}

function showBatches() {
    alert('Функция "Партии (Описание)" - в разработке');
}

function archiveReagent() {
    if (confirm('Переместить выбранный реактив в архив?')) {
        alert('Реактив перемещен в архив');
    }
}

// Инициализация тестовых данных для реактивов
function initializeReagentsData() {
    allReagents = [
        {
            name: 'Соляная кислота',
            number: 'CHEM-001',
            series: 'S-2024-01',
            batches: { available: 3, writtenOff: 1 },
            room: '4.20',
            lab: 'Химическая лаборатория №1',
            status: 'available'
        },
        {
            name: 'Ацетон',
            number: 'CHEM-002',
            series: 'S-2024-02',
            batches: { available: 5, writtenOff: 6 },
            room: '3.27',
            lab: 'Биохимическая лаборатория',
            status: 'available'
        },
        {
            name: 'Этанол',
            number: 'CHEM-003',
            series: 'S-2024-03',
            batches: { available: 0, writtenOff: 8 },
            room: '4.15',
            lab: 'Химическая лаборатория №1',
            status: 'available'
        },
        {
            name: 'Серная кислота',
            number: 'CHEM-004',
            series: 'S-2024-04',
            batches: { available: 2, writtenOff: 0 },
            room: '4.20',
            lab: 'Химическая лаборатория №1',
            status: 'available'
        },
        {
            name: 'Перекись водорода',
            number: 'CHEM-005',
            series: 'S-2024-05',
            batches: { available: 4, writtenOff: 1 },
            room: '3.27',
            lab: 'Биохимическая лаборатория',
            status: 'available'
        },
        {
            name: 'Гидроксид натрия',
            number: 'CHEM-006',
            series: 'S-2024-06',
            batches: { available: 0, writtenOff: 0 },
            room: '4.20',
            lab: 'Химическая лаборатория №1',
            status: 'archive'
        },
        {
            name: 'Метанол',
            number: 'CHEM-007',
            series: 'S-2024-07',
            batches: { available: 1, writtenOff: 5 },
            room: '3.27',
            lab: 'Биохимическая лаборатория',
            status: 'available'
        },
        {
            name: 'Азотная кислота',
            number: 'CHEM-008',
            series: 'S-2024-08',
            batches: { available: 7, writtenOff: 2 },
            room: '4.20',
            lab: 'Химическая лаборатория №1',
            status: 'available'
        },
        {
            name: 'Хлороформ',
            number: 'CHEM-009',
            series: 'S-2024-09',
            batches: { available: 0, writtenOff: 12 },
            room: '3.27',
            lab: 'Биохимическая лаборатория',
            status: 'available'
        },
        {
            name: 'Бензол',
            number: 'CHEM-010',
            series: 'S-2024-10',
            batches: { available: 2, writtenOff: 8 },
            room: '4.20',
            lab: 'Химическая лаборатория №1',
            status: 'available'
        },
        {
            name: 'Толуол',
            number: 'CHEM-011',
            series: 'S-2024-11',
            batches: { available: 6, writtenOff: 1 },
            room: '3.27',
            lab: 'Биохимическая лаборатория',
            status: 'available'
        },
        {
            name: 'Гексан',
            number: 'CHEM-012',
            series: 'S-2024-12',
            batches: { available: 0, writtenOff: 0 },
            room: '4.20',
            lab: 'Химическая лаборатория №1',
            status: 'archive'
        },
        {
            name: 'Дихлорметан',
            number: 'CHEM-013',
            series: 'S-2024-13',
            batches: { available: 3, writtenOff: 4 },
            room: '3.27',
            lab: 'Биохимическая лаборатория',
            status: 'available'
        },
        {
            name: 'Ацетонитрил',
            number: 'CHEM-014',
            series: 'S-2024-14',
            batches: { available: 8, writtenOff: 0 },
            room: '4.20',
            lab: 'Химическая лаборатория №1',
            status: 'available'
        },
        {
            name: 'Изопропанол',
            number: 'CHEM-015',
            series: 'S-2024-15',
            batches: { available: 0, writtenOff: 15 },
            room: '3.27',
            lab: 'Биохимическая лаборатория',
            status: 'available'
        }
    ];
    filteredReagents = [...allReagents];
    applyFilters();
}

// Функция перехода на страницу партий
function goToReagentBatches(reagentName, reagentNumber, reagentSeries, labName) {
    const reagentData = {
        name: reagentName,
        category: getCategoryByReagentName(reagentName),
        code: reagentNumber,
        series: reagentSeries,
        lab: labName,
        source: 'reagents'
    };
    localStorage.setItem('selectedReagent', JSON.stringify(reagentData));
    window.location.href = 'batches.html';
}

// Вспомогательная функция для определения категории по названию реактива
function getCategoryByReagentName(reagentName) {
    const categoryMap = {
        'Соляная кислота': 'Кислоты',
        'Серная кислота': 'Кислоты',
        'Азотная кислота': 'Кислоты',
        'Ацетон': 'Растворители',
        'Этанол': 'Спирты',
        'Метанол': 'Спирты',
        'Перекись водорода': 'Окислители',
        'Гидроксид натрия': 'Щелочи',
        'Гидроксид калия': 'Щелочи'
    };
    return categoryMap[reagentName] || 'Химические реактивы';
}

// Обработчики событий для страницы реактивов
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('reagentsTableBody')) {
        initializeReagentsData();

        const searchInput = document.getElementById('searchInput');
        const labFilter = document.getElementById('labFilter');

        if (searchInput) {
            searchInput.addEventListener('input', applyFilters);
            searchInput.addEventListener('input', updateClearButtonVisibility);
        }
        if (labFilter) {
            labFilter.addEventListener('change', applyFilters);
        }

        updateClearButtonVisibility();
    }
});