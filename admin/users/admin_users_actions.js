// Основные действия с пользователями

function addUser() {
    currentUserId = null;
    document.getElementById('modalTitle').textContent = 'Добавление пользователя';

    const modalFields = document.getElementById('modalFields');
    modalFields.innerHTML = `
        <div class="form-group">
            <label for="editLogin">Логин *</label>
            <input type="text" id="editLogin" required>
        </div>
        <div class="form-group">
            <label for="editFullName">ФИО *</label>
            <input type="text" id="editFullName" required>
        </div>
        <div class="form-group">
            <label for="editEmail">Email *</label>
            <input type="email" id="editEmail" required>
        </div>
        <div class="form-group">
            <label for="editPhone">Телефон</label>
            <input type="tel" id="editPhone">
        </div>
        <div class="form-group">
            <label for="editRole">Роль *</label>
            <select id="editRole" required>
                <option value="Администратор">Администратор</option>
                <option value="Химик">Химик</option>
                <option value="Лаборант">Лаборант</option>
                <option value="Исследователь">Исследователь</option>
                <option value="Контроль качества">Контроль качества</option>
            </select>
        </div>
        <div class="form-group">
            <label for="editLab">Лаборатория *</label>
            <select id="editLab" required>
                <option value="Химическая лаборатория №1">Химическая лаборатория №1</option>
                <option value="Химическая лаборатория №2">Химическая лаборатория №2</option>
                <option value="Исследовательский центр">Исследовательский центр</option>
                <option value="Лаборатория контроля качества">Лаборатория контроля качества</option>
            </select>
        </div>
    `;

    const editModal = document.getElementById('editModal');
    editModal.style.display = 'flex';
    editModal.style.alignItems = 'center';
    editModal.style.justifyContent = 'center';
}

function editUser(userId) {
    const user = usersData.find(u => u.id === userId);
    if (!user) return;

    currentUserId = userId;
    document.getElementById('modalTitle').textContent = 'Редактирование пользователя';

    const modalFields = document.getElementById('modalFields');
    modalFields.innerHTML = `
        <div class="form-group">
            <label for="editLogin">Логин *</label>
            <input type="text" id="editLogin" value="${user.login}" required>
        </div>
        <div class="form-group">
            <label for="editFullName">ФИО *</label>
            <input type="text" id="editFullName" value="${user.fullName}" required>
        </div>
        <div class="form-group">
            <label for="editEmail">Email *</label>
            <input type="email" id="editEmail" value="${user.email}" required>
        </div>
        <div class="form-group">
            <label for="editPhone">Телефон</label>
            <input type="tel" id="editPhone" value="${user.phone}">
        </div>
        <div class="form-group">
            <label for="editRole">Роль *</label>
            <select id="editRole" required>
                <option value="Администратор" ${user.role === 'Администратор' ? 'selected' : ''}>Администратор</option>
                <option value="Химик" ${user.role === 'Химик' ? 'selected' : ''}>Химик</option>
                <option value="Лаборант" ${user.role === 'Лаборант' ? 'selected' : ''}>Лаборант</option>
                <option value="Исследователь" ${user.role === 'Исследователь' ? 'selected' : ''}>Исследователь</option>
                <option value="Контроль качества" ${user.role === 'Контроль качества' ? 'selected' : ''}>Контроль качества</option>
            </select>
        </div>
        <div class="form-group">
            <label for="editLab">Лаборатория *</label>
            <select id="editLab" required>
                <option value="Химическая лаборатория №1" ${user.lab === 'Химическая лаборатория №1' ? 'selected' : ''}>Химическая лаборатория №1</option>
                <option value="Химическая лаборатория №2" ${user.lab === 'Химическая лаборатория №2' ? 'selected' : ''}>Химическая лаборатория №2</option>
                <option value="Исследовательский центр" ${user.lab === 'Исследовательский центр' ? 'selected' : ''}>Исследовательский центр</option>
                <option value="Лаборатория контроля качества" ${user.lab === 'Лаборатория контроля качества' ? 'selected' : ''}>Лаборатория контроля качества</option>
            </select>
        </div>
    `;

    const editModal = document.getElementById('editModal');
    editModal.style.display = 'flex';
    editModal.style.alignItems = 'center';
    editModal.style.justifyContent = 'center';
}

function deleteUser(userId) {
    if (confirm('Вы уверены, что хотите удалить этого пользователя?')) {
        usersData = usersData.filter(user => user.id !== userId);
        applyUsersFilters();
        alert('Пользователь успешно удален');
    }
}

// Обработка формы редактирования/добавления
document.addEventListener('DOMContentLoaded', function() {
    const editForm = document.getElementById('editForm');
    if (editForm) {
        editForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const userData = {
                login: document.getElementById('editLogin').value,
                fullName: document.getElementById('editFullName').value,
                email: document.getElementById('editEmail').value,
                phone: document.getElementById('editPhone').value,
                role: document.getElementById('editRole').value,
                lab: document.getElementById('editLab').value
            };

            if (currentUserId) {
                // Редактирование существующего пользователя
                const userIndex = usersData.findIndex(u => u.id === currentUserId);
                if (userIndex !== -1) {
                    usersData[userIndex] = { ...usersData[userIndex], ...userData };
                    alert('Данные пользователя обновлены');
                }
            } else {
                // Добавление нового пользователя
                const newUser = {
                    id: Math.max(...usersData.map(u => u.id)) + 1,
                    ...userData
                };
                usersData.push(newUser);
                alert('Пользователь успешно добавлен');
            }

            closeEditModal();
            applyUsersFilters();
        });
    }
});