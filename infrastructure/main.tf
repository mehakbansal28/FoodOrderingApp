terraform {
  required_providers {
    aws = {
      source        = "hashicorp/aws"
      version       = "~> 3.0"
    }
  }
  required_version  = ">= 0.13"
}

provider "aws" {
  access_key = "<YOUR_ACCESS_KEY>"
  secret_key = "<YOUR_SECRET_KEY>"
  region     = "<YOUR_AWS_REGION>"
  default_tags {
    tags = {
        Terraform   = "true"
    }
  }
}

resource "aws_s3_bucket" "angular_bucket" {
  bucket            = var.bucket_name
  versioning {
    enabled         = true
  }
  lifecycle {
    prevent_destroy = true
    rule {
      id      = "expire-old-builds"
      status  = "Enabled"
      prefix  = "build/"

      expiration {
        days = 30
      }
    }
  }
}
