# Лабораторные работы по курсу JS компании TouchSoft


# Task 01 - Chat

Создать скрипт интерактивного чата. Чат должен быть предоставлен в виде одного скрипта, подключение которого на страницу (любую, просто включением тега скрипт с нужной ссылкой ) добавит на страницу окно чата.

```html
<!-- ... -->
<script src="https://path.for.your/script.file.js"></script>
<!-- ... -->
```

![Chat](image/Chat.png)

## Функционал

Окно должно показываться в нижнем правом углу, поверх основного содержимого страницы. У окна может быть два режима - свернуто и развернуто. При первом запуске окно свернуто, далее оно запоминает выбор пользователя и при обновлении страницы отображает окно в последнем активном состоянии.

Окно чата состоит из списка сообщений. Которое отображает время и историю сообщений. История сообщения сохраняется между обновлениями страницы. И формы отправки сообщения пользователем - многострочное поле ввода и кнопка отправки.

При нажатии на кнопку отправки - сообщение пользователя появляется в списке сразу. И через 15 секунд появляется ответ от бота в формате `Ответ на "{Сообщение пользователя в верхнем регистре}"`.

## Дополнение

Приложение ( как его части, так и оно целиком ), должны быть покрыты тестами [QUnit](https://qunitjs.com/).

В папке с выполненным заданием должен быть файл README со ссылками

* на пример работающего кода (например на [jsbin](http://jsbin.com/))
* на работающие тесты (можно загрузить туда же, на [jsbin](http://jsbin.com/) или использовать [glitch](https://glitch.com))

Эти же ссылки нужно прикрепить в описание пуллреквеста.

Для получения ссылкок на файлы с гитхаба можно использовать сервис https://rawgit.com/


# Task 02 - Chat Configurator

Создать страницу для конфигурации скрипта чата.

Форма конфигурации позволяет настроить:

* Заголовок окна чата
* Имя бота
* URL к API ([Firebase](https://firebase.google.com))
* CSS класс, который будет навешен на главный блок чата
* позицию чата (право/лево)
* разрешать ли сворачивание чата
* разрешать ли перетаскивание чата
* требовать ли от посетителя ввод имени
* показывать ли время в истории чата
* способ выполнения запросов (fetch/XHR)

При изменении любой из опций внизу формы конфигурации обновляется блок, который выдает пример кода, для встраивания чата в соотвествии с настройками.

![Chat Configurator](image/chatConfigurator.png)

## Функционал чата

Расширяется следующим образом:

* доступна опция требовать имя пользователя, до того, как появится возможность отправлять сообщения
* возможно перетаскивание окна чата по экрану с помощью мыши ( перетаскивание за заголовок )
* диалоги теперь должны сохраняться в базе [FireBase (посредством REST API)](<(https://firebase.google.com/docs/database/rest/start)>)

## Дополнение

Приложение ( как его части, так и оно целиком ), должны быть покрыты тестами [QUnit](https://qunitjs.com/).

В папке с выполненным заданием должен быть файл README со ссылками

* для демонстрации работы скриптов лучше использовать http://htmlpreview.github.io/

Ссылки на страинцу конфигуратора, страницу со встроенным скриптом и страницу с тестами нужно прикрепить в описание пуллреквеста.

Для получения ссылкок на файлы с гитхаба можно использовать сервис https://rawgit.com/

## Дополнительная теория

* https://www.youtube.com/watch?v=8cV4ZvHXQL4
* https://www.youtube.com/watch?v=Ih6Q7ka2eSQ
* https://learn.javascript.ru/screencast/gulp


# Task 03 - Operators dashboard

Создать страницу для оператора чата.

Страница должна:

- Отображать список пользователей чата (Имя, состояние пользователя, состояние чата, непрочитанные сообщения)
- Позволять фильтровать пользователей по отображаемым полям, сортировать пользователей
- Клик по пользователю в списке делает его активным и переключает состояние рабочей области
- В рабочей области отображается история сообщений пользователя, и доступна возможность отправлять/получать сообщения от пользователя
- Клик по иконке в правом верхнем углу активной области очищает выбор пользователя

![Operators dashboard](image/Operator.png)

## Дополнение

Приложение ( как его части, так и оно целиком ), должны быть покрыты тестами [QUnit](https://qunitjs.com/).

В папке с выполненным заданием должен быть файл README со ссылками

- для демонстрации работы скриптов лучше использовать http://htmlpreview.github.io/

Ссылки на страинцу и страницу с тестами нужно прикрепить в описание пуллреквеста.

Для получения ссылкок на файлы с гитхаба можно использовать сервис https://rawgit.com/


# Task 05 - SPA

## Рефакторинг

Разбить код на модули/файлы, которые будут обрабатываться системой сборки (убрать повторящийся код, учесть общий код для клиентского чата и дашборда)

## Одностраничное приложение

Перевести сервисную часть на одностраничное приложение (с использованием hash-api). Приложение должно быть представлено тремя страницами (роутами):

- Конфигуратор чата
- Дашборд
- О проекте

![SPA](image/SPA.png)

В верхней части страницы должно быть меню, реализующее навигацию между страницами. При переходе между страницами - должен изменяться URL. При обновлении страницы должно подтягиваться состояние приложения, соответствующее URL.

### Доп. информация

https://rawgit.com/vvscode/js--base-course/master/04/cls/index.html#/8


# Task 06 - Long polling

Добавить в конфигуратор опцию, которая будет задавать, какой механизм использовать для получения новых сообщений.

![New Option](image/new_option.png)

`refetch` - использовать периодические запросы на сервер с выбранной выше технологией (fetch/XHR)

`long polling` - использовать одно подключение для подписки на изменения в БД

Для интерфейса оператора всегда использовать `long polling`.

Для этого нужно выделить модуль загрузки сообщений, определить для него интерфейс и сделать две реализации на соотвествующих технологиях.


# Task 07 - Commands

## Введение

В функционале чата появляется новая сущность - `команда`.

В общем случае - `команда` - это функция которая (вместе с параметрами) задается на стороне оператора, выполняется на стороне клиента чата, а результат отображается у оператора инициировавшего команду.

Самый общий вариант команды - реальная функция, которая отправляется оператором в виде специально сформированного сообщения. Которое обрабатывается клиентом на исполнение, и не показывается в истории чата. Результат работы функции ( или факт, что задача выполнена ) отображается в логе оператора.

Подход с отправкой js-кода и выполнением его на клиенте чреват проблемами безопасности. Поэтому разумным компромисом будет определение возможных действий заранее, и дальше отправлять не код, а имя из заранее определенного списка, с параметрами вызываемому методу.

## Задача

![Commands UI](image/commands_ui.png)

В интерфейсе оператора, при выборе пользователя, появляется новый блок, для выполнения команд.

Блок содержит форму выбора команды, ввод параметров для команды (до 2х) при необходимости и кнопку запуска задачи.

Ниже находится блок с отображением лога выполненных команд, который отображает выполненные (или запущенные) команды и их результат, после выполнения.

Необходимо реализовать минимум две команды (все команды асинхронные):

- получение информации о пользователе с помощью одно из сервисов (тип сервиса - параметр команды). Результат - данные от сервиса, загруженные на стороне клиента.

  - https://ipinfo.io/
  - http://ip-api.com/
  - https://geoip-db.com/

- запрос у пользователя информации через модальное окно (не `prompt`) - параметрами команды являются заголовок окна, текст сообщения, значение `placeholder` для поля ввода. Результат - текст, введенный пользователем.

## Замечания

- Команды не должны отображаться у пользователя в чате
- Команды должны выполнятся только один раз (не должно быть повторного выполнения команд при обновлении клиентом страницы)
- история команд должна храниться и быть доступной для оператора


# Task 08 - Рефакторинг и документирование кода

## Рефакторинг

Если у вас в коде остались какие-то косяки и недоделки - время их исправлять. Нужно привести код в порядок, разбить на файлы и т.п.

## Документирование кода

Все функции и классы нужно покрыть документацией с помощью jsdoc[1](https://ru.wikipedia.org/wiki/JSDoc)[2](http://usejsdoc.org/) комментариев. Далее нужно настроить систему сборки на генерацию html документации на основе комментариев. Можно использовать сам jsdoc или [esdoc](https://esdoc.org/).

В комментарии к PR добавить ссылку на сгенерированную документацию.

---

## Размещение кода

В ваших интересах вынести готовый код в отдельный репозиторий в вашем аккаунте - это часть вашего портфолио. Документацию и пример работы админки/клиентского кода нужно будет разместить на [GitHub Pages](https://pages.github.com/) [1](https://help.github.com/categories/github-pages-basics/). Для этого будет полезен пакет [gh-pages](https://github.com/tschaub/gh-pages).

Для справки - [Как оформлять репозиторий](https://github.com/vvscode/js--base-course/wiki/%D0%9A%D0%B0%D0%BA-%D0%BE%D1%84%D0%BE%D1%80%D0%BC%D0%B8%D1%82%D1%8C-%D1%80%D0%B5%D0%BF%D0%BE%D0%B7%D0%B8%D1%82%D0%BE%D1%80%D0%B8%D0%B9).

Если все сделать правильно - у вас будет код, который вы можете показать, и пример его работы, который доступен прямо без скачивания.
