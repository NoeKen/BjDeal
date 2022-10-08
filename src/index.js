import { Root } from 'native-base';
import { PropTypes } from 'prop-types';
import React from 'react';
import { StatusBar } from 'react-native';
import { Router, Stack } from 'react-native-router-flux';
import SplashScreen from 'react-native-splash-screen';
import Routes from './routes/Begin';



class App extends React.Component {
  constructor() {
    super();
  }

  async componentDidMount() {
    SplashScreen.hide();
    this.setState({ loading: false });
  }

  render() {

    return (
      <Root>
        <StatusBar
          backgroundColor='#303F9F'
          barStyle='light-content'
        />
        {/* <Provider store={store}> */}
          {/* <Loading /> */}
          {/* <PersistGate persistor={persistor}> */}
          {/* <PersistGate loading={<Loading />} persistor={persistor}> */}
            {/* <StyleProvider style={getTheme(theme)}> */}
              {/* <Init> */}
                <Router>
                  <Stack key="root">{Routes}</Stack>
                </Router>
              {/* </Init> */}
            {/* </StyleProvider> */}
          {/* </PersistGate> */}
        {/* </Provider> */}
      </Root>
    );
  }
}

App.propTypes = {
  store: PropTypes.shape({}).isRequired,
  persistor: PropTypes.shape({}).isRequired,
};

export default App;
