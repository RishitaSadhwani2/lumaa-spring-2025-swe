Task Management Application

This repository contains a full-stack Task Management application with a React + TypeScript frontend and a Node.js (Express) + TypeScript backend. The backend uses MySQL as its database and provides user registration, login (with password hashing and JWT authentication), and full CRUD operations for tasks.

Table of Contents

Database Setup
Environment Variables
Backend Setup and Run Instructions
Frontend Setup and Run Instructions
Testing Notes
Salary Expectations
Demo Video
Project Structure
Database Setup

Install and Run MySQL: Ensure you have MySQL installed and running on your system.

Create the Database: Open your MySQL client (or use the MySQL command-line interface) and execute:

CREATE DATABASE taskmanagementappdatabase;

Create the Required Tables: Run the following SQL commands to create the users and tasks tables:

-- Create the "users" table CREATE TABLE IF NOT EXISTS users ( id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(50) UNIQUE NOT NULL, password VARCHAR(255) NOT NULL );

-- Create the "tasks" table CREATE TABLE IF NOT EXISTS tasks ( id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255) NOT NULL, description TEXT, isComplete BOOLEAN DEFAULT false, userId INT, FOREIGN KEY (userId) REFERENCES users(id) );

Environment Variables

Backend: In the backend folder, create a file named .env and add the following:

PORT=5000 DB_HOST=localhost DB_USER=root DB_PASSWORD=root DB_NAME=taskmanagementappdatabase DB_PORT=3306 JWT_SECRET=your_jwt_secret

Frontend: In the frontend folder, create a file named .env and add the following:

REACT_APP_API_URL=http://localhost:5000

Backend Setup and Run Instructions

Navigate to the backend folder: cd backend

Install Dependencies: npm install

Run the Backend Server: For development with auto-reloading: npm run dev Or to run normally: npm start The backend server will start on port 5000 (as specified in your .env file).

Frontend Setup and Run Instructions

Navigate to the frontend folder: cd frontend

Install Dependencies: npm install

Run the Frontend Application: npm start The React application will launch on http://localhost:3000 and will connect to the backend using the API URL defined in its .env file.

Testing Notes

Registration and Login:

Open the application in your browser.
Navigate to the Register page to create a new account.
Log in using the registered credentials. Upon successful login, a JWT token will be stored in localStorage.
Task Management:

After logging in, the Tasks page will display your task list.
Create a new task using the provided form.
Update a task (for example, mark it as complete or incomplete) by clicking the corresponding button.
Delete a task using the Delete button.
API Testing: You can also test the backend endpoints using tools like Postman. Use /auth/register and /auth/login for authentication, and /tasks for task operations. Make sure to include the JWT token in the Authorization header when testing protected routes.

Salary Expectations

My salary expectation is $X,XXX per month. (Please update this with your actual expectation.)

Demo Video

A short demo video showcasing the registration, login, and task management functionalities is available here: Click here to view the demo video: https://yourdemo.link

Project Structure

After setting up this repository, the folder structure should look like this:

lumaa-spring-2025-swe/ ├─ backend/ // Contains the Node.js (Express) + TypeScript backend code │ ├─ src/ │ │ ├─ controllers/ │ │ │ ├─ authController.ts │ │ │ └─ taskController.ts │ │ ├─ middleware/ │ │ │ └─ authMiddleware.ts │ │ ├─ routes/ │ │ │ ├─ authRoutes.ts │ │ │ └─ taskRoutes.ts │ │ ├─ db.ts │ │ └─ index.ts │ ├─ package.json │ ├─ tsconfig.json │ └─ .env ├─ frontend/ // Contains the React + TypeScript frontend code │ ├─ src/ │ │ ├─ components/ │ │ │ ├─ Login.tsx │ │ │ ├─ Register.tsx │ │ │ └─ Tasks.tsx │ │ ├─ App.tsx │ │ └─ api.ts │ ├─ package.json │ └─ .env └─ README.md

How to Include This README in Your Repository

Open your repository in VS Code:

Open VS Code.
Go to File → Open Folder... and select the root folder of your cloned repository (e.g., lumaa-spring-2025-swe).
Create or Open the README.md File:

In the Explorer pane on the left, check if a file named README.md exists.
If not, right-click on the root folder and select New File, then name it README.md.
Copy and Paste the Content:

Copy all of the text above.
Paste it into your README.md file.
Save the file (File → Save or press Ctrl+S / Command+S).
Commit and Push the README.md:

Open the integrated terminal in VS Code (View → Terminal).
Make sure you are in the root directory of your repository.
Run: git add README.md git commit -m "Add comprehensive README file" git push origin main Your repository on GitHub will now display this updated README file.


TESTING INISGHTS
-if a user shall try to create a task without body application will give 500 internal error since it hasnt been handled as of now.
End-to-End Testing Instructions

Test Registration
Endpoint: POST /auth/register
Sample Request:
Use the following curl command in your terminal to register a new user:

curl -X POST http://localhost:5000/auth/register -H "Content-Type: application/json" -d '{"username": "testuser", "password": "testpassword"}'

What to Expect:
You should receive a JSON response containing the new user's id and username.

Test Login
Endpoint: POST /auth/login
Sample Request:
Use this command to log in with the registered user:

curl -X POST http://localhost:5000/auth/login -H "Content-Type: application/json" -d '{"username": "testuser", "password": "testpassword"}'

What to Expect:
You should receive a JSON response with a JWT token. Copy the token from the response, as you will use it in the next steps. (Replace TOKEN_HERE in subsequent requests with this token.)

Test Fetching Tasks
Endpoint: GET /tasks
Sample Request:
Use this command to retrieve the list of tasks:

curl -X GET http://localhost:5000/tasks -H "Authorization: Bearer TOKEN_HERE"

What to Expect:
You should receive a JSON array of tasks. If no tasks have been created yet, the array will be empty.

Test Creating a Task
Endpoint: POST /tasks
Sample Request:
Use this command to create a new task:

curl -X POST http://localhost:5000/tasks -H "Content-Type: application/json" -H "Authorization: Bearer TOKEN_HERE" -d '{"title": "Sample Task", "description": "This is a sample task description."}'

What to Expect:
You should receive a JSON response containing the details of the newly created task.

Test Updating a Task
Assume the task created above has an id of 1.
Endpoint: PUT /tasks/1
Sample Request:
Use this command to update the task:

curl -X PUT http://localhost:5000/tasks/1 -H "Content-Type: application/json" -H "Authorization: Bearer TOKEN_HERE" -d '{"title": "Updated Task Title", "description": "Updated description", "isComplete": true}'

What to Expect:
You should receive a JSON response with the updated details of the task.

Test Deleting a Task
Endpoint: DELETE /tasks/1
Sample Request:
Use this command to delete the task:

curl -X DELETE http://localhost:5000/tasks/1 -H "Authorization: Bearer TOKEN_HERE"

What to Expect:
You should receive a JSON message indicating that the task has been deleted (for example, {"message": "Task deleted"}).

Notes:

Replace TOKEN_HERE in each command with the actual JWT token you received from the login request.
You can run these curl commands in your terminal. Alternatively, you may use API testing tools such as Postman to test these endpoints.
Ensure that your backend server is running on port 5000 before executing these commands.