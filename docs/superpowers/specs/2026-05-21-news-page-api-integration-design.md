# Design: News Page API Integration

## Goal
Transition the News Hub page from using static `dummyData` to fetching real-time data from the `/api/news` endpoint.

## Architecture
- **Component Type**: Keep as Client Component (`"use client"`).
- **Data Fetching**: Use `fetch` API inside `useEffect`.
- **State Management**: `useState` for `posts`, `loading`, and `error`.

## Data Model
The `news` table in D1 has:
- `id`: INTEGER
- `title`: TEXT
- `slug`: TEXT
- `desc`: TEXT
- `date`: TEXT
- `category`: TEXT
- `image`: TEXT
- `featured`: INTEGER (0 or 1)

## Implementation Details

### 1. Type Definition
Define a `NewsPost` interface:
```typescript
interface NewsPost {
  id: number;
  title: string;
  slug: string;
  desc: string;
  date: string;
  category: string;
  image: string;
  featured: number | boolean;
}
```

### 2. State and Fetching
```typescript
const [posts, setPosts] = useState<NewsPost[]>([]);
const [isLoading, setIsLoading] = useState(true);
const [error, setError] = useState<string | null>(null);

useEffect(() => {
  const fetchNews = async () => {
    try {
      const response = await fetch("/api/news");
      if (!response.ok) throw new Error("Failed to fetch news");
      const data = await response.ok ? await response.json() : [];
      setPosts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };
  fetchNews();
}, []);
```

### 3. UI Adjustments
- **Loading State**: Show a loading skeleton or a simple message while `isLoading` is true.
- **Empty State**: Use the existing fallback UI when `posts.length === 0` and `!isLoading`.
- **Error State**: Show a brief error message if `error` is present.
- **Featured Post Logic**: Ensure it works with integer `featured` values from the DB.

## Success Criteria
- [ ] News are fetched from `/api/news`.
- [ ] Featured post is correctly identified and displayed.
- [ ] Regular posts are listed in the grid.
- [ ] Fallback UI shows when no posts are returned.
- [ ] No regressions in styling or animations.
