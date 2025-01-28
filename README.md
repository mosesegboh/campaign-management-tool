# Campaign Management Tool

A web application for managing marketing campaigns. It allows advertisers to create, view, and manage their campaigns and payouts in different countries.

## Tech Stack

- Backend: Laravel 11 (PHP 8.1)
- Frontend: React (with Material UI)
- Database: MySQL 8.0
- Authentication: Laravel Sanctum
- Containerization: Docker with Docker Compose (optional)

## Tech Stack Needed to Run

- PHP 8.1 or higher
- Composer 2.x
- Node.js 18.x and npm 8.x
- MySQL 8.0 or higher
- Docker and Docker Compose (optional, for Dockerized setup)

## What the App Does

1. Advertisers can register and log in to manage their campaigns.
2. Campaigns include a title, landing page URL, activity status, and payouts per country.
3. Advertisers can:
    - Create new campaigns.
    - View and manage their existing campaigns.
    - Update and pause/activate campaigns.

Only campaigns belonging to the logged-in advertiser are accessible to them.

## How to Run the App

### 1. Using Docker

Step 1: Clone the repository.

```bash
git clone https://github.com/mosesegboh/campaign-management-tool.git
cd campaign-management-tool
```

Step 2: Start the Docker containers.

```bash
docker-compose up -d --build
```

Step 3: Run migrations and seed the database.

```bash
docker-compose exec app php artisan migrate --force
docker-compose exec app php artisan db:seed --force
```

Step 4: Access the app.

- Frontend: http://localhost:3000
- Backend API: http://localhost/api

To stop the containers, run:

```bash
docker-compose down
```

### 2. Without Docker (Manually)

Step 1: Clone the repository.

```bash
git clone https://github.com/mosesegboh/campaign-management-tool.git
cd campaign-management-tool
```

Step 2: Set up the backend.

```bash
cd backend
cp .env.example .env
composer install
php artisan key:generate
```

Update the `.env` file with your database credentials, for example:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=campaign_management
DB_USERNAME=root
DB_PASSWORD=your_password
```

Run the database migrations and seeders:

```bash
php artisan migrate --force
php artisan db:seed --force
php artisan serve
```

Laravel will start the backend server at http://127.0.0.1:8000.

Step 3: Set up the frontend.

```bash
cd ../frontend
cp .env.example .env
npm install
npm start
```

React will start the development server at http://localhost:3000. Ensure the `REACT_APP_API_URL` in `.env` points to the backend:

```env
REACT_APP_API_URL=http://127.0.0.1:8000/api
```

Step 4: Access the app.

Visit http://localhost:3000 in your browser to use the frontend.

## Testing the App

Run backend tests:

- With Docker:

  ```bash
  docker-compose exec app php artisan test
  ```

- Without Docker:

  ```bash
  cd backend
  php artisan test
  ```

## Notes for Evaluator

1. The typescript front end is inside the root frontend directory.
2. I placed a sql database dump in the root directory just in case you do not want to migrate manually.
3. you can run the app either with Docker or manually as highlighted above.
3. ERD Diagram is in the project root.
4. Ensure the `APP_KEY` in the backend `.env` file is consistent across environments.
3. If using Docker, make sure ports 3000, 9000, and 3306 are free.

For questions or issues, reach out to mosesegboh@yahoo.com. Happy Reviewing!
