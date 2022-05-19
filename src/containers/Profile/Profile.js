import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Layout from '../../components/Profil/ProfilScreen';
import * as Toast from '../../components/UI/Toast';

const Profile = ({
  currentUser, replaceCurrentUser, getCurrentUser, language, replaceLanguage,
}) => {
  const [state, setState] = useState({ error: null, success: null });
  /**
   * On Form Submission
   */
  const onFormSubmit = async (data) => {
    setState({ success: null, error: null });
    console.log(data);
    try {
      // setState({ success, error: null });
    } catch (error) {
      Toast.showError('Please try again');
      setState({ success: null, error: error.message });
    }
  };

  return (
    <Layout
      currentUser={currentUser}
      onFormSubmit={onFormSubmit}
      language={language}
      replaceLanguage={replaceLanguage}
      replaceCurrentUser={replaceCurrentUser}
    />
  );
};
const mapStateToProps = (state) => ({
  currentUser: state.auth.currentUser,
  language: state.profile.language,
});

const mapDispatchToProps = (dispatch) => ({
  replaceLanguage: dispatch.profile.replaceLanguage,
  getCurrentUser: dispatch.auth.getCurrentUser,
  logOut: dispatch.profile.logOut,
  replaceCurrentUser: dispatch.auth.replaceCurrentUser,
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
