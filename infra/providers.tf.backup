terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
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
# Default Kubernetes Provider
# --------------------------------------------------

provider "kubernetes" {
  host                   = var.kubernetes_host != "" ? var.kubernetes_host : null
  cluster_ca_certificate = var.kubernetes_cluster_ca_certificate != "" ? base64decode(var.kubernetes_cluster_ca_certificate) : null

  exec {
    api_version = "client.authentication.k8s.io/v1beta1"
    command     = "aws"

    args = [
      "eks",
      "get-token",
      "--cluster-name",
      "${var.project_name}-${var.environment}-cluster",
      "--region",
      var.aws_region
    ]
  }
}

# --------------------------------------------------
# Kubernetes Provider for Post-EKS Resources
# --------------------------------------------------

provider "kubernetes" {
  alias = "post_eks"

  host                   = var.kubernetes_host != "" ? var.kubernetes_host : null
  cluster_ca_certificate = var.kubernetes_cluster_ca_certificate != "" ? base64decode(var.kubernetes_cluster_ca_certificate) : null

  exec {
    api_version = "client.authentication.k8s.io/v1beta1"
    command     = "aws"

    args = [
      "eks",
      "get-token",
      "--cluster-name",
      "${var.project_name}-${var.environment}-cluster",
      "--region",
      var.aws_region
    ]
  }
}

# --------------------------------------------------
# Helm Provider 3.x
# --------------------------------------------------

provider "helm" {
  kubernetes = {
    host                   = var.kubernetes_host != "" ? var.kubernetes_host : null
    cluster_ca_certificate = var.kubernetes_cluster_ca_certificate != "" ? base64decode(var.kubernetes_cluster_ca_certificate) : null

    exec = {
      api_version = "client.authentication.k8s.io/v1beta1"
      command     = "aws"

      args = [
        "eks",
        "get-token",
        "--cluster-name",
        "${var.project_name}-${var.environment}-cluster",
        "--region",
        var.aws_region
      ]
    }
  }
}
