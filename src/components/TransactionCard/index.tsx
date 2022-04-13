import React from 'react';
import { View } from 'react-native';
import { categories } from '../../utils/categories';

import {
    Container,
    Title,
    Amount,
    Footer,
    Category,
    Icon,
    CategoryName,
    Date,
} from './styles';

export interface TransactionCardProps {
    type: 'positive' | 'negative';
    name: string;
    amount: string;
    category: string;
    date: string;
}

interface Props {
    data: TransactionCardProps
}

export const TransactionCard = ({ data }: Props) => {
    const [category] = categories.filter(it => it.key === data.category);
    return (
        <Container>
            <Title>
                {data.name}
            </Title>
            <Amount type={data.type}>
                {(data.type === 'negative' ? '- ' : '') + data.amount}
            </Amount>
            <Footer>
                <Category>
                    <Icon name={category.icon} />
                    <CategoryName>
                        {category.name}
                    </CategoryName>
                </Category>
                <Date>
                    {data.date}
                </Date>
            </Footer>
        </Container>
    );
}
