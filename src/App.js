//import logo from './logo.svg';
import './App.css';
import Routes from './routes';
import {ContextWrapper} from './userContext'

function App() {
  return (
    <div className="content">
    <ContextWrapper>
    
     
     <Routes></Routes>
     
    </ContextWrapper>
    </div>
  );
}

export default App;
