import { Title } from 'native-base';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import commonColor from '../../native-base-theme/variables/commonColor';
import styles from '../containers/home/styles';

export default function InfosPermission({setInfosPermModal}) {
  return (
    <View style={styles.modal.container}>
      <View style={[styles.modal.subContainer, {height: 210}]}>
        <Title style={styles.modal.title}>Bj-deal</Title>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 18,
            fontWeight: '800',
          }}
        >
          Accès à la camera bloquée
        </Text>
        <Text style={{textAlign: 'justify', fontSize: 15,marginVertical:10}}>
          Vous devez acceder aux parametres de votre téléphone pour accorder l'autorisation à l'application d'acceder à la caméra de votre periphérique.
        </Text>
        <TouchableOpacity
        style={{
            backgroundColor:commonColor.brandPrimary,
            alignSelf:'flex-end',
            borderRadius:20,
            alignItems:'center',
            justifyContent:'center'
        }}
          onPress={() => {
            setInfosPermModal(false)
          }}
        >
          <Text
            style={{
              textAlign: 'right',
              color: commonColor.inverseTextColor,
              fontWeight: '900',
              fontSize: 16,
              margin:8
            }}
          >
            Ok
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
