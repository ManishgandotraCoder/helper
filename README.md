# Personal Helper - Manish Gandotra

A personal helper webpage that stores and manages your professional information with easy copy functionality and customizable data storage.

## Features

- **Profile Management**: Store and edit your full name, email, LinkedIn, GitHub, and portfolio URLs
- **Cover Letter**: Write and store your cover letter with easy copy functionality
- **Copy to Clipboard**: One-click copy for all your information
- **Custom Information**: Add any custom key-value pairs (phone number, address, etc.)
- **Persistent Storage**: All data is saved to a JSON server and persists between sessions
- **Responsive Design**: Works on desktop and mobile devices

## Quick Start

### Option 1: Run Everything at Once (Recommended)
```bash
npm run dev
```
This will start both the React app (http://localhost:3000) and the JSON server (http://localhost:3001) simultaneously.

### Option 2: Run Separately
1. Start the JSON server (in one terminal):
```bash
npm run server
```

2. Start the React app (in another terminal):
```bash
npm start
```

## Usage

1. **View Your Information**: Your profile information is displayed with easy-to-read formatting
2. **Copy Information**: Click any "Copy" button to copy information to your clipboard
3. **Edit Profile**: Click "Edit Profile" to modify your basic information
4. **Add Custom Info**: Use the custom info section to add additional details like phone numbers, addresses, etc.
5. **Delete Custom Info**: Remove any custom information you no longer need

## Available Scripts

- `npm start` - Runs the React app in development mode
- `npm run server` - Starts the JSON server on port 3001
- `npm run dev` - Runs both the React app and JSON server concurrently
- `npm run build` - Builds the app for production
- `npm test` - Runs the test suite

## Data Storage

Your data is stored in `db.json` file and served by json-server. The structure includes:
- Profile information (name, email, social links, cover letter)
- Custom information array for any additional data you want to store

## Customization

You can easily customize:
- Update your default information in `db.json`
- Modify the styling in `src/App.css`
- Add new fields by editing `src/App.js`

## Technologies Used

- React 19.2.0
- Axios for API calls
- JSON Server for data persistence
- Modern CSS with responsive design

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
