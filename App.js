import React from 'react';
import SplashScreen from 'react-native-splash-screen';
import Root from './src/index';
import HomeScreen from './src/containers/home/HomeScreen';
import { Router, Stack } from 'react-native-router-flux';
import Routes from './src/routes/Begin';

class App extends React.Component {
  constructor() {
    super();
  }
  async componentDidMount() {
    SplashScreen.hide();
  }
  // useEffect((
  //   ),[])
  render() {
    // return <HomeScreen />;
    // return <Root />;
    return (
      <Router>
        <Stack key="root">{Routes}</Stack>
      </Router>
    );
  }
}

export default App;
