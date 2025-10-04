# AI Development Rules for Bodega dos Parças

This document outlines the technical stack and development conventions to be followed by the AI assistant when modifying this application. The goal is to maintain code consistency, quality, and simplicity.

## Tech Stack Overview

The application is built with a modern, lightweight tech stack:

-   **Framework**: React with TypeScript for a type-safe and component-based UI.
-   **Build Tool**: Vite provides a fast and efficient development experience.
-   **Routing**: React Router (`react-router-dom`) is used for all client-side routing and navigation.
-   **Styling**: Tailwind CSS is the exclusive utility-first framework for styling. All styling must be done via Tailwind classes.
-   **State Management**: Global state is managed via the React Context API (`AuthContext`, `CartContext`, `ProductContext`). Component-level state uses React hooks (`useState`, `useEffect`).
-   **Icons**: The `lucide-react` library is the preferred source for icons to ensure visual consistency.
-   **Data Persistence**: `localStorage` is used to persist cart, user, and product data between sessions.
-   **Architecture**: A component-based architecture with a clear separation between pages (`src/pages`), reusable components (`src/components`), and global state (`src/context`).

## Library and Pattern Usage Rules

### UI Components
-   **Primary UI Library**: Use **shadcn/ui** components whenever possible for elements like Buttons, Dialogs (Modals), Inputs, Cards, etc. This is the preferred method for building the UI.
-   **Custom Components**: Only create new custom components if a suitable `shadcn/ui` component does not exist or cannot be easily customized. Keep custom components small, focused, and reusable.

### Styling
-   **Strictly Tailwind CSS**: Do not write custom CSS files or use inline `style` objects. All styling must be implemented using Tailwind CSS utility classes.
-   **Theme**: Adhere to the theme defined in `index.html` (`tailwind.config`), especially the `primary` color.

### Routing
-   **Centralized Routes**: All application routes must be defined within the `<Routes>` component in `src/App.tsx`.
-   **Navigation**: Use the `Link` component from `react-router-dom` for declarative navigation and the `useNavigate` hook for programmatic navigation.

### State Management
-   **Global State**: For application-wide state (e.g., user authentication, shopping cart), use the existing React Context providers. Do not introduce new global state management libraries (like Redux or Zustand).
-   **Local State**: For state that is confined to a single component or its immediate children, use React's built-in hooks (`useState`, `useReducer`).

### Icons
-   **Primary Icon Library**: Always use icons from **`lucide-react`**.
-   **Custom Icons**: If a required icon is not available in `lucide-react`, it can be created as a new SVG component inside `src/components/icons.tsx`.

### Forms
-   **Simple Forms**: For forms with minimal complexity, use controlled components with the `useState` hook, following the existing patterns in `LoginPage.tsx` and `RegisterPage.tsx`.

### Data Handling
-   **Data Source**: Currently, all data is mocked in `src/constants.ts`. Continue to use and modify this data source for product and user information.
-   **API Calls**: If external data fetching is required, use the browser's native `fetch` API. Do not add libraries like Axios unless specifically requested.

### General
-   **Dependencies**: Do not add new npm packages unless explicitly requested by the user.
-   **File Structure**: Maintain the existing file structure (`src/pages`, `src/components`, `src/context`). Always create new files for new components.