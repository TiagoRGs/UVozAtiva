import {Dimensions, StyleSheet} from 'react-native';

let deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    padding: 50,
    backgroundColor: '#e1e1e1',
  },
  ViewButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  options: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  slider: {
    width: deviceWidth * 0.3,
  },
  Button: {
    margin: '2%',
  },
});

export default styles;
