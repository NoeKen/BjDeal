import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Body, Header, Icon, Left, Right, Text, Title, View} from 'native-base';
import {Image, StyleSheet, Switch} from 'react-native';
import commonColor from '../../../native-base-theme/variables/commonColor';
import {connect} from 'react-redux';
import Localization from '../../constants/i18/Localization';
// import commonColor from '../../../native-base-theme/variables/commonColor';

const CHeader = ({title, navigation, lang, replaceLanguage}) => {
  Localization.setLanguage(lang);


  async function onPress() {
    console.log('lang: ', lang);
    await replaceLanguage(lang === 'en' ? 'fr' : 'en');
    toggleSwitch;
  }

  return (
    <View>
      <Header style={{backgroundColor: 'white', flexDirection: 'row'}}>
        <Left style={{flexDirection: 'row', marginRight: 40}}>
          <Icon
            name="arrow-back"
            onPress={() => navigation.goBack()}
            // onPress={() =>navigation.navigate('homePage')}
          />
          <Image
            source={require('../../Assets/logo.png')}
            style={{
              width: 30,
              height: 30,
              borderColor: 'black',
              borderWidth: 1,
              marginLeft: 10,
            }}
          />
        </Left>
        <Body style={{flexDirection: 'row'}}>
          <Title
            style={{
              color: commonColor.brandPrimary,
              fontWeight: 'bold',
              fontSize: 25,
            }}
          >
            {title}
          </Title>
        </Body>
        <Right style={{alignItems:"center",justifyContent:'space-evenly'}} >
          <Text>En</Text>
          <Switch
            trackColor={{
              false: commonColor.inactiveTab,
              true: commonColor.inactiveTab,
            }}
            thumbColor={commonColor.brandPrimary}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => {replaceLanguage(lang === 'en' ? 'fr' : 'en')}}
            value={lang === 'en'?false:true}
          />
          <Text>Fr</Text>
        </Right>
      </Header>
    </View>
  );
};

const mapStateToProps = state => ({
  // theme: state.settings.theme,
  lang: state.auth.lang,
});

const mapDispatchToProps = dispatch => ({
  replaceLanguage: dispatch.auth.replaceLanguage,
});

export default connect(mapStateToProps, mapDispatchToProps)(CHeader);
