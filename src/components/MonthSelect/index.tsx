import React from 'react';
import { View } from 'react-native';

import { Container, Icon } from './styles';

interface Props {
    name: string;
    onPress: () => void;
}

const MonthSelect = ({name, onPress} : Props) => {
  return <Container onPress={onPress}>
      <Icon name={name}/>
  </Container>;
}

export default MonthSelect;