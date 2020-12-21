import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainTabNavi from './Pages/navigation';


const App =()=>{
  return (
      <NavigationContainer>
        <MainTabNavi />
      </NavigationContainer>
  );
};

export default App;
