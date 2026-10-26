
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.0"
    }

    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = ">= 2.0"
    }

    helm = {
      source  = "hashicorp/helm"
      version = ">= 2.0"
    }

    local = {
      source  = "hashicorp/local"
      version = ">= 2.0"
    }

    null = {
      source  = "hashicorp/null"
      version = ">= 3.0"
    }

    random = {
      source  = "hashicorp/random"
      version = ">= 3.0"
    }
  }
}

# --------------------------------------------------
# AWS Provider
# --------------------------------------------------

provider "aws" {
  region = var.aws_region
}

# --------------------------------------------------
# EKS Data Sources
# --------------------------------------------------

data "aws_eks_cluster" "cluster" {
  name       = module.eks.cluster_name
  depends_on = [module.eks]
}

data "aws_eks_cluster_auth" "cluster" {
  name       = module.eks.cluster_name
  depends_on = [module.eks]
}

# --------------------------------------------------
# Default Kubernetes Provider
# --------------------------------------------------

provider "kubernetes" {
  host                   = var.kubernetes_host != "" ? var.kubernetes_host : null
  cluster_ca_certificate = var.kubernetes_cluster_ca_certificate != "" ? var.kubernetes_cluster_ca_certificate : null
  token                  = var.kubernetes_token != "" ? var.kubernetes_token : null
}

# --------------------------------------------------
# Kubernetes Provider for Post-EKS Resources
# --------------------------------------------------

provider "kubernetes" {
  alias                  = "post_eks"
  host                   = var.kubernetes_host != "" ? var.kubernetes_host : null
  cluster_ca_certificate = var.kubernetes_cluster_ca_certificate != "" ? var.kubernetes_cluster_ca_certificate : null
  token                  = var.kubernetes_token != "" ? var.kubernetes_token : null
}

# --------------------------------------------------
# Helm Provider
# --------------------------------------------------

provider "helm" {
  kubernetes = {
    host                   = var.kubernetes_host != "" ? var.kubernetes_host : null
    cluster_ca_certificate = var.kubernetes_cluster_ca_certificate != "" ? var.kubernetes_cluster_ca_certificate : null
    token                  = var.kubernetes_token != "" ? var.kubernetes_token : null
  }
}
