
# Test Commerce

This is a 3-page mini-e-commerce application flow built with React.js for the frontend and Express.js for the backend, using Prisma ORM for database management. The application features Product Overview, Checkout Page and Thankyou Page with Email Notifications.

[Live Link](https://esalesoneassignment.onrender.com/)


## Features

- Product Overview
- Checkout Page for doing payments.
- Approve and Decline Transaction Email Notification.


## Tech Stack

**Client:** React, Typescript, TailwindCSS, React-hook-form

**Server:** Express, Typescript

**Database:** PostgreSQL with Prisma ORM

**State Management:** Zustand

**Package Manager:** npm




## Installation

1. Clone the repository:

```bash
git clone https://github.com/Zaeden/eSalesOneAssignment.git
```
2. Navigate into the backend folder and install dependencies:

```bash
cd server
npm install
```

3. Navigate into the frontend folder and install dependencies:
```bash
cd ../client
npm install
```

4. Set up environment variables for backend:

```bash
DATABASE_URL=<postgresql-url>
NODE_ENV="development or production"
PORT=<port-number>
MAILTRAP_HOST=<your-mailtrap-host>
MAILTRAP_PORT=<your-mailtrap-port>
MAILTRAP_USER=<your-mailtrap-user>
MAILTRAP_PASS=<your-mailtrap-pass>
MAILTRAP_FROM=<your-mailtrap-from>
```
5. Set up environment variables for frontend:

```bash
BASE_API_URL=http://localhost:5000
```


## Deployment

**Frontend + Backend:** Render.com
**Database:** NeonDB

To build this project on render 

```bash
cd client && npm install && npm run build && cd ../server && npm run build
```
To run this project on render 

```bash
npm start
```

