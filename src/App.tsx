import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import InteractiveAiBackground from './components/ui/InteractiveAiBackground';
import './App.css';

/**
 * Main App component with React Router for multi-page navigation
 * Portfolio of Emanuele Nardone - PhD in Artificial Intelligence
 */
function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <InteractiveAiBackground />
        <AppRoutes />
      </div>
    </BrowserRouter>
  );
}

export default App;