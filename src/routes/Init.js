import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Localization from '../constants/i18/Localization';
// import { getMessages } from '../lib/getMessages';

const Init = ({
  children,
  lang
}) => { 

  Localization.setLanguage(lang);
  // useEffect(async () => {
  // },
  // []);

  return <React.Fragment>{children}</React.Fragment>;
};

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
});
const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Init);
