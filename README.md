# Roomie Rendezvous 🏠

## Description

**Roomie Rendezvous** is an application built for university students seeking roommates attending the same university. Simplify your roommate search and connect with peers headed to the same academic destination. Powered by the PERN stack with TypeScript and Material-UI for a seamless and modern user experience.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [Credits](#credits)
- [.env](#.env)

## Tech Stack

- **Database**: PostgreSQL
- **Backend**: Express & Node.js (with TypeScript)
- **Frontend**: React (with TypeScript and Material-UI)

## Features

- **University Filter**: Easily search for potential roommates attending the same university.
- **Profile Creation**: Create a detailed profile to showcase your preferences and personality.
- **Chat Integration**: Connect and converse with potential roommates directly within the app.
- **Update Profile**: Update your existing profile to fit your current roommate status.
- **Delete Profile**: Delete your profile whenever you like for example after finding the roommate of your choice.

## Installation

1. Clone the repository: `git clone [github.com/cousinjenkins/Roomie_Rendezvous]`.
2. Install PostgreSQL and create a database for the application.
3. Set up a virtual environment (if required) and activate it.
4. Install backend dependencies: `npm install` Express and Typescript.
5. Move to the frontend directory and install frontend dependencies: `cd frontend && npm install`.
6. To install MUI in the frontend, `npm install` MUI.

## Usage

1. Start the backend server: `npm run dev:server`.
2. In a separate terminal, navigate to the frontend directory and start the React app: `cd frontend && npm start`.
3. Register on the application and create a profile.
4. Search for universities to find potential roommates.
5. Use the Chat function to start communicating with your prefered roommates.

## Configuration

- **DATABASE_URL**: Connection string for the PostgreSQL database.

## Contributing

We value community contributions! If you're interested in enhancing Roomie Rendezvous, please see our [CONTRIBUTING.md](link_to_contributing_guide) for the contribution process.

## Credits

- **Cousin Jenkins**: Founder and Lead Developer.

## .env 

- **Front-End**: .env =
REACT_APP_SERVER_URL=http://localhost:3000
ACCESS_SECRET=1234

- **Back-End**: .env =
DB_USER=roomie
DB_HOST=localhost
DB_NAME=roomierendezvous
DB_PASSWORD=rooms
DB_PORT=5432
ACCESS_SECRET=1234
REFRESH_SECRET=12345

