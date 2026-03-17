# Папка JavaScript

Эта папка содержит все JavaScript файлы для Canvas Shapes приложения.

## Структура

### abstractions/
- `base-button-ui-manager.abstraction.js` - Абстрактный класс UI менеджера кнопок
- `base-figure.abstraction.js` - Абстрактный класс базовой фигуры на холсте
- `base-shape-manager.abstraction.js` - Абстрактный класс менеджера геометрических фигур
- `base-ui-manager.abstraction.js` - Абстрактный базовый класс UI менеджера
- `connection.abstraction.js` - Абстрактный класс соединения
- `connection-factory.abstraction.js` - Абстрактный класс фабрики соединений
- `connection-generator.abstraction.js` - Абстрактный класс генератора соединений
- `plugin.abstraction.js` - Абстрактный класс плагина приложения
- `renderer.abstraction.js` - Абстрактный класс рендерера
- `shape.abstraction.js` - Абстрактный класс геометрической фигуры
- `shape-factory.abstraction.js` - Абстрактный класс фабрики геометрических фигур

### app/
- `canvas.app.js` - Основное приложение для базового функционала
- `canvas-base.app.js` - Базовый класс приложения с поддержкой плагинов

### factories/
- `arrow-connection.factory.js` - Фабрика для создания стрелочных соединений
- `rectangle.factory.js` - Фабрика для создания прямоугольников

### generators/
- `smart-connection.generator.js` - Генератор "умных" соединений между геометрическими фигурами

### managers/
- `button.manager.js` - UI Менеджер кнопок приложения
- `plugin.manager.js` - Менеджер плагинов приложения
- `shape.manager.js` - Менеджер геометрических фигур приложения
- `ui.manager.js` - Менеджер UI элементов приложения

### models/
- `arrow-connection.model.js` - Модель стрелочного соединения
- `color-palette.model.js` - Модель цветовой палитры
- `contrast-color-palette.model.js` - Модель контрастной цветовой палитры
- `rectangle.model.js` - Модель прямоугольника

### plugins/
- `default-resize.plugin.js` - Плагин подстройки размера холста под размер окна
- `default-selection.plugin.js` - Плагин выбора одной или несколько геометрических фигур

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
- `DefaultSelectionPlugin` - выбор геометрических фигур по клику мыши

## Преимущества архитектуры

1. **Модульность** - Каждый компонент имеет свою ответственность
2. **Расширяемость** - Легко добавлять новые фигуры и соединения
3. **Тестируемость** - Интерфейсы позволяют легко писать unit-тесты
4. **Поддержка** - Четкое разделение ответственности упрощает поддержку
5. **Повторное использование** - Фабрики и менеджеры можно переиспользовать
6. **Система плагинов** - Расширение функциональности без изменения основного кода