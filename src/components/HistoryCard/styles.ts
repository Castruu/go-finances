import { RFValue } from 'react-native-responsive-fontsize';
import styled from "styled-components/native";

interface ColorProps {
    color: string
}

export const Container = styled.View<ColorProps>`
    width: 100%;
    margin-bottom: 8px;
    background-color: ${({ theme }) => theme.colors.shape};

    
    align-items: center;
    flex-direction: row;    
    justify-content: space-between;
    
    border-radius: 5px;
    border-left-width: 4px;
    border-left-color: ${({ color }) => color};
    
    padding: 13px 24px;
`;



export const Title = styled.Text`
    font-family: ${({ theme }) => theme.fonts.medium};
    font-size: ${RFValue(15)}px;
    `;

export const Amount = styled.Text`
    font-family: ${({ theme }) => theme.fonts.bold};
    font-size: ${RFValue(15)}px;
`;