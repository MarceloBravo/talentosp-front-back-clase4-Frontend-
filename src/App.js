import { BrowserRouter } from 'react-router';
import { MenuComponent } from './components/header/MenuComponent';
import Navigation from './routes/Navigation';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <MenuComponent />
        <Navigation/>
      </div>
    </BrowserRouter>
  );
}

export default App;
