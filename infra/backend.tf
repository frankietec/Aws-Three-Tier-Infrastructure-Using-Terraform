
terraform {
  required_version = ">= 1.5.0"

  backend "s3" {
    bucket  = "3infra-bucket"
    key     = "employee-management-api/terraform.tfstate"
    region  = "us-east-1"
    encrypt = true
  }
}
