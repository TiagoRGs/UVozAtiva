import {PermissionsAndroid} from 'react-native';

async function requestCameraPermission() {
    const havePermission = await PermissionsAndroid.check(
        'android.permission.CAMERA',
    );

    if (havePermission) {
        return true;
    }

    const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
            title: 'Permissão de Câmera',
            message:
                'VozAtiva precisa de acesso à câmera para adicionar as imagens.',
            buttonNeutral: 'Pergunte-me depois',
            buttonNegative: 'Cancelar',
            buttonPositive: 'Permitir',
        },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        alert('Você pode usar a Câmera');
    } else {
        alert('Permissão de Câmera negada');
    }
}

export {requestCameraPermission};
