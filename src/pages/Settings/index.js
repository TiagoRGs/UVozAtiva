import React, {useEffect, useState} from 'react';

import {Text, View} from 'react-native';

import {Button, Checkbox, Snackbar, Title} from 'react-native-paper';

import Tts from 'react-native-tts';
import styles from './styles';

import Slider from '@react-native-community/slider';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsPage = ({navigation}) => {
  const [rate, setRate] = useState(0.0);
  const [pitch, setPitch] = useState(0.0);
  const [speakActions, setSpeakActions] = useState(0.0);
  const [speaking, setSpeaking] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      title: 'Configurações',
    });

    Tts.setDefaultLanguage('pt-BR');

    Tts.addEventListener('tts-start', () => setSpeaking(true));
    Tts.addEventListener('tts-finish', () => setSpeaking(false));
    Tts.addEventListener('tts-cancel', () => setSpeaking(false));
    setInitialSetting();
  }, []);

  const setDefaultSettings = () => {
    setRate(0.33);
    setPitch(0.7);
  };

  const setInitialSetting = async () => {
    let TTSRate = await AsyncStorage.getItem('TTSRate');
    let TTSPitch = await AsyncStorage.getItem('TTSPitch');
    let speakAction = await AsyncStorage.getItem('speakAction');

    if (TTSRate === null) {
      TTSRate = 0.33;
      await AsyncStorage.setItem('TTSRate', String(TTSRate), err =>
        console.log(err),
      );
    }

    if (TTSPitch === null) {
      TTSPitch = 0.7;
      await AsyncStorage.setItem('TTSPitch', String(TTSPitch), err =>
        console.log(err),
      );
    }

    if (speakAction === null) {
      speakAction = true;
      await AsyncStorage.setItem('speakAction', String(true), err =>
        console.log(err),
      );
    }

    setRate(parseFloat(TTSRate));
    setPitch(parseFloat(TTSPitch));
    setSpeakActions(Boolean(speakAction));
  };

  const saveSettings = async (rate, pitch) => {
    try {
      await AsyncStorage.setItem('TTSRate', String(rate));
      await AsyncStorage.setItem('TTSPitch', String(pitch));
      await AsyncStorage.setItem('speakAction', String(speakActions));
      setSuccess(true);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSpeakTTSStop = () => {
    Tts.stop();
  };

  const handleSpeakTTSStart = () => {
    Tts.getInitStatus().then(
      () => {
        Tts.setDefaultRate(rate);
        Tts.setDefaultPitch(pitch);

        Tts.speak('Esse é um exemplo de fala do aplicativo');
      },
      err => {
        if (err.code === 'no_engine') {
          Tts.requestInstallEngine();
        }
      },
    );
  };

  return (
    <View style={styles.container}>
      <Title>Configurações</Title>
      <>
        <Slider
          style={styles.slider}
          minimumValue={0.01}
          maximumValue={0.99}
          step={0.01}
          value={rate}
          onValueChange={e => {
            setRate(e);
          }}
        />
        <Text>Velocidade de fala: {rate.toFixed(2)}</Text>

        <Slider
          style={styles.slider}
          minimumValue={0.0}
          maximumValue={2.0}
          step={0.01}
          value={pitch}
          onValueChange={e => {
            setPitch(e);
          }}
        />
        <Text>Tom de fala: {pitch.toFixed(2)}</Text>
        {speaking ? (
          <Button
            style={{marginTop: '3%'}}
            color="red"
            mode="outlined"
            onPress={handleSpeakTTSStop}>
            Parar
          </Button>
        ) : (
          <Button
            style={{marginTop: '3%'}}
            mode="outlined"
            onPress={handleSpeakTTSStart}>
            Testar
          </Button>
        )}

        <Button
          style={{marginTop: '3%'}}
          mode="outlined"
          onPress={setDefaultSettings}>
          Restaurar configurações
        </Button>

        <View style={styles.options}>
          <Text>Falar ações</Text>
          <Checkbox
            status={speakActions ? 'checked' : 'unchecked'}
            color="blue"
            onPress={() => {
              setSpeakActions(!speakActions);
            }}
          />
        </View>
      </>
      <View style={styles.ViewButton}>
        <Button
          mode="outlined"
          style={styles.Button}
          color="red"
          onPress={() => navigation.pop()}>
          Voltar
        </Button>

        <Button
          mode="outlined"
          style={styles.Button}
          color="green"
          onPress={() => saveSettings(rate, pitch)}>
          Salvar
        </Button>
      </View>

      <View style={{width: '70%'}}>
        <Snackbar
          visible={success}
          onDismiss={() => setSuccess(false)}
          duration={3000}
          action={{
            label: 'Fechar',
            onPress: () => {
              setSuccess(false);
            },
          }}>
          Configurações salvas
        </Snackbar>
      </View>
    </View>
  );
};

export default SettingsPage;
