import NetInfo from '@react-native-community/netinfo';
import {Container, Icon, Text, Title, View} from 'native-base';
import React, {useEffect, useRef, useState} from 'react';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import {
  ActivityIndicator,
  BackHandler,
  Dimensions,
  Image,
  Modal,
  Platform,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {Actions} from 'react-native-router-flux';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import WebView from 'react-native-webview';
import commonColor from '../../../native-base-theme/variables/commonColor';
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
    // 'https://www.bj-deal.com/meet-us.php',
  );
  const [stage, setStage] = useState(2);
  const [refreshing, setRefreshing] = React.useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [onlineModal, setOnlineModal] = useState(false);
  const [baseUrl, setBaseUrl] = useState('https://www.bj-deal.com/');
  const [onMount, setOnMount] = useState(false);
  const [curUrl, setCurUrl] = useState(' ');
  const [showTabs, setShowTabs]=useState(true)

  // console.log('onMount: ', onMount);
  useEffect(() => {
    handleCameraPermission();
    setOnMount(true);
    NetInfo.addEventListener(networkState => {
      setIsOnline(networkState.isConnected && networkState.isInternetReachable);
      !isOnline ? setOnlineModal(true) : onRefresh();
      // networkState.isConnected === false
      //   ? [setOnlineModal(true),console.log("current offline: ",webViewRef.current)]
      //   : setOnlineModal(false);
      // console.log('is online ?', isOnline);
      // console.log('Is connected? - ', networkState.isConnected);
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

  // useEffect(() => {
  //   const backAction = () => {
  //     setModalVisible(true);
  //     return true;
  //   };

  //   const backHandler = BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     backAction,
  //   );

  //   return () => backHandler.remove();
  // }, []);

  async function handleBackPress() {
    await webViewRef.current.goBack();
  }

  async function handleForwardPress() {
    await webViewRef.current.goForward();
  }

  function refresh() {
    webViewRef.current?.reload();
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
  // const requestCameraPermission = async () => {
  //   try {
  //   const granted = await PermissionsAndroid.request(
  //   PermissionsAndroid.PERMISSIONS.CAMERA,
  //   {
  //   title: "Permission for Captureeeee Extraaaodrinary Application",
  //   message:
  //   "For your beautiful pictures, " +
  //   "Grant permission to Captureeeee Extraaaordinary Application",
  //   buttonNeutral: "Not Right Now!",
  //   buttonNegative: "Cancel",
  //   buttonPositive: "Alright"
  //   })}};

  const handleCameraPermission = async () => {
    const permission =
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.CAMERA
        : PERMISSIONS.ANDROID.CAMERA;
    console.log(permission);
    const res = await check(permission);
    if (res === RESULTS.GRANTED) {
      setCameraGranted(true);
    } else if (res === RESULTS.DENIED) {
      const res2 = await request(permission);
      res2 === RESULTS.GRANTED
        ? setCameraGranted(true)
        : setCameraGranted(false);
    }
  };

  return (
    <Container
      style={[styles.container, {paddingBottom: stage === 1 ? 30 : 8}]}
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
          <View style={styles.modal.container}>
            <View style={[styles.modal.subContainer, {height: 150}]}>
              <Title style={styles.modal.title}>Bj-deal</Title>
              <Text style={{textAlign: 'center', fontSize: 18}}>
                Quitter l'application?
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
                  <Text style={styles.modal.cancel}>ANNULER</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    BackHandler.exitApp();
                  }}
                >
                  <Text style={{fontWeight: '700'}}>OK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <View style={styles.webViewContainer}>
          <ScrollView
            overScrollMode="never"
            onLayout={e => setHeight(e.nativeEvent.layout.height)}
            onScroll={()=>console.log('scrolling')}
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
            {/* {!isOnline ? ( */}
            <WebView
              onScroll={e =>
                {setEnabled(
                  typeof onRefresh === 'function' &&
                    e.nativeEvent.contentOffset.y === 0,
                ),
                setShowTabs(false);
              }
              }
              style={[{height}]}
              userAgent={
                DeviceInfo.getUserAgent() + Platform.OS == 'ios'
                  ? 'MobileApp-Baneck-Ios-Webview'
                  : 'MobileApp-Baneck-Android-Webview'
              }
              ref={webViewRef}
              source={{uri: baseUrl}}
              // renderError={(e)=>onRefresh()}
              onHttpError={nativeEvent => {
                nativeEvent.nativeEvent.code == -8;
                setOnlineModal(true);
              }}
              onError={nativeEvent => {
                setOnlineModal(true);
                console.log('http Error: ', nativeEvent.nativeEvent.code);
              }}
              onNavigationStateChange={state => {
                setCurUrl(state.url);
                console.log('current url:', curUrl);
                if (
                  curUrl.includes('https://www.bj-deal.com/pst_stp_two.php')
                ) {
                  handleCameraPermission()
                  console.log('the url include the second step of annonce');
                } else 'it do not include the second step';
                if (
                  state.url == annonce ||
                  curUrl.includes('https://www.bj-deal.com/pst_stp_two.php')
                ) {
                  setStage(3);
                } else if (
                  state.url == contactsUrl ||
                  curUrl.includes('https://www.bj-deal.com/user_account.php')
                ) {
                  setStage(1);
                  // } else if (state.url !== contactsUrl) {
                  //   setBaseUrl(state.url);
                  //   setStage(2);
                  // } else if (state.url !== annonce) {
                  //   setBaseUrl(state.url);
                  //   setStage(2);
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
                <View style={styles.modal.container}>
                  <View style={[styles.modal.subContainer, {height: 180}]}>
                    <Title style={styles.modal.title}>Bj-deal</Title>
                    <Text
                      style={{
                        textAlign: 'center',
                        fontSize: 18,
                        fontWeight: '800',
                      }}
                    >
                      Pas de connexion internet
                    </Text>
                    <Text style={{textAlign: 'justify', fontSize: 15}}>
                      Activez vos données mobile ou connectez-vous à un réseau
                      Wi-fi.
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        isOnline
                          ? [setOnlineModal(false), onRefresh()]
                          : [
                              setOnlineModal(false),
                              setVisible(true),
                              wait(200).then(() => {
                                setVisible(false);
                                setOnlineModal(true);
                              }),
                            ];
                      }}
                    >
                      <Text
                        style={{
                          textAlign: 'right',
                          color: commonColor.brandPrimary,
                          fontWeight: '900',
                          fontSize: 16,
                        }}
                      >
                        Recharger
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </View>
            {/* ]
          )} */}
          </ScrollView>
          {visible ? <ActivityIndicatorElement /> : null}
        </View>
      </SafeAreaView>
      {/* <View style={styles.navigations.Cotaniner}> */}
      {showTabs ? <View style={styles.navigations.subContainer}>
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
          {/* <Image
              source={require('../../Assets/login1.png')}
              style={{
                width: 22,
                height: 22,
                tintColor:
                  stage == 1
                    ? commonColor.brandPrimary
                    : commonColor.inactiveTab,
              }}
            /> */}
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
      </View>:<TouchableOpacity 
      onPress={()=>setShowTabs(true)}
      style={{position:'absolute',backgroundColor:commonColor.brandPrimary,paddingVertical:15,paddingHorizontal:10,bottom:55, borderTopLeftRadius:20, borderBottomLeftRadius:20,right:0}} >
        <Text>Show Tabs</Text>
      </TouchableOpacity>
}
      {/* </View> */}
    </Container>
  );
};

export default HomeScreen;
