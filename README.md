# Task Manager REST API with AWS CodePipeline CI/CD

## Overview

This project is a containerized Task Manager REST API deployed on AWS using an AWS-native CI/CD pipeline.

The application is built with Node.js, Express, PostgreSQL, Docker, Amazon ECR, Amazon ECS Fargate, Application Load Balancer, Amazon RDS, AWS CodePipeline, AWS CodeBuild, AWS CodeDeploy, and CloudFormation.

## Target Architecture

GitHub → AWS CodePipeline → AWS CodeBuild → Amazon ECR → AWS CodeDeploy → Amazon ECS Fargate → Application Load Balancer → Amazon RDS PostgreSQL

## Tech Stack

- Node.js
- Express.js
- PostgreSQL
- Prisma ORM
- Docker
- AWS CloudFormation
- AWS CodePipeline
- AWS CodeBuild
- AWS CodeDeploy
- Amazon ECR
- Amazon ECS Fargate
- Application Load Balancer
- Amazon RDS PostgreSQL
- Amazon CloudWatch Logs

## API Scope

| Method | Endpoint | Description |
|---------
| GET 	 | /health  | Health check endpoint |
| GET 	 | /tasks   | Get all tasks |
| GET 	 | /tasks/:id | Get a task by ID |
| POST   | /tasks | Create a task |
| PUT    | /tasks/:id | Update a task |
| DELETE | /tasks/:id | Delete a task |

## Infrastructure as Code

AWS infrastructure will be provisioned using CloudFormation templates under the `infra/` directory.

## CI/CD Strategy

The CI/CD pipeline will use AWS CodePipeline as the orchestrator, CodeBuild to build and push Docker images to Amazon ECR, and CodeDeploy to deploy new task definitions to ECS Fargate using a blue/green deployment strategy.

## Project Status

Phase 0: Project planning, repository structure, and infrastructure-as-code preparation.