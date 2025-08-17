# Local Setup Instructions

## Prerequisites
- A modern web browser (Chrome, Firefox, Safari, or Edge)
- A local web server (optional but recommended)

## Quick Start

### Option 1: Direct File Opening (Simple)
1. Download or clone this project to your local machine
2. Navigate to the project folder
3. Open `index.html` in your web browser to view the demo
4. Open `storybook.html` to view the Storybook interface

### Option 2: Local Web Server (Recommended)
For better development experience and to avoid CORS issues:

#### Using Python (if installed)
```bash
# Navigate to project directory
cd react-components-assignment

# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Open browser to http://localhost:8000
```

#### Using Node.js (if installed)
```bash
# Install a simple server globally
npm install -g http-server

# Navigate to project directory
cd react-components-assignment

# Start server
http-server

# Open browser to http://localhost:8080
```

#### Using Live Server (VS Code Extension)
1. Install "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

## Project Structure
```
react-components-assignment/
├── index.html              # Main demo page
├── storybook.html          # Storybook preview
├── app.js                  # Main application
├── storybook-app.js        # Storybook application
├── components/
│   ├── InputField.js       # InputField component
│   ├── DataTable.js        # DataTable component
│   └── Demo.js             # Demo examples
├── stories/
│   ├── InputField.stories.js
│   └── DataTable.stories.js
└── trickle/
    └── notes/
        ├── README.md       # Project documentation
        └── SETUP.md        # This setup guide
```

## Development Workflow

### Making Changes
1. Edit component files in the `components/` folder
2. Update stories in the `stories/` folder if needed
3. Refresh your browser to see changes
4. Test in both demo page and Storybook

### Adding New Components
1. Create new component file in `components/`
2. Add import script in `index.html` and `storybook.html`
3. Create stories file in `stories/`
4. Update demo in `components/Demo.js`

### Testing Components
- Use the demo page (`index.html`) for comprehensive testing
- Use Storybook (`storybook.html`) for isolated component testing
- Test different variants, sizes, and states
- Verify accessibility with keyboard navigation

## Browser Compatibility
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Troubleshooting

### Components not loading
- Ensure all script files are in correct locations
- Check browser console for errors
- Verify file paths in HTML imports

### Styles not applying
- Ensure TailwindCSS CDN is loading
- Check for CSS syntax errors in style blocks
- Verify class names are correct

### Storybook not working
- Check that all story files are properly imported
- Ensure component dependencies are loaded first
- Verify story function syntax

## Next Steps
- Customize components for your needs
- Add new variants or features
- Integrate with your existing project
- Deploy to production hosting