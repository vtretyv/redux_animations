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



type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <HomePage/>
    );
  }
}

