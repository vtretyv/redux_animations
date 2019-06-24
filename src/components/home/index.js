
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, Animated, Alert} from 'react-native';
import WelcomePage from '../welcome';
import styles from './styles';

// The parent component that we want to dim for UI/UX
class HomePage extends React.Component {
    state = {
        fadeAnimation: new Animated.Value(0),
    };
    
    // Function that will drive fade animation value to 1 or 0.
    fireFadeAnimation = (isReverse) => {
        const { fadeAnimation } = this.state;
        Animated.timing(fadeAnimation,{
            toValue: isReverse ? 0 : 1,
            duration: 1000,
        }).start();
    };

    render() {
        // We take the animation drive range (1) and map it to an output range. In this case we want to slowly dim the background color to black, so we do this through a 6 stage interpolation.
        const backgroundColor = this.state.fadeAnimation.interpolate({
            inputRange:[0,0.2,0.4,0.6,0.8, 1],
            outputRange: ['rgb(34, 139, 34)','rgb(34, 120, 34)','rgb(34, 100, 34)','rgb(34, 80, 34)','rgb(34, 60, 34)','rgb(34, 40, 34)']
        })
        return (
            <Animated.View style={[styles.container,
                {backgroundColor}]
            }>
             <WelcomePage fireFadeAnimation={this.fireFadeAnimation}/>
          </Animated.View>
          )
    }
}

export default HomePage;