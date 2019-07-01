
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, Animated, Alert, ImageBackground} from 'react-native';
import { connect } from 'react-redux';
import { stateEnum, stateEnumEventTypes } from '../../redux/reducers/eventReducer';
import { onStateUpdate } from '../../redux/actionCreators/Event';
import styles from './styles';

class WelcomePage extends React.Component {
    state = {
        circleAnimation: new Animated.Value(0),
        scaleX: 1,
        scaleY: 1,
        translateY: 1,
        translateX: 1,
        rotate: '0deg',
        // No longer need this local state to keep track of the animation.
        // animationFired : false,
    };

    componentDidMount(){
        const { circleAnimation } = this.state;
        // Sets it to down and scale
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
        this.setState({scaleX, scaleY, translateY});
    }

    setAnimationProperties = (scaleXOutput, scaleYOutput,translateXOuput, translateYOutput, rotateOutput) => {
        const { circleAnimation } = this.state;
        let scaleX =1;
        let scaleY =1;
        let tranlsateX =1;
        let translateY =1;
        let rotate=1;
        scaleXOutput && (
         scaleX = circleAnimation.interpolate({
            inputRange: [0,1],
            outputRange: scaleXOutput,
        }))
        scaleYOutput && (
         scaleY = circleAnimation.interpolate({
            inputRange: [0,1],
            outputRange: scaleYOutput,
        }))
        translateYOutput && (
         translateY = circleAnimation.interpolate({
            inputRange: [0,1],
            outputRange: translateYOutput,
        }))
        translateXOuput && (
         translateX = circleAnimation.interpolate({
            inputRange: [0,1],
            outputRange: translateXOuput,
        }))
        rotateOutput && (
         rotate = circleAnimation.interpolate({
            inputRange: [0,1],
            outputRange: rotateOutput,
        }))
        this.setState({scaleX, scaleY, translateX, translateY, rotate})
    }

    fireAnimationDownScale = (isReverse) => {
        const { circleAnimation } = this.state;
        // This is no longer being passed down, so no need for it here.
        // const { fireFadeAnimation } = this.props;
        this.setAnimationProperties([1,1.6],[1,1.6],[0,0],[0,50])
        Animated.timing(circleAnimation, {
            toValue: isReverse ? 0 : 1,
            duration: 1000,
        }).start();
        // Our function that we had to pass down and fire no longer needs to be called here, as the parent is now listening for the event status change and will fire it.
        // fireFadeAnimation(isReverse);
        // isReverse ? this.animationReversed() : this.animationFired();
    };

    fireAnimationUpScale = (isReverse) => {
        const { circleAnimation } = this.state;
        // This is no longer being passed down, so no need for it here.
        // const { fireFadeAnimation } = this.props;
        this.setAnimationProperties([1,1.6],[1,1.6],[0,0],[0,-50])
        Animated.timing(circleAnimation, {
            toValue: isReverse ? 0 : 1,
            duration: 1000,
        }).start();
        // Our function that we had to pass down and fire no longer needs to be called here, as the parent is now listening for the event status change and will fire it.
        // fireFadeAnimation(isReverse);
        // isReverse ? this.animationReversed() : this.animationFired();
    };

    fireAnimationRotateScale = (isReverse) => {
        const { circleAnimation } = this.state;
        // This is no longer being passed down, so no need for it here.
        // const { fireFadeAnimation } = this.props;
        this.setAnimationProperties([1,1.6],[1,1.6],[0,0],[0,0], ['0deg', '180deg']);
        Animated.timing(circleAnimation, {
            toValue: isReverse ? 0 : 1,
            duration: 1000,
        }).start();

        // Our function that we had to pass down and fire no longer needs to be called here, as the parent is now listening for the event status change and will fire it.
        // fireFadeAnimation(isReverse);
        // isReverse ? this.animationReversed() : this.animationFired();
    };

    fireAnimationRotateShrink = (isReverse) => {
        const { circleAnimation } = this.state;
        // This is no longer being passed down, so no need for it here.
        // const { fireFadeAnimation } = this.props;
        this.setAnimationProperties([1,0.5],[1,0.5],[0,0],[0,0], ['0deg', '180deg']);
        Animated.timing(circleAnimation, {
            toValue: isReverse ? 0 : 1,
            duration: 1000,
        }).start();
        // Our function that we had to pass down and fire no longer needs to be called here, as the parent is now listening for the event status change and will fire it.
        // fireFadeAnimation(isReverse);
        // isReverse ? this.animationReversed() : this.animationFired();
    };

