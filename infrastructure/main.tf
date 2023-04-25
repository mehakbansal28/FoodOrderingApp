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
  access_key        = var.access_key
  secret_key        = var.secret_key
  region            = var.aws_region
  default_tags {
    tags = {
        Terraform   = "true"
    }
  }
}

resource "aws_s3_bucket" "angular_bucket" {
  bucket            = var.bucket_name
}

resource "null_resource" "remove_and_upload_to_s3" {
  provisioner "local-exec" {
    command = "aws s3 sync var.dist_source_path s3://${aws_s3_bucket.angular_bucket.id}"
  }
}

/*
resource "aws_s3_bucket_object" "index_html" {
  bucket            = aws_s3_bucket.angular_bucket.id
  key               = "folder"
  source            = var.dist_source_path
  content_type      = "application/x-directory"

}


resource "aws_cloudfront_distribution" "my_distribution" {
  origin {
    domain_name = aws_s3_bucket.angular_bucket.website_domain
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

  restrictions {
    geo_restriction {
      restriction_type = "whitelist"
      locations        = ["US", "CA", "GB", "DE"]
    }
  }

  tags = {
    Environment = "production"
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }
}
*/
