import {StyleSheet} from 'react-native';
import commonColor from '../../../native-base-theme/variables/commonColor';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgb(250,250,255)',
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
    },
    subContainer:{
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: commonColor.inverseTextColor,
      height: 50,
      flexDirection: 'row',
      elevation: 80,
      shadowOffset: {
        width: 10,
        height: 3,
      },
      shadowOpacity: 0.27,
      shadowRadius: 4.65,
      shadowColor: commonColor.textColor,
      // borderTopLeftRadius: 20,
      // borderTopRightRadius: 20,
      // flex: 1,
      borderTopWidth: 1,
      borderLeftWidth: 1,
      borderRightWidth: 1,
      borderColor: commonColor.inputBorderColor,
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
