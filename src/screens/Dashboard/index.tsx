import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import React, { useCallback, useState } from 'react'
import { useTheme } from 'styled-components'

import { HighlightCard } from '../../components/HighlightCard'
import LoadIndicator from '../../components/LoadIndicator'
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard'
import { useAuth } from '../../hooks/auth'
import numberToBRL from '../../utils/numberToBRL'
import {
    Container,
    Header,
    UserWrapper,
    UserInfo,
    Photo,
    User,
    UserGreeting,
    UserName,
    Icon,
    HighlightCards,
    Transactions,
    Title,
    TransactionList,
    LogoutButton,

} from './styles'

export interface DataListProps extends TransactionCardProps {
    id: string
}

interface HighlightProps {
    amount: string
    lastDate: string
}

interface HighlightData {
    entries: HighlightProps,
    outcome: HighlightProps,
    total: HighlightProps
}




export function Dashboard() {
    const [isLoading, setIsLoading] = useState(true)
    const [transactions, setTransactions] = useState<DataListProps[]>([]);
    const [highlightData, setHighlitghtData] = useState<HighlightData>({} as HighlightData);
    const currentYear = new Date().getFullYear()

    const { user, signOut } = useAuth()

    function getFirstAndLastDate(transactions: DataListProps[]) {
        const dataArray = transactions.map(transactions => new Date(transactions.date).getTime())
        if (dataArray.length === 0) return 'Nenhum registro'
        const firstTransaction = new Date(Math.min.apply(Math, dataArray))
        const lastTransaction = new Date(Math.max.apply(Math, dataArray))

        return `${firstTransaction.getDate()} de ${firstTransaction.toLocaleDateString('pt-BR', { month: 'long' })} de ${firstTransaction.getFullYear()} até ` +
            `${lastTransaction.getDate()} de ${lastTransaction.toLocaleDateString('pt-BR', { month: 'long' })} de ${lastTransaction.getFullYear()}`
    }

    function getLastTransactionDate(collection: DataListProps[], type: 'positive' | 'negative') {
        const lastTransaction = Math.max.apply(Math,
            collection.filter(transaction => transaction.type === type)
                .map(transactions => new Date(transactions.date).getTime()))

        if (lastTransaction === -Infinity) return 'Nenhum registro'
        const lastDate = new Date(lastTransaction);
        return `Última ${type === 'positive' ? 'entrada' : 'saída'} dia ${lastDate.getDate()} de ${lastDate.toLocaleString('pt-BR', { month: 'long' })}` +
            `${currentYear !== lastDate.getFullYear() ? 'de ' + lastDate.getFullYear() : ''}`
    }

    async function loadTransactions() {
        const dataKey = `@gofinances:transactions_user:${user.id}`
        const response = await AsyncStorage.getItem(dataKey);
        const transactions = response ? JSON.parse(response) : []
        let entriesSum = 0;
        let outcomeSum = 0;

        const transactionListFormatted: DataListProps[] = transactions
            .map((item: DataListProps) => {

                if (item.type === 'positive') {
                    entriesSum += Number(item.amount)
                } else {
                    outcomeSum += Number(item.amount)
                }

                const amount = numberToBRL(Number(item.amount))

                const date = Intl.DateTimeFormat('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: '2-digit'
                }).format(new Date(item.date))
                return {
                    id: item.id,
                    name: item.name,
                    amount,
                    type: item.type,
                    category: item.category,
                    date
                }
            })

        const total = entriesSum - outcomeSum
        setHighlitghtData({
            entries: {
                amount: numberToBRL(entriesSum),
                lastDate: getLastTransactionDate(transactions, 'positive')
            },
            outcome: {
                amount: numberToBRL(outcomeSum),
                lastDate: getLastTransactionDate(transactions, 'negative')
            },
            total: {
                amount: numberToBRL(total),
                lastDate: getFirstAndLastDate(transactions)
            }
        })
        setTransactions(transactionListFormatted.reverse())
        setIsLoading(false)
    }

    async function handleDelete(cardId: string) {
        setIsLoading(true)
        const response = await AsyncStorage.getItem(`@gofinances:transactions_user:${user.id}`);
        const transactions : DataListProps[] = JSON.parse(response!);
        const filteredTransactions = transactions.filter(it => it.id !== cardId)
        await AsyncStorage.setItem(`@gofinances:transactions_user:${user.id}`, JSON.stringify(filteredTransactions))
        loadTransactions();
    }

    useFocusEffect(
        useCallback(() => {
            loadTransactions()
        }, []));

    return (
        <Container>
            <Header>
                <UserWrapper>
                    <UserInfo>
                        <Photo
                            source={{ uri: user.photo }}
                        />

                        <User>
                            <UserGreeting>Olá, </UserGreeting>
                            <UserName>{user.name}</UserName>
                        </User>

                    </UserInfo>

                    <LogoutButton onPress={signOut}>
                        <Icon name='power' />
                    </LogoutButton>
                </UserWrapper>
            </Header>
            {isLoading ?
                <LoadIndicator />
                :
                <>
                    <HighlightCards
                    >
                        <HighlightCard
                            type='up'
                            title='Entradas'
                            amount={highlightData.entries.amount}
                            lastTransaction={highlightData.entries.lastDate}
                        />
                        <HighlightCard
                            type='down'
                            title='Saídas'
                            amount={highlightData.outcome.amount}
                            lastTransaction={highlightData.outcome.lastDate}
                        />
                        <HighlightCard
                            type='total'
                            title='Total'
                            amount={highlightData.total.amount}
                            lastTransaction={highlightData.total.lastDate}
                        />
                    </HighlightCards>

                    <Transactions>
                        <Title>Listagem</Title>

                        <TransactionList
                            data={transactions}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) =>
                                <TransactionCard data={item} handleDelete={() => handleDelete(item.id)} />
                            }
                        />

                    </Transactions>
                </>
            }
        </Container >
    )
}
