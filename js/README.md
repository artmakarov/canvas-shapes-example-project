# Папка JavaScript

Эта папка содержит все JavaScript файлы для Canvas Shapes приложения.

## Структура

### abstractions/
- `button-manager.abstraction.js` - Абстрактный класс менеджера кнопок
- `canvas-figure.abstraction.js` - Абстрактный класс базовой фигуры
- `canvas-renderer.abstraction.js` - Абстрактный класс рендерера
- `connection.abstraction.js` - Абстрактный класс соединения
- `connection-factory.abstraction.js` - Абстрактный класс фабрики соединений
- `connection-generator.abstraction.js` - Абстрактный класс генератора соединений
- `plugin.abstraction.js` - Абстрактный класс плагина приложения
- `shape.abstraction.js` - Абстрактный класс фигуры
- `shape-factory.abstraction.js` - Абстрактный класс фабрики фигур
- `shape-manager.abstraction.js` - Абстрактный класс менеджера фигур
- `ui-manager.abstraction.js` - Абстрактный класс менеджера UI

### app/
- `canvas.app.js` - Основное приложение для базового функционала
- `canvas-base.app.js` - Базовый класс приложения с поддержкой плагинов

### factories/
- `arrow-connection.factory.js` - Фабрика для создания стрелочных соединений
- `rectangle.factory.js` - Фабрика для создания прямоугольников

### generators/
- `smart-connection.generator.js` - Генератор "умных" соединений между фигурами

### managers/
- `canvas-button.manager.js` - Менеджер кнопок на холсте
- `canvas-shape.manager.js` - Менеджер фигур
- `canvas-shape-extended.manager.js` - Менеджер фигур для расширенного приложения
- `canvas-ui.manager.js` - Менеджер UI элементов холста
- `plugin.manager.js` - Менеджер плагинов

### models/
- `arrow-connection.model.js` - Модель стрелочного соединения
- `color-palette.model.js` - Модель цветовой палитры
- `contrast-color-palette.model.js` - Модель контрастной цветовой палитры
- `rectangle.model.js` - Модель прямоугольника

### plugins/
- `default-resize.plugin.js` - Плагин подстройки размера холста под размер окна
- `default-selection.plugin.js` - Плагин выбора одной фигуры

### renderers/
- `canvas-2d.renderer.js` - Рендерер для 2D Canvas

### utils/
- `index.js` - Централизованный экспорт всех утилит

## Использование

### Основное приложение (index.html)
```html
<script src="./js/app/canvas.app.js"></script>
```

### Базовое приложение
```html
<script src="./js/app/canvas-base.app.js"></script>
```

### Система плагинов
```javascript
import { CanvasApp } from './js/app/canvas.app.js';
import { MyCustomPlugin } from './js/plugins/my-custom.plugin.js';

const application = new CanvasApp(config);
application.registerPlugins([new MyCustomPlugin()]);
```

### Встроенные плагины
CanvasApp автоматически регистрирует встроенные плагины:
- `DefaultResizePlugin` - подстройка размера холста под окно
- `DefaultSelectionPlugin` - выбор фигур по клику мыши

## Преимущества архитектуры

1. **Модульность** - Каждый компонент имеет свою ответственность
2. **Расширяемость** - Легко добавлять новые фигуры и соединения
3. **Тестируемость** - Интерфейсы позволяют легко писать unit-тесты
4. **Поддержка** - Четкое разделение ответственности упрощает поддержку
5. **Повторное использование** - Фабрики и менеджеры можно переиспользовать
6. **Система плагинов** - Расширение функциональности без изменения основного кода