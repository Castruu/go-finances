import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';
import { BorderlessButton } from "react-native-gesture-handler";
import styled from "styled-components/native";

export const Container = styled(BorderlessButton)`
`

export const Icon = styled(Feather)`
    font-size: ${RFValue(24)}px;
`