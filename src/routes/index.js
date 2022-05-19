import { Icon } from 'native-base';
import React from 'react';
import { Text, View } from 'react-native';
import { Scene, Stack } from 'react-native-router-flux';
import commonColor from '../../native-base-theme/variables/commonColor';
import Joystick from '../components/Joystick';
import AboutUs from '../containers/aboutUS/AboutUs';
import ContactUs from '../containers/contacts/ContactUs';
import HomeScreen from '../containers/home/HomeScreen';
import StackNavigation from './Stackavigation';

const SettingsTopTab = (focused, label) => (
  <View style={{ marginTop: -15 }}>
    <Text style={{ color: commonColor.inverseTextColor, fontWeight: 'bold' }}>{label}</Text>
  </View>
);

const SettingsTab = (focused, name, initial, label) => (
  <View style={{ alignItems: 'center', justifyContent: 'center' }}>
    <Icon
      name={name}
      // type="MaterialIcons"
      style={{
        color: focused ? commonColor.brandPrimary : commonColor.inputColor,
        backgroundColor: 'transparent',
      }}
    />
    {focused ? (
      <View
        style={{
          backgroundColor: commonColor.brandPrimary,
          width: 50,
          height: 50,
          marginBottom: -35,
          marginTop: 3,
          borderRadius: 70,
          alignItems: 'center',
        }}
      >
        <Text style={{ color: commonColor.inverseTextColor, marginTop: -2, fontWeight: 'bold' }}>
          {initial}
        </Text>
      </View>
    ) : null}
  </View>
);

const Index = (
  <Stack hideNavBar>
    
    <Scene key="homeScreen" title="HomeScreen" component={HomeScreen} />
    <Scene key="aboutUs" title="AboutUs" component={AboutUs} />
    {/* <Scene key="buttons" title="Buttons" component={Buttons} /> */}
    <Scene key="joystick" title="Joystick" component={Joystick} />
    <Scene key="contactUs" title="ContactUs" component={ContactUs} />
  </Stack>
);

export default Index;
