# URL Shortener Frontend

A user-friendly frontend for a URL shortener service built with React, TypeScript, Vite, and Tailwind CSS. It integrates with the URL shortener backend API to provide a seamless URL shortening experience.

## Features

- Shorten long URLs into compact, easy-to-share short URLs
- Update and delete short URLs
- View click analytics for each short URL
- Responsive design for optimal viewing on various devices
- API key authentication for secure access to the backend API
- Option to use environment variables for the API base URL and API key
- Input validation and error handling
- Copy short URLs to clipboard with a single click
- Loading states and error messages for better user experience
- Styled with Tailwind CSS for a modern and visually appealing interface

## Prerequisites

- [Node.js](https://nodejs.org/)
- [URL Shortener Backend API](https://github.com/llegomark/url-shortener)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/llegomark/url-shortener-frontend.git
   ```

2. Install the dependencies:

   ```bash
   cd url-shortener-frontend
   npm install
   ```

3. Create a `.env` file in the project root and set the following environment variables:

   ```
   VITE_API_BASE_URL=https://your-backend-api-url
   VITE_API_KEY=your-default-api-key
   ```

   Replace `https://your-backend-api-url` with the URL of your URL shortener backend API, and `your-default-api-key` with your default API key (optional).

## Usage

1. Start the development server:

   ```bash
   npm run dev
   ```

2. Open your browser and visit `http://localhost:3000` to access the URL Shortener frontend.

3. Enter a long URL in the input field and click "Generate Short URL" to create a short URL.

4. If the API key is not set in the environment variables, you will need to provide an API key in the form.

5. Once a short URL is generated, you can copy it to the clipboard by clicking the "Copy" button.

6. To update a short URL, click the "Update" button and enter the new long URL.

7. To delete a short URL, click the "Delete" button.

8. To view click analytics for a short URL, navigate to the Analytics Dashboard by clicking the "Go to Analytics Dashboard" link.

9. In the Analytics Dashboard, enter the short code of the URL you want to retrieve analytics for and click "Get Analytics".

## Components

### UrlShortenerForm

The `UrlShortenerForm` component allows users to create, update, and delete short URLs. It provides a user-friendly interface for interacting with the URL shortener service.

### AnalyticsDashboard

The `AnalyticsDashboard` component displays click analytics for a specific short URL. Users can enter the short code and retrieve the total number of clicks for that URL.

## API Integration

The frontend communicates with the URL shortener backend API to perform various operations. The API endpoints and their functionalities are as follows:

- `POST /api/urls`: Create a new short URL
- `PUT /api/urls/:shortCode`: Update an existing short URL
- `DELETE /api/urls/:shortCode`: Delete a short URL
- `GET /api/analytics/:shortCode`: Retrieve click analytics for a specific short URL

The frontend sends requests to these endpoints using the `fetch` API and handles the responses accordingly. The API key is included in the `Authorization` header for authentication.

## Environment Variables

The frontend supports the use of environment variables for the API base URL and default API key. If the `VITE_API_KEY` environment variable is set, the API key input field will be hidden in the `UrlShortenerForm` and `AnalyticsDashboard` components, and the default API key will be used for API requests.

## Error Handling

The frontend implements error handling to provide informative error messages to the user when API requests fail. It catches errors and displays appropriate error messages in the user interface.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).