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

resource "aws_s3_bucket_object" "my_folder" {
  bucket = var.bucket_name
  key    = "dist/"
  content = base64encode(file("${var.file_location}"))
}

/*
resource "null_resource" "sync_folder" {
  provisioner "local-exec" {
    command = "aws s3 cp ${var.file_location}/food-ordering-app s3://${var.bucket_name} --recursive"
  }
}
*/


/*
resource "aws_s3_bucket_object" "index_html" {
  bucket            = aws_s3_bucket.angular_bucket.id
  key               = "food-ordering-app"
  source            = var.file_location

  # The filemd5() function is available in Terraform 0.11.12 and later
  # For Terraform 0.11.11 and earlier, use the md5() function and the file() function:
  # etag = "${md5(file("path/to/file"))}"
  etag = filemd5(var.file_location)
}
*/

resource "aws_s3_bucket_object" "index_html" {
  count  = "${length(var.config) > 0 ? length(var.config) : "0" }"
  key    = "config/${element(var.config, count.index)}"
  source = "${var.file_location}${element(var.config, count.index)}"
  bucket = "${aws_s3_bucket.bootstrap.id}"
  acl    = "private"
}

/*
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
