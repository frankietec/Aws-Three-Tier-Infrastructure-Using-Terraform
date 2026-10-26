
# Employee Management System

A full-stack employee management system with a RESTful API backend and a modern React frontend, designed to support organizational employee management with PostgreSQL as the database.

## 🚀 Quick Deploy to Render

This application is ready for deployment to [Render.com](https://render.com) using Docker!

**Two ways to deploy:**

1. **Blueprint (Recommended)** - One-click deployment using `render.yaml`
   - Fork this repository
   - Click **New Blueprint** in Render
   - Connect your repository
   - Deploy automatically with all services configured

2. **Manual** - Step-by-step deployment with full control

📖 **[Complete Deployment Guide →](DEPLOY.md)**

## Repository Structure

```
employee-management-api/
├── frontend/           # React frontend application
├── backend/           # Node.js API (root level)
├── docker-compose.yml # Docker orchestration for full stack
└── README.md         # This file
```

## Application Overview

This application is an employee management system designed for administrators and company employees. Administrators can add new employees, edit their data, assign positions, manage salary levels, and view salary increase histories. The system now includes comprehensive project management capabilities, allowing administrators to create and manage projects, assign multiple projects to employees, and track project status. The application automatically tracks salary raise dates for employees and sends notifications to administrators one month before the scheduled increase. Additionally, the system sends notifications about upcoming employee birthdays to help administrators congratulate employees on time.

Employees can update their personal information, such as name, contact details, and programming languages, while certain fields, like salary or position, are editable only by administrators. Employees can be assigned to multiple projects simultaneously, with project information visible on their profiles. All changes to employee profiles are automatically logged, and notifications are sent to administrators. Notifications also include employee status updates, such as assigned projects or English language proficiency. The application ensures regular data checks and sends important notifications through a task scheduler.

## Features

### Backend API
- **Employee Management**: Create, read, update, and delete employee records.
- **Project Management**: Full CRUD operations for projects with many-to-many employee-project relationships.
- **Data Validation**: Ensures data integrity with robust validation and input sanitization.
- **Search and Filter**: Allows filtering employees and projects by various criteria.
- **Pagination**: Supports paginated employee and project listings.
- **Error Handling**: Comprehensive error management for reliability.
- **Authentication**: JWT-based authentication system with role-based access control.
- **Notifications**: Automated notification system for birthdays and salary reviews.
- **Transaction Support**: Database transactions for data consistency.

### Frontend Application
- **Modern UI**: Built with React, Vite, Shadcn UI, and Tailwind CSS.
- **Authentication**: Secure login and registration.
- **Employee Management**: View, create, edit, and delete employees.
- **Project Management**: Full CRUD interface for projects with role-based access control.
- **Employee-Project Assignment**: Assign multiple projects to employees with visual indicators.
- **Responsive Design**: Works on desktop, tablet, and mobile.
- **Real-time Updates**: Notifications and data updates.
- **Interactive Components**: Clickable project cards, modals, and dynamic forms.

## Screenshots

### Login Page
![Login Page](screenshots/login-page.png)

### Employee List
![Employee List](screenshots/employee-list.png)

### Employee Detail
![Employee Detail](screenshots/employee-detail.png)

### Create Employee
![Create Employee](screenshots/create-employee.png)

### Projects Management
![Projects Page](screenshots/projects-page.png)

## Quick Start with GitHub Codespaces

The easiest way to get started is using GitHub Codespaces, which provides a fully configured development environment in the cloud.

### Prerequisites
- A GitHub account
- Access to GitHub Codespaces

### Setup

1. Click the **Code** button on the GitHub repository page
2. Select the **Codespaces** tab
3. Click **Create codespace on main** (or your preferred branch)

GitHub will automatically:
- Set up the development environment
- Configure port forwarding for ports 3000 (backend) and 5173 (frontend)
- Install VS Code extensions for linting and formatting

### Running the Application

Once your Codespace is ready:

1. Copy environment files:
   ```bash
   cp .env.example .env
   cp frontend/.env.example frontend/.env
   ```

2. Start all services with Docker Compose:
   ```bash
   docker compose --profile dev up
   ```

   This starts:
   - **PostgreSQL Database** (internal only)
   - **Backend API** on port 3000 (automatically forwarded)
   - **Frontend Application** on port 5173 (automatically forwarded)

3. Access the application:
   - GitHub Codespaces will automatically forward ports
   - Click on the "Ports" tab in VS Code to see forwarded ports
   - Open the frontend URL (port 5173) in your browser

**Default Admin Credentials:**
- Email: `admin@example.com`
- Password: `adminpassword`

### Manual Setup in Codespaces (without Docker)

If you prefer to run services manually:

1. **Terminal 1 - Backend**:
   ```bash
   npm install
   npm run dev
   ```

2. **Terminal 2 - Frontend**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

The backend runs on port 3000 and frontend on port 5173. Both ports are automatically forwarded by Codespaces.

### Troubleshooting in Codespaces

**Connection Refused Errors:**
- Ensure backend is running on port 3000 (check terminal output)
- Verify `.env` file exists with `PORT=3000`
- Check port 3000 is forwarded in the Ports tab
- Ensure `VITE_API_URL=http://localhost:3000` in `frontend/.env`

**CORS Errors:**
- Update `CORS_ORIGIN` in `.env` to match your Codespaces frontend URL
- Or set `CORS_ORIGIN=*` for development

For more details, see [.devcontainer/README.md](.devcontainer/README.md).

## Quick Start with Docker

The application uses Docker Compose with profile-based execution for different environments.

### Prerequisites
- Docker and Docker Compose installed
- Git (to clone the repository)

### Setup

1. Clone the repository and navigate to the project directory:
   ```bash
   git clone https://github.com/dreamquality/employee-management-api.git
   cd employee-management-api
   ```

2. Copy environment files:
   ```bash
   cp .env.example .env
   cp .env.test.example .env.test
   cp .env.e2e.example .env.e2e
   ```

3. (Optional) Update environment variables in `.env` files for your setup

### Running the Application

#### Development Mode (Recommended)
Start all services for local development:
```bash
docker compose --profile dev up
```

This starts:
- **PostgreSQL Database** (internal only - not exposed to host, accessible via `docker compose exec`)
- **Backend API** on port 3000
- **Frontend Application** on port 5173

Access the application at `http://localhost:5173`

**Default Admin Credentials:**
- Email: `admin@example.com`
- Password: `adminpassword`

#### CI Testing Mode
Run automated tests (used in GitHub Actions):
```bash
docker compose --profile ci up --abort-on-container-exit --exit-code-from test
```

Clean up after tests:
```bash
docker compose --profile ci down -v
```

#### E2E Testing Mode
Run end-to-end tests (requires Playwright setup):
```bash
docker compose --profile e2e up --abort-on-container-exit --exit-code-from playwright
```

> Note: The `playwright` service in `docker-compose.yml` currently uses a placeholder command that exits with an error. Playwright is not configured by default. Before using the `e2e` profile, configure Playwright in the frontend and add a `test:e2e` script to `frontend/package.json` that runs your E2E tests. Until this is done, running the E2E profile will fail as expected.
### Docker Compose Profiles

The application supports three profiles for different use cases:

| Profile | Services | Use Case |
|---------|----------|----------|
| `dev` | app, frontend, db | Local development with hot reload |
| `ci` | app, db, test | Automated testing in CI/CD pipelines |
| `e2e` | app, frontend, db, playwright | End-to-end testing |

### Common Docker Commands

```bash
# Stop all services
docker compose down

# Stop and remove volumes (clean slate)
docker compose down -v

# View logs
docker compose logs -f

# View logs for specific service
docker compose logs -f app

# Access database
docker compose exec db psql -U postgres -d my_database

# Rebuild containers
docker compose build --no-cache
```

### Docker Architecture

The refactored Docker setup includes:

- **Isolated Networking**: Database is not exposed to host, services communicate via Docker network
- **Health Checks**: App service includes health check endpoint (`/health`) to ensure proper startup order
- **Environment Files**: All secrets and configuration in `.env` files (not committed to Git)
- **Entrypoint Scripts**: Migrations run automatically before app/tests start
- **Profile-Based**: Run only the services you need for your task

### Troubleshooting Docker

| Problem | Solution |
|---------|----------|
| "no configuration file provided" | Run: `cp .env.example .env` |
| Services don't start | Ensure you specify a profile: `--profile dev` |
| Can't connect to DB from host | DB is internal only, use: `docker compose exec db psql -U postgres` |
| Health check fails | Check logs: `docker compose logs app` |
| CORS errors in browser | Check `CORS_ORIGIN` in `.env` file |

### GitHub Actions Integration

The CI workflow automatically uses Docker Compose:

```yaml
- name: Setup environment files
  run: |
    cp .env.test.example .env.test
    cp .env.example .env

- name: Run tests with Docker Compose
  run: |
    docker compose --profile ci up --abort-on-container-exit --exit-code-from test
```

This ensures consistency between local development and CI environments.

## Manual Setup

### Backend API Setup

### Prerequisites

- **Node.js**: Install [Node.js](https://nodejs.org/) (version 18 or higher recommended).
- **npm**: Comes with Node.js but can be updated independently.
- **PostgreSQL**: Install and configure [PostgreSQL 16](https://www.postgresql.org/) as the database for employee data.

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/dreamquality/employee-management-api.git
   ```
2. Navigate to the project directory:
   ```sh
   cd employee-management-api
   ```
3. Install dependencies:
   ```sh
   npm install
   ```

### Configuration

1. Create a `.env` file in the root of the project.
2. Add the following environment variables:
   ```plaintext
   # Локальная база данных
   DB_HOST=127.0.0.1
   DB_PORT=5432
   DB_NAME=employee_db
   DB_USER=your_local_db_user
   DB_PASSWORD=your_local_db_password

   # Секреты
   JWT_SECRET=your_jwt_secret
   SECRET_WORD=your_secret_word_for_admin_registration

   # Среда разработки
   NODE_ENV=development

   # Порт (опционально, по умолчанию 3000)
   PORT=3000
   ```
   - `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`: Данные для подключения к базе данных PostgreSQL.
   - `JWT_SECRET`: Секретный ключ для аутентификации JWT.
   - `SECRET_WORD`: Секретный ключ для регистрации администратора.
   - `NODE_ENV`: Указывает среду выполнения.
   - `PORT`: Порт, на котором будет работать сервер (по умолчанию 3000).

Замените `your_local_db_user`, `your_local_db_password`, `your_jwt_secret`, и `your_secret_word_for_admin_registration` на свои реальные значения.

### Running the Application

Start the server in development mode:
   ```sh
   npm run dev
   ```
The server will be running at `http://localhost:3000`.

### API Documentation

Access the interactive API documentation at [http://localhost:3000/api-docs](http://localhost:3000/api-docs) if Swagger or a similar tool is set up. This documentation provides a complete view of the available endpoints and allows for interactive testing.

### Frontend Setup

1. Navigate to the frontend directory:
   ```sh
   cd frontend
   ```

2. Install frontend dependencies:
   ```sh
   npm install
   ```

3. Create a `.env` file in the frontend directory:
   ```sh
   cp .env.example .env
   ```

4. Update the `.env` file with the API URL:
   ```plaintext
   VITE_API_URL=http://localhost:3000
   ```

5. Start the frontend development server:
   ```sh
   npm run dev
   ```

The frontend will be available at `http://localhost:5173`.

For more details about the frontend, see the [frontend README](./frontend/README.md).

## Deployment

### Deploying to Render.com

**🚀 This application is production-ready for deployment to Render via Docker!**

For detailed deployment instructions, see **[DEPLOY.md](DEPLOY.md)**.

#### Quick Overview

This application provides multiple deployment options:

1. **Blueprint Deployment (Easiest)**
   - One-click deployment using the included `render.yaml`
   - Automatically creates database, backend, and frontend services
   - Pre-configured with environment variables

2. **Manual Deployment (More Control)**
   - Deploy services individually
   - Customize each service configuration
   - Full control over environment variables and settings

#### What's Included

- ✅ Production-optimized Dockerfiles
- ✅ Render Blueprint (`render.yaml`)
- ✅ Database migration automation
- ✅ Health check endpoint
- ✅ Environment variable templates
- ✅ Comprehensive deployment guide

#### Key Features for Render

- **Docker-based**: No build script configuration needed
- **Auto-migrations**: Database migrations run automatically on deployment
- **Health checks**: Built-in `/health` endpoint for service monitoring
- **Database URL support**: Works with Render's PostgreSQL connection strings
- **CORS configured**: Ready for separate frontend/backend deployment

📖 **[Read the Complete Deployment Guide](DEPLOY.md)** for step-by-step instructions, troubleshooting, and best practices.

### Legacy Docker Setup (Old Method)

For backward compatibility, you can still use the old method without profiles:

```bash
# Start all services
docker compose up --build
```

However, it's recommended to use the profile-based approach described in the "Quick Start with Docker" section above for better control and CI integration.

## API Documentation

Access the interactive API documentation at [http://localhost:3000/api-docs](http://localhost:3000/api-docs) to view and test available endpoints.

### Available Scripts

- **`npm run dev`**: Runs the app in development mode with hot reloading.
- **`npm start`**: Runs the app in production mode.
- **`npm test`**: Runs test cases for the application.
- **`npm run build:swagger`**: Generates static HTML Swagger documentation in the `docs/` folder.
- **`npm run lint`**: Lints the project files to enforce consistent code style.

## Continuous Integration

This project uses GitHub Actions for automated testing and documentation deployment. Tests run automatically on:
- Push to `main` or `develop` branches
- Pull requests to `main` or `develop` branches

The CI workflow uses Docker Compose with the `ci` profile:
1. Sets up environment files
2. Runs tests in isolated Docker containers using `docker compose --profile ci up`
3. Automatically cleans up containers and volumes
4. Generates Swagger documentation (only on `main` branch)
5. Deploys documentation to GitHub Pages in the `docs/` folder (only on `main` branch)

This approach ensures consistency between local development and CI environments, as both use the same Docker Compose configuration.

The generated documentation is automatically published to GitHub Pages at `https://<username>.github.io/<repo>/docs/` after successful test runs on the main branch.

You can view the test status in the repository's Actions tab.

## API Endpoints

### Authentication
| Method | Endpoint                          | Description                               |
|--------|-----------------------------------|-------------------------------------------|
| POST   | `/login`                         | Authenticate user                         |
| POST   | `/register`                      | Register a new user                       |

### Users
| Method | Endpoint                          | Description                               |
|--------|-----------------------------------|-------------------------------------------|
| GET    | `/users`                         | List all users (with pagination, filtering, sorting) |
| GET    | `/users/:id`                     | Get a specific user by ID                |
| POST   | `/users`                         | Create a new user (admin only)            |
| PUT    | `/users/:id`                     | Update user information                   |
| DELETE | `/users/:id`                     | Delete a user (admin only)               |
| GET    | `/users/me`                      | Get current user's profile                |

### Projects
| Method | Endpoint                                    | Description                               |
|--------|---------------------------------------------|-------------------------------------------|
| GET    | `/projects`                                | List all projects (with pagination, filtering, search) |
| GET    | `/projects/:id`                            | Get a specific project by ID              |
| POST   | `/projects`                                | Create a new project (admin only)         |
| PUT    | `/projects/:id`                            | Update project information (admin only)   |
| DELETE | `/projects/:id`                            | Delete a project (admin only)            |
| POST   | `/projects/:id/employees`                  | Assign multiple employees to project (admin only) |
| POST   | `/projects/:id/employee`                   | Add single employee to project (admin only) |
| DELETE | `/projects/:id/employees/:employeeId`      | Remove employee from project (admin only) |
| GET    | `/projects/:id/employees`                  | Get all employees assigned to a project   |

### Notifications
| Method | Endpoint                          | Description                               |
|--------|-----------------------------------|-------------------------------------------|
| GET    | `/notifications`                 | Get all notifications for the user        |
| POST   | `/notifications/mark-as-read`    | Mark notifications as read                |

### Example Requests

#### User Management
- **Get all users**: `GET /users?page=1&limit=10&sortBy=registrationDate&order=DESC`
- **Get user by ID**: `GET /users/:id`
- **Add new user**: `POST /users` with JSON body containing user data
- **Update user**: `PUT /users/:id` with JSON body of updated data (includes `projectIds` array for project assignment)
- **Delete user**: `DELETE /users/:id`
- **Get current user's profile**: `GET /users/me`

#### Authentication
- **User login**: `POST /login` with JSON body containing credentials
- **User registration**: `POST /register` with JSON body containing user details

#### Project Management
- **Get all projects**: `GET /projects?page=1&limit=10&active=true&search=project name`
- **Get project by ID**: `GET /projects/:id`
- **Create project**: `POST /projects` with JSON body:
  ```json
  {
    "name": "Project Name",
    "description": "Project description",
    "wage": 5000,
    "active": true
  }
  ```
- **Update project**: `PUT /projects/:id` with JSON body of updated data
- **Delete project**: `DELETE /projects/:id`
- **Assign employees to project**: `POST /projects/:id/employees` with JSON body:
  ```json
  {
    "employeeIds": [1, 2, 3]
  }
  ```
- **Add single employee**: `POST /projects/:id/employee` with JSON body:
  ```json
  {
    "employeeId": 1
  }
  ```
- **Remove employee from project**: `DELETE /projects/:id/employees/:employeeId`
- **Get project employees**: `GET /projects/:id/employees`

#### Notifications
- **Get notifications**: `GET /notifications`
- **Mark notifications as read**: `POST /notifications/mark-as-read` with JSON body containing notification IDs

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

1. Fork the repository.
2. Create a new branch for your feature: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m 'Add feature'`.
4. Push to the branch: `git push origin feature-name`.
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

=====================================================================================================

# AWS Three-Tier Application Runbook

This repository is a learning monorepo for deploying a frontend, backend, and data tier on AWS with Terraform and Kubernetes.

## Repository layout

```text
infra/                 Terraform infrastructure and platform manifests
frontend/              React application and Dockerfile
backend/               Node.js/Express application and Dockerfile
app-manifests/         Kubernetes application, database, ingress, and TLS manifests
.github/workflows/     Infrastructure, frontend, and backend pipelines
```

## Architecture

Terraform provisions:

- A VPC with public, private, and intra subnets.
- An EKS 1.35 cluster with `c7i-flex.large` managed worker nodes.
- The AWS EBS CSI managed add-on, configured with IRSA and an encrypted `gp3` StorageClass.
- Amazon Linux 2023 worker AMIs with On-Demand capacity.
- An RDS PostgreSQL instance in private subnets.
- ECR repositories:
  - `dev-frontend`
  - `dev-backend`
- NGINX Ingress, cert-manager, and Argo CD through Helm. Argo CD is the
  deployment controller for the application manifests.
- kube-prometheus-stack through Helm, with persistent gp3 storage and Grafana
  exposed through NGINX Ingress.
- Route 53 records for `fkvr.xyz`.

The application ingress uses:

```text
https://fkvr.xyz        Frontend
https://api.fkvr.xyz    Backend
https://argocd.fkvr.xyz  Argo CD
https://grafana.fkvr.xyz  Grafana
```

## Prerequisites

Install and configure:

- AWS CLI
- Terraform >= 1.5
- kubectl
- Helm >= 3
- Node.js and npm
- Docker

The AWS identity used locally and by GitHub Actions needs permissions for EKS, EC2, RDS, ECR, Route 53, IAM, S3, and related services.

## Terraform state backend

Terraform state uses the S3 backend configured in [infra/backend.tf](./infra/backend.tf).

The bucket must exist before Terraform initialization:

```bash
aws s3api head-bucket \
  --bucket 3infra-bucket \
  --region us-east-1
```

The state bucket should have versioning and encryption enabled. Do not delete it while the environment is in use.

## Deploy infrastructure

From the repository root:

```bash
cd infra
terraform init
terraform fmt -check -recursive
terraform validate
terraform plan -out=tfplan
terraform apply tfplan
```

The GitHub Actions equivalent is [infra-cicd.yaml](./.github/workflows/infra-cicd.yaml):

1. A push to `main` that changes `infra/**` runs format, validation, TFLint, tfsec, and plan.
2. The plan is uploaded as an artifact.
3. Use **Actions -> Deploy to AWS with Terraform -> Run workflow**.
4. Choose `apply` or `destroy`.

There is no environment reviewer gate. The workflow's manual action choice is the operational safeguard.

After EKS is created, configure kubectl:

```bash
aws eks update-kubeconfig \
  --region us-east-1 \
  --name fkvr-app-dev-cluster
kubectl get nodes
aws eks describe-addon \
  --cluster-name fkvr-app-dev-cluster \
  --addon-name aws-ebs-csi-driver \
  --region us-east-1

terraform output eks_oidc_provider_arn
terraform output eks_oidc_issuer_url
```

Terraform creates the EBS CSI add-on after the cluster and its OIDC provider
are ready. The add-on uses the `AmazonEBSCSIDriverPolicy` through a dedicated
IRSA role; no `eksctl create addon` step is required. The `gp3` StorageClass
is created by Terraform and is used by the MySQL StatefulSet.

Terraform also installs the Prometheus community `kube-prometheus-stack` chart
in the `monitoring` namespace. Grafana uses the shared NGINX ingress and the
existing cert-manager `http-01-production` ClusterIssuer; Prometheus,
Alertmanager, and Grafana data are persisted on the encrypted `gp3`
StorageClass. Terraform generates the Grafana admin password and Helm stores
it in the `monitoring` namespace:

```bash
kubectl get secret prometheus-grafana -n monitoring \
  -o jsonpath="{.data.admin-password}" | base64 --decode
```

## Deploy the application with Argo CD

Terraform installs and configures Argo CD in the `argocd` namespace, including
the TLS-protected Argo CD Ingress at
`https://argocd.fkvr.xyz`. Application resources under
`app-manifests/` are intended to be delivered through Argo CD, not applied
individually with `kubectl`.

After Terraform has completed:

1. Open Argo CD at `https://argocd.fkvr.xyz`.
2. Create or update the Argo CD Application to use this repository as its
   source, with `app-manifests/` as the path and the target EKS cluster and
   namespace configured for the application.
3. Enable automated sync and pruning if that is the desired environment
   policy.
4. Sync the application from the Argo CD UI or CLI.

The application CI/CD workflows build and publish frontend and backend images.
The `update-manifest` workflow then updates the image references in
`app-manifests/frontend-deployment.yaml` and
`app-manifests/backend-deployment.yaml`. Argo CD detects those Git changes and
reconciles the workloads into the cluster.

For this learning environment, the backend manifest sets `CORS_ORIGINS=*` so
students can connect to the API from different frontend hosts. Restrict this
value to trusted frontend origins before using the deployment for production.

The MySQL migration is represented by a one-shot Job in the application
manifests. It waits for the `mysql` service, reads the password from
`mysql-secret`, reads the database name from `mysql-config`, and executes the
SQL in the migration ConfigMap. For a new schema migration, use a new Job name
such as `mysql-migration-v2`; completed Jobs do not automatically run again.

Use `kubectl` for read-only operational checks:

```bash
kubectl get pods
kubectl get job mysql-migration
kubectl logs job/mysql-migration
```

## Application CI/CD

The application pipelines are:

- [frontend-cicd.yaml](./.github/workflows/frontend-cicd.yaml)
- [backend-cicd.yaml](./.github/workflows/backend-cicd.yaml)

### Automatic build and release

A push to `frontend/**` or `backend/**` on `main` runs the matching pipeline:

1. Install dependencies with `npm ci`.
2. Run lint.
3. Run tests.
4. Build the Docker image.
5. Push it to ECR.
6. Create a GitHub Release using the same image tag.

Image and release tags are identical:

```text
frontend-<run-number>
backend-<run-number>
```

For example:

```text
323149985350.dkr.ecr.us-east-1.amazonaws.com/dev-frontend:frontend-42
323149985350.dkr.ecr.us-east-1.amazonaws.com/dev-backend:backend-43
```

### Manual rebuild

Use **Actions -> Frontend CI/CD** or **Backend CI/CD -> Run workflow**, then choose `build`.

This rebuilds and pushes an image even when no new application commit exists. It also creates a matching GitHub Release.

### Promote the latest release to Kubernetes

Run the matching workflow manually and choose `update-manifest`.

The workflow automatically finds the latest release for that application, updates the corresponding deployment manifest, commits it, and pushes it:

```text
app-manifests/frontend-deployment.yaml
app-manifests/backend-deployment.yaml
```

No image tag needs to be entered manually.

## Local application checks

Frontend:

```bash
cd frontend
npm ci
npm run lint -- --max-warnings=0
CI=true npm test -- --watchAll=false --runInBand
npm run build
```

Backend:

```bash
cd backend
npm ci
npm run lint
npm test
```

The backend test is a lightweight Node smoke test and does not require a live database.

## GitHub Actions configuration

Add these repository secrets under **Settings -> Secrets and variables -> Actions**:

```text
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
```

The workflows derive the ECR registry from the authenticated AWS account, so an `ECR_REPO` variable is not required.

Never commit:

```text
frontend/.env
backend/.env
app-manifests/secret.yaml
```

These files contain environment-specific values or credentials and are ignored by `.gitignore`. Use GitHub Secrets, Kubernetes Secrets, or an external secret manager for real environments.

## Troubleshooting

### Terraform backend does not exist

Create the configured S3 bucket before running `terraform init`, or update [infra/backend.tf](./infra/backend.tf) to an existing bucket.

### ECR login targets Docker Hub

The workflow must authenticate AWS first and derive an ECR repository from `aws sts get-caller-identity`. If it targets `registry-1.docker.io`, check AWS credentials and rerun the workflow.

### EKS node group AMI error

Confirm [infra/EKS.tf](./infra/EKS.tf) uses EKS 1.35 and [infra/terraform.tfvars](./infra/terraform.tfvars) contains:

```hcl
instance_types = ["c7i-flex.large"]
capacity_type  = "ON_DEMAND"
ami_type       = "AL2023_x86_64_STANDARD"
```

### Terraform destroy cannot delete ECR

The ECR resources use `force_delete = true` for this learning environment. Destroying them removes all images in the repositories. Do not use this setting for production without an explicit retention policy.

### Helm uninstall times out

Inspect the cluster and release:

```bash
helm list --all-namespaces
kubectl get pods --all-namespaces
kubectl get namespace cert-manager
```

If the EKS cluster is already gone, rerun Terraform destroy so Terraform can reconcile the remaining state.

## Cleanup

To destroy the learning environment, use the infrastructure workflow and choose `destroy`, or run:

```bash
cd infra
terraform destroy
```

This can delete EKS, RDS, ECR repositories and images, networking, DNS records, and supporting IAM resources. Confirm that the AWS account and state bucket are the intended ones before proceeding.
