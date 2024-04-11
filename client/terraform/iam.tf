resource "aws_iam_policy" "s3_upload_policy" {
  name        = "s3-upload-policy"
  description = "Allows uploading objects to S3 bucket"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect   = "Allow"
      Action   = "s3:PutObject"
      Resource = "arn:aws:s3:::raw-images-vividarts-cy/*"
    }]
  })
}

resource "aws_iam_policy_attachment" "attach_s3_upload_policy" {
  name       = "s3-upload-policy-attachment"
  roles      = ["${aws_iam_role.s3-bucket.name}"] # Replace with the name of your IAM role
  policy_arn = aws_iam_policy.s3_upload_policy.arn
}

resource "aws_iam_role" "s3-bucket" {
  name = "s3-bucket-upload"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect    = "Allow"
      Principal = { Service = "s3.amazonaws.com" }
      Action    = "sts:AssumeRole"
    }]
  })
}

resource "aws_iam_user_policy_attachment" "attach_s3_upload_policy" {
  user       = "terraform-user"
  policy_arn = aws_iam_policy.s3_upload_policy.arn
}


