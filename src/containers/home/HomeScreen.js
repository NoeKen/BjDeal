import {Container, Icon, Text, Title, View} from 'native-base';
import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  BackHandler,
  Image,
  Modal,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Dimensions,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
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
    'https://www.bj-deal.com/meet-us.php',
  );
  const [stage, setStage] = useState(2);
  const [refreshing, setRefreshing] = React.useState(false);

  const [loaded, setLoaded] = useState(false);
  const [baseUrl, setBaseUrl] = useState('https://www.bj-deal.com/');

  useEffect(() => {
    setVisible(true);
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
    webViewRef.current.reload();
    wait(2000).then(() => {
      setVisible(false), setRefreshing(true);
    });
  }, [visible, refreshing]);

  const [height, setHeight] = useState(Dimensions.get('screen').height);
  const [isEnabled, setEnabled] = useState(typeof onRefresh === 'function');

  return (
    <Container
      style={[
        styles.container,
        {paddingBottom: baseUrl == contactsUrl ? 50 : 20},
      ]}
    >
      <Modal
        animationType="fade"
        transparent
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
              Bj-deal
            </Title>
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
            onScroll={e =>
              setEnabled(
                typeof onRefresh === 'function' &&
                  e.nativeEvent.contentOffset.y === 0,
              )
            }
            style={[{height}]}
            userAgent="MobileApp-Baneck-Android-Webview"
            ref={webViewRef}
            source={{uri: baseUrl}}
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
        </ScrollView>
        {visible ? <ActivityIndicatorElement /> : null}
      </View>

      <View style={styles.navigationContainer}>
        <View
          style={{
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
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            flex: 1,
            borderTopWidth: 1,
            borderLeftWidth: 1,
            borderRightWidth: 1,
            borderColor: commonColor.inputBorderColor,
            paddingHorizontal: 16,
          }}
        >
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
            }}
          >
            <Icon
              name="people"
              style={{
                color:
                  stage == 1
                    ? commonColor.brandPrimary
                    : commonColor.inactiveTab,
                fontSize: 25,
              }}
            />
          </TouchableOpacity>
          <Icon
            onPress={() => {
              setCanGoBack(!canGoBack),
              setCanGoForward(!canGoForward)
              baseUrl == home ? Actions.homeScreen() : setBaseUrl(home),
                setStage(2);
            }}
            name="home"
            style={{
              color:
                stage == 2 ? commonColor.brandPrimary : commonColor.inactiveTab,
              fontSize: 20,
            }}
          />
          <TouchableOpacity
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
      </View>
    </Container>
  );
};

export default HomeScreen;
