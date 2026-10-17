import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/navbar';
import Footer from './components/footer';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="main-content">
        <AppRoutes />
      </div>
      <Footer />
    </Router>
  );
}

export default App;