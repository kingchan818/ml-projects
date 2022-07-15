import Home from './pages/Home';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
function App() {
    ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
    return (
        <div className="App font-fira">
            <Home />
        </div>
    );
}

export default App;
