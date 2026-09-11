provider "aws" {
  region = "us-east-1"
}

# Crear una llave SSH para poder conectarse (Opcional pero recomendado)
resource "tls_private_key" "rsa" {
  algorithm = "RSA"
  rsa_bits  = 4096
}
resource "aws_key_pair" "tf_key" {
  key_name   = "taller1-docker-key"
  public_key = tls_private_key.rsa.public_key_openssh
}
resource "local_file" "tf_key_file" {
  content  = tls_private_key.rsa.private_key_pem
  filename = "taller1-docker-key.pem"
}

# Crear un Security Group que abra los puertos necesarios
resource "aws_security_group" "docker_sg" {
  name        = "docker_sg"
  description = "Permitir trafico web y ssh"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 8080
    to_port     = 8080
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# Crear la instancia EC2
resource "aws_instance" "docker_host" {
  ami           = "ami-0c7217cdde317cfec" # Ubuntu 22.04 LTS (us-east-1)
  instance_type = "t2.micro" # Capa gratuita
  key_name      = aws_key_pair.tf_key.key_name
  vpc_security_group_ids = [aws_security_group.docker_sg.id]

  # Script de inicio: Instala Docker, Clona tu repo, Construye y Levanta todo
  user_data = <<-EOF
              #!/bin/bash
              sudo apt-get update -y
              
              # 1. Configurar SWAP (Vital para que Docker no colapse la RAM de la capa gratuita compilando)
              sudo dd if=/dev/zero of=/swapfile bs=128M count=16
              sudo chmod 600 /swapfile
              sudo mkswap /swapfile
              sudo swapon /swapfile
              echo "/swapfile swap swap defaults 0 0" | sudo tee -a /etc/fstab

              # 2. Instalar Docker y Docker Compose
              sudo apt-get install ca-certificates curl gnupg git -y
              sudo install -m 0755 -d /etc/apt/keyrings
              curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
              sudo chmod a+r /etc/apt/keyrings/docker.gpg
              echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
              sudo apt-get update -y
              sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin -y

              # 3. Dar permisos al usuario ubuntu
              sudo usermod -aG docker ubuntu

              # 4. Clonar el repositorio y desplegar
              cd /home/ubuntu
              # OJO: Cambia este enlace si tu repositorio es diferente
              git clone https://github.com/Jhostin283/Taller1-AppAgenda.git
              cd Taller1-AppAgenda
              sudo docker compose up -d --build
              EOF

  tags = { Name = "Taller1-Docker-AllInOne" }
}

output "instance_ip" {
  value = aws_instance.docker_host.public_ip
}
output "ssh_command" {
  value = "ssh -i taller1-docker-key.pem ubuntu@${aws_instance.docker_host.public_ip}"
}
output "website_url" {
  value = "http://${aws_instance.docker_host.public_ip}"
}
