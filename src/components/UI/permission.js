import { ToastAndroid } from 'react-native';
import { PERMISSIONS, request, RESULTS } from 'react-native-permissions';

export const handleCameraPermission = async (ask, infos) => {
  // !ask && (ask = null)
  await request(
    Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA,
  )
    .then(result => {
      switch (result) {
        case RESULTS.UNAVAILABLE:
          console.log(
            'This feature is not available (on this device / in this context)',
          );
          break;
        case RESULTS.DENIED:
          ask(0);
          console.log(
            'The permission has not been requested / is denied but requestable',
          );
          break;
        case RESULTS.LIMITED:
          console.log('The permission is limited: some actions are possible');
          break;
        case RESULTS.GRANTED:
          ask(200);
          infos(200);
          console.log('The permission is granted');
          break;
        case RESULTS.BLOCKED:
          infos(0);
          ask(200);
        //   ToastAndroid.show(
        //     "Vous devez Autoriser l'application Bj-deal à acceder à votre camera photo",
        //     ToastAndroid.LONG,
        //   );
          console.log('The permission is denied and not requestable anymore');
          break;
      }
    })
    .catch(error => {
      console.log('permission error: ', error);
    });
};
