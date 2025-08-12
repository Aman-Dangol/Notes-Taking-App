# Notes App - React + TypeScript + Vite

A modern, full-featured note-taking application built with React, TypeScript, and Vite. This app provides a clean interface for creating, reading, updating, and deleting notes with user authentication and real-time search functionality.

## 🚀 Features

- **User Authentication**: Secure login system with token-based authentication
- **CRUD Operations**: Create, read, update, and delete notes
- **Real-time Search**: Search through your notes instantly
- **Responsive Design**: Built with Tailwind CSS for mobile-first design
- **State Management**: Redux Toolkit for efficient state management
- **Form Validation**: Zod schema validation with React Hook Form
- **Protected Routes**: Route protection for authenticated users
- **Modern UI**: Clean interface with Radix UI components
- **Toast Notifications**: User-friendly feedback with React Toastify

## 🛠️ Tech Stack

### Frontend

- **React 19** - Modern React with latest features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Redux Toolkit** - State management
- **React Query (TanStack Query)** - Server state management
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **Radix UI** - Headless UI components
- **React Icons** - Icon library
- **Axios** - HTTP client

### Development Tools

- **ESLint** - Code linting
- **TypeScript ESLint** - TypeScript-specific linting rules
- **Vite** - Build tool and dev server

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Button.tsx
│   ├── create-note-form.tsx
│   ├── Dialog-box.tsx
│   ├── Input-field.tsx
│   ├── update-note-form.tsx
│   └── user-profile.tsx
├── Pages/              # Application pages
│   ├── login.tsx
│   └── Home/
│       ├── Home.tsx
│       └── home-types.ts
├── routes/             # Routing configuration
│   ├── index.tsx
│   ├── Protected_Routes/
│   │   └── protected-routes.tsx
│   └── unprotected_routes.tsx/
│       └── unprotected-routes.tsx
├── Schema/             # Zod validation schemas
│   ├── login.schema.ts
│   ├── note-schema.ts
│   └── register.schema.ts
├── utils/              # Utility functions and hooks
│   ├── axios.ts
│   ├── hooks/
│   │   ├── useDisclosure.tsx
│   │   ├── axios-hooks/    # Custom hooks for API calls
│   │   │   ├── useDelete.ts
│   │   │   ├── useGet.ts
│   │   │   ├── usePost.ts
│   │   │   └── usePut.tsx
│   │   └── redux-hook/
│   │       └── store-hooks.ts
│   └── redux/          # Redux store configuration
│       ├── auth-slice.ts
│       ├── UserInfo-slice.ts
│       └── store.ts
├── App.tsx             # Main application component
├── main.tsx           # Application entry point
└── index.css          # Global styles
```

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (version 18 or higher)
- [pnpm](https://pnpm.io/) (recommended) or npm/yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd notes-app
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory and add your environment variables:

   ```env
   VITE_API_BASE_URL=your_api_base_url
   ```

4. **Start the development server**

   ```bash
   pnpm dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173` to see the application running.

## 📝 Available Scripts

- **`pnpm dev`** - Start the development server
- **`pnpm build`** - Build the application for production
- **`pnpm preview`** - Preview the production build locally
- **`pnpm lint`** - Run ESLint to check code quality

## 🔧 Configuration

### ESLint Configuration

The project uses a modern ESLint configuration with TypeScript support. For production applications, you can enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      ...tseslint.configs.recommendedTypeChecked,
      // For stricter rules
      ...tseslint.configs.strictTypeChecked,
      // For stylistic rules
      ...tseslint.configs.stylisticTypeChecked,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
]);
```

### React-specific ESLint Rules

For additional React-specific lint rules, install and configure:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      reactX.configs["recommended-typescript"],
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
]);
```

## 🏗️ Building for Production

1. **Create a production build**

   ```bash
   pnpm build
   ```

2. **Preview the production build**
   ```bash
   pnpm preview
   ```

The build artifacts will be stored in the `dist/` directory.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Vite](https://vitejs.dev/) for the fast build tool
- [React](https://reactjs.org/) for the UI library
- [Tailwind CSS](https://tailwindcss.com/) for the styling framework
- [Radix UI](https://www.radix-ui.com/) for accessible UI components
- [Redux Toolkit](https://redux-toolkit.js.org/) for state management
