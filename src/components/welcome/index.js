
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, Animated, Alert} from 'react-native';
import styles from './styles';

//Child component that holds the circle animation
class WelcomePage extends React.Component {
    state = {
        circleAnimation: new Animated.Value(0),
        // Our local state boolean for keeping track of animation firing status.
        animationFired: false,
    };

    // Function to set the local state event tracking var to true
    animationFired = () => {
        this.setState({animationFired: true});
    }

    // Function to set the local state event tracking var to false
    animationReversed = () => {
        this.setState({animationFired: false});
    }

    fireAnimation = (isReverse) => {
        const { circleAnimation } = this.state;
        const { fireFadeAnimation } = this.props;
        Animated.timing(circleAnimation, {
            toValue: isReverse ? 0 : 1,
            duration: 1000,
        }).start();
        fireFadeAnimation(isReverse);
        isReverse ? this.animationReversed() : this.animationFired();
    };

    render() {
        // Mapping the animation value to an output range for each style property we want to drive.
        const { circleAnimation } = this.state;
        const scaleX = circleAnimation.interpolate({
            inputRange: [0,1],
            outputRange: [1,1.6],
        })
        const scaleY = circleAnimation.interpolate({
            inputRange: [0,1],
            outputRange: [1,1.6],
        })
        const translateY = circleAnimation.interpolate({
            inputRange: [0,1],
            outputRange: [0,50],
        })
        return (
            <View style={styles.container}>
            <Text style={styles.welcome}>Trigger an animation using local state!</Text>
            <Text style={styles.welcome}>Here is the local state: {this.state.animationFired.toString()}</Text>
            <View style ={styles.buttonCenter}>
                <TouchableOpacity style = {styles.animationButton} onPress = {()=>this.fireAnimation(this.state.animationFired)}>
                 { this.state.animationFired ? <Text>Reverse Me!</Text> : <Text>Fire Me!</Text>}
                </TouchableOpacity>
            </View>
            <Animated.View style={[styles.circle, {transform : [
                {scaleX},
                {scaleY},
                {translateY: translateY}
            ]}]}>
                <Text>Local Circle</Text>
            </Animated.View>
          </View>)
    }
}

export default WelcomePage;