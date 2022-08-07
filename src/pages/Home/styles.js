import {Dimensions, StyleSheet} from 'react-native';

let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    height: deviceHeight,
    width: deviceWidth,
    backgroundColor: '#f0f',
    flexDirection: 'column',
  },
  viewItens: {
    width: '100%',
    flex: 1,
  },
  flatlistItem: {
    width: deviceWidth,
    paddingBottom: 60,
  },
  item: {
    width: deviceWidth * 0.15,
    height: deviceHeight * 0.4,
    flex: 1 / 4,
    borderRadius: 10,
    borderColor: '#fff',
  },
  images: {
    width: deviceWidth * 0.12,
    height: deviceHeight * 0.15,
    alignSelf: 'center',
    marginTop: '3%',
    top: '10%',
    borderColor: '#e1e1e1',
    borderRadius: 5,
  },
  textItem: {
    textAlign: 'center',
    alignItems: 'center',
    alignContent: 'center',
    fontSize: deviceWidth * 0.03,
    top: '10%',
    fontFamily: 'OpenSans-Regular',
  },
  iconAdd: {
    alignSelf: 'center',
    top: '10%',
  },
});

export default styles;
