# 📊 Top History Widget

Интерактивный виджет для отображения исторических позиций приложений в чартах, построенный с использованием **React**, **Redux** и **Chart.js**.

---

## 🔧 Функциональность

- **График позиций** — отображает динамику позиций приложений по датам.
- **Фильтрация данных**:
  - Страна
  - Диапазон дат
  - Категория и подкатегория
- **Адаптивная легенда**:
  - Автоматическая генерация названий в формате `Категория – Тип` (например: `Games – Top Free`)
  - Поддержка большого количества линий
  - Переключение видимости каждой линии вручную
- **Экспорт**:
  - 📁 PNG — сохранить график как изображение
  - 📄 CSV — выгрузить исходные данные в таблицу
- **Обработка вложенных структур**:
  - Поддержка как категорий, так и подкатегорий

---

## 🚀 Технологии

- [React](https://reactjs.org/) — компонентный UI
- [Redux Toolkit](https://redux-toolkit.js.org/) — глобальное управление состоянием
- [Chart.js](https://www.chartjs.org/) — построение графиков
- [React DatePicker](https://reactdatepicker.com/) — выбор даты
- [PapaParse](https://www.papaparse.com/) — экспорт данных в CSV
- [FileSaver.js](https://github.com/eligrey/FileSaver.js/) — сохранение файлов клиентом

---

## 📦 Установка

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
npm install
npm start

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
