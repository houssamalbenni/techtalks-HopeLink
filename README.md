# HopeLink
A full-stack **MERN** project designed to support displaced communities by connecting **refugees, NGOs, donors, shelters, aid centers, and volunteers** in one centralized platform.

This project combines multiple humanitarian-focused systems into one scalable application, including:

- Refugee Aid Platform
- Shelter Finder
- Food & Aid Distribution Tracker
- Family Tracking System
- Digital Identity for Refugees
- Donation & Needs Matching System
- Offline Communication Module
- Mental Health Support Platform

---

## Project Vision

The goal of this platform is to provide a **real-world digital solution** for refugee and displaced-person support.

It helps users:

- request food, medicine, shelter, and other urgent needs
- find nearby shelters, hospitals, and aid centers
- receive fair and trackable aid distribution
- reconnect separated family members
- store important documents securely
- match donor contributions with urgent needs
- access mental health support resources

This project is designed to have both **humanitarian value** and **strong portfolio/CV impact**.

---

## Main Modules

### 1. Refugee Aid Platform
A centralized system that connects refugees, NGOs, and donors.

**Features:**
- refugee registration and profile creation
- submit aid requests
- NGO dashboards for managing requests
- donor dashboards for donations
- notifications and request updates
- priority system for urgent cases

---

### 2. Shelter Finder
A location-based system for discovering shelters and aid services.

**Features:**
- Google Maps integration
- nearest shelter/hospital/aid center
- capacity status (available / full)
- filter by service type
- mobile-friendly design
- optional offline support

---

### 3. Food & Aid Distribution Tracker
A tracking system to organize fair distribution of aid.

**Features:**
- beneficiary registration
- QR code or unique ID assignment
- track received aid
- prevent duplicate distribution
- admin dashboard for monitoring

---

### 4. Family Tracking System
A module for helping reunite separated family members.

**Features:**
- register missing or found individuals
- search by name, location, or details
- matching suggestions
- upload photo and identifying information
- privacy-focused handling

---

### 5. Digital Identity for Refugees
A secure digital profile for storing essential personal information.

**Features:**
- secure user profile
- document upload
- NGO access with permission
- verification process
- reduced risk of document loss

---

### 6. Donation & Needs Matching System
A smart system that connects available donations with real-time needs.

**Features:**
- post donations
- post requests
- automatic matching suggestions
- urgent-case prioritization
- delivery and status tracking

---

### 7. Offline Communication Module
A communication feature designed for low-connectivity environments.

**Features:**
- peer-to-peer messaging
- local network or Bluetooth communication
- emergency broadcast messages
- location sharing
- support for no-internet areas

> Note: This module may be implemented as a future phase or experimental feature depending on project scope.

---

### 8. Mental Health Support Platform
A support system for emotional and psychological well-being.

**Features:**
- anonymous support options
- chat with volunteers/counselors
- mood tracking
- educational articles and videos
- mental wellness dashboard

---

## Combined Core Idea

The strongest version of the project combines:

- **Shelter Finder**
- **Aid Request Platform**
- **Donation Matching**
- **Distribution Tracking**

This creates an all-in-one humanitarian support platform with real-time, location-aware assistance.

---

## Tech Stack

### Frontend
- React.js
- React Router
- Axios
- Tailwind CSS / CSS / Bootstrap
- Google Maps API

### Backend
- Node.js
- Express.js
- JWT Authentication
- Socket.io (for real-time updates)

### Database
- MongoDB
- Mongoose

### Other Tools
- Cloudinary / Firebase Storage / local upload system
- QR code generator
- Git & GitHub
- Postman
- Render / Railway / Vercel / MongoDB Atlas

---

## User Roles

The system supports multiple user roles:

### Refugee
- create profile
- request aid
- view shelters and nearby services
- track requests
- upload documents
- access support resources

### NGO
- manage aid requests
- verify users/documents
- update shelter capacity
- distribute aid
- monitor cases

### Donor
- donate money or goods
- view urgent needs
- track donation status
- receive updates

### Admin
- manage users and data
- monitor distributions
- review reports
- verify requests and shelters
- oversee full platform activity

---

## Core Features

- role-based authentication and authorization
- aid request creation and tracking
- real-time notifications
- smart donor-to-need matching
- location-based shelter search
- QR-based aid tracking
- secure document upload
- analytics dashboard
- mobile responsive design

---

## Possible MVP Scope

To avoid overbuilding in the first version, the project can start with an **MVP** that includes:

- authentication and roles
- refugee aid request system
- donor donation system
- NGO dashboard
- shelter finder with map
- request/donation matching
- simple notifications
- admin panel

Future phases can add:
- family tracking
- digital identity verification
- offline communication
- mental health support

---

## Folder Structure

```bash
unified-refugee-support-platform/
│
├── client/                  # React frontend
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── layouts/
│       ├── services/
│       ├── context/
│       ├── hooks/
│       └── utils/
│
├── server/                  # Node.js + Express backend
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   └── server.js
│
├── docs/
├── .env
├── .gitignore
├── package.json
└── README.md