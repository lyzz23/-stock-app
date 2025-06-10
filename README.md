# Stock Portfolio Dashboard

This project is a modern and responsive stock interface website, designed to provide users with a comprehensive overview of their investment portfolio, market trends, and relevant news. It features interactive charts and a clear breakdown of assets and recent activities.

## Features

*   **Portfolio Overview**: Displays total portfolio value, profit/loss, cash balance, and monthly/annualized returns.
*   **Interactive K-line Chart**: Visualizes asset history with candlestick-like data, allowing users to select specific date ranges using a brush slider.
*   **Asset Allocation Pie Chart**: Shows the distribution of assets in the portfolio with interactive labels.
*   **Recent Activity Log**: Tracks buy, sell, dividend, deposit, and other transactions.
*   **Market Overview**: Provides quick insights into major market indices like S&P 500, Dow Jones, and Nasdaq.
*   **Portfolio News Feed**: Keeps users updated with headlines relevant to their holdings.
*   **Responsive Design**: Optimized for various screen sizes.
*   **Theming**: Supports light and dark modes (managed via `ThemeContext`).

## Technologies Used

This project is built with:

*   **React**: A JavaScript library for building user interfaces.
*   **Recharts**: A composable charting library built on React components.
*   **CSS Variables**: For easy theme management.
*   **Node.js & npm**: For package management and running the development server.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have [Node.js](https://nodejs.org/en/download/) and npm (Node Package Manager) installed on your system. npm is usually installed alongside Node.js.

*   **Node.js**:
    ```bash
    node -v
    ```
*   **npm**:
    ```bash
    npm -v
    ```

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/lyzz23/-stock-app.git
    ```
2.  **Navigate into the project directory:**
    ```bash
    cd -stock-app
    ```
3.  **Install the project dependencies:**
    ```bash
    npm install
    ```
    *   **Troubleshooting on Windows (PowerShell):** If you encounter an error like "cannot be loaded because running scripts is disabled on this system," you might need to adjust PowerShell's execution policy. Open PowerShell as an **Administrator** and run:
        ```powershell
        Set-ExecutionPolicy RemoteSigned
        ```
        Then try `npm install` again.

### Running the Application

After installing the dependencies, you can start the development server:

```bash
npm start
```

This will usually open your application in your default web browser at `http://localhost:3000`. If it doesn't open automatically, you can navigate to this URL manually.

## Project Structure

```
.
├── public/                 # Static assets (images, index.html)
│   ├── images/             # Various image assets for logos, charts, etc.
│   └── index.html          # Main HTML file
├── src/                    # Source code
│   ├── assets/             # General assets (e.g., .gitkeep)
│   ├── components/         # Reusable React components (e.g., Header, Pages like HomePage, PortfolioPage)
│   ├── contexts/           # React Contexts (e.g., ThemeContext)
│   ├── App.jsx             # Main application component
│   ├── index.css           # Global styles
│   └── main.jsx            # Entry point for the React application
├── .gitignore              # Specifies intentionally untracked files to ignore by Git
├── package.json            # Project metadata and dependencies
├── package-lock.json       # Records the exact versions of dependencies
├── README.md               # Project documentation
└── vite.config.js          # Vite build configuration
```

## License

This project is open-sourced under the MIT License. See the LICENSE file for details.
