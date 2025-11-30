import { lazy, Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import './App.css';

// Lazy load the heavy 3D background (Three.js ~1MB)
const InteractiveAiBackground = lazy(() => import('./components/ui/InteractiveAiBackground'));

/**
 * Main App component with React Router for multi-page navigation
 * Portfolio of Emanuele Nardone - PhD in Artificial Intelligence
 */
function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Suspense fallback={null}>
          <InteractiveAiBackground />
        </Suspense>
        <AppRoutes />
      </div>
    </BrowserRouter>
  );
}

export default App;