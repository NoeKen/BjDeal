import { Container, Text, View } from 'native-base';
import React from 'react';
import { Image, Linking, StyleSheet, TouchableOpacity } from 'react-native';
import { connect, useDispatch, useSelector } from 'react-redux';
import commonColor from '../../../native-base-theme/variables/commonColor';
import CHeader from '../../components/UI/CHeader';
import Localization from '../../constants/i18/Localization';
import { darkTheme, lightTheme } from '../../constants/Themes';
import { switchTheme } from '../../redux/themeAction';

const ContactUs = ({ navigation }) => {
  // const theme = useSelector((state) => state.themeReducer.theme);
  const dispatch = useDispatch();

  return (
    <Container style={styles.container}>
      <CHeader title={Localization.header2} navigation={navigation} />
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <TouchableOpacity
          style={styles.facebook}
          onPress={() => Linking.openURL('https://www.facebook.com/1060032887433008/')}
        >
          <View style={styles.logoFacebook}>
            <Image
              source={require('../../Assets/facebook.png')}
              style={{ width: 40, height: 40 }}
            />
          </View>
          <View style={styles.textContent}>
            <Text style={{ color: 'white' }}>{Localization.meet_us} facebook</Text>
          </View>
        </TouchableOpacity>

        {/* <Spacer size={25}/> */}

        <TouchableOpacity
          style={styles.twitter}
          onPress={() =>
            Linking.openURL('https://twitter.com/Bjdealcom1?t=i2VIiLUs8q-r09kNo6BRPA&s=09')
          }
        >
          <View style={styles.logoTwitter}>
            <Image source={require('../../Assets/twitter.png')} style={{ width: 25, height: 25 }} />
          </View>
          <View style={styles.textContent}>
            <Text style={{ color: 'white' }}>{Localization.meet_us} twitter</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.whatsap}
          onPress={() => Linking.openURL('https://wa.me/message/SAJ3HFDSBDJVL1')}
        >
          <View style={styles.logoWhatsap}>
            <Image
              source={require('../../Assets/whatsapp.png')}
              style={{ width: 25, height: 25 }}
            />
          </View>
          <View style={styles.textContent}>
            <Text style={{ color: 'white' }}>{Localization.meet_us} Whatsapp</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.blog}
          onPress={() => Linking.openURL('https://parlonsdebjdeal.blogspot.com/')}
        >
          <View style={styles.logoBlog}>
            <Image
              source={require('../../Assets/GoogleBlog.png')}
              style={{ width: 25, height: 25 }}
            />
          </View>
          <View style={styles.textContent}>
            <Text style={{ color: 'white' }}>{Localization.meet_us2} blog</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.linkedin}
          onPress={() => Linking.openURL('https://www.linkedin.com/company/bj-deal-com')}
        >
          <View style={styles.logoLinkedin}>
            <Image
              source={require('../../Assets/linkedIn.png')}
              style={{ width: 25, height: 25 }}
            />
          </View>
          <View style={styles.textContent}>
            <Text style={{ color: 'white' }}>{Localization.meet_us} LinkedIn</Text>
          </View>
        </TouchableOpacity>

        {/* <Spacer size={25}/> */}
        <TouchableOpacity
          style={styles.pinterest}
          onPress={() => Linking.openURL('https://www.pinterest.com/bjdeal237/')}
        >
          <View style={styles.logoPinterest}>
            <Image
              source={require('../../Assets/pinterest.png')}
              style={{ width: 25, height: 25 }}
            />
          </View>
          <View style={styles.textContent}>
            <Text style={{ color: 'white' }}>{Localization.meet_us} Pinterest</Text>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.instagram}
          onPress={() => Linking.openURL('https://www.instagram.com/bjdeal.com1 ')}
        >
          <View style={styles.logoInstagram}>
            <Image
              source={require('../../Assets/instagram.png')}
              style={{ width: 25, height: 25 }}
            />
          </View>
          <View style={styles.textContent}>
            <Text style={{ color: 'white' }}>{Localization.meet_us} Instagram</Text>
          </View>
        </TouchableOpacity>

        {/* <Spacer size={25}/> */}


        {/* <Text
          style={{
            marginTop: 25,
            textAlign: 'center',
            color: commonColor.brandPrimary,
            fontSize: 26,
            fontWeight: 'bold',
          }}
        >
          Bj-deal.
        </Text> */}

      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: theme.background_color
  },
  facebook: {
    backgroundColor: 'rgb(66,103,178)',
    height: 60,
    marginHorizontal: 16,
    borderRadius: 10,
    marginBottom: 15,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  logoFacebook: {
    backgroundColor: 'rgb(35,46,124)',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    width: '20%',
  },
  google: {
    backgroundColor: 'rgb(213,15,37)',
    height: 60,
    marginHorizontal: 16,
    borderRadius: 10,
    marginBottom: 15,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  logoGoogle: {
    backgroundColor: 'rgb(190,15,0)',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    width: '20%',
  },
  twitter: {
    backgroundColor: 'rgb(8,160,203)',
    height: 60,
    marginHorizontal: 16,
    borderRadius: 10,
    marginBottom: 15,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  logoTwitter: {
    backgroundColor: 'rgb(30,132,180)',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    width: '20%',
  },
  instagram: {
    backgroundColor: 'rgb(63,114,155)',
    height: 60,
    marginHorizontal: 16,
    borderRadius: 10,
    marginBottom: 15,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  logoInstagram: {
    backgroundColor: 'rgb(63,132,180)',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    width: '20%',
  },
  whatsap: {
    backgroundColor: 'rgb(79,206,93)',
    height: 60,
    marginHorizontal: 16,
    borderRadius: 10,
    marginBottom: 15,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  logoWhatsap: {
    backgroundColor: 'rgb(9,207,112)',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    width: '20%',
  },
  linkedin: {
    backgroundColor: 'rgb(16,107,147)',
    height: 60,
    marginHorizontal: 16,
    borderRadius: 10,
    marginBottom: 15,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  logoLinkedin: {
    backgroundColor: 'rgb(0,107,167)',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    width: '20%',
  },
  blog: {
    backgroundColor: 'rgb(244,86,42)',
    height: 60,
    marginHorizontal: 16,
    borderRadius: 10,
    marginBottom: 15,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  logoBlog: {
    backgroundColor: 'rgb(204,86,42)',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    width: '20%',
  },
  pinterest: {
    backgroundColor: 'rgb(230,0,35)',
    height: 60,
    marginHorizontal: 16,
    borderRadius: 10,
    marginBottom: 15,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  logoPinterest: {
    backgroundColor: 'rgb(210,0,35)',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    width: '20%',
  },
  textContent: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 15,
  },
});

const mapStateToProps = (state) => ({
  // theme: state.settings.theme,
  lang: state.auth.lang,
});

const mapDispatchToProps = (dispatch) => ({
  replaceLanguage: dispatch.auth.replaceLanguage
});

export default connect(mapStateToProps, mapDispatchToProps) (ContactUs);
// export default ContactUs;
