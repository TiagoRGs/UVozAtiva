import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Snackbar } from 'react-native-paper';

export type AlertMessageType = {
  type: 'success' | 'alert' | 'error';
  body: string;
};

interface Props {
  open: boolean;
  close: (a: boolean) => void;
  alertMessage: AlertMessageType;
}

const AlertComponent: React.FC<Props> = ({ open, close, alertMessage }) => {
  const styles = StyleSheet.create({
    container: {
      zIndex: 9999,
      width: '100%',
    },
    alert: {
      width: '50%',
      backgroundColor:
        alertMessage.type == 'success'
          ? '#006600'
          : alertMessage.type == 'alert'
            ? '#ffd700'
            : alertMessage.type == 'error'
              ? '#e32636'
              : undefined,
      alignSelf: 'center',
    },
  });

  return (
    <View style={styles.container}>
      <Snackbar
        style={styles.alert}
        visible={open}
        duration={6000}
        onDismiss={() => close(false)}
        action={{
          label: 'Fechar',
          color:
            alertMessage.type === 'success'
              ? 'white'
              : alertMessage.type === 'alert'
                ? 'black'
                : alertMessage.type === 'error'
                  ? 'white'
                  : undefined,
          onPress: () => {
            close(false);
          },
        }}>
        <Text
          style={{ color: alertMessage.type === 'alert' ? 'black' : 'white' }}>
          {alertMessage.body}
        </Text>
      </Snackbar>
    </View>
  );
};

export { AlertComponent };
