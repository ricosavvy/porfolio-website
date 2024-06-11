# Project README

## Overview

This project is a backend server built using Node.js and Express.js to support a portfolio website. It provides API endpoints for fetching GitHub repositories, handling email services, managing reviews, and serving a simple front-end portfolio.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Dependencies](#dependencies)
- [Scripts](#scripts)
- [Contributing](#contributing)


## Features

- Fetches GitHub repositories via an API proxy.
- Handles email submissions through a contact form.
- Manages user reviews.
- Toggles light/dark mode for the front-end.
- Dynamically displays GitHub repositories and user reviews.

## Installation

1. **Clone the repository:**

    ```sh
    git clone https://github.com/ricosavvy/portfolio-website.git
    cd portfolio-website
    ```

2. **Install dependencies:**

    ```sh
    npm install
    ```

3. **Set up environment variables:**

    Create a `.env` file in the root directory with the following content:

    ```env
    GITHUB_API_TOKEN=your_github_api_token
    GMAIL_USER=your_gmail_user
    GMAIL_PASS=your_gmail_password
    ```

4. **Set up the database:**

    Ensure SQLite3 is set up and configured in `config/db.js`.

## Usage

1. **Start the server:**

    ```sh
    npm start
    ```

    The server will run on `http://localhost:3000`.

2. **Access the front-end:**

    Open `portfolio.html` in your browser to interact with the portfolio site.

## API Endpoints

- **Fetch GitHub Repositories:**

  - **GET** `/api/github/repos`
  - Fetches repositories from the GitHub API using a proxy.

- **Send Email:**

  - **POST** `/message`
  - Sends an email via the Gmail SMTP server.

- **Create Review:**

  - **POST** `/reviews/create`
  - Creates a new review in the database.

- **Get Reviews:**

  - **GET** `/reviews`
  - Retrieves all reviews from the database.

## Dependencies

- `body-parser`: ^1.20.2
- `cors`: ^2.8.5
- `dotenv`: ^16.4.5
- `express`: ^4.19.2
- `mysql2`: ^3.10.0
- `nodemailer`: ^6.9.13
- `sqlite3`: ^5.1.7

## Scripts

- **Start the server:**

    ```sh
    npm start
    ```

- 

- **Stop the server:**

    ```sh
    npm run stop
    ```

## Contributing

Contributions are welcomed and encouraged! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -am 'Add new feature'`).
4. Push your changes to the branch (`git push origin feature-branch`).
5. Submit a pull request.

