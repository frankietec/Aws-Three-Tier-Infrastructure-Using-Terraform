terraform {
  backend "s3" {
    bucket  = "3infra-bucket"
    key     = "employee-management-api/terraform.tfstate"
    region  = "us-east-1"
    encrypt = true

  }
}