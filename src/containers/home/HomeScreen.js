import NetInfo from '@react-native-community/netinfo';
import {Container, Icon, Text, Title, View} from 'native-base';
import React, {useEffect, useRef, useState} from 'react';
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

  console.log('current webview is: ', DeviceInfo.getUserAgent());
  useEffect(() => {
    setVisible(true);
    NetInfo.addEventListener(networkState => {
      setIsOnline(networkState.isConnected && networkState.isInternetReachable);
      !isOnline ? setOnlineModal(true) : onRefresh();
      // networkState.isConnected === false
      //   ? [setOnlineModal(true),console.log("current offline: ",webViewRef.current)]
      //   : setOnlineModal(false);
      // console.log('is online ?', isOnline);
      // console.log('Is connected? - ', networkState.isConnected);
    });
  }, []);

  useEffect(() => {
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
        {paddingBottom: stage === 1 ? 30 : 8},
      ]}>
      <StatusBar backgroundColor={commonColor.brandPrimary} barStyle="light-content" />
      <SafeAreaView style={[styles.container, {paddingTop: insets.top}]}>
        <Modal
          animationType="fade"
          transparent
          visible={modalVisible}
          onRequestClose={async () => {
            setModalVisible(false);
          }}>
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
                }}>
                <TouchableOpacity
                  style={{marginRight: 15}}
                  onPress={() => {
                    setModalVisible(false);
                  }}>
                  <Text style={styles.modal.cancel}>ANNULER</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    BackHandler.exitApp();
                  }}>
                  <Text style={{fontWeight: '700'}}>OK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <View style={styles.webViewContainer}>
          <ScrollView
            onLayout={e => setHeight(e.nativeEvent.layout.height)}
            refreshControl={
              <RefreshControl
                onRefresh={onRefresh}
                refreshing={false}
                enabled={isEnabled}
                colors={[commonColor.brandPrimary]}
              />
            }
            style={{flex: 1, height: '100%'}}>
            {/* {!isOnline ? ( */}
            <WebView
              onScroll={e =>
                setEnabled(
                  typeof onRefresh === 'function' &&
                    e.nativeEvent.contentOffset.y === 0,
                )
              }
              style={[{height}]}
              userAgent={
                DeviceInfo.getUserAgent() + 'MobileApp-Baneck-Android-Webview'
              }
              ref={webViewRef}
              source={{uri: baseUrl}}
              // renderError={(e)=>onRefresh()}
              onHttpError={nativeEvent => {
                nativeEvent.nativeEvent.code == -8
                  // ? setOnlineModal(true)
                  // : setOnlineModal(true);
                  setOnlineModal(true);
                // console.log("Error: ", nativeEvent.nativeEvent.code);
              }}
              onError={nativeEvent => {
                setOnlineModal(true);
                console.log('http Error: ', nativeEvent.nativeEvent.code);
              }}
              onNavigationStateChange={state => {
                if (stage == 2 && state.url == annonce) {
                  setStage(3);
                } else if (stage == 2 && state.url == contactsUrl) {
                  setStage(1);
                } else if (stage == 1 && state.url !== contactsUrl) {
                  setBaseUrl(state.url);
                  setStage(2);
                } else if (stage == 3 && state.url !== annonce) {
                  setBaseUrl(state.url);
                  setStage(2);
                }
                const back = state.canGoBack;
                const forward = state.canGoForward;
                setCanGoBack(back);
                setCanGoForward(forward);
              }}
              // onLoad={() => setVisible(false)}
              onLoadStart={() => setVisible(false)}
              // onLoadProgress={()=> setVisible(false)}
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
                }}>
                <View style={styles.modal.container}>
                  <View style={[styles.modal.subContainer, {height: 180}]}>
                    <Title style={styles.modal.title}>Bj-deal</Title>
                    <Text
                      style={{
                        textAlign: 'center',
                        fontSize: 18,
                        fontWeight: '800',
                      }}>
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
                      }}>
                      <Text
                        style={{
                          textAlign: 'right',
                          color: commonColor.brandPrimary,
                          fontWeight: '900',
                          fontSize: 16,
                        }}>
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
        <View style={styles.navigations.subContainer}>
          <Icon
            name="chevron-back"
            onPress={() => {
              canGoBack ? handleBackPress() : null;
            }}
            style={{
              color: canGoBack
                ? commonColor.brandPrimary
                : commonColor.inactiveTab,
            }}
          />
          <TouchableOpacity
            onPress={() => {
              setStage(1);
              setBaseUrl(contactsUrl);
            }}>
            {/* <Icon
              name="log-in-outline"
              style={{
                color:
                  stage == 1
                    ? commonColor.brandPrimary
                    : commonColor.inactiveTab,
                fontSize: 25,
              }}
            /> */}
            <Image
              source={require('../../Assets/login1.png')}
              style={{
                width: 22,
                height: 22,
                tintColor:
                  stage == 1
                    ? commonColor.brandPrimary
                    : commonColor.inactiveTab,
              }}
            />
          </TouchableOpacity>
          <Icon
            onPress={() => {
              setCanGoBack(!canGoBack), setCanGoForward(!canGoForward);
              baseUrl == home ? Actions.homeScreen() : setBaseUrl(home),
                setStage(2);
            }}
            name="home"
            style={{
              color:
                stage == 2 ? commonColor.brandPrimary : commonColor.inactiveTab,
              fontSize: 22,
            }}
          />
          <TouchableOpacity
            onPress={() => {
              setBaseUrl(annonce), setStage(3);
            }}>
            <Image
              source={require('../../Assets/addPub.png')}
              style={{
                width: 28,
                height: 28,
                tintColor:
                  stage == 3
                    ? commonColor.brandPrimary
                    : commonColor.inactiveTab,
              }}
            />
          </TouchableOpacity>
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
        </View>
      {/* </View> */}
    </Container>
  );
};

export default HomeScreen;
// ecole privee la ruche
