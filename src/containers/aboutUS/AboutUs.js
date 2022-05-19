import { Button, Container, Content, H3, Text, View } from 'native-base';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Bold from '../../components/UI/Bold';
import CHeader from '../../components/UI/CHeader';
import Spacer from '../../components/UI/Spacer';
import Localization from '../../constants/i18/Localization';

const AboutUs = ({ navigation }) => {
  
  return (
    <Container>
      <CHeader title={Localization.header1} navigation={navigation} />
      {/* <CHeader title={Localization.setLanguage('fr')} navigation={navigation}/> */}
      <Content style={{ paddingHorizontal: 16 }}>
        {/* <Button onPress={() => { replaceLanguage(lang === 'en' ? 'fr' : 'en')}}>
          <Text>
            {Localization.lang} {lang === 'en' ? 'fr' : 'en'}
          </Text>
        </Button> */}
        <Spacer size={30} />
        <View>
          <H3 style={styles.textHeader}>{Localization.titre1} ?</H3>

          <Spacer />
          <Text style={{ textAlign: 'justify' }}>{Localization.contenu1}</Text>
        </View>

        <Spacer />

        <View>
          <H3 style={styles.textHeader}>{Localization.titre2}</H3>

          <Spacer />
          <Text style={{ textAlign: 'justify' }}>{Localization.contenu2}</Text>
        </View>

        <Spacer />

        <View>
          <H3 style={styles.textHeader}>{Localization.titre3}</H3>
          <Spacer />
          <Text style={{ textAlign: 'justify' }}>{Localization.contenu3}</Text>
          <Spacer />
          <View style={{ paddingLeft: 16 }}>
            <Bold >
              - {Localization.titre3_pt1}
              {'\n'}{' '}
            </Bold>
            <Bold>
              - {Localization.titre3_pt2}
              {'\n'}
            </Bold>
            <Bold>
              - {Localization.titre3_pt3}
              {'\n'}
            </Bold>
            <Bold>
              - {Localization.titre3_pt4}
              {'\n'}
            </Bold>
            <Bold>- {Localization.titre3_pt5}</Bold>
          </View>
          <Spacer size={40} />
        </View>
        <View>
          <H3 style={styles.textHeader}>{Localization.titre4}</H3>
          <Spacer />
          <Text style={styles.textContent}>{Localization.contenu4}</Text>
        </View>

        <Spacer />

        <View>
          <H3 style={styles.textHeader}>{Localization.titre5}</H3>
          <Spacer />
          <Text style={styles.textContent}>{Localization.contenu5}</Text>
        </View>

        <Spacer />

        <View>
          <H3 style={styles.textHeader}>{Localization.titre6}</H3>
          <Spacer />
          <Text style={styles.textContent}>{Localization.contenu6}</Text>
        </View>

        <Spacer />

        <View>
          <H3 style={styles.textHeader}>{Localization.titre7}</H3>
          <Spacer />
          <Text style={styles.textContent}>{Localization.contenu7}</Text>
        </View>
        <Spacer />

        <View>
          <H3 style={styles.textHeader}>{Localization.titre8}</H3>
          <Spacer />
          <Text style={styles.textContent}>{Localization.contenu8}</Text>
        </View>
        <Spacer />
      </Content>
      {/* <View
        style={{
        //   flex: 1,
        //   position: 'absolute',
        //   ...styles.container,
        }}
      > */}
      {/* <Joystick navigation={navigation} home={false}/> */}
      {/* </View> */}
    </Container>
  );
};

const styles = StyleSheet.create({
  textContent: {
    textAlign: 'justify',
  },
  textHeader: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

const mapStateToProps = (state) => ({
  // theme: state.settings.theme,
  lang: state.auth.lang,
});

const mapDispatchToProps = (dispatch) => ({
  replaceLanguage: dispatch.auth.replaceLanguage
});

export default connect(mapStateToProps, mapDispatchToProps) (AboutUs);

// export default AboutUs