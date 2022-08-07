import React, { useEffect } from 'react';
import {
    View,
    FlatList,
    Image,
    TouchableOpacity,
    Alert,
    Dimensions,
    Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import styles from './styles'
import speak from '../../../../services/tts'

let deviceWidth = Dimensions.get('window').width

export default function TTS({ data = [], remover, removerTudo }) {
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

    useEffect(() => {
        forceUpdate()

    }, [data])

    function renderTTS(obj) {
        return (
            <View style={{ padding: 12, margin: 2 }}>
                <TouchableOpacity
                    onLongPress={() =>
                        Alert.alert('Apagar', 'Deseja apagar?', [
                            { text: 'Sim', onPress: () => remover(obj.item) },
                            { text: 'Não' },
                        ])}
                    delayLongPress={1500}>
                    <Image
                        style={styles.imagesTTS}
                        source={{ uri: obj.item.uri }} />
                    <Text style={styles.textItemTTS}>{obj.item.name}</Text>
                </TouchableOpacity>
            </View>
        );
    }

    function handleSpeak() {
        data.forEach(item => {
            speak(item.name)
        })

    }

    return (
        <View style={styles.viewTTS}>
            <FlatList
                style={styles.flatListTTS}
                data={data}
                horizontal
                renderItem={renderTTS}
                keyExtractor={item => String(item.id)}
            />
            <View styles={styles.viewIconsTTS}>
                <TouchableOpacity onPress={() => { }}>
                    <Icon.Button
                        name="record-voice-over"
                        backgroundColor="#c1c1c1"
                        color='#000'
                        style={styles.iconsTTS}
                        size={deviceWidth * 0.05}
                        onPress={() => handleSpeak()}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => remover()}
                    delayLongPress={1500}>
                    <Icon.Button
                        name="backspace"
                        backgroundColor="#c1c1c1"
                        color='#ae0000'
                        style={styles.iconsTTS}
                        size={deviceWidth * 0.05}
                        onPress={() => remover()}
                        onLongPress={() =>
                            Alert.alert('Apagar', 'Deseja apagar tudo?', [
                                {
                                    text: 'Sim', onPress: () => {
                                        removerTudo([])
                                    }
                                },
                                { text: 'Não' },
                            ])
                        }
                    />

                </TouchableOpacity>
            </View>
        </View >
    );
}
