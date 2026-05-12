# Multi-Timezone Digital Clock

## Overview

A sophisticated web application that displays the current time across multiple time zones with real-time updates, automatic persistence, and a beautiful user interface.

## Features

### ⏰ Core Functionality
- **Real-Time Updates** - Clock updates every second automatically
- **Multiple Timezones** - Display and track multiple time zones simultaneously
- **Add/Remove Timezones** - Easily add new timezones or remove existing ones
- **Timezone Validation** - Automatically validates timezone names
- **Clear All** - Remove all timezones with one click

### 📊 Display Information
- **Current Time** - Shows time in 12-hour format with AM/PM
- **Current Date** - Displays full date (Day Month Date)
- **Timezone Offset** - Shows UTC offset for each timezone
- **Timezone Name** - Full timezone identifier

### 💾 Persistence
- **Automatic Saving** - Selected timezones saved to local storage
- **Data Recovery** - Timezones restored on page reload
- **No Server Needed** - Works completely offline

### 🎨 User Experience
- Modern gradient design with colorful clock cards
- Responsive grid layout
- Smooth animations and transitions
- Beautiful hover effects
- Mobile-friendly interface
- Comprehensive timezone list (25+ timezones)

## File Structure

```
bim-excel-viewer/
├── clock.html              # HTML structure
├── clock-styles.css        # Styling and responsive design
├── clock-app.js            # Application logic
└── CLOCK_README.md         # This file
```

## How to Use

### Getting Started

1. **Open the Application**
   - Open `clock.html` in your web browser

2. **Add a Timezone**
   - Click the dropdown "Add Timezone" menu
   - Select your desired timezone
   - Click "Add Clock" button
   - A new clock card will appear

3. **View Multiple Timezones**
   - Repeat step 2 for as many timezones as you need
   - All clocks update in real-time

4. **Remove a Timezone**
   - Click the "Remove" button on the clock card

5. **Clear All Timezones**
   - Click "Clear All" button to remove all clocks

## Supported Timezones

The application supports 25+ major world timezones:

### Americas
- UTC (Coordinated Universal Time)
- America/New_York (EST/EDT)
- America/Chicago (CST/CDT)
- America/Denver (MST/MDT)
- America/Los_Angeles (PST/PDT)
- America/Anchorage (AKST/AKDT)
- Pacific/Honolulu (HST)
- Brazil/Sao_Paulo (BRT/BRST)

### Europe
- Europe/London (GMT/BST)
- Europe/Paris (CET/CEST)
- Europe/Berlin (CET/CEST)
- Europe/Moscow (MSK)

### Asia
- Asia/Dubai (GST)
- Asia/Kolkata (IST)
- Asia/Bangkok (ICT)
- Asia/Hong_Kong (HKT)
- Asia/Shanghai (CST)
- Asia/Tokyo (JST)
- Asia/Seoul (KST)
- Asia/Singapore (SGT)

### Australia & Pacific
- Australia/Sydney (AEDT/AEST)
- Australia/Melbourne (AEDT/AEST)
- Pacific/Auckland (NZDT/NZST)
- Pacific/Fiji (FJT)

## Technical Details

### Storage Format

Timezones are stored in JSON format:

```json
[
  "America/New_York",
  "Asia/Tokyo",
  "Europe/London"
]
```

### JavaScript Functions

| Function | Purpose |
|----------|----------|
| `init()` | Initialize the application |
| `loadTimezones()` | Load timezones from local storage |
| `saveTimezones()` | Save timezones to local storage |
| `addTimezone()` | Add a new timezone |
| `removeTimezone(tz)` | Remove a specific timezone |
| `clearAllTimezones()` | Remove all timezones |
| `isValidTimezone(tz)` | Validate timezone existence |
| `getTimeInTimezone(tz)` | Get current time in timezone |
| `getTimezoneOffset(tz)` | Get UTC offset for timezone |
| `updateClocks()` | Update all clock displays |
| `renderClocks()` | Render clocks to DOM |

### Internationalization (i18n)

The application uses the Intl API for accurate timezone handling:

```javascript
// Uses Intl.DateTimeFormat for precise timezone conversion
Intl.DateTimeFormat('en-US', { timeZone: timezone })
```

## Browser Support

- Chrome 24+
- Firefox 29+
- Safari 10+
- Edge (all versions)
- Opera 15+
- IE 11+

Requires Intl.DateTimeFormat API support.

## Features Highlights

### Accuracy
- Uses browser's native Intl API
- Accounts for daylight saving time automatically
- UTC offset calculated accurately

### Performance
- Lightweight (~4KB minified JS, ~3KB CSS)
- No external dependencies
- Efficient DOM updates
- Optimized for smooth real-time updates

### Accessibility
- Semantic HTML
- Clear visual hierarchy
- High contrast colors
- Responsive touch targets

## Use Cases

1. **Remote Teams** - Track team members across different time zones
2. **Global Events** - Display countdown to events in multiple regions
3. **Business Operations** - Monitor business hours across locations
4. **Travel Planning** - Check time differences for trip planning
5. **International Communication** - Coordinate calls with global clients
6. **Financial Trading** - Monitor market hours in different exchanges
7. **Broadcasting** - Coordinate live events across regions

## Future Enhancements

- [ ] Add custom timezone names/nicknames
- [ ] Time zone city search
- [ ] Sunrise/sunset times for each timezone
- [ ] Business hours indicator
- [ ] 12-hour/24-hour format toggle
- [ ] Timezone comparison view
- [ ] Meeting scheduler across timezones
- [ ] Alarm/notification system
- [ ] Dark mode toggle
- [ ] Export timezone settings
- [ ] Pin frequently used timezones

## Troubleshooting

### Clocks not updating?
- Verify JavaScript is enabled
- Check browser console for errors
- Reload the page

### Timezone not available?
- Not all timezone names are supported
- Ensure you're using the IANA timezone identifier
- Check the supported timezone list above

### Time seems incorrect?
- Verify your computer's system time is correct
- Check for daylight saving time transitions
- Timezone may be observing DST (displayed automatically)

## License

MIT License - See LICENSE file for details

## Author

dzap123
