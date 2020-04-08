import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native';

import './config/ReactotroConfig';

import Routes from './routes';

function App() {
  return (
    <>
      <StatusBar backgroundColor="#7159c1" barStyle="light-content" />
      <Routes />
    </>
  );
}

export default App;
