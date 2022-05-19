import React from 'react';
import { Router, Scene, Stack } from 'react-native-router-flux';
// import HeaderNavBar from '../components/UI/HeaderNavBar';
import Main from './index';


const BeginnerRoute = (
  <Stack hideNavBar>
    <Scene key="Main" hideNavBar>
      <Router>
        <Stack key="begin" hideNavBar>{Main}</Stack>
        {/* <Scene key="Conversation" component={Conversation} navBar={HeaderNavBar}/> */}
        {/* <Scene key="Notification" title="ONotifications" component={Notification} navBar={HeaderNavBar}/> */}
      </Router>
    </Scene>
  </Stack>
);

export default BeginnerRoute;
