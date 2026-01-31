# Todos & Posts Application

A React application built with TanStack Start, showcasing a robust architecture with Redux Toolkit state management and a responsive UI using Tailwind CSS.

## 🚀 Features

### 1. Todos Management
A fully functional Todo list with specific features:
- **CRUD Operations**: Add, Delete, and Toggle completion status of todos.
- **Filtering**: Filter tasks by "All", "Completed", or "Pending".
- **Local Storage**: Todos (and their state) are persisted to `localStorage`, so data remains available between reloads.
- **Responsive Design**: The "Add Todo" form intelligently stacks on mobile screens for better usability.

### 2. Posts Explorer
Browse and interact with posts from the JSONPlaceholder API:
- **Fetch Posts**: Displays a grid of posts pulled from an external API.
- **Search by ID**: Rapidly find specific posts by their ID (e.g., search "1" or "15").
- **View Comments**: Searching for a post automatically fetches and displays its associated comments.
- **State Handling**: Includes comprehensive Loading, Empty, and Error states for a smooth user experience.

### 3. Responsive UI/UX
- **Mobile-First**: Designed to look great on all devices, from phones to desktops.
- **Mobile Navigation**: Features a slide-out hamburger menu with a backdrop overlay for easy navigation on small screens.
- **Accessibility**: Interactive elements like the delete button differ in behavior (hover on desktop, always visible on mobile) to suit the platform.

## 🛠 Tech Stack

- **Framework**: [TanStack Start](https://tanstack.com/start) (React)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
  - Uses `createSlice` for modular state.
  - Uses `createAsyncThunk` for API interactions.
- **Routing**: [TanStack Router](https://tanstack.com/router) (File-based routing)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (v4)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Package Manager**: [Bun](https://bun.sh/) (Compatible with npm/yarn/pnpm)

## 🏃‍♂️ Getting Started

### Prerequisites
- Node.js (v18+) or Bun (v1.0+)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd todos-app
    ```

2.  **Install dependencies:**
    ```bash
    bun install
    # or
    npm install
    ```

### Running Locally

Start the development server:

```bash
bun run dev
# or
npm run dev
```

The application will be available at `http://localhost:3000`.

### Building for Production

To create a production build:

```bash
bun run build
# or
npm run build
```

To preview the build:

```bash
bun run start
# or
npm run start
```

## 📝 Notes for Reviewers

### Architectural Decisions
- **Redux Integration**: While context or local state might suffice for simple apps, Redux was chosen to demonstrate scalable global state management, particularly for the asynchronous Post fetching logic.
- **Component Structure**: Components are modular (`PostCard`, `TodoItem`, `Header`) and separate from the route logic (`routes/todos.tsx`, `routes/posts.tsx`), promoting reusability.
- **Responsive Logic**:
    - The "Add Todo" form uses `flex-col md:flex-row` to adapt its layout.
    - The **Delete Button** on todos uses `opacity-100 md:opacity-0` logic. This solves a common UX issue where "hover-to-reveal" actions are inaccessible on touch devices. By making it always visible on mobile, we ensure full functionality on all devices.

### Directory Structure
- `src/routes`: File-based routes (Todos, Posts).
- `src/store`: Redux slices (`todosSlice`, `postsSlice`) and store configuration.
- `src/components`: Reusable UI components.
- `src/styles.css`: Global styles and Tailwind directives.
