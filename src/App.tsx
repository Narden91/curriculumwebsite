import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import './App.css';

/**
 * Main App component with React Router for multi-page navigation
 * Portfolio of Emanuele Nardone - PhD in Artificial Intelligence
 */
// Get basename for GitHub Pages deployment
const basename = import.meta.env.BASE_URL;

function App() {
  return (
    <BrowserRouter basename={basename}>
      <div className="app">
        <AppRoutes />
      </div>
    </BrowserRouter>
  );
}

export default App;