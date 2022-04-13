import React, { useState, useCallback } from 'react';
import Header from '../../components/Header';
import HistoryCard from '../../components/HistoryCard';
import { ActivityIndicator } from 'react-native';

import { categories } from '../../utils/categories';

import AsyncStorage from '@react-native-async-storage/async-storage'

import {
    Container,
    MonthContainer,
    MonthTitle,
    CardWrapper,
    ChartContainer,
    LoadContainer
} from './styles';
import { useFocusEffect } from '@react-navigation/native';
import { TransactionCardProps } from '../../components/TransactionCard';
import numberToBRL from '../../utils/numberToBRL';
import { VictoryPie } from 'victory-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import MonthSelect from '../../components/MonthSelect';
import { addMonths, format, subMonths } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export interface CategoryTotal {
    key: string;
    name: string;
    color: string;
    total: number;
    percentage: string;
}


const Resume = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [totalByCategories, setTotalByCategories] = useState<CategoryTotal[]>([])
    const theme = useTheme()

    function handleDateChange(action: 'next' | 'prev') {
        let newDate;
        if (action === 'next') {
            newDate = addMonths(selectedDate, 1)
        } else {
            newDate = subMonths(selectedDate, 1)
        }
        setSelectedDate(newDate)
    }
    
    async function loadData() {
        setIsLoading(true)
        const dataKey = '@gofinances:transactions';
        const response = await AsyncStorage.getItem(dataKey)
        const transactionsFormatted: TransactionCardProps[] = response ? JSON.parse(response) : []


        const totalByCategory: CategoryTotal[] = []


        const outcomes = transactionsFormatted
            .filter(transaction =>
                transaction.type === 'negative' &&
                new Date(transaction.date).getMonth() === selectedDate.getMonth() &&
                new Date(transaction.date).getFullYear() === selectedDate.getFullYear())


        const totalOutcome = outcomes.reduce((accumulator: number, item: TransactionCardProps) =>
            accumulator + Number(item.amount), 0)

        categories.forEach(category => {
            let categorySum = 0;
            outcomes.forEach(transaction => {
                if (transaction.category === category.key) {
                    categorySum += Number(transaction.amount)
                }
            })

            if (categorySum > 0) {

                const percentage = `${(categorySum / totalOutcome * 100).toFixed(0)}%`
                totalByCategory.push({
                    key: category.key,
                    name: category.name,
                    color: category.color,
                    total: categorySum,
                    percentage,
                })

            }
        })

        setTotalByCategories(totalByCategory)
        setIsLoading(false)
    }

    useFocusEffect(
        useCallback(() => {
            loadData()
        }, [selectedDate]))

    return <Container>
        <Header title='Resumo' />
        {isLoading ?
            <LoadContainer>
                <ActivityIndicator
                    color={theme.colors.primary}
                    size='large'
                />
            </LoadContainer>
            :
            <>
                <MonthContainer >
                    <MonthSelect onPress={() => handleDateChange('prev')} name='chevron-left' />
                    <MonthTitle>
                        {format(selectedDate, 'MMMM, yyyy', { locale: ptBR })}
                    </MonthTitle>
                    <MonthSelect onPress={() => handleDateChange('next')} name='chevron-right' />
                </MonthContainer>

                <ChartContainer>
                    <VictoryPie
                        data={totalByCategories}
                        colorScale={totalByCategories.map(it => it.color)}
                        style={{
                            labels: {
                                fontSize: RFValue(18),
                                fontFamily: theme.fonts.bold,
                                fill: theme.colors.shape
                            }
                        }}
                        x='percentage'
                        y='total'
                        labelRadius={50}
                    />
                </ChartContainer>

                <CardWrapper
                    data={totalByCategories}
                    keyExtractor={item => item.key}
                    renderItem={({ item }) =>
                        <HistoryCard
                            color={item.color}
                            title={item.name}
                            amount={numberToBRL(item.total)}
                        />
                    }
                />
            </>
        }
    </Container>;
}

export default Resume;



