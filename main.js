        // Dark Mode Logic
        const themeToggle = document.getElementById('theme-toggle');
        const toggleCircle = document.getElementById('toggle-circle');
        const html = document.documentElement;

        // Check local storage or system preference
        if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            html.classList.add('dark');
            toggleCircle.classList.add('translate-x-6');
            toggleCircle.classList.remove('translate-x-1');
        }

        themeToggle.addEventListener('click', () => {
            html.classList.toggle('dark');
            if (html.classList.contains('dark')) {
                localStorage.setItem('theme', 'dark');
                toggleCircle.classList.add('translate-x-6');
                toggleCircle.classList.remove('translate-x-1');
            } else {
                localStorage.setItem('theme', 'light');
                toggleCircle.classList.remove('translate-x-6');
                toggleCircle.classList.add('translate-x-1');
            }
        });

        // Mobile Sidebar Toggle
        const mobileBtn = document.getElementById('mobile-menu-btn');
        const sidebar = document.getElementById('sidebar');
        mobileBtn.addEventListener('click', () => {
            sidebar.classList.toggle('-translate-x-full');
        });

        // Tab Switching Logic
        function switchTab(evt, tabName) {
            // Hide all tab content
            const contents = document.getElementsByClassName("tab-content");
            for (let i = 0; i < contents.length; i++) {
                contents[i].classList.add("hidden");
            }
            // Remove active class from buttons
            const buttons = document.getElementsByClassName("tab-btn");
            for (let i = 0; i < buttons.length; i++) {
                buttons[i].classList.remove("active");
            }
            // Show current tab and activate button
            document.getElementById(tabName).classList.remove("hidden");
            evt.currentTarget.classList.add("active");
        }

        // Gallery Card Hover Effect
        document.addEventListener('DOMContentLoaded', function() {
            const galleryCards = document.querySelectorAll('.gallery-card');
            galleryCards.forEach(card => {
                card.addEventListener('mouseenter', function() {
                    const overlay = this.querySelector('.absolute.inset-0');
                    if (overlay) {
                        overlay.classList.remove('opacity-0');
                        overlay.classList.add('opacity-100');
                    }
                });

                card.addEventListener('mouseleave', function() {
                    const overlay = this.querySelector('.absolute.inset-0');
                    if (overlay) {
                        overlay.classList.remove('opacity-100');
                        overlay.classList.add('opacity-0');
                    }
                });
            });
        });

        // Global Search Functionality
        const searchInput = document.getElementById('search-input');
        searchInput.addEventListener('keyup', (e) => {
            const term = e.target.value.toLowerCase();
            const sections = document.querySelectorAll('section');

            sections.forEach(section => {
                const text = section.innerText.toLowerCase();
                // Simple highlight effect or scroll logic could be added here
                // For now, we will just console log hits for debugging
                if(text.includes(term) && term.length > 2) {
                   // Ideally highlight or scroll to first match
                }
            });
        });

        // Error Table Filter
        function filterErrors() {
            const input = document.getElementById('error-search');
            const filter = input.value.toUpperCase();
            const table = document.getElementById('error-table');
            const tr = table.getElementsByClassName('error-row');

            for (let i = 0; i < tr.length; i++) {
                const tdCode = tr[i].getElementsByTagName("td")[0];
                const tdText = tr[i].getElementsByTagName("td")[1];
                if (tdCode || tdText) {
                    const txtValueCode = tdCode.textContent || tdCode.innerText;
                    const txtValueText = tdText.textContent || tdText.innerText;
                    if (txtValueCode.toUpperCase().indexOf(filter) > -1 || txtValueText.toUpperCase().indexOf(filter) > -1) {
                        tr[i].style.display = "";
                    } else {
                        tr[i].style.display = "none";
                    }
                }
            }
        }

        // Copy Code Function
        function copyCode(btn) {
            const code = btn.nextElementSibling.innerText;
            navigator.clipboard.writeText(code).then(() => {
                const originalText = btn.innerText;
                btn.innerText = 'Copied!';
                setTimeout(() => {
                    btn.innerText = originalText;
                }, 2000);
            });
        }

        // Checklist Logic (LocalStorage)
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        
        // Load state
        checkboxes.forEach(box => {
            const savedState = localStorage.getItem(box.id);
            if (savedState === 'true') {
                box.checked = true;
            }
            
            box.addEventListener('change', () => {
                localStorage.setItem(box.id, box.checked);
            });
        });

        function resetChecklists() {
            checkboxes.forEach(box => {
                box.checked = false;
                localStorage.removeItem(box.id);
            });
        }