    // This function will be used in the component will recieve props life cycle. Depending on the event status in redux, it will fire the animation in different ways (forward or reverse).
    onStateEventUpdate = (state,event) => {

        if (state === stateEnum.ON_ENTER) {
            switch (event){
                case stateEnumEventTypes.UP_AND_SCALE:
                    this.fireAnimationUpScale();
                    break;
                case stateEnumEventTypes.DOWN_AND_SCALE:
                        this.fireAnimationDownScale();
                    break;
                case stateEnumEventTypes.ROTATE_AND_SCALE:
                    this.fireAnimationRotateScale();
                    break;
                case stateEnumEventTypes.ROTATE_AND_SRHINK:
                    this.fireAnimationRotateShrink();
                    break;
                default: 
                    break;
            }
        }
        if (state === stateEnum.ON_EXIT) {
            switch (event){
                case stateEnumEventTypes.UP_AND_SCALE:
                    this.fireAnimationUpScale(true);
                    break;
                case stateEnumEventTypes.DOWN_AND_SCALE:
                        this.fireAnimationDownScale(true);
                    break;
                case stateEnumEventTypes.ROTATE_AND_SCALE:
                    this.fireAnimationRotateScale(true);
                    break;
                case stateEnumEventTypes.ROTATE_AND_SRHINK:
                    this.fireAnimationRotateShrink(true);
                    break;
                default:
                    break;
            }
        }
        return null;
    };

    // This function reads the current state, and sets a new state. This is where we can create a pattern. Ours is Idle -> enter -> exit -> enter ...
    updateAnimationState = (oldState,event) => {
        console.log('in update animation state, here is old state and event:', oldState, event);
        const { onStateUpdate } = this.props;
        switch(oldState) {
            case stateEnum.IDLE:
                onStateUpdate({state:stateEnum.ON_ENTER, event: event});
                break;
            case stateEnum.ON_ENTER:
                onStateUpdate({state:stateEnum.ON_EXIT, event: event});
                break;
            case stateEnum.ON_EXIT:
                onStateUpdate({state:stateEnum.ON_ENTER, event: event});
                break;
            default:
                break;
        }
    }

    // This lifecycle method will listen for the event status, which will be passed through redux. If it detects a status change, it launches the function, which then chooses the correct animation to fire.
    componentWillReceiveProps = nextProps => {
        if (nextProps.status !== this.props.status) {
          this.onStateEventUpdate(nextProps.status, nextProps.event);
        }
    };

    render() {
        // Here we map the animation value increase to an increase of particular styling properties.
        const { circleAnimation, scaleX, scaleY, translateY, translateX, rotate } = this.state;
        // Down and scale
        // const scaleX = circleAnimation.interpolate({
        //     inputRange: [0,1],
        //     outputRange: [1,1.6],
        // })
        // const scaleY = circleAnimation.interpolate({
        //     inputRange: [0,1],
        //     outputRange: [1,1.6],
        // })
        // const translateY = circleAnimation.interpolate({
        //     inputRange: [0,1],
        //     outputRange: [0,50],
        // })

        const { onStateUpdate, status } = this.props;

        return (
            <View style={styles.container}>
            <Text style={styles.welcome}>Trigger an animation using redux state!</Text>
            <Text style={styles.welcome}>Here is the redux state: {status}</Text>
            <View style ={styles.buttonCenter}>
                <TouchableOpacity style = {styles.animationButton} onPress = {()=> {this.updateAnimationState(status, stateEnumEventTypes.DOWN_AND_SCALE)}}>
                 { status === stateEnum.ON_ENTER ? <Text>Reverse Me!</Text> : <Text>Down and Scale!</Text>}
                </TouchableOpacity>
                <TouchableOpacity style = {styles.animationButton} onPress = {()=> {this.updateAnimationState(status, stateEnumEventTypes.UP_AND_SCALE)}}>
                 { status === stateEnum.ON_ENTER ? <Text>Reverse Me!</Text> : <Text>Up and Scale!</Text>}
                </TouchableOpacity>
                <TouchableOpacity style = {styles.animationButton} onPress = {()=> {this.updateAnimationState(status, stateEnumEventTypes.ROTATE_AND_SCALE)}}>
                 { status === stateEnum.ON_ENTER ? <Text>Reverse Me!</Text> : <Text>Rotate and scale!</Text>}
                </TouchableOpacity>
                <TouchableOpacity style = {styles.animationButton} onPress = {()=> {this.updateAnimationState(status, stateEnumEventTypes.ROTATE_AND_SRHINK)}}>
                 { status === stateEnum.ON_ENTER ? <Text>Reverse Me!</Text> : <Text>Rotate and shrink!</Text>}
                </TouchableOpacity>
            </View>
            <Animated.View style={[styles.circle, {transform : [
                {scaleX},
                {scaleY},
                {translateY},
                {translateX},
                {rotate},
            ]}]}>
                {/* <ImageBackground source={{uri: 'https://hgtvhome.sndimg.com/content/dam/images/hgtv/fullset/2011/7/18/0/HGTV_Color-Wheel-Full_s4x3.jpg.rend.hgtvcom.616.462.suffix/1400967008479.jpeg'}} style={{width:'100%', height:'100%'}}/> */}
                <Text>Redux Circle</Text>
            </Animated.View>
          </View>)
    }
}

// Have to map the status from redux
const mapStateToProps = state => ({
    status: state.event.state,
    event: state.event.event,
})

// Have to map the status update function from redux.
const mapDispatchToProps = dispatch => ({
    onStateUpdate: state => dispatch(onStateUpdate(state)) 
});

// Connect the component to redux with the proper mappings
export default connect(mapStateToProps,mapDispatchToProps)(WelcomePage);