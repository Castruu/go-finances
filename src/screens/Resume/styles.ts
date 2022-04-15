import { RFValue } from 'react-native-responsive-fontsize';
import { FlatListProps } from 'react-native';
import { FlatList } from 'react-native';
import styled from "styled-components/native";
import { CategoryTotal } from '.';

export const Container = styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.colors.background};

`
export const MonthContainer = styled.View`
    padding: 24px 24px 0;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

export const MonthTitle = styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(20)}px;
`

export const CardWrapper = styled(
    FlatList as new (props: FlatListProps<CategoryTotal>) => FlatList<CategoryTotal>
).attrs({
    contentContainerStyle: {
        paddingHorizontal: 24,
    }
}
)``;


export const ChartContainer = styled.View`
    width: 100%;
    align-items: center;
`