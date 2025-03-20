### **Работа с контейнерами**

1. **Запуск контейнера**:

    ```bash
    docker run <имя_образа>
    ```

    Например:

    ```bash
    docker run nginx
    ```

2. **Запуск контейнера в фоновом режиме (detached mode)**:

    ```bash
    docker run -d <имя_образа>
    ```

3. **Остановка контейнера**:

    ```bash
    docker stop <контейнер_id или имя_контейнера>
    ```

4. **Перезапуск контейнера**:

    ```bash
    docker restart <контейнер_id или имя_контейнера>
    ```

5. **Удаление контейнера**:

    ```bash
    docker rm <контейнер_id или имя_контейнера>
    ```

6. **Просмотр запущенных контейнеров**:

    ```bash
    docker ps
    ```

7. **Просмотр всех контейнеров (включая остановленные)**:

    ```bash
    docker ps -a
    ```

8. **Просмотр логов контейнера**:

    ```bash
    docker logs <контейнер_id или имя_контейнера>
    ```

9. **Вход в запущенный контейнер (интерактивная сессия)**:

    ```bash
    docker exec -it <контейнер_id или имя_контейнера> /bin/bash
    ```

    (или `/bin/sh`, в зависимости от образа)

10. **Запуск контейнера с пробросом портов**:

    ```bash
    docker run -p <хост_порт>:<контейнер_порт> <имя_образа>
    ```

    Например:

    ```bash
    docker run -p 8080:80 nginx
    ```

11. **Запуск контейнера с монтированием volumes**:

    ```bash
    docker run -v <путь_на_хосте>:<путь_в_контейнере> <имя_образа>
    ```

    Например:

    ```bash
    docker run -v /home/user/data:/app/data nginx
    ```

12. **Удаление всех остановленных контейнеров**:
    ```bash
    docker container prune
    ```

---

### **Работа с образами**

1. **Поиск образа в Docker Hub**:

    ```bash
    docker search <имя_образа>
    ```

2. **Скачивание образа**:

    ```bash
    docker pull <имя_образа>
    ```

3. **Просмотр скачанных образов**:

    ```bash
    docker images
    ```

4. **Удаление образа**:

    ```bash
    docker rmi <имя_образа или image_id>
    ```

5. **Создание образа из Dockerfile**:

    ```bash
    docker build -t <имя_образа> <путь_к_Dockerfile>
    ```

    Например:

    ```bash
    docker build -t my_image .
    ```

6. **Экспорт образа в файл**:

    ```bash
    docker save -o <имя_файла>.tar <имя_образа>
    ```

7. **Импорт образа из файла**:
    ```bash
    docker load -i <имя_файла>.tar
    ```

---

### **Работа с сетями**

1. **Просмотр сетей**:

    ```bash
    docker network ls
    ```

2. **Создание сети**:

    ```bash
    docker network create <имя_сети>
    ```

3. **Подключение контейнера к сети**:

    ```bash
    docker network connect <имя_сети> <контейнер_id или имя_контейнера>
    ```

4. **Отключение контейнера от сети**:

    ```bash
    docker network disconnect <имя_сети> <контейнер_id или имя_контейнера>
    ```

5. **Удаление сети**:
    ```bash
    docker network rm <имя_сети>
    ```

---

### **Работа с volumes**

1. **Просмотр volumes**:

    ```bash
    docker volume ls
    ```

2. **Создание volume**:

    ```bash
    docker volume create <имя_volume>
    ```

3. **Удаление volume**:

    ```bash
    docker volume rm <имя_volume>
    ```

4. **Удаление неиспользуемых volumes**:
    ```bash
    docker volume prune
    ```

---

### **Docker Compose**

1. **Запуск сервисов**:

    ```bash
    docker-compose up
    ```

2. **Запуск сервисов в фоновом режиме**:

    ```bash
    docker-compose up -d
    ```

3. **Остановка сервисов**:

    ```bash
    docker-compose down
    ```

4. **Просмотр логов сервисов**:

    ```bash
    docker-compose logs
    ```

5. **Пересборка и запуск сервисов**:

    ```bash
    docker-compose up --build
    ```

6. **Просмотр запущенных сервисов**:
    ```bash
    docker-compose ps
    ```

---

### **Системные команды**

1. **Просмотр информации о Docker**:

    ```bash
    docker info
    ```

2. **Просмотр версии Docker**:

    ```bash
    docker --version
    ```

3. **Очистка системы (удаление неиспользуемых данных)**:

    ```bash
    docker system prune
    ```

4. **Очистка всего (образы, контейнеры, volumes, сети)**:
    ```bash
    docker system prune -a --volumes
    ```

---
