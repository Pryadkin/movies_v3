Отпечаток SSH-ключа сервера (SSH host fingerprint) — это уникальный идентификатор, который используется для проверки подлинности сервера при подключении по SSH. Он помогает предотвратить атаки "человек посередине" (MITM), когда злоумышленник может попытаться выдать себя за ваш сервер.

---

### **1. Что такое SSH host fingerprint?**

SSH host fingerprint — это хэш-значение, вычисленное на основе публичного ключа сервера. Оно выглядит как строка, например:

```
SHA256:AbCdEfGhIjKlMnOpQrStUvWxYz0123456789+ABCDEF
```

Когда вы впервые подключаетесь к серверу по SSH, ваш клиент сохраняет этот отпечаток. При последующих подключениях клиент сравнивает сохранённый отпечаток с тем, который предоставляет сервер. Если отпечатки не совпадают, это может указывать на подмену сервера.

---

### **2. Как получить SSH host fingerprint?**

#### **Способ 1: Использование `ssh-keyscan`**

1. Откройте терминал на вашем локальном компьютере.
2. Выполните команду:

    ```bash
    ssh-keyscan -t rsa ваш_сервер
    ```

    - Замените `ваш_сервер` на IP-адрес или доменное имя вашего сервера.
    - Флаг `-t rsa` указывает, что нужно получить отпечаток для ключа типа RSA. Если вместо -t rsa написать
      -H - получим разные типы шифрования.

3. Вы увидите вывод, похожий на этот:

    ```
    ваш_сервер ssh-rsa AAAAB3NzaC1yc2EAAAABIwAAAQEArV1...
    ```

4. Чтобы получить отпечаток в формате SHA256, выполните:
    ```bash
    ssh-keyscan -t rsa ваш_сервер | ssh-keygen -lf -
    ```
    - Вывод будет выглядеть так:
        ```
        256 SHA256:AbCdEfGhIjKlMnOpQrStUvWxYz0123456789+ABCDEF ваш_сервер (RSA)
        ```
    - Скопируйте часть после `SHA256:` (в данном случае `AbCdEfGhIjKlMnOpQrStUvWxYz0123456789+ABCDEF`).

#### **Способ 2: Использование `ssh`**

1. Подключитесь к серверу по SSH:

    ```bash
    ssh ваш_пользователь@ваш_сервер
    ```

2. При первом подключении вы увидите сообщение:

    ```
    The authenticity of host 'ваш_сервер (IP)' can't be established.
    RSA key fingerprint is SHA256:AbCdEfGhIjKlMnOpQrStUvWxYz0123456789+ABCDEF.
    Are you sure you want to continue connecting (yes/no)?
    ```

3. Скопируйте отпечаток (часть после `SHA256:`).

---

### **3. Добавление SSH host fingerprint в секреты GitHub**

1. Перейдите в ваш репозиторий на GitHub.
2. Нажмите на вкладку **Settings** (Настройки) в верхней части страницы.
3. В левом боковом меню найдите раздел **Secrets and variables** (Секреты и переменные).
4. Нажмите на подраздел **Actions** (Действия).
5. Нажмите на кнопку **New repository secret** (Новый секрет репозитория).
6. В поле **Name** (Имя) введите `STAGING_SSH_FINGERPRINT`.
7. В поле **Value** (Значение) вставьте отпечаток SSH-ключа сервера, который вы получили на предыдущем шаге.
8. Нажмите **Add secret** (Добавить секрет).

---

### **4. Использование SSH host fingerprint в GitHub Actions**

Теперь вы можете использовать секрет `STAGING_SSH_FINGERPRINT` в вашем workflow. Например:

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

### **5. Почему это важно?**

- **Безопасность**: Использование SSH host fingerprint предотвращает атаки MITM, так как клиент проверяет, что сервер, к которому он подключается, действительно является тем, за кого себя выдаёт.
- **Автоматизация**: В GitHub Actions проверка отпечатка SSH-ключа сервера позволяет безопасно выполнять SSH-команды без риска подключения к поддельным серверам.

---

### **Итог**

Теперь вы знаете, как:

1. Получить SSH host fingerprint с помощью `ssh-keyscan` или `ssh`.
2. Добавить отпечаток в секреты GitHub.
3. Использовать его в GitHub Actions для безопасного подключения к серверу.
