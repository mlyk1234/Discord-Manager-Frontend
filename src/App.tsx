import './App.scss';
import Layout from './layout';
import { BrowserRouter as Router } from 'react-router-dom';
import DeFiAlert from './components/AppLayout';
import Viewbase from './components/Viewbase';

function App() {
  return (
    <Router>
      <Layout header={<DeFiAlert.AppHeader/>} body={<Viewbase/>} footer={<DeFiAlert.AppFooter/>} ></Layout>
    </Router>
  );
}

export default App;

