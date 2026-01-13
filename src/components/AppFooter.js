class AppFooter extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
        <footer id="contact" class="site-footer">
            <div class="container">
            <div class="footer-content">
                <div class="footer-brand">
                <a href="/" class="logo">
                    <img src="/logo.png" alt="TreeSproutHaven Logo">
                    TreeSproutHaven
                </a>
                <p>Restoring hope and rebuilding lives through holistic, community-based support.</p>
                </div>
                <div class="footer-links">
                <h4>Quick Links</h4>
                <ul>
                    <li><a href="/about.html">About Us</a></li>
                    <li><a href="/services.html">Services</a></li>
                    <li><a href="/faq.html">FAQ</a></li>
                </ul>
                </div>
                <div class="footer-contact">
                <h4>Contact</h4>
                <p>3-2 Alberta Drive<br>Fort MCMurray T9H 1P3</p>
                <p><a href="mailto:admin@treesprouthaven.com">admin@treesprouthaven.com</a></p>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2025 TreeSproutHaven. All rights reserved.</p>
            </div>
            </div>
        </footer>
        `;
    }
}

customElements.define('app-footer', AppFooter);
