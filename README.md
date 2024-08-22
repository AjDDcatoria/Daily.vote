# Daily.Vote

**Daily.Vote** is a voting application where users can create polls, vote on options, and comment on polls. Users can only vote once per poll, and voting is restricted to 24 hours after the poll is created.

<div style='
    display:flex;
    flex-direction:column;
    gap:10px;
    width:100%;
    height:fit;
    align-items:center;
'>
    <img src='.github\img\home.png' style='max-height:408px; border-radius:10px'/>
    <img src='.github\img\create.png' style='max-height:400px; border-radius:10px'/>
    <img src='.github\img\poll.png' style='max-height:420px; border-radius:10px'/>
</div>

## Features

-   **Create Polls**: Users can create polls with multiple options.
-   **Vote**: Users can vote on poll options. Voting is restricted to 24 hours after the poll is created.
-   **Comment**: Users can comment on polls to discuss the options.
-   **Single Vote**: Users can only vote once per poll.

## Tech Stack

-   **Backend**: Laravel
-   **Frontend**: React with TypeScript
-   **Inertia.js**: To manage server-side rendering and frontend routing

## Prerequisites

-   **PHP >= 8.1**
-   **Composer**
-   **Node.js >= 18.x** and **npm** or **yarn**
-   **MySQL/MariaDB/PostgreSQL** (or any other database supported by Laravel)

## Installation

1. **Clone the repository**

    ```bash
    git clone https://github.com/yourusername/daily-vote.git
    cd daily-vote

    ```

2. **Install backend dependencies**

    ```bash
    composer install
    ```

3. **Install frontend dependencies**

    ```bash
    npm install
    ```

4. **Create a .env file** <br/>
   Copy the example .env file and configure your environment variables, especially the database settings.

    ```bash
    cp .env.example .env
    ```

    Open the .env file and update the database settings:

    ```js
    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE="Yout database name"
    DB_USERNAME=root
    DB_PASSWORD=secret
    ```

5. **Generate an application key**
    ```bash
    php artisan key:generate
    ```
6. **Access the application** <br/>
   Open your browser and navigate to http://localhost:8000.
