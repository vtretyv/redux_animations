import { StyleSheet } from 'react-native';

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
          backgroundColor: `pink`,
          alignItems: 'center',
          justifyContent: 'center',
      },
      buttonCenter: {
          justifyContent: 'center',
          alignItems: 'center',
      }
});

export default styles;