# Mindful Milo Landing Page

A vibrant, playful, and emotionally engaging landing page for Mindful Milo, an AI-powered emotional support and creativity tool for kids aged 7-13.

## Features

- Responsive design that works on all devices
- Playful animations and interactions
- Soft gradients and rounded shapes for a child-friendly interface
- Sections for product features, use cases, testimonials, and waitlist signup

## Project Structure

```
mindful-milo/
├── index.html        # Main HTML file
├── styles.css        # CSS styles
├── script.js         # JavaScript for interactions
├── server.js         # Express server for API handling
├── package.json      # Node.js dependencies
├── .env              # Environment variables (not in git)
└── images/           # Directory for images
```

## Customization

### Adding Real Images

Replace the placeholder images in the `images/` directory with your actual images:

- `milo-logo.png` - The Mindful Milo logo
- `milo-mascot.png` - Milo character/mascot
- `storytime-icon.png`, `breathing-icon.png`, `doodle-icon.png`, `insights-icon.png` - Feature icons
- `andy-case.png`, `ben-case.png`, `lizzy-case.png` - Use case images
- `dr-smith.png`, `parent-jessica.png`, `kid-tyler.png` - Testimonial author images
- `milo-logo-small.png` - Footer logo

### Adding a Real Video

To add a real demo video, replace the video placeholder in `index.html`:

```html
<div class="video-container">
    <!-- Replace this placeholder with your actual video embed code -->
    <iframe width="100%" height="450" src="YOUR_VIDEO_URL" frameborder="0" allowfullscreen></iframe>
</div>
```

### Customizing Colors

The color scheme is defined in the `:root` section of `styles.css`. Modify these variables to change the color scheme:

```css
:root {
    --primary-yellow: #FFD54F;
    --primary-yellow-light: #FFF8E1;
    --primary-yellow-dark: #FFC107;
    --primary-brown: #3E2723;
    --primary-brown-light: #5D4037;
    /* ... other color variables ... */
}
```

## Deployment

### Vercel Deployment

This project is set up to be deployed on Vercel:

1. Push the repository to GitHub
2. Connect your Vercel account to your GitHub repository
3. Configure the environment variables in Vercel:
   - Add `MAILERLITE_API_KEY` and `WAITLIST_MAILERLITE_API_KEY` in the Vercel project settings
4. Deploy the project

Vercel will automatically detect the Node.js server and deploy it correctly.

### Alternative Deployment

You can also deploy this to any Node.js hosting service:

1. Upload all files to your web hosting service
2. Run `npm install` to install dependencies
3. Set up environment variables for your API keys
4. Start the server with `npm start`

## Waitlist Form Integration

The waitlist form is integrated with MailerLite for collecting email addresses:

1. The form submits data to the `/api/waitlist` endpoint in our Express server
2. The server securely uses the MailerLite API to add subscribers to your list
3. Child age is captured as a custom field when provided

To use this integration:

1. Make sure your `.env` file contains your MailerLite API key
2. Ensure you have created a subscriber group in your MailerLite account
3. The server handles the API communication securely without exposing your key

## Browser Compatibility

This landing page is designed to work on modern browsers including:
- Chrome
- Firefox
- Safari
- Edge

## Credits

- Fonts: Nunito from Google Fonts
- Icons: Font Awesome
