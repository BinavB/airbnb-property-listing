# Airbnb-Style Property Listing with Multi-Database & Agent-Scoped Pricing

A full-stack application that demonstrates an Airbnb-style property listing system with agent-specific pricing using Laravel (API) and React.js (frontend).

## 🏗️ Architecture Overview

This system uses **multiple MySQL databases** to separate concerns and demonstrate complex database relationships:

- **properties_db**: Contains property listings and images
- **agents_db**: Contains agent information and agent-specific pricing

## 🗄️ Database Configuration

### Multi-Database Setup

The application is configured to use two separate MySQL databases:

```php
// config/database.php
'connections' => [
    'properties_db' => [
        'driver' => 'mysql',
        'host' => env('DB_HOST', '127.0.0.1'),
        'database' => env('PROPERTIES_DB_DATABASE', 'properties_db'),
        // ... other config
    ],
    'agents_db' => [
        'driver' => 'mysql',
        'host' => env('DB_HOST', '127.0.0.1'),
        'database' => env('AGENTS_DB_DATABASE', 'agents_db'),
        // ... other config
    ],
]
```

### Environment Variables

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=

PROPERTIES_DB_DATABASE=properties_db
AGENTS_DB_DATABASE=agents_db
```

## 📊 Database Schema

### Properties Database (`properties_db`)

#### `properties` table
- `id` - Primary key
- `title` - Property name
- `city` - Location
- `base_price` - Default price per night
- `property_type` - villa, apartment, cottage, etc.
- `status` - active/inactive
- `created_at`, `updated_at` - Timestamps

#### `property_images` table
- `id` - Primary key
- `property_id` - Foreign key to properties
- `image_url` - Image URL
- `is_primary` - Boolean flag for primary image

### Agents Database (`agents_db`)

#### `agents` table
- `id` - Primary key
- `name` - Agent name
- `email` - Unique email for login
- `password` - Hashed password
- `created_at`, `updated_at` - Timestamps

#### `agent_properties` table (⭐ TRAP TABLE)
- `id` - Primary key
- `agent_id` - Foreign key to agents
- `property_id` - Foreign key to properties (cross-database)
- `agent_price` - Agent-specific price
- `created_at`, `updated_at` - Timestamps
- **Unique constraint**: (`agent_id`, `property_id`)

## 🎯 Price Selection Logic

The core business logic handles dynamic pricing based on agent filtering:

### API Endpoint: `GET /api/properties`

**Query Parameters:**
- `city` - Filter by city
- `property_type` - Filter by property type  
- `agent_id` - Filter by specific agent

**Price Logic:**

| Scenario | Price Display | Price Type |
|----------|---------------|------------|
| No agent filter | `properties.base_price` | base_price |
| Agent selected + custom price exists | `agent_properties.agent_price` | agent_price |
| Agent selected + no custom price | `properties.base_price` | base_price |

**Implementation:**
```php
// Dynamic pricing logic in PropertyController
if ($request->filled('agent_id')) {
    $agentId = $request->agent_id;
    
    $properties = $query->get()->map(function ($property) use ($agentId) {
        $agentProperty = AgentProperty::where('agent_id', $agentId)
            ->where('property_id', $property->id)
            ->first();

        $property->price = $agentProperty ? $agentProperty->agent_price : $property->base_price;
        $property->price_type = $agentProperty ? 'agent_price' : 'base_price';
        
        return $property;
    });
}
```

## 🔐 Authentication System

### Agent Login Flow
1. **Login Page**: `/login`
   - Email/password validation
   - JWT token generation using Laravel Sanctum
   - Session management in React context

2. **Protected Routes**: 
   - `/dashboard` - Agent dashboard
   - API endpoints require `Bearer` token

### Demo Credentials
- **Email**: john@agent.com, sarah@agent.com, michael@agent.com
- **Password**: password123

## 🎨 Frontend Design (React + Bootstrap)

### Responsive Design Strategy

#### Desktop (≥768px)
- **Layout**: Sidebar filters + 3-4 column property grid
- **Navigation**: Top navbar with user menu
- **Interactions**: Hover effects, tooltips

#### Mobile (<768px)
- **Layout**: Single column property cards
- **Filters**: Collapsible modal or top filters
- **Touch**: Large tap areas, swipe gestures

### Key Components

1. **PropertyList**: Main listing with filters
2. **AgentDashboard**: Agent pricing management
3. **Login**: Authentication interface
4. **Navbar**: Navigation with auth state

### Bootstrap 5 Features
- Responsive grid system
- Modal dialogs for price updates
- Form validation
- Badge components for status indicators

## 🚀 API Design

### Authentication Endpoints
```
POST /api/login          - Agent login
POST /api/logout         - Agent logout
```

### Property Endpoints
```
GET /api/properties      - List properties with filters
POST /api/agent-properties - Set agent price
PUT /api/agent-properties/{id} - Update agent price
```

### Response Format
```json
{
  "data": [...],
  "current_page": 1,
  "per_page": 12,
  "total": 50,
  "last_page": 5
}
```

## 🔧 Installation & Setup

### Prerequisites
- PHP 8.0+
- MySQL 5.7+
- Node.js 16+
- Composer
- npm/yarn

### Backend Setup

1. **Clone and install dependencies**
```bash
git clone <repository>
cd airbnb-property-listing
composer install
```

2. **Database setup**
```sql
CREATE DATABASE properties_db;
CREATE DATABASE agents_db;
```

3. **Environment configuration**
```bash
cp .env.example .env
php artisan key:generate
```

4. **Run migrations**
```bash
php artisan migrate --database=properties_db
php artisan migrate --database=agents_db
```

5. **Seed sample data**
```bash
php artisan db:seed --class=PropertySeeder --database=properties_db
php artisan db:seed --class=AgentSeeder --database=agents_db
```

6. **Start Laravel server**
```bash
php artisan serve
```

### Frontend Setup

1. **Install dependencies**
```bash
cd frontend
npm install
```

2. **Start development server**
```bash
npm start
```

## 🎯 Key Features Demonstrated

### Multi-Database Architecture
- Cross-database relationships
- Separate connection management
- Transaction handling

### Dynamic Pricing Logic
- Agent-specific pricing
- Fallback to base price
- Real-time price updates

### Modern Frontend
- React functional components
- Context API for state management
- Bootstrap 5 responsive design
- Protected routes

### API Best Practices
- RESTful endpoints
- JWT authentication
- CORS configuration
- Pagination
- Input validation

## ⚖️ Trade-offs Due to Time Limit

1. **Image Upload**: Used placeholder URLs instead of file upload system
2. **Advanced Search**: Basic filtering only (no full-text search)
3. **Real-time Updates**: No WebSocket implementation
4. **Payment Integration**: Mock pricing system only
5. **Advanced Analytics**: Basic statistics only
6. **Testing**: No automated tests included
7. **Error Handling**: Basic error handling only
8. **Performance**: No caching implemented

## 🔍 Testing the System

1. **Public View**: Visit `http://localhost:3000` to see all properties with base prices
2. **Agent Login**: Use demo credentials to access agent features
3. **Price Management**: Set custom prices as an agent
4. **Filter Testing**: Apply city, type, and agent filters
5. **Responsive Design**: Test on mobile and desktop viewports

## 🐛 Known Issues & Solutions

1. **CORS Issues**: Ensure `supports_credentials` is true in cors.php
2. **MySQL Connection**: Verify database credentials and permissions
3. **Migration Errors**: Check MySQL version and charset settings
4. **API Timeouts**: Increase PHP execution time for large datasets

## 📝 Future Enhancements

1. **Real-time Notifications**: WebSocket integration
2. **Advanced Analytics**: Revenue tracking, occupancy rates
3. **Image Management**: File upload, compression, CDN
4. **Booking System**: Calendar integration, reservations
5. **Review System**: Property ratings and reviews
6. **Multi-language Support**: Internationalization
7. **Advanced Search**: Geolocation, amenities filters
8. **Admin Panel**: System management interface

---

**Tech Stack**: Laravel 12, MySQL, React 19, Bootstrap 5, JWT Authentication
