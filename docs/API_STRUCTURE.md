# HotelsSwiss API Structure Documentation

This document provides a comprehensive overview of the HotelsSwiss API v1 structure based on the OpenAPI 3.0.3 specification.

## API Overview

- **Base URL**: `/api/v1/`
- **Version**: 1.0.0 (v1)
- **Title**: HotelsSwiss API
- **Description**: API for HotelsSwiss CMS

## Authentication

The API supports multiple authentication methods:

- **Cookie Authentication**: Uses session ID in cookies (`sessionid`)
- **Basic Authentication**: HTTP Basic auth
- **Anonymous Access**: Some endpoints allow unauthenticated access

## Endpoints

### 1. Amenities (`/api/v1/amenities/`)

**List Amenities**

- **Method**: GET
- **Endpoint**: `/api/v1/amenities/`
- **Description**: Retrieve paginated list of amenities
- **Parameters**:
  - `page` (optional): Page number for pagination
- **Response**: `PaginatedAmenityList`

**Get Single Amenity**

- **Method**: GET
- **Endpoint**: `/api/v1/amenities/{id}/`
- **Parameters**:
  - `id` (required): Unique integer ID of the amenity
- **Response**: `Amenity`

### 2. Cantons (`/api/v1/cantons/`)

**List Cantons**

- **Method**: GET
- **Endpoint**: `/api/v1/cantons/`
- **Description**: Retrieve paginated list of cantons
- **Parameters**:
  - `page` (optional): Page number for pagination
- **Response**: `PaginatedCantonList`

**Get Single Canton**

- **Method**: GET
- **Endpoint**: `/api/v1/cantons/{id}/`
- **Parameters**:
  - `id` (required): Unique integer ID of the canton
- **Response**: `Canton`

### 3. Categories (`/api/v1/categories/`)

**List Categories**

- **Method**: GET
- **Endpoint**: `/api/v1/categories/`
- **Description**: Retrieve paginated list of categories
- **Parameters**:
  - `page` (optional): Page number for pagination
- **Response**: `PaginatedCategoryList`

**Get Single Category**

- **Method**: GET
- **Endpoint**: `/api/v1/categories/{id}/`
- **Parameters**:
  - `id` (required): Unique integer ID of the category
- **Response**: `Category`

### 4. Filters (`/api/v1/filters/`)

**Get Filters**

- **Method**: GET
- **Endpoint**: `/api/v1/filters/`
- **Description**: Retrieve available filters for hotels
- **Response**: Array of `FiltersResponse`

### 5. First Screen Data (`/api/v1/first-screen/`)

**Get First Screen Data**

- **Method**: GET
- **Endpoint**: `/api/v1/first-screen/`
- **Description**: Retrieve initial page data including promo hotels, categories, and filters
- **Response**: `FirstScreenResponse`

### 6. Hotels (`/api/v1/hotels/`)

**List Hotels**

- **Method**: GET
- **Endpoint**: `/api/v1/hotels/`
- **Description**: Retrieve paginated list of hotels with filtering and search capabilities
- **Parameters**:
  - `amenities` (optional): Array of amenity IDs (1-9)
    - `1`: Parking
    - `2`: Wi-Fi
    - `3`: Spa and Wellness
    - `4`: Safe
    - `5`: Mountain view
    - `6`: Open 24/7
    - `7`: Free cancellation within 48 hours
    - `8`: Balcony
    - `9`: A/C
  - `cantons` (optional): Canton filter (string)
  - `category_id` (optional): Category ID (integer)
  - `category_name` (optional): Category name (string)
  - `city` (optional): City filter (string)
  - `id` (optional): Hotel ID (integer)
  - `max_price` (optional): Maximum price (number)
  - `min_price` (optional): Minimum price (number)
  - `ordering` (optional): Field to order results by
  - `page` (optional): Page number for pagination
  - `search` (optional): Search term (string)
  - `stars` (optional): Star rating (integer)
- **Response**: `PaginatedHotelList`

**Get Single Hotel**

- **Method**: GET
- **Endpoint**: `/api/v1/hotels/{id}/`
- **Parameters**:
  - `id` (required): Unique integer ID of the hotel
- **Response**: `Hotel`

### 7. Rooms (`/api/v1/rooms/`)

**List Rooms**

- **Method**: GET
- **Endpoint**: `/api/v1/rooms/`
- **Description**: Retrieve paginated list of rooms
- **Parameters**:
  - `page` (optional): Page number for pagination
- **Response**: `PaginatedRoomList`

**Get Single Room**

- **Method**: GET
- **Endpoint**: `/api/v1/rooms/{id}/`
- **Parameters**:
  - `id` (required): Unique integer ID of the room
