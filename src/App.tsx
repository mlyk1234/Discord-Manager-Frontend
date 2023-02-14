import './App.scss';
import Layout from './layout';
import { useGeneralHooks, useRequireAuthHooks } from './shared/hooks';
import { BrowserRouter as Router } from 'react-router-dom';
import DeFiAlert from './components/AppLayout';
import Viewbase from './components/Viewbase';

function App() {
  // useEffect(() => {
  //   let source: EventSource;
  //   function connect() {
    
  //     if(access_token) {
  //       const eventSourceURL = "http://localhost:3002";
  //       source = new EventSource(`${eventSourceURL}/sse?id=${access_token}`);
      
  //       source.addEventListener('priceData', (e: any) => {
  //         console.log('e', e)
  //       })
  //       source.addEventListener('error', (e: any) => {
  //         console.log('SSE', e)
  //         source.close();
  //         connect();
  //       });
  //     }
  //   }
  //   connect();
    
  //   return () => {
  //     if (source) {
  //       source.close();
  //     }
  //   }
  // }, [access_token]);
  useGeneralHooks();
  useRequireAuthHooks();
  
  return (
    <Router>
      <Layout header={<DeFiAlert.AppHeader/>} body={<Viewbase/>} footer={<DeFiAlert.AppFooter/>} ></Layout>
    </Router>
  );
}

export default App;

const sseEvent = async (source: EventSource, access_token: string) => {
  function connect() {
    
    const eventSourceURL = "http://localhost:3002";
    source = new EventSource(`${eventSourceURL}/sse?id=${access_token}`);
  
    source.addEventListener('notificationData', (e: any) => {
      console.log('e', e)
    })
    source.addEventListener('error', (e: any) => {
      console.log('SSE', e)
      source.close();
      connect();
    });
  }
  connect();
}

