// Функции для модальных окон
function closeEditModal() {
    console.log('Закрытие модального окна редактирования');
    document.getElementById('editModal').style.display = 'none';
}

function closeSupportModal() {
    console.log('Закрытие модального окна поддержки');
    document.getElementById('supportModal').style.display = 'none';
}

function openSupportModal() {
    console.log('Открытие модального окна поддержки');
    const supportModal = document.getElementById('supportModal');
    supportModal.style.display = 'flex';
    supportModal.style.alignItems = 'center';
    supportModal.style.justifyContent = 'center';
}

// Закрытие модальных окон при клике вне их
window.onclick = function(event) {
    const supportModal = document.getElementById('supportModal');
    const editModal = document.getElementById('editModal');

    if (event.target === supportModal) {
        closeSupportModal();
    }
    if (event.target === editModal) {
        closeEditModal();
    }
}

// Обработка формы поддержки
document.addEventListener('DOMContentLoaded', function() {
    const supportForm = document.querySelector('.support-form');
    if (supportForm) {
        supportForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Отправка формы поддержки');
            alert('Сообщение отправлено в службу поддержки!');
            closeSupportModal();
        });
    }

    // Стили для центрирования модальных окон
    const editModal = document.getElementById('editModal');
    const supportModal = document.getElementById('supportModal');

    if (editModal) {
        editModal.style.display = 'none';
        editModal.style.alignItems = 'center';
        editModal.style.justifyContent = 'center';
    }

    if (supportModal) {
        supportModal.style.display = 'none';
        supportModal.style.alignItems = 'center';
        supportModal.style.justifyContent = 'center';
    }
});