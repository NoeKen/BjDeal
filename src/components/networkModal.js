import { Title } from 'native-base';
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import commonColor from '../../native-base-theme/variables/commonColor';
import styles from '../containers/home/styles';

export default function NetworkModal({isOnline,setOnlineModal,onRefresh,setVisible,wait}) {
  return (
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
          Activez vos données mobile ou connectez-vous à un réseau Wi-fi.
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
  );
}
