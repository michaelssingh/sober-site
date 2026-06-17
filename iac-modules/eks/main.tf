terraform {
  required_version = ">= 1.0.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.0"
    }
  }
}

variable "cluster_name" {
  type        = string
  description = "Name of the EKS cluster"
  default     = "sober-prod-cluster"
}

resource "aws_eks_cluster" "main" {
  name     = var.cluster_name
  role_arn = aws_iam_role.eks_cluster.arn

  vpc_config {
    subnet_ids = [aws_subnet.private[0].id, aws_subnet.private[1].id]
  }

  tags = {
    ManagedBy = "SoberEdge"
  }
}

# (Simplified IAM and Node Group resources would go here)
