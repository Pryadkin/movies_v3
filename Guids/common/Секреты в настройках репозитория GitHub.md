Чтобы добавить секреты в настройках репозитория GitHub, следуйте этой пошаговой инструкции. Секреты используются для хранения конфиденциальной информации, такой как SSH-ключи, токены доступа и другие данные, которые не должны быть видны в открытом доступе.

---

### **Шаг 1: Перейдите в настройки репозитория**

1. Откройте ваш репозиторий на GitHub.
2. Нажмите на вкладку **Settings** (Настройки) в верхней части страницы.

---

### **Шаг 2: Перейдите в раздел Secrets and variables**

1. В левом боковом меню найдите раздел **Secrets and variables** (Секреты и переменные).
2. Нажмите на подраздел **Actions** (Действия).

---

### **Шаг 3: Добавьте новый секрет**

1. Нажмите на кнопку **New repository secret** (Новый секрет репозитория).
2. Введите **Name** (Имя) секрета. Например:
    - `STAGING_SSH_HOST`
    - `STAGING_SSH_USERNAME`
    - `STAGING_SSH_PRIVATE_KEY`
    - `STAGING_SSH_FINGERPRINT`
3. В поле **Value** (Значение) введите соответствующее значение для секрета. Например:
    - Для `STAGING_SSH_HOST`: IP-адрес или доменное имя сервера (e-cinebox.ru).
    - Для `STAGING_SSH_USERNAME`: имя пользователя для SSH. [Безопасность](./Секреты%20github%20actions%20-%20Безопасность.md)
    - Для `STAGING_SSH_PRIVATE_KEY`: содержимое приватного SSH-ключа.
      Т.к. github будет в роли клиента, то там должен храниться приватный ключ. Публичный должен лежать
      на сервере.
      Сгенерируем ssh ключ
    - Для `STAGING_SSH_FINGERPRINT`: отпечаток SSH-ключа сервера.
4. Нажмите **Add secret** (Добавить секрет).

---

### **Шаг 4: Повторите для всех необходимых секретов**

Добавьте все секреты, которые требуются для вашего workflow. Например:

- `STAGING_SSH_HOST`
- `STAGING_SSH_USERNAME`
- `STAGING_SSH_PRIVATE_KEY`
- `STAGING_SSH_FINGERPRINT`

---

### **Шаг 5: Использование секретов в workflow**

После добавления секретов вы можете использовать их в вашем GitHub Actions workflow. Например:

```yaml
- name: SSH Command
  uses: D3rHase/ssh-command-action@v0.2.2
  with:
      host: ${{ secrets.STAGING_SSH_HOST }}
      user: ${{ secrets.STAGING_SSH_USERNAME }}
      private_key: ${{ secrets.STAGING_SSH_PRIVATE_KEY }}
      host_fingerprint: ${{ secrets.STAGING_SSH_FINGERPRINT }}
      command: source ~/.nvm/nvm.sh; ~/deploy.sh
```

---

### **Пример добавления SSH-ключа**

1. **Генерация SSH-ключа** (если у вас его ещё нет):

    - Откройте терминал.
    - Выполните команду:
        ```bash
        ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
        ```
    - Сохраните ключ в файл (например, `id_rsa`).

2. **Добавление приватного ключа в секреты**:

    - Скопируйте содержимое приватного ключа (файл `id_rsa`).
    - Вставьте его в поле **Value** при создании секрета `STAGING_SSH_PRIVATE_KEY`.

3. **Добавление публичного ключа на сервер**:
    - Скопируйте содержимое публичного ключа (файл `id_rsa.pub`).
    - Добавьте его в файл `~/.ssh/authorized_keys` на сервере.

---

### **Шаг 6: Проверка workflow**

1. Создайте или обновите файл workflow (например, `.github/workflows/deploy-staging.yml`).
2. Запустите workflow, сделав push в ветку `main`.
3. Убедитесь, что workflow использует секреты корректно и выполняет все шаги.

---

### **Итог**

Теперь вы знаете, как добавлять секреты в настройках репозитория GitHub и использовать их в GitHub Actions. Это позволяет безопасно хранить конфиденциальные данные и использовать их в автоматизированных процессах. Если у вас есть дополнительные вопросы, дайте знать! 😊
