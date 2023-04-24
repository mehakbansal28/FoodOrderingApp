variable "bucket_name" {
  type        = string
  description = "Name of the S3 bucket for Angular builds"
}

variable "deployment_role" { }
variable "access_key" { }
variable "secret_key" { }
variable "aws_region" { }
