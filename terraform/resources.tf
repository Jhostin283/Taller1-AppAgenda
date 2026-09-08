# 1. Base de Datos RDS (Gratis)
resource "aws_db_subnet_group" "rds_subnet_group" {
  name       = "main"
  subnet_ids = [aws_subnet.public_1.id, aws_subnet.public_2.id]
}
resource "aws_db_instance" "postgres" {
  allocated_storage      = 20
  engine                 = "postgres"
  engine_version         = "15.4" # Versión estable
  instance_class         = "db.t3.micro" # Capa gratuita
  identifier             = "taller1-db"
  username               = "postgres"
  password               = var.db_password
  db_subnet_group_name   = aws_db_subnet_group.rds_subnet_group.name
  vpc_security_group_ids = [aws_security_group.rds_sg.id]
  skip_final_snapshot    = true # Importante para poder destruir sin errores
  publicly_accessible    = false # Privado por seguridad
  multi_az               = false # Vital para que sea gratis
}
# 2. Servidor EC2 (Gratis)
resource "aws_instance" "backend" {
  ami           = "ami-0c7217cdde317cfec" # Ubuntu 22.04 LTS (us-east-1)
  instance_type = "t2.micro" # Capa gratuita
  subnet_id     = aws_subnet.public_1.id
  vpc_security_group_ids = [aws_security_group.ec2_sg.id]
  # User Data para configurar Swap y Java Automáticamente
  user_data = <<-EOF
              #!/bin/bash
              # 1. Configurar SWAP (Para que Java no colapse el 1GB de RAM)
              sudo dd if=/dev/zero of=/swapfile bs=128M count=16
              sudo chmod 600 /swapfile
              sudo mkswap /swapfile
              sudo swapon /swapfile
              echo "/swapfile swap swap defaults 0 0" | sudo tee -a /etc/fstab
              # 2. Instalar Java 17 (Requisito de Spring Boot)
              sudo apt-get update -y
              sudo apt-get install openjdk-17-jre-headless -y
              # 3. Descargar el backend compilado (Reemplazar URL) y ejecutar
              wget https://raw.githubusercontent.com/Jhostin283/Taller1-AppAgenda/main/backend/target/contacts-backend-0.0.1-SNAPSHOT.jar -O backend.jar`n              `n              `n              
              java -jar backend.jar --spring.datasource.url=jdbc:postgresql://${aws_db_instance.postgres.endpoint}/postgres &
              EOF
  tags = { Name = "Taller1-Backend" }
}
# 3. Bucket S3 para Frontend (Gratis)
resource "aws_s3_bucket" "frontend" {
  bucket = "taller1-appagenda-frontend-${random_string.suffix.result}"
}
resource "random_string" "suffix" {
  length  = 6
  special = false
  upper   = false
}
resource "aws_s3_bucket_website_configuration" "frontend_site" {
  bucket = aws_s3_bucket.frontend.id
  index_document {
    suffix = "index.html"
  }
  error_document {
    key = "index.html" # Angular enruta los errores 404
  }
}
resource "aws_s3_bucket_public_access_block" "public_access" {
  bucket = aws_s3_bucket.frontend.id
  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}
resource "aws_s3_bucket_policy" "public_read" {
  bucket = aws_s3_bucket.frontend.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid       = "PublicReadGetObject"
        Effect    = "Allow"
        Principal = "*"
        Action    = "s3:GetObject"
        Resource  = "${aws_s3_bucket.frontend.arn}/*"
      },
    ]
  })
  depends_on = [aws_s3_bucket_public_access_block.public_access]
}
# 4. Outputs para saber donde conectarnos
output "frontend_url" {
  value = aws_s3_bucket_website_configuration.frontend_site.website_endpoint
}
output "backend_ip" {
  value = aws_instance.backend.public_ip
}
output "database_endpoint" {
  value = aws_db_instance.postgres.endpoint
}
