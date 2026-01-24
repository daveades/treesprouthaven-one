class AppNavbar extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
        <header class="site-header" id="header">
            <div class="container nav-container">
            <a href="/" class="logo">
                <img src="/logo.png" alt="TreeSproutHaven Logo">
            </a>
            <nav>
                <ul class="nav-links" id="nav-links">
                <li><a href="/">Home</a></li>
                <li><a href="/about.html">About</a></li>
                <li><a href="/services.html">Services</a></li>
                <li><a href="/faq.html">FAQ</a></li>
                <li><a href="/contact.html">Contact</a></li>
                </ul>
            </nav>
            <div class="header-actions">
                <a href="/contact.html" class="btn btn-primary">Get Support</a>
                <button class="mobile-menu-btn" id="mobile-menu-btn" aria-label="Toggle menu">
                <i class="ph ph-list"></i>
                </button>
            </div>
            </div>
        </header>
        `;

        this.highlightActiveLink();
        this.initMobileMenu();
        this.setPersistentHeader();
        this.toggleSupportButton();
    }

    highlightActiveLink() {
        const currentPath = window.location.pathname;
        const links = this.querySelectorAll('.nav-links a');

        links.forEach(link => {
            if (link.getAttribute('href') === currentPath) {
                link.classList.add('active');
            }
        });
    }

    initMobileMenu() {
        const btn = this.querySelector('#mobile-menu-btn');
        const nav = this.querySelector('#nav-links');

        if (btn && nav) {
            btn.addEventListener('click', () => {
                nav.classList.toggle('active');
                const icon = btn.querySelector('i');
                if (nav.classList.contains('active')) {
                    icon.classList.remove('ph-list');
                    icon.classList.add('ph-x');
                } else {
                    icon.classList.remove('ph-x');
                    icon.classList.add('ph-list');
                }
            });

            // Close menu when clicking a link
            nav.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    nav.classList.remove('active');
                    const icon = btn.querySelector('i');
                    icon.classList.remove('ph-x');
                    icon.classList.add('ph-list');
                });
            });
        }
    }

    setPersistentHeader() {
        const header = this.querySelector('#header');
        if (header) {
            header.classList.add('scrolled');
        }
    }

    toggleSupportButton() {
        const supportButton = this.querySelector('.header-actions .btn.btn-primary');
        if (!supportButton) return;

        const currentPath = window.location.pathname;
        if (currentPath.endsWith('/contact.html') || currentPath === '/contact.html') {
            supportButton.style.display = 'none';
        }
    }
}

customElements.define('app-navbar', AppNavbar);
