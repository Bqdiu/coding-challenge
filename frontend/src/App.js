import './App.css';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
   <>
      <Toaster position="top-right" reverseOrder={false} />      
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
