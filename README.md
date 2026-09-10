# Sid Portfolio

A modern, interactive personal portfolio website built with React, TypeScript, and Vite.

## Overview

This project presents a professional portfolio experience with animated sections, smooth navigation, and a clean visual design optimized for desktop and mobile browsing.

## Key Features

- Interactive single-page portfolio layout
- Dedicated sections for hero, about, experience, skills, projects, goals, and education
- Smooth motion and scroll-based UI effects
- Keyboard accessibility support (including skip-to-content navigation)
- Command palette and custom progress UI elements

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- Framer Motion
- React Router
- TanStack Query

## Setup & Run

1. Clone the repository:
   ```sh
   git clone <YOUR_GIT_URL>
   cd sid-portfolio
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```
4. Build for production:
   ```sh
   npm run build
   ```
5. Preview production build locally:
   ```sh
   npm run preview
   ```

## Usage

- Run `npm run dev` and open the local Vite URL in your browser.
- Update content and components under `src/` to personalize portfolio sections.
- Use `npm run lint` before submitting contributions.

## Project Structure

```text
src/
  components/    Reusable UI and feature components
  pages/         Route-level pages (main portfolio page)
  config/        All portfolio content (bio, experience, projects, skills) in one file
  lib/           Shared utilities
```

## Contributing

Contributions are welcome. Please open an issue or submit a pull request with a clear description of the change.

## License / Contact

Licensed under [MIT](LICENSE). For usage or collaboration inquiries, please contact the repository owner.
