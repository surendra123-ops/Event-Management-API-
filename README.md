Event Management REST API, now including:

 User authentication (Register/Login/Logout)
 JWT + Cookie usage
 Protected routes
 Full API documentation
 Setup instructions



# Event Management REST API





# Features

 User Register/Login using JWT and HTTP-only cookies
 Create and manage events with:
  Title, Date/Time, Location, Capacity
  
 Register & Cancel event participation 
 Event stats: total registrations, capacity left, % filled
 List upcoming events (sorted by date + location)
 Prevent double registration and past-event registration

---

 Tech Stack

- Backend: Node.js, Express
- Database: MongoDB (Mongoose)
- Auth: JWT, Cookies, bcrypt
- Others: dotenv, cookie-parser, CORS

---

 Installation & Setup

 1. Clone the Repository


git clone https://github.com/surendra123-ops/Event-Management-API-.git



 2. Install Dependencies


npm install


 3. Configure Environment Variables

Create a `.env` file in the root:



 4. Start the Server


npm run dev






 Authentication

This project uses **JWT stored in HTTP-only cookies. After login/register, the JWT is sent in the cookie for authentication.

All protected routes require the `jwt` cookie to be present.

---

 API Endpoints

USER AUTH ROUTES

| Method | Endpoint              | Description         | 
| ------ | --------------------- | ------------------- | 
| POST   | `/api/users/register` | Register a new user | 
| POST   | `/api/users/login`    | Login & get JWT     | 
| POST   | `/api/users/logout`   | Logout user         | 
| GET    | `/api/users/me`       | Get user profile    | 

 Sample Register Request





EVENT ROUTES

| Method | Endpoint                   | Description              | 
| ------ | -------------------------- | ------------------------ | 
| POST   | `/api/events`              | Create new event         | 
| GET    | `/api/events/:id`          | Get details of an event  | 
| POST   | `/api/events/:id/register` | Register user for event  | 
| POST   | `/api/events/:id/cancel`   | Cancel user registration | 
| GET    | `/api/events/upcoming/all` | List all upcoming events | 
| GET    | `/api/events/:id/stats`    | Get stats of an event    | 

