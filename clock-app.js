// Multi-Timezone Digital Clock Application

const STORAGE_KEY = 'timezoneClocks';
let selectedTimezones = [];

// DOM Elements
const timezoneInput = document.getElementById('timezoneInput');
const addBtn = document.getElementById('addBtn');
const clocksGrid = document.getElementById('clocksGrid');
const emptyState = document.getElementById('emptyState');
const clearAllBtn = document.getElementById('clearAllBtn');

// Initialize
function init() {
    loadTimezones();
    renderClocks();
    attachEventListeners();
    updateClocks();
    // Update every second
    setInterval(updateClocks, 1000);
}

// Load timezones from local storage
function loadTimezones() {
    const stored = localStorage.getItem(STORAGE_KEY);
    selectedTimezones = stored ? JSON.parse(stored) : [];
}

// Save timezones to local storage
function saveTimezones() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedTimezones));
}

// Attach event listeners
function attachEventListeners() {
    addBtn.addEventListener('click', addTimezone);
    timezoneInput.addEventListener('change', addTimezone);
    clearAllBtn.addEventListener('click', clearAllTimezones);
}

// Add timezone
function addTimezone() {
    const timezone = timezoneInput.value.trim();
    
    if (!timezone) {
        alert('Please select a timezone!');
        return;
    }

    // Check if timezone already exists
    if (selectedTimezones.includes(timezone)) {
        alert('This timezone is already added!');
        return;
    }

    // Validate timezone
    if (!isValidTimezone(timezone)) {
        alert('Invalid timezone!');
        return;
    }

    selectedTimezones.push(timezone);
    saveTimezones();
    timezoneInput.value = '';
    renderClocks();
}

// Remove timezone
function removeTimezone(timezone) {
    selectedTimezones = selectedTimezones.filter(tz => tz !== timezone);
    saveTimezones();
    renderClocks();
}

// Clear all timezones
function clearAllTimezones() {
    if (selectedTimezones.length === 0) {
        alert('No timezones to clear!');
        return;
    }
    
    if (confirm('Clear all timezones?')) {
        selectedTimezones = [];
        saveTimezones();
        renderClocks();
    }
}

// Validate timezone
function isValidTimezone(tz) {
    try {
        Intl.DateTimeFormat(undefined, { timeZone: tz });
        return true;
    } catch (ex) {
        return false;
    }
}

// Get current time in timezone
function getTimeInTimezone(timezone) {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    });
    
    const dateFormatter = new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
    
    return {
        time: formatter.format(now),
        date: dateFormatter.format(now)
    };
}

// Get timezone offset
function getTimezoneOffset(timezone) {
    try {
        const now = new Date();
        const utcDate = new Date(now.toLocaleString('en-US', { timeZone: 'UTC' }));
        const tzDate = new Date(now.toLocaleString('en-US', { timeZone: timezone }));
        const offset = (tzDate - utcDate) / (1000 * 60 * 60);
        const sign = offset >= 0 ? '+' : '';
        const hours = Math.floor(Math.abs(offset));
        const minutes = Math.round((Math.abs(offset) - hours) * 60);
        return `UTC ${sign}${hours}:${minutes.toString().padStart(2, '0')}`;
    } catch (e) {
        return 'UTC';
    }
}

// Update all clocks
function updateClocks() {
    selectedTimezones.forEach((timezone, index) => {
        const clockElement = document.querySelector(`[data-timezone="${timezone}"] .time-display`);
        if (clockElement) {
            const timeData = getTimeInTimezone(timezone);
            clockElement.innerHTML = `${timeData.time}<span class="period">${getTimezoneOffset(timezone)}</span>`;
        }
    });
}

// Render clocks
function renderClocks() {
    clocksGrid.innerHTML = '';

    if (selectedTimezones.length === 0) {
        emptyState.classList.add('show');
        clearAllBtn.disabled = true;
        return;
    } else {
        emptyState.classList.remove('show');
        clearAllBtn.disabled = false;
    }

    selectedTimezones.forEach((timezone, index) => {
        const timeData = getTimeInTimezone(timezone);
        const offset = getTimezoneOffset(timezone);
        
        const clockCard = document.createElement('div');
        clockCard.className = 'clock-card';
        clockCard.setAttribute('data-timezone', timezone);
        
        const tzParts = timezone.split('/');
        const displayName = tzParts[tzParts.length - 1].replace(/_/g, ' ');
        
        clockCard.innerHTML = `
            <div class="timezone-name">${displayName}</div>
            <div class="date-display">${timeData.date}</div>
            <div class="time-display">${timeData.time}<span class="period">${offset}</span></div>
            <div class="timezone-offset">Timezone: ${timezone}</div>
            <button class="remove-btn" onclick="removeTimezone('${timezone}')">Remove</button>
        `;
        
        clocksGrid.appendChild(clockCard);
    });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
