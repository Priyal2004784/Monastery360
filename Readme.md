# Monastery360: A Digital Heritage Platform

Monastery360 is a full-stack MERN application designed to digitize, showcase, and preserve the rich cultural heritage of Sikkim's monasteries. It provides an immersive platform for tourists, researchers, and spiritual explorers to discover these treasures.

<!-- Add a screenshot of your running application's homepage here! -->

<img width="2560" height="1118" alt="Screenshot (25)" src="https://github.com/user-attachments/assets/7e19cb25-3f58-4bd6-b00a-15925876c06f" />

<!-- Example: ![Monastery360 Homepage](link-to-your-screenshot.png) -->

---
<img width="2536" height="1230" alt="Screenshot (26)" src="https://github.com/user-attachments/assets/a86b4019-e464-4867-b2d6-4bf6970bec1f" />

## Features

-   **Interactive Map:** A Leaflet map displaying geo-tagged locations of all monasteries.
-   **360° Virtual Tours:** Immersive panoramic views of monastery interiors and surroundings on detail pages.
-   **Searchable Database:** A dynamic list of monasteries that can be filtered by tags in real-time.
-   **Detail Pages:** Dedicated pages for each monastery with its history, tags, and virtual tour.
-   **Full Admin Panel:** A complete CRUD (Create, Read, Update, Delete) interface for managing the monastery data.
-   **Basic Security:** The admin panel is protected by a simple password.

## Tech Stack

-   **MongoDB:** NoSQL database for flexible data storage.
-   **Express.js:** Backend framework for building the REST API.
-   **React:** Frontend library for building the user interface.
-   **Node.js:** JavaScript runtime for the server.
-   **Other Key Libraries:** Mongoose, React Router, Axios, Leaflet, Pannellum.

---

## Getting Started: Running the Project Locally

Follow these instructions to set up and run the project on your local machine for development and testing purposes. This guide is for Windows, macOS, and Linux.

### Prerequisites

Before you begin, you will need to have the following software installed on your new PC:

1.  **Node.js and npm:** Node.js is the JavaScript runtime, and npm is its package manager.
    -   [Download Node.js (LTS version is recommended)](https://nodejs.org/)
    -   To verify the installation, open your terminal or command prompt and run:
        ```bash
        node -v
        npm -v
        ```
        You should see version numbers for both.

2.  **Git:** The version control system used to clone this project.
    -   [Download Git](https://git-scm.com/downloads)

3.  **A Code Editor:** We recommend using Visual Studio Code.
    -   [Download VS Code](https://code.visualstudio.com/)

4.  **MongoDB Atlas Account:** We use a free cloud database.
    -   You will need to create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

### Installation and Setup

**Step 1: Clone the Repository**

Open your terminal or Git Bash and navigate to the directory where you want to store the project. Then, clone this repository:

```bash
git clone git@github.com:YourUsername/monastery360.git
cd monastery360
```
*(Replace `YourUsername/monastery360.git` with your actual repository URL)*

**Step 2: Set Up the Backend Server**

The backend needs to connect to your database and requires a secret configuration file.

1.  **Navigate to the backend folder:**
    ```bash
    cd backend
    ```

2.  **Install backend dependencies:**
    ```bash
    npm install
    ```

3.  **Create the environment file (`.env`):**
    This file stores your secret database connection string. Create a new file named `.env` inside the `backend` folder.

4.  **Set up your MongoDB Atlas Database:**
    -   Log in to your [MongoDB Atlas](https://cloud.mongodb.com/) account.
    -   Create a new **Free Tier (M0)** cluster.
    -   In the "Security" section, go to **Database Access** and create a new database user. Remember the username and password.
    -   In the "Security" section, go to **Network Access** and click "Add IP Address". Choose **"ALLOW ACCESS FROM ANYWHERE"** (IP Address `0.0.0.0/0`).
    -   Go back to your cluster's "Overview" and click **"Connect"**. Choose "Drivers" and copy the **Connection String**.

5.  **Add the Connection String to your `.env` file:**
    Paste the connection string into your `.env` file. It must be in this format:
    ```
    MONGO_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/monasteryDB?retryWrites=true&w=majority
    ```
    -   Replace `YOUR_USERNAME` and `YOUR_PASSWORD` with the credentials you created.
    -   Make sure the database name (e.g., `monasteryDB`) is included in the string.

**Step 3: Set Up the Frontend Application**

1.  **Navigate to the frontend folder:** From the project root (`monastery360`), run:
    ```bash
    cd frontend
    ```

2.  **Install frontend dependencies:**
    ```bash
    npm install
    ```

**Step 4: Running the Application**

Our project requires **two** terminals running at the same time: one for the backend and one for the frontend.

1.  **Terminal 1: Start the Backend Server**
    -   Navigate to the backend folder: `cd monastery360/backend`
    -   Run the server:
        ```bash
        node server.js
        ```
    -   You should see the messages: `Server is running on http://localhost:5000` and `MongoDB connection established successfully`.

2.  **Terminal 2: Start the Frontend Application**
    -   Open a **new, separate terminal window**.
    -   Navigate to the frontend folder: `cd monastery360/frontend`
    -   Run the React app:
        ```bash
        npm start
        ```
    -   This will automatically open `http://localhost:3000` in your web browser.

Congratulations! The application is now running on your local machine.

---

## Usage

### Public Website

The main site at `http://localhost:3000` is where you can explore the monasteries. You can use the map to discover them, the search bar to filter them, and click on any monastery to see its dedicated detail page with a 360° photo tour.

### Admin Panel

1.  Navigate to `http://localhost:3000/admin`.
2.  You will be prompted for a password. The password is:
    ```
    sikkim_admin
    ```
3.  In the admin panel, you can add new monasteries, edit existing ones, and delete them from the database. All changes will be reflected on the main website in real-time.

## Contributors

*   Abhinav Kumar Jha
*   Aditi Singh
*   Priyal Meena
*   Rohit Singh
*   Trilokjeet Basu
*   Awanish Patel
