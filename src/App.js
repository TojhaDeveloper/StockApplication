import { lazy } from 'react';
import './App.css';
import LoginPage from './components/LoginPage';
import {Routes,Route,BrowserRouter} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ListItems = lazy(() => import('./stocks/ListItems'))
const ListDetail = lazy(() => import('./stocks/ListDetail'))

function App() {
  return (
    <>
    <ToastContainer/>
    <BrowserRouter>
    <div className="App">
      <Routes>
       <Route path="/" element={<LoginPage/>}/>
       <Route path="/home" element={<ListItems/>}/>
       <Route path="/details/:id" element={<ListDetail/>}/>
       <Route path="*" element={<h1>404 Not Found</h1>}/>
      </Routes>
    </div>
    </BrowserRouter>
    </>
  );
}

export default App;
