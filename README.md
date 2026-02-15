<p>A server of web application for reading and discovering Chinese web novels (donghua/xianxia). Users can browse novels by genre and tags, read chapters, leave reviews and ratings, and bookmark their favorite stories.</p>

<h1><a href="https://hrznovels-client.vercel.app/">LIVE DEMO</a></h1>
<p>(Backend hosted on Render.com — initial load may take a moment)</p>

<h1><a href="https://github.com/horizon-git/hrznovels-server">SERVER REPO</a></h1>

# Features
<ul>
  <li>Browse 100+ Chinese web novels with cover images</li>
  <li>Filter by genres (Fiction, Fantasy, Sci-Fi, Romance, Horror, Adventure)</li>
  <li>Filter by tags (New Release, Classic, Bestseller, Award-winning, etc.)</li>
  <li>Search novels by title and description</li>
  <li>Sort by alphabet, date added, last update, or rating (ASC/DESC)</li>
  <li>Read chapters with progress tracking</li>
  <li>Leave reviews and ratings</li>
  <li>Bookmark favorite novels</li>
  <li>User authentication and profiles</li>
</ul>

# Technologies Used

### Frontend
<ul>
  <li>Next.js 15 (App Router)</li>
  <li>React 19</li>
  <li>TypeScript</li>
  <li>Redux Toolkit</li>
  <li>Material-UI (MUI)</li>
  <li>SCSS Modules</li>
</ul>

### Backend
<ul>
  <li>NestJS</li>
  <li>TypeScript</li>
  <li>TypeORM</li>
  <li>PostgreSQL</li>
  <li>JWT Authentication</li>
</ul>

### Deployment
<ul>
  <li>Frontend: Vercel</li>
  <li>Backend: Render.com</li>
  <li>Database: Neon.tech</li>
</ul>

# Launch Instructions

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL database (or use Neon.tech)

### Frontend Setup
```bash
git clone https://github.com/horizon-git/hrznovels-client.git
cd hrznovels-client
npm install

# Create .env.local file:
# NEXT_PUBLIC_API_URL=http://localhost:3001
# NEXT_PUBLIC_API_HOSTNAME=localhost
# NEXT_PUBLIC_API_PROTOCOL=http

npm run dev
# Open http://localhost:3000
