import React from 'react';
import moment from 'moment';
import { ListItem, Left, Body, Right, Text, Icon } from 'native-base';
import { Image, TouchableOpacity, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Colors from '../../../native-base-theme/variables/commonColor';
import ImageZoom from '../UI/ImageZoom';

const Discussion = ({ data, replaceCurrentChat }) => {
  const nbdays =
    Math.abs(new Date(data?.last_message?.created_at) - new Date()) / (1000 * 3600 * 24);
  let time;
  let days;
  if (nbdays <= 7) {
    days = moment(data?.last_message?.created_at).format('dddd');
    time = moment(data?.last_message?.created_at).format('hh[h]mm A');
  } else time = moment(data?.last_message?.created_at).format('DD-MM-YYYY');

  const generateColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0');
    return `#${randomColor}`;
  };
  return (
    <ListItem style={{ marginHorizontal: -15 }}>
      <Left style={{ flex: 0.2 }}>
        {data?.image === '' || data?.image === null ? (
          <View
            style={{
              borderRadius: 50,
              // borderWidth: 2,
              // borderColor: generateColor(),
              height: 40,
              width: 40,
              // backgroundColor: generateColor(),
              // borderColor: 'green',
              backgroundColor: generateColor(),
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Icon name="person" style={{ color: 'white', fontSize:20 }} />
            {/* <Text style={{ fontSize: 20 }}>
            {`${data?.displayName?.charAt(0).toUpperCase()
            }${
              data?.familyName ? data?.familyName?.charAt(0).toUpperCase() : ''}`}
          </Text> */}
          </View>
        ) : (
          <ImageZoom
            img={[{ uri: data?.image }]}
            styles={{
              height: 40,
              width: 40,
              borderRadius: 100,
            }}
            resizeMode="stretch"
          />
        )}
      </Left>
      <Body style={{ flex: 0.9 }}>
        <TouchableOpacity
          onPress={() => {
            replaceCurrentChat(data);
            Actions.Conversation({
              item: data,
              title: data?.displayName,
              picture: { uri: data?.image },
            });
          }}
        >
          <Text style={{ fontSize: 17, fontWeight: 'bold' }} numberOfLines={1}>
            {data?.displayName}
          </Text>
          <Text note numberOfLines={1}>
            {data?.last_message?.body}
          </Text>
        </TouchableOpacity>
      </Body>

      <Right style={{ flex: 0.5, alignItems: 'center' }}>
        <Text note style={{ color: Colors.brandPrimary, fontSize: 13 }}>
          {data?.last_message?.body ? time : ' '}
          {/* {moment(new Date(data?.last_message?.created_at)).utcOffset('+0100').format('hh[h]mm A') } */}
        </Text>
      </Right>
    </ListItem>
  );
};
export default Discussion;
