import {Icon, Text, Title, View} from 'native-base';
import React, {useState} from 'react';
import {BackHandler, Image, Modal, Share, TouchableOpacity} from 'react-native';
import commonColor from '../../native-base-theme/variables/commonColor';
import Localization from '../constants/i18/Localization';
import styles from '../containers/home/styles';

const Buttons = ({navigation, reload, replaceViewMenu}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const onShare = async () => {
    try {
      const result = await Share.share({
        title: 'App link',
        message:
          'Please install this app and stay safe , AppLink :https://drive.google.com/file/d/1LktVSqFvO_C3U1P83tDuDQa4HSeRUVWe/view?usp=drivesdk',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      // alert(error.message);
    }
  };

  return (
    <View
      style={{
        alignItems: 'flex-end',
      }}
    >
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={async () => {
          setModalVisible(false);
        }}
      >
        <View
          style={{
            backgroundColor: 'rgba(0,0,0,0.4)',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
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
              {Localization.exit}
            </Text>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                marginRight: 10,
              }}
            >
              <TouchableOpacity
                style={styles.modal.cancel}
                onPress={() => {
                  setModalVisible(false);
                  replaceViewMenu(false);
                }}
              >
                <Text style={{}}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  BackHandler.exitApp();
                }}
              >
                <Text style={{fontWeight: '700'}}>Exit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <TouchableOpacity
        onPress={() => {
          replaceViewMenu(false);
          navigation.navigate('aboutUs');
        }}
        style={styles.iconContainer}
      >
        {/* <Image
          source={require('../Assets/about.png')}
          style={{width: 25, height: 25}}
        /> */}

        <Icon
          type="Octicons"
          name="info"
          style={{color: commonColor.brandPrimary}}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          marginRight: 36,
          // marginTop: 10,
          // marginBottom: 10,
          ...styles.iconContainer,
        }}
        onPress={() => {
          replaceViewMenu(false);
          navigation.navigate('contactUs');
        }}
      >
        {/* <Image
          source={require('../Assets/social.png')}
          style={{width: 25, height: 25}}
        /> */}

        <Icon
          type="FontAwesome"
          name="sitemap"
          style={{color: commonColor.brandPrimary,fontSize:22}}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          marginRight: 56,
          marginTop: 10,
          marginBottom: 10,
          ...styles.iconContainer,
        }}
        onPress={() => {
          replaceViewMenu(false);
          reload();
        }}
      >
        <Icon
          type="MaterialCommunityIcons"
          name="refresh"
          style={{color: commonColor.brandPrimary}}
        />
        {/* <Image
          source={require('../Assets/reload.png')}
          style={{width: 20, height: 20}}
        /> */}
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          marginRight: 36,
          // marginTop: 5,
          // marginBottom: 10,
          ...styles.iconContainer,
        }}
        onPress={() => {
          replaceViewMenu(false);
          onShare();
        }}
      >
        <Icon
          type="Entypo"
          name="share"
          style={{color: commonColor.brandPrimary}}
        />
        {/* <Image
          source={require('../Assets/share.png')}
          style={{width: 30, height: 30}}
        /> */}
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          ...styles.iconContainer,
        }}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Icon
          type="Ionicons"
          name="close"
          style={{color: commonColor.brandPrimary}}
        />
        {/* <Image
          source={require('../Assets/close.png')}
          style={{width: 20, height: 20}}
        /> */}
      </TouchableOpacity>
    </View>
  );
};
export default Buttons;
