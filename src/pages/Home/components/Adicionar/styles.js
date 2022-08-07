import {Dimensions, StyleSheet} from 'react-native';

let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  Modal: {
    width: deviceWidth * 0.8,
    // height: deviceWidth * 0.37,
    height: '75%',
    backgroundColor: '#e1e1e1',
    alignSelf: 'center',
    borderColor: '#d1d1d1',
    alignItems: 'center',
  },
  Modal2: {
    width: deviceWidth * 0.8,
    height: deviceHeight * 0.8,
    backgroundColor: '#e1e1e1',
    alignSelf: 'center',
    borderColor: '#d1d1d1',
    alignItems: 'center',
  },
  PrimeiroModalContent: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 150,
  },
  ModalContent: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '60%',
    // marginTop: 150,
  },
  ModalContentInput: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: '30%',
  },
  ModalContentBottom: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'red',
  },
  ViewButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: '30%',
    marginBottom: -23,
  },
  textInput: {
    width: '50%',
    marginLeft: 15,
  },
  iconImage: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#e1e1e1',
  },
  text: {
    fontSize: deviceWidth * 0.028,
    fontFamily: 'OpenSans-Regular',
  },
});

export default styles;
