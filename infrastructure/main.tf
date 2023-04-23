resource "aws_s3_bucket" "angular_bucket" {
  bucket = var.bucket_name
  versioning {
    enabled = true
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
