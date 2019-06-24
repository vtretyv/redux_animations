/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import WelcomePage from './src/components/welcome';
import HomePage from './src/components/home';
import { Provider } from 'react-redux';
// import store from './redux/store';
import store from './src/redux/store';





type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <Provider store={store}>
        <HomePage/>
      </Provider>
    );
  }
}

