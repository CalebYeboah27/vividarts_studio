# Terraform Configuration for AWS Infrastructure

## Overview

This Terraform configuration sets up a basic AWS infrastructure, including a Virtual Private Cloud (VPC), a public subnet, an Internet Gateway, security groups, and an EC2 instance. This configuration is designed to be a starting point for your AWS environment and can be customized based on your specific requirements.

## Prerequisites

- [Terraform](https://www.terraform.io/) installed on your local machine.
- AWS credentials configured with the necessary permissions.

## Configuration Files

### 1. `main.tf`

This file contains the main configuration for creating the AWS infrastructure.

```hcl
provider "aws" {
  region = "us-east-1"  # Change this to your preferred AWS region
}

# VPC
resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"
  enable_dns_support = true
  enable_dns_hostnames = true
  tags = {
    Name = "MyVPC"
  }
}

# Public Subnet
resource "aws_subnet" "public" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.1.0/24"
  map_public_ip_on_launch = true
  availability_zone       = "us-east-1a"  # Change this to your preferred availability zone
  tags = {
    Name = "PublicSubnet"
  }
}

# Internet Gateway
resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id
  tags = {
    Name = "MyIGW"
  }
}

# Security Group
resource "aws_security_group" "main" {
  name        = "MySecurityGroup"
  description = "Allow inbound SSH and HTTP traffic"
  vpc_id      = aws_vpc.main.id

  ingress {
    from_port = 22
    to_port   = 22
    protocol  = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port = 80
    to_port   = 80
    protocol  = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# EC2 Instance
resource "aws_instance" "main" {
  ami             = "ami-xxxxxxxxxxxxxxxx"  # Specify your desired AMI
  instance_type   = "t2.micro"
  subnet_id       = aws_subnet.public.id
  security_group  = [aws_security_group.main.id]

  tags = {
    Name = "MyEC2Instance"
  }
}
```

### 2. `variables.tf`

This file defines any variables used in the configuration.

```hcl
variable "aws_region" {
  description = "The AWS region to deploy resources."
  default     = "us-east-1"
}

# Add any additional variables as needed
```

### 3. `outputs.tf`

This file specifies the output values to display after applying the Terraform configuration.

```hcl
output "public_ip" {
  description = "The public IP address of the EC2 instance."
  value       = aws_instance.main.public_ip
}

# Add any additional outputs as needed
```

## Usage

1. Clone this repository to your local machine.
2. Customize the configuration files (`main.tf`, `variables.tf`, etc.) as needed.
3. Run `terraform init` to initialize your working directory.
4. Run `terraform apply` to create the AWS infrastructure.
5. After completion, Terraform will display the outputs, including the public IP address of the EC2 instance.

## Cleanup

To destroy the created resources, run:

```bash
terraform destroy
```

Confirm the action by typing `yes` when prompted.

**Note:** Ensure that you understand the implications of destroying resources, as it will permanently delete them.

## Disclaimer

This Terraform configuration is a basic setup and may need additional customization based on your specific use case. Review and modify the configuration files accordingly.