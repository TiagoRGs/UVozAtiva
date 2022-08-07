import { Dimensions, StyleSheet } from 'react-native';

let deviceWidth = Dimensions.get('window').width
let deviceHeight = Dimensions.get('window').height

const styles = StyleSheet.create({
    imagesTTS: {
        width: deviceWidth * 0.12,
        height: deviceHeight * 0.15,
        alignSelf: 'center',
        marginTop: 8,
        marginLeft: 10
    },
    textItemTTS: {
        textAlign: 'center',
        alignItems: 'center',
        alignContent: 'center',
        fontSize: deviceWidth * 0.015,
        marginLeft: 8,
    },
    viewTTS: {
        height: deviceHeight * 0.3,
        backgroundColor: "#c1c1c1",
        flexDirection: 'row',
    },
    viewIconsTTS: {
        height: '100%',
        flex: 1,
        backgroundColor: '#fff',
    },
    iconsTTS: {
        paddingRight: 12,
    },
    flatListTTS: {
        width: deviceWidth - 150,
        height: deviceHeight * 0.23,
        marginLeft: 8,
    },
})

export default styles;
