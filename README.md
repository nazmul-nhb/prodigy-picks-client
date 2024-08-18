# Prodigy Picks : : Eco Essentials

## [Live Link](https://prodigy-picks-nhb.vercel.app)

## Overview

The Prodigy Picks client is a single-page application (SPA) built with React.js and Vite for a full-stack e-commerce platform. The application provides functionalities for searching, filtering, sorting, and paginating products, as well as user authentication and cart operations.

## Features

- **Pagination**: Efficiently load and navigate through product pages.
- **Searching**: Search for products by name.
- **Categorization**: Filter products by brand name, category, and price range.
- **Sorting**: Sort products by price (low to high, high to low), date added (newest first, oldest first) and ratings.
- **Authentication**: Google and email/password authentication via Firebase.
- **Cart Operations**: Add and remove products from the cart.

## Run the Project Locally

### Prerequisites

- Node.js
- npm or yarn

### Setup

1. **Clone the repository**:

    ```bash
    git clone https://github.com/nazmul-nhb/prodigy-picks-client
    ```

2. **Navigate to the project directory**:

    ```bash
    cd prodigy-picks-client
    ```

3. **Install dependencies**:

    ```bash
    npm install
    ```

    or, if you prefer yarn:

    ```bash
    yarn install
    ```

4. **Create a `.env` file** in the root directory of the project and add your environment variables.

    ```env
    VITE_FIREBASE_API_KEY=your-firebase-api-key
    VITE_FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
    VITE_FIREBASE_PROJECT_ID=your-firebase-project-id
    VITE_FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket
    VITE_FIREBASE_MESSAGING_SENDER_ID=your-firebase-messaging-sender-id
    VITE_FIREBASE_APP_ID=your-firebase-app-id
    ```

5. **Start the development server**:

    ```bash
    npm run dev
    ```

    or, if you are using yarn:

    ```bash
    yarn dev
    ```

## Features Implementation

### Pagination

- Implemented to handle large sets of product data efficiently.
- Provides navigation controls (Next, Previous) and page number indicators.

### Searching

- Allows users to search for products by name with real-time updates.

### Categorization

- Products can be filtered by brand name, category, and price range.
- Supports multiple filters applied simultaneously.

### Sorting

- Users can sort products by price, date added and ratings.
- Sorting options include:
  - Price: Low to High, High to Low
  - Date Added: Newest first
  - Ratings: Low to High, High to Low (Extra)

### Authentication

- Integrated Google Authentication using Firebase.
- Implemented Email and Password Authentication using Firebase.

### Cart Operations (Extra Feature)

- Users can add and remove products from their cart.
