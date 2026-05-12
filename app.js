// To-Do List Application with Local Storage

const STORAGE_KEY = 'todoList';
let tasks = [];
let currentFilter = 'all';

// DOM Elements
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const emptyState = document.getElementById('emptyState');
const clearCompleted = document.getElementById('clearCompleted');
const deleteAll = document.getElementById('deleteAll');
const filterBtns = document.querySelectorAll('.filter-btn');
const totalTasks = document.getElementById('totalTasks');
const completedTasks = document.getElementById('completedTasks');
const remainingTasks = document.getElementById('remainingTasks');

// Initialize app
function init() {
    loadTasks();
    renderTasks();
    attachEventListeners();
}

// Load tasks from local storage
function loadTasks() {
    const stored = localStorage.getItem(STORAGE_KEY);
    tasks = stored ? JSON.parse(stored) : [];
}

// Save tasks to local storage
function saveTasks() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

// Add event listeners
function attachEventListeners() {
    addBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask();
    });
    clearCompleted.addEventListener('click', clearCompletedTasks);
    deleteAll.addEventListener('click', deleteAllTasks);
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => setFilter(btn.dataset.filter));
    });
}

// Add a new task
function addTask() {
    const text = taskInput.value.trim();
    
    if (!text) {
        alert('Please enter a task!');
        return;
    }

    const task = {
        id: Date.now(),
        text: text,
        completed: false,
        createdAt: new Date().toLocaleString()
    };

    tasks.unshift(task); // Add to beginning
    saveTasks();
    taskInput.value = '';
    taskInput.focus();
    renderTasks();
}

// Toggle task completion
function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        saveTasks();
        renderTasks();
    }
}

// Delete a task
function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    saveTasks();
    renderTasks();
}

// Clear completed tasks
function clearCompletedTasks() {
    const completed = tasks.filter(t => t.completed);
    if (completed.length === 0) {
        alert('No completed tasks to clear!');
        return;
    }
    
    if (confirm(`Clear ${completed.length} completed task(s)?`)) {
        tasks = tasks.filter(t => !t.completed);
        saveTasks();
        renderTasks();
    }
}

// Delete all tasks
function deleteAllTasks() {
    if (tasks.length === 0) {
        alert('No tasks to delete!');
        return;
    }
    
    if (confirm('Are you sure? This will delete ALL tasks!')) {
        tasks = [];
        saveTasks();
        renderTasks();
    }
}

// Set filter
function setFilter(filter) {
    currentFilter = filter;
    filterBtns.forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-filter="${filter}"]`).classList.add('active');
    renderTasks();
}

// Get filtered tasks
function getFilteredTasks() {
    switch (currentFilter) {
        case 'active':
            return tasks.filter(t => !t.completed);
        case 'completed':
            return tasks.filter(t => t.completed);
        default:
            return tasks;
    }
}

// Update statistics
function updateStats() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const remaining = total - completed;

    totalTasks.textContent = total;
    completedTasks.textContent = completed;
    remainingTasks.textContent = remaining;
}

// Render tasks to DOM
function renderTasks() {
    taskList.innerHTML = '';
    const filtered = getFilteredTasks();

    if (filtered.length === 0) {
        emptyState.classList.add('show');
        taskList.style.display = 'none';
    } else {
        emptyState.classList.remove('show');
        taskList.style.display = 'block';
        
        filtered.forEach(task => {
            const li = document.createElement('li');
            li.className = `task-item ${task.completed ? 'completed' : ''}`;
            li.innerHTML = `
                <input 
                    type="checkbox" 
                    class="checkbox" 
                    ${task.completed ? 'checked' : ''}
                    onchange="toggleTask(${task.id})"
                >
                <span class="task-text">${escapeHtml(task.text)}</span>
                <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
            `;
            taskList.appendChild(li);
        });
    }

    updateStats();
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
