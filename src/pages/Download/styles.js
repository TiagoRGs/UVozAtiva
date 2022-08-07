import { Dimensions, StyleSheet } from 'react-native';

let deviceWidth = Dimensions.get('window').width
let deviceHeight = Dimensions.get('window').height

const styles = StyleSheet.create({
    container: {
        height: deviceHeight,
        width: deviceWidth,
        backgroundColor: "#e1e1e1",
        flexDirection: 'column',
    },
    flatlistItem: { //Styles flatlist > viewItens
        width: deviceWidth,
        paddingBottom: 60,
    },
    images: {
        width: deviceWidth * 0.12,
        height: deviceHeight * 0.15,
        alignSelf: 'center',
        marginTop: '3%',
        top: '10%',
        borderColor: '#DCEDFA',
        borderRadius: 5
    },
    textItem: {
        textAlign: 'center',
        alignItems: 'center',
        alignContent: 'center',
        fontSize: deviceWidth * 0.02,
        top: '10%'
    },
    item: { //Item flatList > viewItens
        width: deviceWidth * 0.15,
        height: deviceHeight * 0.4,
        flex: 1 / 4,
    },
    ViewProgressBar: {
        zIndex: 9999,
        position: 'absolute',
        height: '100%',
        width: '100%',
        flexDirection: 'column',
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        justifyContent: 'center',
    },
    ProgressBar: {
        marginTop: '2%',
        width: '30%',
        alignItems: 'center',
        alignSelf: 'center',
    }

})

export default styles;
