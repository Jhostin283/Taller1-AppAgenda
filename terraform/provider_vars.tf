provider "aws" {
  region = var.aws_region
}

variable "aws_region" {
  default = "us-east-1"
}

variable "db_password" {
  description = "Password para PostgreSQL"
  type        = string
  sensitive   = true
  default     = "SuperSecretPassword123!"
}
