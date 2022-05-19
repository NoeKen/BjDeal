import React, { useEffect, useState } from 'react';
import { Text, View, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
// import SendSMS from 'react-native-sms';
import SmsAndroid from 'react-native-get-sms-android';

const Test = ({ }) => {
  var filter = {
    box: 'inbox', // 'inbox' (default), 'sent', 'draft', 'outbox', 'failed', 'queued', and '' for all

    bodyRegex: '(.*)How are you(.*)', // content regex to match
    read: 0,
    body: 'How are you', // content to match
    indexFrom: 0, // start from index 0
    maxCount: 10, // count of SMS to return each time
  };
  const getSms =()=>{
    SmsAndroid.list(
      JSON.stringify(filter),
      (fail) => {
        console.log(`Failed with this error: ${fail}`);
      },
      (count, smsList) => {
        console.log('Count: ', count);
        console.log('List: ', smsList);
        const arr = JSON.parse(smsList);

        arr.forEach((object) => {
          console.log(`Object: ${object}`);
          console.log(`-->${object.date}`);
          console.log(`-->${object.body}`);
        });
      },
    );
  }
  return (
    <View>
      <Text>Bonjour</Text>
      <TouchableOpacity
        onPress={() => {
          SmsAndroid.autoSend(
            '697606274',
            'salut',
            (fail) => {
              console.log(`Failed with this error: ${fail}`);
            },
            (success) => {
              console.log('SMS sent successfully');
            },
          );
        }}
      >
        <Text>Envoyer</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
         getSms();
        }}
      >
        <Text>Envoyer</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Test;
