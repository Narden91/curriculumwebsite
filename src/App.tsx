import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import SplatBackground from './components/background/SplatBackground';
import { useTheme } from './hooks/useTheme';
import './App.css';

// GitHub Pages serves the site under /curriculumwebsite/
const basename = import.meta.env.BASE_URL;

function App() {
  const { splatEnabled } = useTheme();

  return (
    <BrowserRouter basename={basename}>
      <div className="app">
        {/* unmounting disposes the WebGL context, so "off" costs nothing */}
        {splatEnabled && <SplatBackground />}
        <AppRoutes />
      </div>
    </BrowserRouter>
  );
}

export default App;