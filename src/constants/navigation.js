import Colors from '../../native-base-theme/variables/commonColor';

export default {
  navbarProps: {
    navigationBarStyle: { backgroundColor: 'white' },
    titleStyle: {
      color: Colors.textColor,
      alignSelf: 'center',
      fontSize: Colors.fontSizeBase,
    },
    backButtonTintColor: Colors.textColor,
  },

  tabProps: {
    swipeEnabled: false,
    activeBackgroundColor: 'rgba(255,255,255,0.1)',
    inactiveBackgroundColor: 'white',
    activeTintColor: Colors.brandPrimary,
    labelStyle: { color: Colors.brandPrimary },
    // inactiveBackgroundColor: Colors.brandPrimary,
    tabBarStyle: { backgroundColor: 'white' },
    // tabBarStyle: { backgroundColor: Colors.brandPrimary },
  },

  icons: {
    style: { color: '#95989A', height: 30, width: 30 ,activeColor: Colors.brandPrimary},
    // style: { color: 'white', height: 30, width: 30 },
  },
};
