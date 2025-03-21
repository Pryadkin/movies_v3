```yml
name: Playwright Tests
on:
    push:
        branches: [main, master]
    pull_request:
        branches: [main, master]
jobs:
    test:
        timeout-minutes: 60
        runs-on: ubuntu-latest
        steps:
            - uses: actions/checkout@v4
            - uses: actions/setup-node@v4
              with:
                  node-version: lts/*
            - name: Install dependencies
              run: npm install -g yarn && yarn
            - name: Install Playwright Browsers
              run: yarn playwright install --with-deps
            - name: Run Playwright tests
              run: yarn playwright test
            - uses: actions/upload-artifact@v4
              if: ${{ !cancelled() }}
              with:
                  name: playwright-report
                  path: playwright-report/
                  retention-days: 30
```

Этот YAML-файл представляет собой конфигурацию для GitHub Actions, которая автоматически запускает тесты Playwright при каждом пуше (push) или пул-реквесте (pull request) в ветки `main` или `master`. Давайте разберем его пошагово.

---

### **1. Название и триггеры**

```yaml
name: Playwright Tests
on:
    push:
        branches: [main, master]
    pull_request:
        branches: [main, master]
```

- **`name: Playwright Tests`**: Название workflow (процесса автоматизации).
- **`on`**: Указывает события, которые запускают workflow:
    - **`push`**: Workflow запускается при пуше в ветки `main` или `master`.
    - **`pull_request`**: Workflow запускается при создании или обновлении пул-реквеста в ветки `main` или `master`.

---

### **2. Задачи (jobs)**

```yaml
jobs:
    test:
        timeout-minutes: 60
        runs-on: ubuntu-latest
```

- **`jobs`**: Определяет задачи, которые будут выполнены.
- **`test`**: Название задачи (job).
- **`timeout-minutes: 60`**: Максимальное время выполнения задачи — 60 минут. Если задача выполняется дольше, она будет прервана.
- **`runs-on: ubuntu-latest`**: Задача будет выполняться на последней версии Ubuntu.

---

### **3. Шаги (steps)**

#### **Шаг 1: Клонирование репозитория**

```yaml
- uses: actions/checkout@v4
```

- **`actions/checkout@v4`**: Клонирует репозиторий на виртуальную машину GitHub Actions.

---

#### **Шаг 2: Установка Node.js**

```yaml
- uses: actions/setup-node@v4
  with:
      node-version: lts/*
```

- **`actions/setup-node@v4`**: Устанавливает Node.js на виртуальную машину.
- **`node-version: lts/*`**: Используется последняя стабильная (LTS) версия Node.js.

---

#### **Шаг 3: Установка зависимостей**

```yaml
- name: Install dependencies
  run: npm install -g yarn && yarn
```

- **`npm install -g yarn`**: Устанавливает Yarn глобально.
- **`yarn`**: Устанавливает зависимости проекта, используя Yarn.

---

#### **Шаг 4: Установка браузеров для Playwright**

```yaml
- name: Install Playwright Browsers
  run: yarn playwright install --with-deps
```

- **`yarn playwright install --with-deps`**: Устанавливает браузеры (Chromium, Firefox, WebKit) и их зависимости, необходимые для работы Playwright.

---

#### **Шаг 5: Запуск тестов Playwright**

```yaml
- name: Run Playwright tests
  run: yarn playwright test
```

- **`yarn playwright test`**: Запускает все тесты Playwright.

---

#### **Шаг 6: Загрузка отчёта**

```yaml
- uses: actions/upload-artifact@v4
  if: ${{ !cancelled() }}
  with:
      name: playwright-report
      path: playwright-report/
      retention-days: 30
```

- **`actions/upload-artifact@v4`**: Загружает отчёт о выполнении тестов как артефакт.
- **`if: ${{ !cancelled() }}`**: Отчёт загружается только если задача не была отменена.
- **`name: playwright-report`**: Название артефакта.
- **`path: playwright-report/`**: Путь к папке с отчётом.
- **`retention-days: 30`**: Отчёт будет храниться 30 дней.

---

### **Итог**

Этот workflow автоматически:

1. Клонирует репозиторий.
2. Устанавливает Node.js и зависимости проекта.
3. Устанавливает браузеры для Playwright.
4. Запускает тесты Playwright.
5. Сохраняет отчёт о выполнении тестов как артефакт.

Таким образом, вы можете легко интегрировать тестирование в процесс разработки и проверять работоспособность приложения при каждом изменении кода.
