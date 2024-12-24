// App.js
import Sidebar from './Sidebar.js';
import Header from './header.js';

class App {
    constructor() {
        this.sidebar = new Sidebar('sidebar-container', 'sidebar.html');
        this.header = new Header('header-container', 'header.html');
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.sidebar.loadSidebar();
            this.header.loadHeader();
        });
    }
}

export default App;