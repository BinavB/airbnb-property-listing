# Airbnb Property Listing System

A full-stack Airbnb-style property listing platform with complete CRUD operations, mobile responsiveness, and agent management system.

## 🚀 Features

### ✅ Core Features
- **Complete CRUD Operations**: Full Create, Read, Update, Delete for properties, experiences, and services
- **Agent Management**: Agent authentication, profile management, and property ownership
- **Mobile Responsive**: Optimized for tablets and mobile devices
- **Database-Driven**: SQLite database with proper relationships and seeding
- **RESTful APIs**: Comprehensive API endpoints with validation
- **Modern UI**: Airbnb-inspired design with Bootstrap 5

### 🎯 Key Capabilities
- **Property Management**: Agents can create, update, and manage their properties
- **Price Editing**: Real-time price updates with PUT method
- **Experience & Services**: Complete CRUD for experiences and services
- **Nearby Destinations**: Database-driven destination suggestions
- **Authentication**: Secure agent login and registration
- **Responsive Design**: Mobile-first approach with breakpoints

## 🏗️ Architecture

### Backend (Laravel)
- **Framework**: Laravel 12
- **Database**: SQLite with proper migrations and seeders
- **Authentication**: Laravel Sanctum for API authentication
- **API**: RESTful endpoints with comprehensive validation

### Frontend (React)
- **Framework**: React 19 with functional components
- **Styling**: Bootstrap 5 with custom CSS
- **State Management**: React Context API
- **Routing**: React Router DOM
- **Responsive**: Mobile-first design approach

## 📱 Mobile Responsiveness

### Breakpoints
- **Desktop**: ≥768px - Full navigation and features
- **Tablet**: ≤768px - Optimized navigation and buttons
- **Mobile**: ≤576px - Compact interface with essential features

### Mobile Features
- **Responsive Navbar**: Logo visible on all devices
- **Compact Navigation**: Shortened text and optimized spacing
- **Touch-Friendly**: Larger tap targets and proper spacing
- **Hidden Elements**: Non-essential elements hidden on mobile

## 🔧 Installation

### Prerequisites
- PHP 8.0+
- Node.js 16+
- Composer
- npm/yarn

### Backend Setup
```bash
git clone https://github.com/BinavB/airbnb-property-listing.git
cd airbnb-property-listing
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan db:seed
php artisan serve
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

## 📊 Database Schema

### Tables
- **properties**: Property listings with full details
- **property_images**: Multiple images per property
- **agents**: Agent information and authentication
- **nearby_destinations**: Popular destinations with icons
- **experiences**: Experience listings
- **services**: Service offerings

### Relationships
- Properties belong to agents (agent_id)
- Properties have multiple images
- Agents can manage multiple properties

## 🔐 Authentication

### Demo Credentials
- **Email**: john@agent.com, sarah@agent.com, michael@agent.com
- **Password**: password123

### Features
- **Agent Login**: Secure authentication with JWT tokens
- **Profile Management**: Update agent information
- **Protected Routes**: Agent-only endpoints
- **Session Management**: Automatic token handling

## 🚀 API Endpoints

### Authentication
```
POST /api/auth/login          - Agent login
POST /api/auth/logout         - Agent logout
POST /api/auth/register       - Agent registration
GET  /api/auth/user           - Get current user
```

### Properties (CRUD)
```
GET    /api/properties           - List all properties
GET    /api/properties/{id}      - Show single property
POST   /api/agent/properties     - Create property (agent)
PUT    /api/agent/properties/{id} - Update property (agent)
DELETE /api/agent/properties/{id} - Delete property (agent)
POST   /api/agent/properties/{id}/price - Update price (agent)
```

### Experiences (CRUD)
```
GET    /api/experiences           - List experiences
GET    /api/experiences/{id}      - Show experience
POST   /api/agent/experiences     - Create experience (agent)
PUT    /api/agent/experiences/{id} - Update experience (agent)
DELETE /api/agent/experiences/{id} - Delete experience (agent)
```

### Services (CRUD)
```
GET    /api/services             - List services
GET    /api/services/{id}        - Show service
POST   /api/agent/services       - Create service (agent)
PUT    /api/agent/services/{id}   - Update service (agent)
DELETE /api/agent/services/{id}   - Delete service (agent)
```

### Agents
```
GET    /api/agents               - List agents
GET    /api/agents/{id}          - Show agent
GET    /api/agent/profile        - Agent profile
PUT    /api/agent/profile        - Update profile
```

### Additional
```
GET    /api/nearby-destinations  - Popular destinations
GET    /api/filters              - Filter options
```

## 🎨 Frontend Components

### Key Components
- **Navbar**: Responsive navigation with authentication
- **HomePage**: Property listing with search and filters
- **AgentHomePage**: Agent dashboard with property management
- **LoginPage**: Authentication interface
- **PropertyCard**: Property display with edit functionality

### Features
- **Animated Navigation**: Active link highlighting
- **Guest Counters**: Interactive guest selection
- **Price Modals**: Edit prices with modal interface
- **Responsive Grid**: Adaptive property layouts

## 📱 Mobile UI Examples

### Navigation
- Logo visible on all screen sizes
- Compact navigation links
- Shortened button text ("Login" → "Login", "Logout" → "Out")
- Hidden non-essential elements on mobile

### Property Cards
- Responsive image sizing
- Optimized text layout
- Touch-friendly buttons
- Proper spacing for mobile interaction

## 🔧 Development

### Running the Application
1. **Backend**: `php artisan serve` (http://localhost:8000)
2. **Frontend**: `npm start` (http://localhost:3000)

### Database Operations
```bash
php artisan migrate:fresh     # Fresh migration
php artisan db:seed         # Seed database
php artisan tinker          # Database interaction
```

### Testing
- **Public View**: http://localhost:3000
- **Agent Login**: Use demo credentials
- **API Testing**: Use Postman collection (included)
- **Mobile Testing**: Use browser dev tools or mobile device

## 📋 Project Structure

```
airbnb-property-listing/
├── backend/
│   ├── app/
│   │   ├── Http/Controllers/Api/
│   │   ├── Models/
│   │   └── ...
│   ├── database/
│   │   ├── migrations/
│   │   ├── seeders/
│   │   └── ...
│   └── routes/api.php
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── ...
│   └── public/
├── postman-testing.md
├── postman-collection.json
└── README.md
```

## 🎯 Key Achievements

### ✅ Complete CRUD Operations
- Full Create, Read, Update, Delete for all resources
- Proper validation and error handling
- Agent ownership verification
- Soft delete functionality

### ✅ Mobile Responsiveness
- Responsive navbar with logo visibility
- Optimized layouts for all screen sizes
- Touch-friendly interface elements
- Proper breakpoints and media queries

### ✅ Database Integration
- Complete database schema with relationships
- Proper seeding with sample data
- Agent ownership and permissions
- Real-time price updates

### ✅ Professional UI/UX
- Airbnb-inspired design
- Smooth animations and transitions
- Intuitive navigation and interactions
- Consistent styling across components

## 🔮 Future Enhancements

1. **Real-time Updates**: WebSocket integration
2. **Advanced Search**: Geolocation and filters
3. **Image Upload**: File management system
4. **Booking System**: Calendar integration
5. **Review System**: Ratings and feedback
6. **Admin Panel**: System management
7. **Analytics**: Performance metrics
8. **Multi-language**: Internationalization

---

**Tech Stack**: Laravel 12, React 19, Bootstrap 5, SQLite, JWT Authentication

**Live Demo**: Available at http://localhost:3000 (after setup)

**Repository**: https://github.com/BinavB/airbnb-property-listing
