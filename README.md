# Приложение для анализа бюджета
![image](https://github.com/shrimpwhat/budget-tracker/assets/49585211/6673873b-dcb7-48ae-9d5b-c7af3ca18069)
![screenshot2](https://github.com/shrimpwhat/budget-tracker/assets/49585211/4b413cce-dde1-4e9e-8a7c-c108366da14e)






## Описание

Приложение для анализа бюджета предоставляет пользователю возможность удобно отслеживать свои доходы и расходы, а также анализировать их по категориям. Пользователь может добавлять, изменять и удалять записи о доходах и расходах в определённый день. Приложение автоматически строит обзор с максимальной и минимальной категорией для доходов и расходов, отображает таблицу со всеми записями и генерирует графики для наглядного представления данных. Также пользователь может ограничить временной период для анализа, убрав при этом доходы и расходы вне этого периода.

## Serverless

Все данные пользователя сохраняются локально в **IndexedDB**. Это позволяет обойтись без сервера с БД, гарантирует пользователю конфиденциальность его данных, и даёт вохможность работы приложения **офлайн**.

## PWA

Данное приложение является [**PWA**](https://web.dev/explore/progressive-web-apps). Блягодаря Service Worker, который кэширует статические файлы, приложение может быть установлено на устройство прямо из браузера как обычное десктопное или мобильное, а также работать офлайн. Установка приложения возможна парктически на любое устройство с Windows, Linux, MacOS, Android, iOS (Desktop версии Safari и Firefox пока не поддерживают данную функцию).

## Стэк

- TypeScript
- React
- Redux
- SCSS
- Vite

## Установка

```
1. Склонировать репозиторий
2. npm install
3. npm run dev
```
