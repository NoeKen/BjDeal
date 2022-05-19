import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import Colors from '../../../native-base-theme/variables/commonColor';

const Loading = ({ isLoading }) =>
  isLoading ? [(
    console.log("isLoading:", isLoading),
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'absolute',
        zIndex: 3,
        elevation: 3,
        backgroundColor: 'rgba(0,0,0,0.3)',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
      }}
    >
      <ActivityIndicator size="large" color={Colors.brandPrimary} />
    </View>
  )] : null;

const mapStateToProps = (state) => ({
  isLoading: state.loading.global,
});

export default connect(mapStateToProps, {})(Loading);
