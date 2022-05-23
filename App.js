import React from 'react';
import SplashScreen from 'react-native-splash-screen';
import Root from './src/index';
import HomeScreen from './src/containers/home/HomeScreen';

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
    return <Root />;
  }
}

export default App;
