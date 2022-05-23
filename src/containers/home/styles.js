import { StyleSheet } from 'react-native';

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
  navigationContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
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
    justifyContent: 'space-between',
    backgroundColor: 'white',
    height: 150,
    width: '80%',
    borderRadius: 20,
    alignSelf: 'center',
    margin: 'auto',
    elevation: 30,
    padding: 16,
    cancel: {
      marginRight: 35,
    },
  },
});

export default styles;
