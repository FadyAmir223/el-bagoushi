## server setup

```sh
# create user
adduser fezza
usermod -aG sudo fezza

exit
ssh fezza@ip

# generate key pair (client)
ssh-keygen -t rsa -b 4096
ssh-copy-id -i ~/.ssh/server_rsa.pub fezza@ip

# ssh security
sudo nano /etc/ssh/sshd_config.d/disable_root_login.conf
  ChallengeResponseAuthentication no
  PasswordAuthentication no
  UsePAM no
  PermitRootLogin no
systemctl restart ssh


# deps
## node
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
nvm install --lts
source ~/.bashrc
nvm use --lts
npm i -g pnpm

## docker
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc
echo   "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" |   sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
sudo usermod -aG docker $USER
newgrp docker
```

## transfer to server

```sh
ssh vps
rsync -ave ssh . vps:~/app/

rsync --delete -ave ssh \
  --exclude 'node_modules' \
  --exclude '.git' \
  --exclude '**/.turbo' \
  --exclude 'apps/web/.next' \
  --exclude 'packages/**/dist' \
  . vps:~/el-bagoushi.com
```
