
# Admin Dashboard

![Cover](https://github.com/RezaAzarnia/Admin-Dashboard/assets/57747920/78258a50-b1af-4238-8d96-88b7da985022)

## Description

This project is a high-speed admin dashboard aiming to provide comprehensive management features for products, users, articles, categories, comments, and orders. Built with efficiency in mind, it leverages React Query for optimized data caching and retrieval, ensuring a seamless user experience.


## Live Preview

Check out the live preview of the admin dashboard [PoratlPro](https://portalpro.liara.run/).

## Technologies Used

- React
- React Router DOM
- Axios
- Formik
- JSON Server
- React Icons
- React Query
- React Quill
- Recharts
- Sass
- Dompurify

## Backend Information

This project utilizes JSON Server and pure JavaScript in the service file due to the absence of a backend.

## Installation

To run this project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/RezaAzarnia/Admin-Dashboard.git
2.  Navigate to the project directory:
        
    `cd yourrepository` 
    
3.  Install dependencies:

    `npm install` 
    
4.  Start the development server:
            
    `npm start` 
    
5.  Open your browser and navigate to http://localhost:3000 to view the admin dashboard.
    

## Features

### Product Management
- CRUD operations (Create, Read, Update, Delete) for products
- View products in a normal format

### Article Management
- CRUD operations for articles
- View articles in a normal format

### User Management
- CRUD operations for users

### Comment Management
- Read, Show, Accept & Reject, Answer comments, delete comment

### Category Management
- CRUD operations for categories

### Order Management
- View, Delete orders


## Usage of Items in the App

-   **Axios**: Used for making HTTP requests to fetch data from the server.
-   **Dompurify**: Used for sanitizing HTML to prevent XSS attacks.
-   **Formik**: Used for form handling and validation.
-   **JSON Server**: Used as a mock backend for simulating server responses.
-   **React**: JavaScript library for building user interfaces.
-   **React Router DOM**: Used for declarative routing in the React application.
-   **React Icons**: Used for adding icons to the UI.
-   **React Query**: Used for data fetching and caching.
-   **React Quill**: Used for rich text editing.
-   **Recharts**: Used for creating charts and graphs.
-   **Sass**: CSS extension language for styling the UI.

## Custom Components and Hooks

-   **Custom Toast**: Created a custom toast component for displaying notifications.
-   **Custom Hook for Toast**: Created a custom hook for managing toast notifications.
-   **Custom Infinite Scroll Hook**: Used for implementing infinite scroll functionality.
-   **Custom Pagination Hook**: Implemented pagination for navigating through large datasets.
-   **Other Custom Hooks**: Created additional custom hooks for specific functionalities.

## State Management

State management is handled using a combination of React Context and a reducer for a centralized approach. This approach allows for efficient state management, enabling components to access and update shared state in a predictable and scalable manner.

## Contributing

Contributions are welcome! Please feel free to open a pull request or submit an issue if you find any bugs or have any suggestions for improvement.

## License

This project is licensed under the MIT License.
