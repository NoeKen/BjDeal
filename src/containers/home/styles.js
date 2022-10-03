import {Platform, StyleSheet} from 'react-native';
import commonColor from '../../../native-base-theme/variables/commonColor';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // backgroundColor: 'rgb(50,250,255)',
    // paddingBottom: 30,
  },
  webViewContainer: {
    flex: 1,
  },
  navigations: {
    Container: {
      flexDirection: 'row',
      position: 'absolute',
      bottom: 0,
      backgroundColor:'transparents'
    },
    subContainer:{
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: commonColor.inverseTextColor,
      height: 50,
      flexDirection: 'row',
      elevation: 80,
      shadowOffset: {
        width: 0,
        height: -7,
      },
      shadowOpacity: 0.08,
      // shadowRadius: 4.65,
      shadowColor: commonColor.textColor,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      // flex: 1,
      borderTopWidth: Platform.OS==='android'? 1:0,
      borderLeftWidth: Platform.OS==='android'? 1:0,
      borderRightWidth: Platform.OS==='android'? 1:0,
      borderColor: Platform.OS==='android'?commonColor.inputBorderColor:'transparent',
      paddingHorizontal: 16,
    }
  },
  activityIndicator: {
    flex: 1,
    position: 'absolute',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    backfaceVisibility: 'hidden',
  },
  modal: {
    container: {
      backgroundColor: 'rgba(0,0,0,0.5)',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    subContainer: {
      justifyContent: 'space-between',
      backgroundColor: 'white',
      width: '80%',
      borderRadius: 20,
      alignSelf: 'center',
      margin: 'auto',
      elevation: 30,
      padding: 16,
    },
    cancel: {
      marginRight: 35,
    },
    title: {
      color: commonColor.brandPrimary,
      fontWeight: 'bold',
      alignSelf: 'center',
      fontSize: 22,
    },
  },
});

export default styles;
