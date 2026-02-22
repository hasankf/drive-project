🚀 Cloud Drive – Cloud Storage & File Management System


A full-stack cloud storage application that allows users to securely upload, manage, and access files from anywhere. Built with scalable backend architecture, secure authentication, and optimized storage handling.


📌 Overview


DriveX is a secure and efficient file storage platform inspired by modern cloud drive systems. It enables authenticated users to upload, retrieve, and manage their documents seamlessly with a clean and responsive UI.
The system focuses on:
Security
Performance
Clean architecture
Scalable storage integration


✨ Key Features


🔐 Authentication & Authorization
Secure user registration & login
Password hashing using bcrypt
JWT-based authentication
Protected routes


📂 File Management


Upload files securely
Store files using cloud storage integration
Retrieve and access uploaded documents
Organized file handling


☁️ Cloud Storage Integration


External storage bucket integration
Efficient file handling with middleware
Optimized upload processing


🛠 Backend Architecture


RESTful API design
MVC project structure
Clean route handling
Error handling & validation


📊 Scalability & Security


Modular backend structure
Secure environment configuration
Token-based session handling
Middleware-driven request validation
🏗 Tech Stack


Backend
Node.js
Express.js
MongoDB (Mongoose)
JWT
bcrypt
Frontend
EJS (Server-Side Rendering)
HTML / CSS
Storage
Cloud Storage Integration (e.g., Supabase / similar bucket service)



⚙️ Installation & Setup


Clone the repository
git clone https://github.com/your-username/drivex.git

Navigate to project folder
cd drivex
Install dependencies
npm install
Create a .env file and add:
PORT=3000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
STORAGE_KEY=your_storage_key
Start the server
npm run dev


🚧 Future Improvements


File sharing between users
Folder structure support
Role-based access control
File preview functionality
Pagination & search


👨‍💻 Author


Hasan


Delhi Technological University


Full-Stack & Systems Enthusiast
