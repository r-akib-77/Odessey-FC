# News Data API Design

**Date:** 2026-05-21
**Topic:** News Data API using Cloudflare D1

## Goal
Implement a set of API endpoints to manage news content using Cloudflare D1 as the data source. This includes public fetching and administrative CRUD operations.

## Architecture
The API will be built using Next.js App Router route handlers. It will interact with Cloudflare D1 via the `process.env.DB` binding.

### Endpoints

#### 1. Public News Fetching
- **Path:** `/api/news`
- **Method:** `GET`
- **Description:** Returns all news items ordered by most recent first.
- **Query:** `SELECT * FROM news ORDER BY id DESC`

#### 2. Admin News Management
- **Path:** `/api/admin/news`
- **Method:** `GET`
- **Description:** Returns all news items for admin management.
- **Method:** `POST`
- **Description:** Creates a new news item.
- **Logic:**
  - Validates request body.
  - If `featured` is true (1):
    - Set `featured = 0` for all existing records.
    - Insert new record with `featured = 1`.
  - Otherwise, insert new record with `featured = 0`.

#### 3. Admin News Deletion
- **Path:** `/api/admin/news/[id]`
- **Method:** `DELETE`
- **Description:** Deletes a specific news item by ID.
- **Query:** `DELETE FROM news WHERE id = ?`

## Data Flow
1. Request hits the Next.js Route Handler.
2. For `/api/admin/*`, the existing middleware verifies the `admin_token`.
3. The handler extracts necessary data (params or body).
4. The handler performs D1 database operations using `process.env.DB`.
5. The handler returns a JSON response.

## Error Handling
- Return `400 Bad Request` for missing required fields.
- Return `500 Internal Server Error` for database operation failures.
- Admin routes are protected by middleware (`401 Unauthorized`).

## Testing Strategy
- Manual testing of endpoints using `curl` or a REST client.
- Verification of database state after POST and DELETE operations.
