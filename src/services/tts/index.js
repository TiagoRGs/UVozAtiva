import AsyncStorage from '@react-native-async-storage/async-storage';
import Tts from 'react-native-tts';

export default function speak(text) {
    Tts.setDefaultLanguage('pt-BR');

    Tts.getInitStatus().then(async () => {

        let TTSRate = await AsyncStorage.getItem("TTSRate")
        let TTSPitch = await AsyncStorage.getItem("TTSPitch")

        if (TTSRate == null) {
            TTSRate = 0.33
            await AsyncStorage.setItem("TTSRate", String(TTSRate))
        }
        if (TTSPitch == null) {
            TTSPitch = 0.70
            await AsyncStorage.setItem("TTSPitch", String(TTSPitch))
        }

        Tts.setDefaultRate(parseFloat(TTSRate));
        Tts.setDefaultPitch(parseFloat(TTSPitch));

        if (text != '') {
            Tts.speak(text);
        }
    }, (err) => {
        if (err.code === 'no_engine') {
            Tts.requestInstallEngine();
        }
    });

}