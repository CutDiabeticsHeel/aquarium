Aquarium
Установить Docker Desktop.
Развернуть GitLab Community Edition. - docker compose up -d 
Зарегистрировать GitLab Runner.
    docker exec -it gitlab-runner gitlab-runner register
        <Имя>
        http://gitlab:80
        <Ключ>
        docker
        docker:latest
Изменить конфигурацию Runner:
    включить privileged = true;
    добавить подключение Docker Socket (/var/run/docker.sock);
    указать security_opt = ["seccomp=unconfined"].
Настроить SSH-подключение между Runner и Виртуалкой:
    ----------------Основной ПК---------------------
    New-Item -ItemType Directory -Force -Path "E:\ssh-keys"
    ssh-keygen -t ed25519 -C "gitlab-deploy" -f "E:\ssh-keys\gitlab_deploy_key" -N '""'
    Get-Content "E:\ssh-keys\gitlab_deploy_key.pub" 
    ----------------Виртуалка---------------------
    mkdir -p ~/.ssh
    echo "<Ваш ключ>" >> ~/.ssh/authorized_keys
    chmod 700 ~/.ssh
    chmod 600 ~/.ssh/authorized_keys
    sudo apt install -y openssh-server 
    sudo systemctl enable ssh --now
    sudo systemctl status ssh
Сохранить закрытый ключ в переменных GitLab CI/CD.
Добавить в gitlab viariables. Переменные создать в соответсвии с правилами создания https и google Captcha
    CAPTCHA_KEY
    SERVER_CRT
    SERVER_KEY
    SSH_PRIVATE_KEY (file)
Выполнить git push в ветку main и проверить выполнение pipeline.
Контейнеры
    app — Node.js-приложение.
    gitlab — GitLab Community Edition.
    gitlab-runner — GitLab Runner для выполнения CI/CD.
Результат
После отправки изменений в ветку main GitLab Runner автоматически подключается к серверу по SSH, получает последние изменения из репозитория, пересобирает контейнеры и запускает обновленную версию приложения.
