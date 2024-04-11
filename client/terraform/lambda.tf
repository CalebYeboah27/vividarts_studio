# # Reusing existing role
# data "aws_iam_role" "lambda_role" {
#   name = "vividArts_lambdaRole"
# }

# resource "aws_lambda_function" "image-processing-function" {
#   function_name = "image-processing-function"
#   filename      = "function.zip"
#   source_code_hash = filebase64sha256("${path.module}/function.zip")
#   role          = data.aws_iam_role.lambda_role.arn
#   handler       = "lambda_function.handler"
#   runtime       = "nodejs18.x"

#   environment {
#     variables = {
#       DEST_BUCKET = "processed-images-vividarts-cy"
#     }
#   }
# }



# # IAM role for Lambda function
# # resource "aws_iam_role" "lambda_role" {
# #   name = "vividArts_lambdaRole"

# #   assume_role_policy = jsonencode({
# #     Version = "2012-10-17",
# #     Statement = [{
# #       Effect = "Allow",
# #       Principal = {
# #         Service = "lambda.amazonaws.com"
# #       },
# #       Action = "sts:AssumeRole"
# #     }]
# #   })
# # }

# # IAM policy for S3 read access
# resource "aws_iam_policy" "s3_read_policy" {
#   name        = "s3_read_policy"
#   description = "Allows Lambda function to read from S3 bucket"

#   policy = jsonencode({
#     Version = "2012-10-17",
#     Statement = [{
#       Effect = "Allow",
#       Action = [
#         "s3:GetObject",
#         "s3:ListBucket"
#       ],
#       Resource = [
#         module.image-processsing-bucket["raw-images"].s3_bucket_arn,
#         "${module.image-processsing-bucket["raw-images"].s3_bucket_arn}/*"
#       ]
#     }]
#   })
# }

# # IAM policy for S3 write access
# resource "aws_iam_policy" "s3_write_policy" {
#   name        = "s3_write_policy"
#   description = "Allows Lambda function to write to S3 bucket"

#   policy = jsonencode({
#     Version = "2012-10-17",
#     Statement = [{
#       Effect = "Allow",
#       Action = [
#         "s3:PutObject"
#       ],
#       Resource = [
#         module.image-processsing-bucket["processed-images"].s3_bucket_arn,
#         "${module.image-processsing-bucket["processed-images"].s3_bucket_arn
#         }/*"
#       ]
#     }]
#   })
# }

# # Attach policies to IAM role
# resource "aws_iam_role_policy_attachment" "s3_read_attachment" {
#   role       = data.aws_iam_role.lambda_role.name
#   policy_arn = aws_iam_policy.s3_read_policy.arn
# }

# resource "aws_iam_role_policy_attachment" "s3_write_attachment" {
#   role       = data.aws_iam_role.lambda_role.name
#   policy_arn = aws_iam_policy.s3_write_policy.arn
# }



# resource "aws_lambda_permission" "s3_trigger_permission" {
#   statement_id  = "AllowExecutionFromS3Bucket"
#   action        = "lambda:InvokeFunction"
#   function_name = aws_lambda_function.image-processing-function.function_name
#   principal     = "s3.amazonaws.com"

#   # The ARN of the S3 bucket
#   source_arn = module.image-processsing-bucket["raw-images"].s3_bucket_arn
# }

# resource "aws_s3_bucket_notification" "example_bucket_notification" {
#   bucket = module.image-processsing-bucket["raw-images"].s3_bucket_id

#   lambda_function {
#     lambda_function_arn = aws_lambda_function.image-processing-function.arn
#     events              = ["s3:ObjectCreated:Put"]
#     filter_prefix       = "" # Optionally, specify a prefix to filter on
#     filter_suffix       = "" # Optionally, specify a suffix to filter on
#   }
# }
