import {Title} from 'native-base';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import styles from '../containers/home/styles';

const ExitModal = ({BackHandler,setModalVisible}) => {
  return (
    <View style={styles.modal.container}>
      <View style={[styles.modal.subContainer, {height: 150}]}>
        <Title style={styles.modal.title}>Bj-deal</Title>
        <Text style={{textAlign: 'center', fontSize: 18, color:'black',fontWeight:'900'}}>
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
  );
};

export default ExitModal;
