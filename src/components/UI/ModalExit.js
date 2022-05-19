import {Text, Title, View} from 'native-base';
import React, {useEffect, useState} from 'react';
import {Modal, TouchableOpacity} from 'react-native';
import { connect } from 'react-redux';
import commonColor from '../../../native-base-theme/variables/commonColor';
import Localization from '../../constants/i18/Localization';
import styles from '../../containers/home/styles';

const ModalExit = ({visible=false,backHandler,lang}) => {
  const [modalVisible, setModalVisible] = useState(visible);
  Localization.setLanguage(lang);
//   useEffect(() => {
//     // stateChange();
//     const backAction = () => {
//       setModalVisible(true);
//       // Alert.alert("Exit Bj-deal!", "Are you sure you want to exit the app?", [
//       //   {
//       //     text: "Cancel",
//       //     onPress: () => null,
//       //     style: "cancel"
//       //   },
//       //   { text: "YES", onPress: () => BackHandler.exitApp() }
//       // ]);
//       return true;
//     };

//     const backHandler = BackHandler.addEventListener(
//       'hardwareBackPress',
//       backAction,
//     );

//     return () => backHandler.remove();
//   }, []);
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={async () => {
        await Alert.alert('Modal has been closed.');
        setModalVisible(false);
      }}
    >
      <View style={{backgroundColor:'rgba(0,0,0,0.4)',flex:1,alignItems: 'center',justifyContent: 'center'}}>
        <View style={styles.modal}>
          <Title
            style={{
              color: commonColor.brandPrimary,
              fontWeight: 'bold',
              alignSelf: 'center',
              fontSize: 22,
            }}
          >
            Bj-deal !!
          </Title>
          <Text style={{textAlign: 'center', fontSize: 18}}>
           {Localization.exitApp}
          </Text>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              marginRight: 10,
            }}
          >
            <TouchableOpacity
              style={{marginRight: 15}}
              onPress={() => {
                setModalVisible(false);
              }}
            >
              <Text style={{}}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                backHandler.exitApp();
              }}
            >
              <Text style={{fontWeight: '700'}}>Exit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  // theme: state.settings.theme,
  lang: state.auth.lang,
});

const mapDispatchToProps = (dispatch) => ({
  replaceLanguage: dispatch.auth.replaceLanguage
});

export default connect(mapStateToProps, mapDispatchToProps) (ModalExit);
