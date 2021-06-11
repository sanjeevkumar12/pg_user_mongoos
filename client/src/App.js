import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Siderbar from './components/includes/Sidebar';
import Header from './components/includes/Header';
import Footer from './components/includes/Footer';
import Layout from './components/includes/Layout';

function App() {
  return (
    <div className="container-scroller">
    
    <Header></Header>
    <div className="container-fluid page-body-wrapper">
      <Siderbar></Siderbar>
      <div className="main-panel">
        <div className="content-wrapper">
          hello
        </div>       
        <Footer></Footer>
      </div>
    </div>
  </div>
  );
}

export default App;
