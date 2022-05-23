import React from 'react';
import { Router, Scene, Stack } from 'react-native-router-flux';
import Main from './index';


const BeginnerRoute = (
  <Stack hideNavBar>
    <Scene key="Main" hideNavBar>
      <Router>
        <Stack key="begin" hideNavBar>{Main}</Stack>
      </Router>
    </Scene>
  </Stack>
);

export default BeginnerRoute;
