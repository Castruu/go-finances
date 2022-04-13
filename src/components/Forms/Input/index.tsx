import React from 'react';
import { TextInputProps, View } from 'react-native';

import { Container } from './styles';

type Props = TextInputProps

export const Input = ({ ...rest }: Props) => {
  return <Container
    {...rest}
  />;
}

