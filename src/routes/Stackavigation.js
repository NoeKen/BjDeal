import { Icon } from 'native-base';
import React, { useState } from 'react';
import { Router, Stack } from 'react-native-router-flux';
import Joystick from '../components/Joystick';
import AboutUs from '../containers/aboutUS/AboutUs';
import ContactUs from '../containers/contacts/ContactUs';
import HomeScreen from '../containers/home/HomeScreen';

const TabIcon = ({focused, name, style}) => {
  const nStyle = {...style.activeColor};
  const [activeColor, setActiveColor] = useState(style.activeColor);
  delete nStyle.activeColor;
  return (
    <Icon
      style={{...nStyle, color: focused ? style.activeColor : style.color}}
      name={name}
    />
  );
};

const StackNavigation = () => {
  return (
    <Router>
      <Stack hideNavBar key="root">
        <Scene key="homeScreen" title="HomeScreen" component={HomeScreen} />
        <Scene key="aboutUs" title="AboutUs" component={AboutUs} />
        {/* <Scene key="buttons" title="Buttons" component={Buttons} /> */}
        <Scene key="joystick" title="Joystick" component={Joystick} />
        <Scene key="contactUs" title="ContactUs" component={ContactUs} />
      </Stack>
    </Router>
  );
};

export default StackNavigation;
