# Task Management System

## Project Description

This is a simple Task Management System that allows users to manage their daily tasks efficiently. The project consists of a PHP-based RESTful API backend and a Vue 3 frontend interface. Users can create, update, view, and delete tasks, as well as mark tasks as completed.

## Features

- RESTful API backend for task CRUD operations
- Vue 3 frontend for task management UI
- User login and signup forms (UI only, no backend authentication implemented)
- Add, update, delete, and view tasks
- Mark tasks as completed
- Task due dates with date picker
- Responsive and user-friendly interface

## Technologies Used

- Backend: PHP, MySQL
- Frontend: HTML, CSS, JavaScript, Vue 3, Flatpickr (date picker)
- Other: Font Awesome for icons

## Setup and Installation

### Backend

1. Ensure you have PHP and MySQL installed.
2. Create a MySQL database named `task`.
3. Import or create the `task` table with columns: `id`, `title`, `description`, `due_date`, `status`.
4. Configure database connection in `api/config.php` if needed.
5. Place the project files in your web server root (e.g., `htdocs` for XAMPP).
6. The API entry point is `api/index.php`.

### Frontend

1. Open the `frontend` directory.
2. Open `login.html` or `dashboard.html` in a web browser.
3. The frontend communicates with the backend API at `http://localhost/Task-Managment/api/index.php`.

## API Endpoints

| Method | Endpoint    | Description        |
| ------ | ----------- | ------------------ |
| GET    | /tasks      | Get all tasks      |
| GET    | /tasks/{id} | Get task by ID     |
| POST   | /tasks      | Create a new task  |
| PUT    | /tasks/{id} | Update task status |
| DELETE | /tasks/{id} | Delete a task      |

## Frontend Usage

- Use the login page (`login.html`) to access the system (UI only, no backend auth).
- Use the dashboard (`dashboard.html`) to view, add, complete, and delete tasks.
- Tasks are displayed in Inbox (pending) and Completed tabs.
- Add tasks with title, description, and due date.
- Mark tasks as completed by clicking the checkbox.
- Delete tasks using the delete icon.

## License

This project is open source and free to use.
