// Функции для работы с модальными окнами

function openSupportModal() {
    const supportModal = document.getElementById('supportModal');
    supportModal.style.display = 'flex';
    supportModal.style.alignItems = 'center';
    supportModal.style.justifyContent = 'center';
}

function closeSupportModal() {
    document.getElementById('supportModal').style.display = 'none';
}

function closeEditModal() {
    document.getElementById('editModal').style.display = 'none';
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
            alert('Сообщение отправлено в службу поддержки. Мы ответим вам в ближайшее время.');
            closeSupportModal();
            supportForm.reset();
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

    const editModalContent = document.querySelector('#editModal .modal-content');
    const supportModalContent = document.querySelector('#supportModal .modal-content');

    if (editModalContent) {
        editModalContent.style.margin = 'auto';
        editModalContent.style.transform = 'none';
        editModalContent.style.position = 'relative';
        editModalContent.style.top = '0';
    }

    if (supportModalContent) {
        supportModalContent.style.margin = 'auto';
        supportModalContent.style.transform = 'none';
        supportModalContent.style.position = 'relative';
        supportModalContent.style.top = '0';
    }
});