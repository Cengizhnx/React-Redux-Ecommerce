import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Nav from "./components/Nav";
import Footer from './components/Footer';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';

function App() {
  return (
    <div className='flex flex-col h-screen justify-between bg-slate-200'>
      <Router>
        <div>
          <Nav></Nav>
        </div>

        <div>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/productDetail" element={<ProductDetail />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
          </Routes>
        </div>

        <div>
          <Footer></Footer>
        </div>
      </Router>
    </div>
  );
}

export default App;
