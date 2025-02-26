1. Покупаем сервер. (timeweb.cloud)
2. Переименовываем его в Staging (т.к. он будет тестовым)
3. Покупаем еще сервер - Production
4. Копируем адрес для подключения по ssh - ssh root@176.53.163.167
5. Вставляем в терминал:
    - попросит подтвердить fingerprint - yes
    - вводим пароль, копируем его со страницы сервера
6. создаем пользователя admin

    ```bash
    1. создаем пользователя
    adduser admin
    2. придумываем ему пароль. 9305243

    3. выдаем ему права sudo
    usermod -aG sudo admin

    4.выходим
    exit
    ```

7. копируем публичный ssh ключ утилитой:

    ```bash
    ssh-copy-id admin@176.53.163.167
    ```

    Теперь еще раз вводим пароль сервера.
    У сервера должен быть ssh сервер, иначе ssh не будет работать.

8. Теперь мы можем заходить на сервер по ssh ключу.
   Просто введем адрес - ssh admin@176.53.163.167
   И мы уже на сервере, не нужно вводить пароль.

    Ключ ssh лежит теперь на сервере в файле .ssh (cd .ssh/, затем ls - authorized_keys)

9. Удалим возможность подключаться к root и по паролю.

    - заходим в файл sshd_config
      sudo vim /etc/ssh/sshd_config
    - находим настройку - PermitRootLogin и меняем с yes на no
      PermitRootLogin no
    - находим PasswordAuthentication - и также меняем на no

10. перезапускаем ssh сервер

    - sudo systemctl restart ssh

    - выходим:
      exit

    - заходим за root
      ssh root@176.53.163.167

    Permission denied, please try again.

# Nest сервер

### 1. Генерируем ssh на сервера, чтобы делать запросы на github

- ssh-keygen

- открываем и копируем ключ:

- cat .ssh/id_rsa.pub

- заходим в github, копируем туда ключ ssh, если есть deploy keys, лучше воспользоваться им, но
  я не нашел, по этому добавил его в стандатные ключи

### 2. Переходим в github репозиторий проекта, и слонируем его через ssh на сервер.

вводим в консоль сервера

    git clone git@github.com:Pryadkin/movies_v3.git

### 3. Устанавливаем node (nvm)

    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash

После установки вводим команду nvm, должна появиться версия продукта.
Если - Command 'nvm' not found, либо подождать немного, либо перейти в bash (просто написать - bash)
что-то одно сработало.

Устанавливаем последнюю версию:

    nvm install --lts

### 4. Ставим записимости next

    npm install -g yarn

    yarn install

    yarn build

    yarn start

проверяем запуск приложения

    http://176.53.163.167:3000/

### 5. Автозапуск приложения

чтобы дальше работать в терминале и не останавливать приложение (yarn start), скачиваем и запускаем пакет pm2

    npx pm2 start yarn --name next -- start

чтобы перезапускать приложение при перезагрузке системы, запустим скрипт

    npx pm2 startup

скрипт покажет коменду, которую нужно ввести в терминале. Типа такой:

    [PM2] Init System found: systemd
    [PM2] To setup the Startup Script, copy/paste the following command:
    sudo env PATH=$PATH:/home/admin/.nvm/versions/node/v22.14.0/bin /home/admin/.npm/_npx/5f7878ce38f1eb13/node_modules/pm2/bin/pm2 startup systemd -u admin --hp /home/admin

копируем последнюю строку и вставляем в терминал

    sudo env PATH=$PATH:/home/admin/.nvm/versions/node/v22.14.0/bin /home/admin/.npm/_npx/5f7878ce38f1eb13/node_modules/pm2/bin/pm2 startup systemd -u admin --hp /home/admin

теперь приложение автоматически будет запускаться после включения сервера (VPS)

### 6. Настраиваем firewall

установим файрвол

    sudo apt-get install ufw

проверим статус

    sudo ufw status verbose

по умолчанию не активен: Status: inactive

Firewall отключает все входящие соединения, т.е. у нас отрубится http, https, ssh и т.п. службы.
ЧТобы этого не произошло, нужно указать конфигурации:

    sudo ufw allow ssh
    sudo ufw allow http
    sudo ufw allow https

запускаем firewall

    sudo ufw enable

если запустить страницу, она не будет работать, значит firewall заработал как надо.
И мы не можем достучаться по 3000 порту.

### 7. Проксирование портов (nginx).

Мы могли бы на прямую настроить next, чтобы он запускался на 80 порте, но хорошей практикой
является настройка проксирования 3000 на 80.

    sudo apt install nginx

включаем

    sudo systemctl is-enabled nginx

можем зайти в файл конфигурации

    cd /etc/nginx/
    sudo vin nginx.conf

ссылка на файл конфигурации находятся здесь - sites-enabled
это видно, когда заходишь в папку и пишешь ls, появляется default в жирном цвете (или синеватом),
что значит, что это ссылка.

сам файл здесь - sites-available

зайдем в sites-available, удалим файл и создадим свой:

    sudo vim staging.176.53.163.167.conf


    server {
        server_name 176.53.163.167;

        location / {
            include proxy_params;

            proxy_pass http://127.0.0.1:3000;
        }

        listen 80;
    }

создадим ярлык

    sudo ln -s /etc/nginx/sites-available/staging.176.53.163.167.conf /etc/nginx/sites-enabled/

всё, осталось протестировать конфигурацию:

    sudo nginx -t

должно появиться сообщение

    admin@4313961-bi50660:/etc/nginx/sites-enabled$ sudo nginx -t
    nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
    nginx: configuration file /etc/nginx/nginx.conf test is successful

запускаем команду:

    sudo nginx -s reload

или

    sudo systemctl restart nginx

эта команда подгружает новую конфигурацию и перезапускает сервер
