
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, Animated, Alert} from 'react-native';
import { connect } from 'react-redux';
import { stateEnum } from '../../redux/reducers/eventReducer';
import { onStateUpdate } from '../../redux/actionCreators/Event';
import styles from './styles';

class WelcomePage extends React.Component {
    state = {
        circleAnimation: new Animated.Value(0),
        // No longer need this local state to keep track of the animation.
        // animationFired : false,
    };

    fireAnimation = (isReverse) => {
        const { circleAnimation } = this.state;
        // This is no longer being passed down, so no need for it here.
        // const { fireFadeAnimation } = this.props;
        Animated.timing(circleAnimation, {
            toValue: isReverse ? 0 : 1,
            duration: 1000,
        }).start();
        // Our function that we had to pass down and fire no longer needs to be called here, as the parent is now listening for the event status change and will fire it.
        // fireFadeAnimation(isReverse);
        // isReverse ? this.animationReversed() : this.animationFired();
    };

    // This function will be used in the component will recieve props life cycle. Depending on the event status in redux, it will fire the animation in different ways (forward or reverse).
    onStateEventUpdate = state => {
        switch (state) {
          case stateEnum.ON_ENTER:
            this.fireAnimation();
            break;
          case stateEnum.ON_EXIT:
            this.fireAnimation(true);
            break;
          default:
            return null;
        }
        return null;
    };

    // This function reads the current state, and sets a new state. This is where we can create a pattern. Ours is Idle -> enter -> exit -> enter ...
    updateAnimationState = (oldState) => {
        const { onStateUpdate } = this.props;
        switch(oldState) {
            case stateEnum.IDLE:
                onStateUpdate({state:stateEnum.ON_ENTER});
                break;
            case stateEnum.ON_ENTER:
                onStateUpdate({state:stateEnum.ON_EXIT});
                break;
            case stateEnum.ON_EXIT:
                onStateUpdate({state:stateEnum.ON_ENTER});
                break;
            default:
                break;
        }
    }

    // This lifecycle method will listen for the event status, which will be passed through redux. If it detects a status change, it launches the function, which then chooses the correct animation to fire.
    componentWillReceiveProps = nextProps => {
        if (nextProps.status !== this.props.status) {
          this.onStateEventUpdate(nextProps.status);
        }
    };

    render() {
        // Here we map the animation value increase to an increase of particular styling properties.
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

        const { onStateUpdate, status } = this.props;

        return (
            <View style={styles.container}>
            <Text style={styles.welcome}>Trigger an animation using redux state!</Text>
            <Text style={styles.welcome}>Here is the redux state: {status}</Text>
            <View style ={styles.buttonCenter}>
                <TouchableOpacity style = {styles.animationButton} onPress = {()=> {this.updateAnimationState(status)}}>
                 { status === stateEnum.ON_ENTER ? <Text>Reverse Me!</Text> : <Text>Fire Me!</Text>}
                </TouchableOpacity>
            </View>
            <Animated.View style={[styles.circle, {transform : [
                {scaleX},
                {scaleY},
                {translateY: translateY}
            ]}]}>
                <Text>Redux Circle</Text>
            </Animated.View>
          </View>)
    }
}

// Have to map the status from redux
const mapStateToProps = state => ({
    status: state.event.state,
})

// Have to map the status update function from redux.
const mapDispatchToProps = dispatch => ({
    onStateUpdate: state => dispatch(onStateUpdate(state)) 
});

// Connect the component to redux with the proper mappings
export default connect(mapStateToProps,mapDispatchToProps)(WelcomePage);