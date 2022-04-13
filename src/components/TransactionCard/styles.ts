import { Transactions } from './../../screens/Dashboard/styles';
import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';
import styled from "styled-components/native";

interface TransactionProps {
    type: 'positive' | 'negative'
}

export const Container = styled.View`
    border-radius: 5px;
    background-color: ${({ theme }) => theme.colors.shape};

    padding: 17px 24px;
    margin-bottom: 16px;
`

export const Title = styled.Text`
    font-size: ${RFValue(14)}px;
    font-family: ${({ theme }) => theme.fonts.regular};

    color: ${({ theme }) => theme.colors.text_dark};
`
export const Amount = styled.Text<TransactionProps>`
    font-size: ${RFValue(20)}px;
    font-family: ${({ theme }) => theme.fonts.regular};
    margin-top: 2px;
    
    color: ${({ theme, type }) =>
     type === 'positive' ? theme.colors.success : theme.colors.attention};
    
`

export const Footer = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    margin-top: 19px;
`

export const Category = styled.View`
    flex-direction: row;
    align-items: center;
`

export const Icon = styled(Feather)`
    font-size: ${RFValue(20)}px;
    color: ${({ theme }) => theme.colors.text};

    margin-right: 17px;
`

export const CategoryName = styled.Text`
    font-size: ${RFValue(14)}px;
    font-family: ${({ theme }) => theme.fonts.regular};

    color: ${({ theme }) => theme.colors.text};

`

export const Date = styled.Text`
    font-size: ${RFValue(14)}px;
    font-family: ${({ theme }) => theme.fonts.regular};

    color: ${({ theme }) => theme.colors.text};
`