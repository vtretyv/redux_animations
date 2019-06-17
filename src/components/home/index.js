
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, Animated, Alert} from 'react-native';
import WelcomePage from '../welcome';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'green',
    },
});

class HomePage extends React.Component {
    state = {
        circleAnimation: new Animated.Value(0),
        animationFired: false,
    };

    render() {
        return (
            <View style={styles.container}>
             <WelcomePage />
          </View>
          )
    }
}

export default HomePage;