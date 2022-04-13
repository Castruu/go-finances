import React from "react";
import { FlatList } from "react-native";

import { Button } from "../../components/Forms/Button";
import Header from "../../components/Header";

import { categories } from "../../utils/categories";

import {
    Container,
    Category,
    Icon,
    Name,
    Separator,
    Footer
} from './styles'

interface Category {
    key: string;
    name: string;
}

interface Props {
    category: Category;
    setCategory: (category: Category) => void;
    closeSelectCategory: () => void;
}

export const CategorySelect = ({ category, setCategory, closeSelectCategory }: Props) => {
    
    function handleCategorySelect(item: Category) {
        setCategory(item);
    }
    
    return (
        <Container>
            <Header title='Categoria' />
            <FlatList
                data={categories}
                style={{ flex: 1, width: '100%' }}
                ItemSeparatorComponent={() => <Separator />}
                keyExtractor={(item) => item.key}
                renderItem={({ item }) =>
                    <Category
                        onPress={() => handleCategorySelect(item)}
                        isActive={category.key === item.key}
                    >
                        <Icon name={item.icon} />
                        <Name>{item.name}</Name>
                    </Category>
                }
            />

            <Footer>
                <Button
                    title='Selecionar'
                    onPress={closeSelectCategory}
                />
            </Footer>
        </Container>
    )
}
