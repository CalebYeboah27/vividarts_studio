# VividArts

VividArts is a web application built to showcase and manage images in a visually appealing manner. It provides a platform for users to upload images, which are then processed, stored, and displayed dynamically.

## Technologies Used

- Frontend: HTML, CSS, JavaScript
- Backend: Flask (Python)
- Cloud Infrastructure: AWS (EC2, S3, Lambda)
- DevOps: Terraform, GitHub Actions, Docker

## Features

- Image Upload: Users can upload images through a form interface provided by the VividArts web application.
- Image Processing (AWS Lambda): After an image is uploaded, a Lambda function is triggered to resize the image. The resized image is then uploaded to another S3 bucket for storage.
- Image Display: Users can view uploaded images in a gallery section (/gallery route) of the VividArts application.

## Deployment Process

1. Developers push code changes to the GitHub repository.
2. GitHub Actions automatically builds and deploys a Docker image of the Flask application to Docker Hub.
3. Terraform provisions AWS resources, including EC2 instances, S3 buckets, and Lambda functions.
4. Once an EC2 instance is created, a user data bash script pulls the Docker image from Docker Hub and launches the Flask application.

## Getting Started

To get started with VividArts, follow these steps:

1. Clone this repository: `git clone <repo_url>`
2. Install dependencies: `pip install -r requirements.txt`
3. Set up AWS credentials and configure Terraform.
4. Run Terraform to provision AWS resources.
5. Push code changes to trigger GitHub Actions for deployment.

## Contributing

Contributions are welcome! If you have any ideas for improvements or bug fixes, feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
