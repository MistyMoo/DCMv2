// header.js
class Header {
    constructor(containerId, headerUrl) {
        this.containerId = containerId;
        this.headerUrl = headerUrl;
    }

    loadHeader() {
        fetch(this.headerUrl)
            .then(response => response.text())
            .then(data => {
                const container = document.getElementById(this.containerId);
                if (container) {
                    container.innerHTML = data;
                } else {
                    console.error(`Element with ID ${this.containerId} not found.`);
                }
            })
            .catch(error => console.error('Error loading header:', error));
    }
}

export default Header;