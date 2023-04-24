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
  access_key = var.access_key
  secret_key = var.secret_key
  region     = var.aws_region
  default_tags {
    tags = {
        Terraform   = "true"
    }
  }
}

resource "aws_s3_bucket" "my_bucket" {
  bucket = "angular-fe-bucket"
}

resource "aws_s3_bucket_object" "index_html" {
  bucket = aws_s3_bucket.my_bucket.id
  key = "index.html"
  source = "../dist/food-ordering-app/index.html"
}

resource "aws_cloudfront_distribution" "my_distribution" {
  origin {
    domain_name = aws_s3_bucket.my_bucket.website_domain
    origin_id = "my-bucket-origin"
  }

  enabled = true

  default_cache_behavior {
    allowed_methods = ["GET", "HEAD"]
    cached_methods = ["GET", "HEAD"]
    target_origin_id = "my-bucket-origin"
    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl = 0
    default_ttl = 86400
    max_ttl = 31536000
  }

  #viewer_certificate {
  #  acm_certificate_arn = "my_certificate_arn"
  #  ssl_support_method = "sni-only"
  #}

  #aliases = ["my-angular-frontend.example.com"]
}
