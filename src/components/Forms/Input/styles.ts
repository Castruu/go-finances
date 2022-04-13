import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { TextInput } from "react-native";

export const Container = styled(TextInput)`
        width: 100%;
        background-color: ${({ theme }) => theme.colors.shape};
        color: ${({ theme }) => theme.colors.text_dark};

        border-radius: 5px;
        padding: 16px 18px;
        margin-bottom: 8px;
        
        font-size: ${RFValue(14)}px;
        font-family: ${({ theme }) => theme.fonts.regular};
`