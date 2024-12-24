// App.js
import Sidebar from './Sidebar.js';

class App {
    constructor() {
        this.sidebar = new Sidebar('sidebar-container', 'sidebar.html');
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.sidebar.loadSidebar();
        });
    }
}

export default App;