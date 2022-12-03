import NetInfo from '@react-native-community/netinfo';
import { Container, Icon, Text, View } from 'native-base';
import React, { useEffect, useRef, useState } from 'react';

import {
  ActivityIndicator,
  Animated,
  BackHandler,
  Dimensions,
  Image,
  Modal,
  Platform,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { Actions } from 'react-native-router-flux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import WebView from 'react-native-webview';
import commonColor from '../../../native-base-theme/variables/commonColor';
import ExitModal from '../../components/exitModal';
import InfosPermission from '../../components/InfosPermission';
import NetworkModal from '../../components/networkModal';
import { handleCameraPermission } from '../../components/UI/permission';
import styles from './styles';

// eslint-disable-next-line react/prop-types
function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}
const HomeScreen = () => {
  const insets = useSafeAreaInsets();
  const webViewRef = useRef();
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);
  const [visible, setVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [annonce, setAnnonce] = useState(
    'https://www.bj-deal.com/pst_stp_one.php',
  );
  const [home, setHome] = useState('https://www.bj-deal.com/');
  const [contactsUrl, setContactsUrl] = useState(
    'https://www.bj-deal.com/connexion.php',
  );
  const [stage, setStage] = useState(2);
  const [refreshing, setRefreshing] = React.useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [onlineModal, setOnlineModal] = useState(false);
  const [baseUrl, setBaseUrl] = useState('https://www.bj-deal.com/');
  const [onMount, setOnMount] = useState(false);
  const [curUrl, setCurUrl] = useState(' ');
  const [showTabs, setShowTabs] = useState(true);
  const translationY = useRef(new Animated.Value(0)).current;
  const translationX = useRef(new Animated.Value(200)).current;
  const transInfoPerm = useRef(new Animated.Value(200)).current;
  const [curOffset, setCurOffset] = useState(0);
  const [infoPermModal, setInfosPermModal] = useState(false);

  useEffect(() => {
    // handleCameraPermission();
    setOnMount(true);
    NetInfo.addEventListener(networkState => {
      setIsOnline(networkState.isConnected && networkState.isInternetReachable);
      !isOnline ? setOnlineModal(true) : onRefresh();
    });

    const backAction = () => {
      setModalVisible(true);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);
  const scrollDirection = event => {
    var currentOffset = event.nativeEvent.contentOffset.y;
    var direction = currentOffset > curOffset ? 'down' : 'up';
    direction === 'down' ? hideTabs(55) : hideTabs(0);
    setCurOffset(currentOffset);
  };
  const hideTabs = val => {
    Animated.timing(translationY, {
      toValue: val,
      useNativeDriver: true,
    }).start();
  };
  const showTabsBtn = val => {
    Animated.timing(translationX, {
      toValue: val,
      useNativeDriver: true,
    }).start();
  };
  const infoPermBtn = val => {
    Animated.timing(transInfoPerm, {
      toValue: val,
      useNativeDriver: true,
    }).start();
  };

  async function handleBackPress() {
    await webViewRef.current.goBack();
  }

  async function handleForwardPress() {
    await webViewRef.current.goForward();
  }

  const ActivityIndicatorElement = () => (
    <View style={styles.activityIndicator}>
      <ActivityIndicator color={commonColor.brandPrimary} size="large" />
    </View>
  );

  const onRefresh = React.useCallback(() => {
    setOnMount(true);
    setRefreshing(true);
    setVisible(true);
    webViewRef?.current?.reload();
    wait(200).then(() => {
      setVisible(false), setRefreshing(false);
    });
  }, [visible, refreshing]);

  const [height, setHeight] = useState(Dimensions.get('screen').height * 0.2);
  const [isEnabled, setEnabled] = useState(typeof onRefresh === 'function');

  return (
    <Container
      style={[
        styles.container,
        {paddingBottom: stage === 1 ? (showTabs ? 30 : 0) : showTabs ? 8 : 0},
      ]}
    >
      <SafeAreaView style={[styles.container, {paddingTop: insets.top}]}>
        <StatusBar
          backgroundColor={commonColor.brandPrimary}
          barStyle="light-content"
        />
        <Modal
          animationType="fade"
          transparent
          visible={modalVisible}
          onRequestClose={async () => {
            setModalVisible(false);
          }}
        >
          <ExitModal
            setModalVisible={setModalVisible}
            BackHandler={BackHandler}
          />
        </Modal>
        <View style={styles.webViewContainer}>
          <ScrollView
            overScrollMode="never"
            onLayout={e => setHeight(e.nativeEvent.layout.height)}
            refreshControl={
              <RefreshControl
                onRefresh={onRefresh}
                refreshing={false}
                enabled={isEnabled}
                colors={[commonColor.brandPrimary]}
              />
            }
            style={{flex: 1, height: '100%'}}
          >
            <WebView
              onScroll={e => {
                setEnabled(
                  typeof onRefresh === 'function' &&
                    e.nativeEvent.contentOffset.y === 0,
                ),
                  scrollDirection(e);
              }}
              style={[{height}]}
              userAgent={
                DeviceInfo.getUserAgent() + Platform.OS == 'ios'
                  ? 'MobileApp-Baneck-Ios-Webview'
                  : 'MobileApp-Baneck-Android-Webview'
              }
              ref={webViewRef}
              source={{uri: baseUrl}}
              onHttpError={nativeEvent => {
                setOnlineModal(true);
              }}
              onError={nativeEvent => {
                setOnlineModal(true);
                console.log('http Error: ', nativeEvent.nativeEvent.code);
              }}
              onNavigationStateChange={state => {
                setCurUrl(state.url);
                if (
                  state.url.includes('https://www.bj-deal.com/pst_stp_two.php')
                ) {
                  handleCameraPermission(showTabsBtn, infoPermBtn);
                  console.log('the url include the second step of annonce');
                }
                if (
                  state.url == annonce ||
                  curUrl.includes('https://www.bj-deal.com/pst_stp_two.php')
                ) {
                  setStage(3);
                } else if (
                  state.url == contactsUrl ||
                  state.url.includes('https://www.bj-deal.com/user_account.php')
                ) {
                  setStage(1);
                } else setStage(2);
                const back = state.canGoBack;
                const forward = state.canGoForward;
                setCanGoBack(back);
                setCanGoForward(forward);
              }}
              renderLoading={() => ActivityIndicatorElement}
            />
            {/* ) : (
            [ */}
            <View>
              <Modal
                animationType="fade"
                transparent
                visible={onlineModal}
                onRequestClose={async () => {
                  setOnlineModal(false);
                }}
              >
                <NetworkModal
                  wait={wait}
                  isOnline={isOnline}
                  setOnlineModal={setOnlineModal}
                  onRefresh={onRefresh}
                  setVisible={setVisible}
                />
              </Modal>
            </View>
            <View>
              <Modal
                animationType="fade"
                transparent
                visible={infoPermModal}
                onRequestClose={async () => {
                  setOnlineModal(false);
                }}
              >
                <InfosPermission setInfosPermModal={setInfosPermModal} />
              </Modal>
            </View>
          </ScrollView>
          {visible ? <ActivityIndicatorElement /> : null}
        </View>
      </SafeAreaView>
      <Animated.View
        style={[
          styles.navigations.subContainer,
          {transform: [{translateY: translationY}]},
        ]}
      >
        <TouchableOpacity
          style={{
            // backgroundColor: 'red',
            justifyContent: 'center',
            width: '20%',
            alignItems: 'center',
          }}
          onPress={() => {
            canGoBack ? handleBackPress() : null;
          }}
        >
          <Icon
            name="chevron-back"
            style={{
              color: canGoBack
                ? commonColor.brandPrimary
                : commonColor.inactiveTab,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            // backgroundColor: 'green',
            justifyContent: 'center',
            width: '20%',
            alignItems: 'center',
            backgroundColor:
              stage == 1 ? commonColor.brandPrimaryOpacity : 'transparent',
          }}
          onPress={() => {
            setStage(1);
            setBaseUrl(contactsUrl);
          }}
        >
          <Icon
            name="person"
            style={{
              color:
                stage == 1 ? commonColor.brandPrimary : commonColor.inactiveTab,
              elevation: 10,
              fontSize: 22,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            // backgroundColor: 'blue',
            justifyContent: 'center',
            width: '20%',
            alignItems: 'center',
            backgroundColor:
              stage == 2 ? commonColor.brandPrimaryOpacity : 'transparent',
          }}
          onPress={() => {
            setCanGoBack(!canGoBack), setCanGoForward(!canGoForward);
            baseUrl == home ? Actions.homeScreen() : setBaseUrl(home),
              setStage(2);
          }}
        >
          <Icon
            name="home"
            style={{
              color:
                stage == 2 ? commonColor.brandPrimary : commonColor.inactiveTab,
              fontSize: 22,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            // backgroundColor: 'orange',
            justifyContent: 'center',
            width: '20%',
            alignItems: 'center',
            backgroundColor:
              stage == 3 ? commonColor.brandPrimaryOpacity : 'transparent',
          }}
          onPress={() => {
            setBaseUrl(annonce), setStage(3);
          }}
        >
          <Image
            source={require('../../Assets/addPub.png')}
            style={{
              width: 28,
              height: 28,
              tintColor:
                stage == 3 ? commonColor.brandPrimary : commonColor.inactiveTab,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            // backgroundColor: 'pink',
            justifyContent: 'center',
            width: '20%',
            alignItems: 'center',
          }}
        >
          <Icon
            name="chevron-forward"
            style={{
              color: canGoForward
                ? commonColor.brandPrimary
                : commonColor.inactiveTab,
            }}
            onPress={() => {
              canGoForward ? handleForwardPress() : null;
            }}
          />
        </TouchableOpacity>
      </Animated.View>

      <Animated.View>
        <TouchableOpacity
          onPress={() => {
            handleCameraPermission(showTabsBtn, infoPermBtn);
          }}
          style={[
            styles.permBtn,
            {
              transform: [{translateX: translationX}],
            },
          ]}
        >
          <Text
            style={{color: commonColor.inverseTextColor, fontWeight: 'bold'}}
          >
            Autorisations
          </Text>
        </TouchableOpacity>
      </Animated.View>
      <Animated.View>
        <TouchableOpacity
          onPress={() => {
            console.log('infos pressed');
            setInfosPermModal(true);
          }}
          style={[
            styles.permBtn,
            {
              transform: [{translateX: transInfoPerm}],
            },
          ]}
        >
          <Icon
            name="warning"
            style={{color: commonColor.inverseTextColor, fontWeight: 'bold'}}
          />
        </TouchableOpacity>
      </Animated.View>
    </Container>
  );
};

export default HomeScreen;
