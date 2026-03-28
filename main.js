/**
 * zeroのblog - Main Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log('zeroのblog initialized.');
    
    // Feature Initializations
    setupSmoothScrolling();
    setupProgressBar();
    setupThemeToggle();
    setupDynamicPosts();
});

/**
 * Smooth scrolling for anchor links
 */
function setupSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Scroll Progress Bar logic
 */
function setupProgressBar() {
    const progressBar = document.getElementById('progress-bar');
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

/**
 * Dark/Light Mode toggle logic
 */
function setupThemeToggle() {
    const toggleBtn = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Check local storage for preference
    if (localStorage.getItem('theme') === 'light') {
        body.classList.add('light-mode');
        toggleBtn.textContent = '🌙 Dark';
    } else {
        toggleBtn.textContent = '☀️ Light';
    }

    toggleBtn.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        if (body.classList.contains('light-mode')) {
            localStorage.setItem('theme', 'light');
            toggleBtn.textContent = '🌙 Dark';
        } else {
            localStorage.setItem('theme', 'dark');
            toggleBtn.textContent = '☀️ Light';
        }
    });
}

/**
 * Dynamic Post Rendering for Home Page
 */
function setupDynamicPosts() {
    const grid = document.querySelector('.articles-grid');
    if (!grid) return; // Not on home page

    const userPosts = JSON.parse(localStorage.getItem('user_posts') || '[]');
    
    userPosts.forEach(post => {
        const article = document.createElement('article');
        article.className = 'glass article-card';
        article.onclick = () => { location.href = `post.html?id=${post.id}`; };
        
        article.innerHTML = `
            <span style="color: var(--color-primary); font-size: 0.8rem; font-weight: 600;">${post.category}</span>
            <h3 style="margin-top: 0.5rem;">${post.title}</h3>
            <p style="color: var(--color-secondary); font-size: 0.9rem; margin-bottom: var(--spacing-md);">
                ${post.content.replace(/<[^>]*>?/gm, '').substring(0, 80)}...
            </p>
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 0.8rem;">${post.date}</span>
                <span style="font-size: 0.8rem; color: var(--color-primary);">${post.readTime} min read</span>
            </div>
        `;
        
        // Add to the beginning of the grid
        grid.prepend(article);
    });
}
