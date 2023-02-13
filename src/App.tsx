import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.scss';
import Layout from './layout';
import Auth from './components/auth';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { DeFiAPIRoute } from './router/sourceMap';
import { useAppSelector } from './shared/redux';
import { useHooks } from './shared/hooks';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoute from './router';
import { Footer, Header } from '@mantine/core';
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
  useHooks();

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

