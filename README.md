# Librar Frontend

Фронтенд приложения онлайн-библиотеки для бронирования книг

## Стек

### Язык - TypeScript

### Фреймворк - Vue 3

## Установка

### 1. Клонирование репозитория

```bash
git clone https://github.com/zevess/librar-frontend.git
cd librar-frontend
```

### 2. Настройка переменных окружения (`.env`)

Создайте локальный файл конфигурации из шаблона (или создайте его вручную, если шаблона нет):

```bash
cp .env
```

Откройте созданный файл `.env` и укажите актуальный адрес запущенного бэкенда [Librar](https://github.com/zevess/librar-backend):

```env
NODE_ENV="production"
VITE_APP_NAME="Librar"
VITE_APP_DOMAIN=localhost
VITE_APP_URL=localhost:3000
VITE_API_SERVER_URL="http://localhost:8000/api"
VITE_SERVER_URL="http://localhost:8000"
```

### 3. Сборка образа и запуск контейнера

Запустите Docker Compose. Команда автоматически возьмет переменные из `.env`, передаст их как `ARG` в `Dockerfile` и поднимет контейнер:

```bash
docker compose up -d --build
```
