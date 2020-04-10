import React from 'react';
import {WebView} from 'react-native-webview';
import PropTypes from 'prop-types';
// import { Container } from './styles';

export default function Repository({route, navigation}) {
  navigation.setOptions({
    title: route.params.name,
    // headerTitleAlign: 'center',
    headerTitleContainerStyle: {width: 260, alignItems: 'center'},
  });

  return <WebView source={{uri: route.params.html_url}} style={{flex: 1}} />;
}

Repository.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      name: PropTypes.string,
      html_url: PropTypes.string,
    }).isRequired,
  }).isRequired,
  navigation: PropTypes.shape({
    setOptions: PropTypes.func,
  }).isRequired,
};
