import styled from 'styled-components/native';

export const Container = styled.View``;

export const ContainerProfile = styled.TouchableOpacity`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;
  text-align: center;
  padding: 20px 40px;
`;

export const ProfileImage = styled.Image`
  width: 170px;
  height: 170px;
  border-radius: 85px;
`;

export const Text = styled.Text`
  font-size: 22px;
  margin-top: 10px;
`;
