# Full Stack To-Do App 🚀  

This is a **Full Stack To-Do Application** built using **Django** for the backend and **React** for the frontend. The app allows users to **add, delete, update, and filter tasks** with a simple user-friendly interface.

---

## Features ✨  

- **User Authentication**: Login functionality using JWT tokens.  
- **Task Management**: Add, delete, and update tasks.  
- **Task Filtering**: Filter tasks by status: **All**, **Pending**, and **Completed**.  
- **Real-Time Feedback**: Toast notifications for success and error messages.  
- **Clean UI**: Responsive design with intuitive UI built using custom CSS.  

---

## Tech Stack 🛠️  

**Frontend**  
- React (Functional Components & Hooks)  
- Axios (API requests)  
- React Toastify (Notifications)  

**Backend**  
- Django REST Framework (API)  
- SQLite (Database)  
- JWT Authentication  

---

## Installation 🔧  

### Prerequisites  
- Node.js & npm  
- Python 3.10+  
- Git  

### Backend Setup  

1. Clone the repository:  
   ```bash
   git clone https://github.com/summerxrt/fullstack-todo-app.git
   cd fullstack-todo-app
   ```

2. Navigate to the backend project and create a virtual environment:  
   ```bash
   cd todo_project
   python -m venv venv
   source venv/bin/activate   # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:  
   ```bash
   pip install -r requirements.txt
   ```

4. Apply migrations and run the server:  
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   python manage.py runserver
   ```

The backend will be available at `http://127.0.0.1:8000/`.

---

### Frontend Setup  

1. Navigate to the frontend directory:  
   ```bash
   cd ../todo-frontend
   ```

2. Install dependencies:  
   ```bash
   npm install
   ```

3. Start the development server:  
   ```bash
   npm start
   ```

The frontend will be available at `http://localhost:3000/`.

---

## API Endpoints 📡  

| Method | Endpoint           | Description              |  
|--------|--------------------|--------------------------|  
| POST   | `/api/token/`      | User login (JWT token)   |  
| GET    | `/api/tasks/`      | Fetch all tasks          |  
| POST   | `/api/tasks/`      | Add a new task           |  
| PUT    | `/api/tasks/{id}/` | Update a specific task   |  
| DELETE | `/api/tasks/{id}/` | Delete a specific task   |  

---

## Screenshots 📸  

### **Login Page**  
![Login](./screenshots/login.png)

### **Task Management Page**  
![Task Management](./screenshots/task-page.png)

---

## Future Improvements 🌱  

- Add user registration functionality.  
- Add task categories and priorities.  
- Implement a dark mode for better UX.  
- Real-time task updates with WebSockets.  

---

## Contributing 🧩  

Contributions are welcome! Feel free to:  
1. Fork this repository.  
2. Create a new branch:  
   ```bash
   git checkout -b feature-branch
   ```  
3. Make your changes and commit them:  
   ```bash
   git commit -m "Add new feature"  
   ```  
4. Push to your branch:  
   ```bash
   git push origin feature-branch
   ```  
5. Create a pull request.  

---

## License 📜  

This project is licensed under the **MIT License**. See the `LICENSE` file for more details.  

---

## Author 👨‍💻  

**Remus**  
- GitHub: [@summerxrt](https://github.com/summerxrt)  
- LinkedIn: [Remus Timofte](https://www.linkedin.com/in/remus-timofte-b9a066318/)  

---
