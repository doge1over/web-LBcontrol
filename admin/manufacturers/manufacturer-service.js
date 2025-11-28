// manufacturer-service.js
class ManufacturerService {
    constructor() {
        this.baseUrl = 'http://их-сервер/api';
    }

    // Получить всех производителей
    async getAll() {
        const response = await fetch(`${this.baseUrl}/manufacturers`);
        return await response.json(); // вернет массив [{id, name}, ...]
    }

    // Создать производителя
    async create(name) {
        const manufacturerDto = {
            id: null,      // всегда null при создании
            name: name     // обязательное поле
        };

        const response = await fetch(`${this.baseUrl}/manufacturers`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(manufacturerDto)
        });

        return await response.json(); // вернет {id: новый-id, name: имя}
    }

    // Обновить производителя
    async update(id, name) {
        const manufacturerDto = {
            id: id,        // существующий ID
            name: name     // новое имя
        };

        const response = await fetch(`${this.baseUrl}/manufacturers/${id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(manufacturerDto)
        });

        return await response.json();
    }

    // Удалить производителя
    async delete(id) {
        const response = await fetch(`${this.baseUrl}/manufacturers/${id}`, {
            method: 'DELETE'
        });
        return response.ok;
    }
}

// Использование
const service = new ManufacturerService();

// Создать производителя
await service.create("Новый производитель");

// Получить всех
const manufacturers = await service.getAll();