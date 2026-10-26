terraform {
  backend "s3" {
    bucket = "my-terraform-state-bucket"
    key    = "employee-management-api/terraform.tfstate"
    region = "us-east-1"
    encrypt = true
    
  }
}