- **Response**: `Room`

### 8. Email (`/api/v1/send-email/`)

**Send Email**

- **Method**: POST
- **Endpoint**: `/api/v1/send-email/`
- **Description**: Send an email using the provided details
- **Request Body**: `EmailRequest`

## Data Models

### Core Models

#### Amenity

```typescript
interface Amenity {
  id: number; // Read-only
  name: string; // Max 255 characters
  description?: string; // Nullable
  image: Image;
}
```

#### Canton

```typescript
interface Canton {
  id: number; // Read-only
  name: string; // Max 255 characters
  image: Image;
  description: string;
  description_de?: string; // Nullable
  description_fr?: string; // Nullable
  description_en_us?: string; // Nullable
}
```

#### Category

```typescript
interface Category {
  id: number; // Read-only
  name: string; // Max 255 characters
  image: Image;
}
```

#### Hotel

```typescript
interface Hotel {
  id: number; // Read-only
  images: string; // Read-only
  title: string; // Max 255 characters
  description: string;
  description_de?: string; // Nullable
  description_fr?: string; // Nullable
  description_en_us?: string; // Nullable
  address: string;
  canton: Canton;
  categories: CategoryHotelOrderable[];
  city: string; // Max 255 characters
  zip?: number; // Nullable
  telephone: string; // Max 255 characters
  fax: string; // Max 255 characters
  email: string; // Email format, max 254 characters
  stars: number; // 1-5 range
  start_price: string; // Decimal format
  end_price: string; // Decimal format
  paid: boolean;
  amenities: AmenitiesHotelOrderable[];
  social_links: any[]; // Read-only
  seo: object; // Read-only
  rooms: string;
}
```

#### Room

```typescript
interface Room {
  id: number; // Read-only
  name: string; // Max 255 characters
  occupants: number;
  amenities: Amenity;
}
```

#### Image

```typescript
interface Image {
  id: number; // Read-only
  title: string; // Max 255 characters
  url: string; // Read-only
  width: number; // Read-only
  height: number; // Read-only
  renditions: object; // Read-only
}
```

### Response Models

#### FirstScreenResponse

```typescript
interface FirstScreenResponse {
  promo_hotels: Hotel[];
  categories: Category[];
  filters: FiltersData;
}
```

#### FiltersResponse / FiltersData

```typescript
interface FiltersResponse {
  cantons: Canton[];
  amenities: Amenity[];
  price_range: Record<string, number>;
  stars: number[];
}
```

#### Paginated Lists

All paginated responses follow this structure:

```typescript
interface PaginatedResponse<T> {
  count: number;
  next?: string; // URI for next page
  previous?: string; // URI for previous page
  results: T[];
}
```

### Utility Models

#### EmailRequest

```typescript
interface EmailRequest {
  subject: string; // 1-100 characters
  message: string; // Min 1 character
  from_email: string; // Email format
  recipient_list: string[]; // Array of email addresses
}
```

#### CategoryHotelOrderable

```typescript
interface CategoryHotelOrderable {
  category: Category;
}
```

#### AmenitiesHotelOrderable

```typescript
interface AmenitiesHotelOrderable {
  amenity: Amenity;
}
```

## Pagination

All list endpoints support pagination with the following parameters:

- `page`: Page number (integer, optional)

Paginated responses include:

- `count`: Total number of items
- `next`: URL for the next page (nullable)
- `previous`: URL for the previous page (nullable)
- `results`: Array of items for the current page

## Error Handling

The API follows standard HTTP status codes:

- `200`: Success
- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `500`: Internal Server Error

## Usage Notes

### Hotel Filtering

The hotels endpoint supports extensive filtering:

- Filter by amenities using numeric IDs (1-9)
- Filter by canton, category, city, star rating
- Price range filtering with min/max values
- Full-text search capability
- Custom ordering of results

### Multi-language Support

Several models support multi-language descriptions:

- `description_de`: German
- `description_fr`: French
- `description_en_us`: English (US)

### Image Handling

Images include multiple renditions for responsive design and include width/height metadata for optimal loading.

### SEO Data

Hotels include SEO metadata for search engine optimization and social media sharing.

## Integration Examples

### Fetching Hotels with Filters

```typescript
// Get hotels in a specific canton with amenities
GET /api/v1/hotels/?cantons=zurich&amenities=1,2&stars=4&page=1
```

### Getting First Screen Data

```typescript
// Get initial page data
GET /api/v1/first-screen/
```

### Hotel Search

```typescript
// Search hotels by text
GET /api/v1/hotels/?search=luxury&min_price=100&max_price=500
```
