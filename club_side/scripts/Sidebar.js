// Sidebar.js
class Sidebar {
    constructor(containerId, sidebarUrl) {
        this.containerId = containerId;
        this.sidebarUrl = sidebarUrl;
    }

    loadSidebar() {
        fetch(this.sidebarUrl)
            .then(response => response.text())
            .then(data => {
                const container = document.getElementById(this.containerId);
                if (container) {
                    container.innerHTML = data;
                } else {
                    console.error(`Element with ID ${this.containerId} not found.`);
                }
            })
            .catch(error => console.error('Error loading sidebar:', error));
    }
}

export default Sidebar;