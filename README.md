# PopX - User Authentication System

## Overview

A modern authentication system built with React.js that provides user registration, login, and profile management capabilities. The application features a clean, responsive UI and robust form validation.

## Features

- 🔐 User Authentication (Login/Signup)
- 👤 Profile Management
- 📱 Responsive Design
- ✨ Modern UI with Tailwind CSS
- ✅ Form Validation
- 🔄 Session Management

## Tech Stack

- **Frontend Framework:** React.js
- **Styling:** Tailwind CSS
- **Form Management:** React Hook Form
- **Backend Service:** Appwrite
- **Build Tool:** Vite
- **Routing:** React Router DOM
- **Icons:** React Icons

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm/yarn
- Appwrite Instance

### Installation

1. Clone the repository :https://github.com/rishiraj2603/educase_test.git
2. Install dependencies: npm i

```bash
npm install
```

3. Create a `.env` file in the root directory with your Appwrite credentials:

```env
VITE_APPWRITE_URL=your_appwrite_url
VITE_APPWRITE_PROJECT_ID=your_project_id
```

4. Start the development server:

```bash
npm run dev
```

## Project Structure

- `/src/components` - React components
- `/src/Appwrite` - Appwrite service configurations
- `/src/conf` - Configuration files
- `/src/assets` - Static assets

## Features in Detail

- **User Registration:** Complete signup form with validation
- **Authentication:** Secure login system with session management
- **Profile Management:** User profile viewing and editing
- **Responsive Design:** Mobile-friendly interface
- **Form Validation:** Real-time input validation
- **Protected Routes:** Secure route management

## Deployment

The project is configured for deployment on Vercel with proper routing configurations.
