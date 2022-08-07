import React, {useEffect, useState} from 'react';
import {Alert, FlatList, ListRenderItem, View} from 'react-native';
import {AlertComponent, AlertMessageType} from '../../components/Alert';
import {deleteProfile, LoadProfileBD} from '../../services/database/realm';
import {IProfile} from '../../services/database/schema/RealmSchema';

import {AddFirstModal} from './components/AddFirstModal';
import {AddSecondModal} from './components/AddSecondModal';

import {StackScreenProps} from '@react-navigation/stack';

import {Container, ProfileImage, ContainerProfile, Text} from './styles';

import remoteConfig from '@react-native-firebase/remote-config';

type RootStackParamList = {
  Home: {
    profile: {
      id: string;
    };
  };
  Profile: undefined;
};

type Props = StackScreenProps<RootStackParamList, 'Profile'>;

interface ILoadProfileBD extends IProfile {
  isAdd?: boolean;
}

const Profile: React.FC<Props> = ({route, navigation}) => {
  const [profiles, setProfiles] = useState<ILoadProfileBD[]>([]);

  const [openFirstModalAddProfile, setOpenFirstModalAddProfile] =
    useState(false);
  const [openSecondModalAddProfile, setOpenSecondModalAddProfile] =
    useState(false);

  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState<AlertMessageType>(
    {} as AlertMessageType,
  );

  const [titleSecondModal, setTitleSecondModal] = useState('');

  const Profiles = async () => {
    await LoadProfileBD()
      .then((res: ILoadProfileBD[]) => {
        setProfiles(res);
      })
      .catch(err => {
        console.log('[Error LoadProfileBD] - ' + err);
      });
  };

  useEffect(() => {
    Profiles();

    remoteConfig()
      .setDefaults({
        baseURL: '',
      })
      .then(() => remoteConfig().fetchAndActivate())
      .then(fetchedRemotely => {
        if (fetchedRemotely) {
          console.log(fetchedRemotely);
        } else {
          console.log('No configs were fetched from the backend');
        }
      });

    // remoteConfig()
    //   .setDefaults({
    //     baseURL: '',
    //   })
    //   .then(() => {
    //     console.log('Default values set.');
    //   });
  }, []);

  function renderProfile(data: any) {
    const profile = data.item as ILoadProfileBD;

    if (profile.isAdd) {
      return (
        <View>
          <ContainerProfile onPress={() => setOpenFirstModalAddProfile(true)}>
            <ProfileImage source={require('../../assets/images/add.png')} />
            <Text>{profile.name}</Text>
          </ContainerProfile>
        </View>
      );
    } else {
      return (
        <View>
          <ContainerProfile
            onPress={() => {
              navigation.navigate('Home', {
                profile,
              });

              // navigation.replace('Home', {
              //   profile: {
              //     id: profile.id,
              //     name: profile.name,
              //     image_uri: profile.image_uri,
              //   },
              // });
            }}
            onLongPress={() =>
              Alert.alert('Apagar usuário', `Apagar usuário ${profile.name}?`, [
                {
                  text: 'Sim',
                  onPress: async () => {
                    deleteProfile(profile).then(() => Profiles());
                    setAlertMessage({
                      body: 'Sucesso ao apagar usuário',
                      type: 'success',
                    });
                    setOpenAlert(true);
                  },
                },
                {text: 'Não'},
              ])
            }
            delayLongPress={300}>
            <ProfileImage
              source={
                profile.image_uri
                  ? {uri: profile.image_uri}
                  : require('../../assets/images/user.png')
              }
            />
            <Text>{profile.name}</Text>
          </ContainerProfile>
        </View>
      );
    }
  }

  return (
    <Container>
      <FlatList
        style={{width: '100%', height: '100%', padding: 20}}
        data={profiles}
        renderItem={renderProfile as any}
        numColumns={5}
        keyExtractor={item => String(item.id)}
      />

      <AddFirstModal
        open={openFirstModalAddProfile}
        close={setOpenFirstModalAddProfile}
        setTitleSecondModal={setTitleSecondModal}
        setOpenSecondModalAddProfile={setOpenSecondModalAddProfile}
      />
      <AddSecondModal
        type={titleSecondModal}
        open={openSecondModalAddProfile}
        setOpenFirstModalAddProfile={setOpenFirstModalAddProfile}
        setOpenSecondModalAddProfile={setOpenSecondModalAddProfile}
        atualizar={Profiles}
        openAlert={setOpenAlert}
        setAlertMessage={setAlertMessage}
      />

      <AlertComponent
        open={openAlert}
        close={setOpenAlert}
        alertMessage={alertMessage}
      />
    </Container>
  );
};

export {Profile};
