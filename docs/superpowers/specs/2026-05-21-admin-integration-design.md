# Admin Panel Integration Design

## Goal
Integrate real API calls into the Admin Panel (`src/app/admin/page.tsx`) to replace mock data and local state management with persistent storage using D1 (database) and R2 (image uploads).

## Architecture
- **State Management**: React `useState` for local form data and `newsList`. `useEffect` for initial data fetching.
- **Data Flow**:
    - **Fetch**: `GET /api/admin/news` on mount.
    - **Create**: 
        1. `POST /api/admin/upload` (Multipart/FormData) to get R2 URL.
        2. `POST /api/admin/news` (JSON) with the URL and form details.
    - **Delete**: `DELETE /api/admin/news/[id]`.
    - **Auth**: `POST /api/auth/logout` to clear session and redirect.

## Components & Logic
### State Changes
- `newsList` initialized to `[]`.
- `selectedFile` state added to track the actual `File` object for upload.
- `isLoading`, `isUploading`, `isSaving` states for UI feedback.

### Form Handling
- `handleLocalImageChange`: Update to store both the preview URL (for UI) and the `File` object (for upload).
- `handleSubmit`:
    - Check if a file is selected.
    - Upload file to `/api/admin/upload`.
    - On success, POST news data to `/api/admin/news`.
    - On success, refresh the list and clear the form.

### Logout
- Add a "Logout" button to the header using the `LogOut` icon from `lucide-react`.
- Call `/api/auth/logout` and redirect to `/admin/login`.

### UI Updates
- Change "STATUS: MOCK_MODE" to "STATUS: LIVE_D1_R2".
- Show loading spinners/states on buttons.
- Ensure `unoptimized` is handled correctly for both blob URLs and R2 URLs if needed (Next.js Image component).

## Error Handling
- Use `try/catch` for all fetch calls.
- Display error messages via `alert` or inline feedback.

## Testing
- Verify news list loads correctly.
- Verify image upload works and returns a public URL.
- Verify news creation persists and appears in the list.
- Verify deletion works and updates the list.
- Verify logout redirects correctly.
