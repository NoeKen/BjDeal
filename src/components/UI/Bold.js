import React from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'native-base';

const Bold = (props) => <Text style={{fontWeight: 'bold',textAlign:'justify',}} >{props.children}</Text>;

Bold.propTypes = {
  size: PropTypes.number,
};

Bold.defaultProps = {
//   size: 20,
};

export default Bold;
