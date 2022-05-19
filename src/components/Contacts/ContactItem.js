import React from 'react';
import {
  Icon,
  Image, Text, Thumbnail, View,
} from 'native-base';
import { TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Colors from '../../../native-base-theme/variables/commonColor';
import ImageZoom from '../UI/ImageZoom';
import { log } from 'react-native-reanimated';

export default function ContactItem({ data, replaceCurrentChat }) {
  const generateColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0');
    return `#${randomColor}`;
  };
  return (
    <View
      style={{ backgroundColor: Colors.inverseTextColor, paddingHorizontal: 16,alignContent:'center',justifyContent:'center' }}
    >
      <View
        style={{ flexDirection: 'row', width: '100%', marginVertical: 10,alignItems:'center', }}
      >
        {data?.image === '' ? (
          <TouchableOpacity
            style={{
              borderRadius: 50,
              // borderWidth: 2,
              // borderColor: generateColor(),
              height: 40,
              marginEnd: 10,
              width: 40,
              backgroundColor: generateColor(),
              justifyContent: 'center',
              alignItems: 'center',
              // opacity:0.5
            }}
          >
            <Icon name='person' style={{color:'white',fontSize:20,position:'absolute',elevation:0.7}} />
            {/* <Thumbnail source={require('../../images/person.png')}/> */}
            {/* <Text style={{ fontSize: 20 }}>
              {`${data?.displayName?.charAt(0).toUpperCase()
              }${
                data?.familyName?.charAt(0).toUpperCase()}`}
            </Text> */}
          </TouchableOpacity>
        ) : (
          <ImageZoom
            img={[{ uri: data?.image }]}
            styles={{
              borderRadius: 150,
              borderWidth: 1,
              // borderColor: Colors.brandPrimary,
              height: 40,
              marginEnd: 10,
              width: 40,
            }}
            resizeMode="stretch"
          />
        )}
        <TouchableOpacity
          style={{ justifyContent: 'space-between' }}
          onPress={() => {
            console.log(data?.phoneNumber);
            replaceCurrentChat(data);
            Actions.Conversation({
              item: data,
              title: data?.displayName,
              picture: { uri: data?.image },
            });
          }}
        >
          {/* <View style={{ justifyContent: 'space-between' }}> */}
            <Text style={{ fontSize: 16, fontFamily:'Montserrat-Bold' }}>{data?.displayName}</Text>
            {/* <Text note>{data?.phoneNumber ? data?.phoneNumber : ''}</Text> */}
          {/* </View> */}
        </TouchableOpacity>
      </View>
      {/* <View style={{ height: 0.5, backgroundColor: Colors.brandLight, marginHorizontal: 16 }} /> */}
    </View>
  );
}
