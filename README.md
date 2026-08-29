# TravelTrucks 🚐

TravelTrucks — вебзастосунок для пошуку та бронювання кемперів. Користувачі можуть переглядати доступні кемпери, фільтрувати їх за параметрами, переглядати детальну інформацію, фотографії та відгуки, а також залишати заявку на бронювання.

## 🌐 About the project

Проєкт реалізований на **Next.js** з використанням **React**, **TypeScript** та **TanStack Query**.

Застосунок отримує дані про кемпери через REST API та дозволяє користувачеві:

- переглядати каталог кемперів;
- фільтрувати кемпери;
- завантажувати додаткові картки через `Load More`;
- переглядати детальну інформацію про кемпер;
- переглядати галерею фотографій;
- переглядати відгуки користувачів;
- переглядати рейтинг кемпера;
- заповнювати форму бронювання;
- відкривати сторінку конкретного кемпера в новій вкладці.

## ✨ Features

### Home page

Головна сторінка містить:

- інформацію про сервіс;
- основний заклик до перегляду каталогу;
- перехід до списку доступних кемперів.

### Catalog

На сторінці каталогу доступні:

- список кемперів;
- фільтр за локацією;
- фільтр за типом кемпера;
- фільтр за типом двигуна;
- фільтр за типом трансмісії;
- завантаження наступних 4 кемперів через кнопку **Load More**;
- відображення станів завантаження та помилок;
- перехід на сторінку деталей кемпера.

Для завантаження списку використовується `useInfiniteQuery`, який дозволяє поступово додавати нові сторінки результатів до вже завантаженого списку.

### Camper details

Сторінка деталей кемпера містить:

- назву кемпера;
- рейтинг;
- кількість відгуків;
- локацію;
- ціну;
- опис;
- галерею фотографій;
- мініатюри фотографій;
- характеристики транспортного засобу;
- список доступних зручностей;
- відгуки користувачів;
- п'ятизірковий рейтинг;
- форму бронювання.

### Booking

Користувач може заповнити форму бронювання, вказавши необхідні контактні дані та дату поїздки.

Дані форми відправляються на API за допомогою `POST` запиту.

## 🛠 Technologies

- **Next.js**
- **React**
- **TypeScript**
- **TanStack Query**
- **Axios**
- **CSS Modules**
- **Swiper**
- **React Icons**
- **Formik**
- **Yup**

Next.js використовується як React-фреймворк із сучасним App Router.

## 📦 API

Для отримання даних використовується TravelTrucks API:

`https://campers-api.goit.study`

Основні endpoints:

```text
GET /campers
GET /campers/:id
GET /campers/:id/reviews
POST /campers/:id/booking-requests
```

## 🔎 Filters

Фільтри передаються через URL search parameters.

Приклад:

```text
/catalog?location=Kyiv&form=panel_van&engine=diesel&transmission=automatic
```

Параметри:

```text
location
form
engine
transmission
```

Це дозволяє зберігати стан фільтрів безпосередньо в URL та повторно відкривати сторінку з тими самими параметрами.

## 📄 Pages

Основні сторінки проєкту:

```text
/
```

Головна сторінка.

```text
/catalog
```

Каталог кемперів із фільтрами.

```text
/catalog/[camperId]
```

Детальна сторінка конкретного кемпера.

## 🖼 Images

Для відображення фотографій кемперів використовується компонент `Image` із Next.js.

Зображення завантажуються з API та відображаються:

- у картках каталогу;
- у головній галереї;
- у мініатюрах галереї.

Для галереї використовується **Swiper** з підтримкою thumbnails та navigation.

## ⭐ Reviews

Відгуки отримуються окремим API-запитом:

```text
GET /campers/:camperId/reviews
```

Кожен відгук містить:

- ім'я користувача;
- рейтинг;
- текст відгуку.

Рейтинг відображається у вигляді п'ятизіркової шкали.

## ⚡ Data fetching

Для роботи з API використовується **Axios**.

Основні функції:

```ts
fetchCampers();
fetchCamperById();
getReviews();
createBookingRequest();
```

Для каталогу використовується `useInfiniteQuery`, що забезпечує завантаження кемперів частинами та підтримує кнопку **Load More**.

## 🎨 Styling

Для стилізації компонентів використовуються **CSS Modules**.

Кожен основний компонент має власний файл стилів:

```text
CamperCard.module.css
CamperList.module.css
CamperGallery.module.css
BookingForm.module.css
Filters.module.css
```

Це дозволяє ізолювати стилі компонентів та уникати конфліктів між класами.

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Anna-Puchkova/travel-trucks.git
```

### 2. Go to the project directory

```bash
cd travel-trucks
```

### 3. Install dependencies

```bash
npm install
```

### 4. Run the development server

```bash
npm run dev
```

### 5. Open the application

Відкрий у браузері:

```text
http://localhost:3000
```

## 📜 Available scripts

```bash
npm run dev
```

Запускає development server.

```bash
npm run build
```

Створює production build.

```bash
npm run start
```

Запускає production server.

```bash
npm run lint
```

Перевіряє код за допомогою ESLint.

## 🔗 API Documentation

Документація API:

https://campers-api.goit.study/docs

## 👩‍💻 Author

**Анна Пучкова**

Frontend / FullStack Developer
