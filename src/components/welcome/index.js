
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, Animated, Alert} from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
      marginVertical: 50,
      borderRadius: 50,
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
    },
    animationButton: {
        width: '30%',
        height:'15%',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    circle: {
        width: 200,
        height: 200,
        borderRadius: 100,
        borderWidth: 1,
        backgroundColor: `teal`,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonCenter: {
        justifyContent: 'center',
        alignItems: 'center',
    }
});

class WelcomePage extends React.Component {
    state = {
        circleAnimation: new Animated.Value(0),
        animationFired: false,
    };

    animationFired = () => {
        this.setState({animationFired: true});
    }

    animationReversed = () => {
        this.setState({animationFired: false});
    }

    fireAnimation = (isReverse) => {
        const { circleAnimation } = this.state;
        Animated.timing(circleAnimation, {
            toValue: isReverse ? 0 : 1,
            duration: 1000,
        }).start();
        isReverse ? this.animationReversed() : this.animationFired();
    };

    render() {
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
                <Text>Our Circle</Text>
            </Animated.View>
          </View>)
    }
}

export default WelcomePage;