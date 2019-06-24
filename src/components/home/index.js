
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native';
import WelcomePage from '../welcome';
import { connect } from 'react-redux';
import { stateEnum } from '../../redux/reducers/eventReducer';
import styles from './styles';

class HomePage extends React.Component {
    state = {
        fadeAnimation: new Animated.Value(0),
    };
    
    fireFadeAnimation = (isReverse) => {
        const { fadeAnimation } = this.state;
        Animated.timing(fadeAnimation,{
            toValue: isReverse ? 0 : 1,
            duration: 1000,
        }).start();
    };

    // Function that will read in the prop animation state from redux and then fire animation accordingly
    onStateEventUpdate = state => {
        switch (state) {
          case stateEnum.ON_ENTER:
            this.fireFadeAnimation();
            break;
          case stateEnum.ON_EXIT:
            this.fireFadeAnimation(true);
            break;
          default:
            return null;
        }
        return null;
    };

    // This is a fundamental part of this strategy, we must map the dispatch to the event update function, and then listen for the state it manipulates here.
    componentWillReceiveProps = nextProps => {
        if (nextProps.status !== this.props.status) {
          this.onStateEventUpdate(nextProps.status);
        }
    };

    render() {
        // Here we map the animation value increase to an increase of particular styling properties.
        const backgroundColor = this.state.fadeAnimation.interpolate({
            inputRange:[0,0.2,0.4,0.6,0.8, 1],
            outputRange: ['rgb(34, 139, 34)','rgb(34, 120, 34)','rgb(34, 100, 34)','rgb(34, 80, 34)','rgb(34, 60, 34)','rgb(34, 40, 34)']
        })
        return (
            <Animated.View style={[styles.container,
                {backgroundColor}]
            }>
                {/* No longer need to pass down the fire fade animation from parent to child*/}
             <WelcomePage/>
          </Animated.View>
          )
    }
}

// Must map the event firing status from the redux store
const mapStateToProps = state => ({
    status: state.event.state,
})

//And connect it to the component
export default connect(mapStateToProps,null)(HomePage);