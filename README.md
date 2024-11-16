# Contact Management System

This Contact Management System allows users to add, view, update, and delete contact information for customers or clients. It provides an intuitive interface using ReactJS and Material UI (MUI) components for the frontend, and a NodeJS backend to handle CRUD operations.

## Features

- **Add New Contact**: Allows users to add a contact with details like name, email, phone number, company, and job title.
- **View Contacts**: Displays a list of all contacts in a table with sorting and pagination.
- **Edit Contact**: Users can update contact information when changes occur (e.g., phone number, job title).
- **Delete Contact**: Users can remove outdated or duplicate contacts from the list.
  
## Frontend (ReactJS with MUI Components)

1. **Contact Form**: 
    - Form captures the contact information (First Name, Last Name, Email, Phone Number, Company, Job Title).
    - Uses MUI components for UI consistency.
   
2. **Contacts Table**: 
    - Lists all contacts with actions for editing and deleting.
    - Table is paginated and sortable.

## Backend (NodeJS)

1. **API Endpoints**:
    - `POST /contacts`: Adds a new contact.
    - `GET /contacts`: Retrieves all contact records.
    - `PUT /contacts/:id`: Updates an existing contact.
    - `DELETE /contacts/:id`: Deletes a contact.

2. **Error Handling**:
    - Validation of required fields.
    - Checks for duplicate entries (email or phone number).

## Database

- Chosen Database: **MongoDB**
    - MongoDB is a flexible NoSQL database that works well with unstructured data and supports CRUD operations easily.

## Setup Instructions
1. git clone <repository-url>
### Frontend Setup
cd client
npm install
npm run dev

### Backend Setup
cd server
npm install
npm run dev