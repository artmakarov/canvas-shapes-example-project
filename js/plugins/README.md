# Плагины

Плагины - это расширяемая система для добавления новой функциональности в Canvas Shapes приложение без изменения основного кода.

## Возможности плагинов

Плагины могут:
- Перехватывать события мыши и клавиатуры
- Добавлять новые UI элементы
- Расширять функциональность рендеринга

## Создание нового плагина

1. Создайте новый файл в директории `js/plugins/`
2. Наследуйтесь от класса `Plugin`
3. Реализуйте метод `getName()` для возвращения уникального имени плагина
4. Реализуйте методы `onInit()` и `onDestroy()` для логики инициализации и деинициализации
5. Зарегистрируйте плагин в основном приложении

### Пример реализации плагина

```javascript
import { Plugin } from './js/abstractions/plugin.abstraction.js';

export class DragAndDropPlugin extends Plugin {
  /**
   * @type {(() => void)[]}
   * @private
   */
  _eventListeners = [];
  
  /** @return {string} */
  getName() {
    return 'drag-and-drop';
  }

  /** @return {void} */
  onInit() {
    /* Добавляем обработчики событий */
    // Начало перетаскивания
    const mouseDownHandler = (e) => { /* ... */ };
    canvas.addEventListener('mousedown', mousedownHandler);
    this._eventListeners.push(() => canvas.removeEventListener('mousedown', mouseDownHandler));

    // Перетаскивание
    const mouseMoveHandler = (e) => { /* ... */ };
    canvas.addEventListener('mousemove', mousemoveHandler);
    this._eventListeners.push(() => canvas.removeEventListener('mousemove', mouseMoveHandler));

    // Завершение перетаскивания
    const mouseUpHandler = () => { /* ... */ };
    window.addEventListener('mouseup', mouseupHandler);
    this._eventListeners.push(() => window.removeEventListener('mouseup', mouseUpHandler));

    // Отмена перетаскивания при выходе за пределы окна
    const mouseLeaveHandler = () => { /* ... */ };
    canvas.addEventListener('mouseleave', mouseleaveHandler);
    this._eventListeners.push(() => canvas.removeEventListener('mouseleave', mouseLeaveHandler));
  }

  /** @return {void} */
  onDestroy() {
    /* Очищаем обработчики событий */
    this._eventListeners.forEach((removeListener) => removeListener());
    this._eventListeners = [];
  }
}
```

### Регистрация плагинов

Плагины регистрируются в основном приложении:

```javascript
import { CanvasApp } from './js/app/canvas.app.js';
import { MyCustomPlugin } from './js/plugins/my-custom.plugin.js';

const app = new CanvasApp({ ... });

app.registerPlugins([new MyCustomPlugin()]);
```

### Встроенные плагины

CanvasApp автоматически регистрирует следующие встроенные плагины:

```javascript
// Эти плагины автоматически регистрируются в CanvasApp
import { DefaultResizePlugin } from './js/plugins/default-resize.plugin.js';
import { DefaultSelectionPlugin } from './js/plugins/default-selection.plugin.js';
```

- **DefaultResizePlugin** - автоматическая подстройка размера холста под размер окна
- **DefaultSelectionPlugin** - выбор фигур по клику мыши

Эти плагины не требуют ручной регистрации и автоматически активируются при создании экземпляра CanvasApp.

## Архитектура плагинов

### Система плагинов в CanvasApp

CanvasApp использует систему плагинов для расширения функциональности:

1. **PluginManager** - управляет жизненным циклом плагинов
2. **Plugin** - базовый абстрактный класс для реализации плагинов

### Автоматическая инициализация

Плагины проходят следующий жизненный цикл:
1. Регистрация через `registerPlugins()`
2. Автоматическая инициализация через `onInit()`
3. Работа в течение жизненного цикла приложения
4. Деинициализация через `onDestroy()` при уничтожении

### PluginManager

Менеджер плагинов предоставляет следующие возможности:
- Регистрация и деинициализация плагинов
- Проверка активности плагинов
- Получение списка всех активных плагинов
- Автоматическая инициализация при регистрации

## Рекомендации

- Каждый плагин должен иметь одну четкую цель
- Используйте уникальные имена для плагинов
- Освобождайте ресурсы в методе `onDestroy()`
- Следуйте принципам SOLID при разработке плагинов
- Добавляйте JSDoc комментарии для всех методов
- Встроенные плагины автоматически регистрируются и не требуют ручной настройки
- Пользовательские плагины регистрируются вручную через `registerPlugins()`