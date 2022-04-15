import React, { useEffect, useState } from 'react';
import { Modal, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import AsyncStorage from '@react-native-async-storage/async-storage'
import uuid from 'react-native-uuid'

import { useForm } from 'react-hook-form'
import { useNavigation } from '@react-navigation/native';

import { Button } from '../../components/Forms/Button';
import { TransactionTypeButton } from '../../components/Forms/TransactionTypeButton';
import { InputForm } from '../../components/Forms/InputForm';
import {
  Container,
  Form,
  Fields,
  TypeWrapper,
} from './styles';
import { CategorySelect } from '../CategorySelect';
import { CategorySelectButton } from '../../components/Forms/CategorySelectButton';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { AppRoutesParamList } from '../../routes/app.routes';
import Header from '../../components/Header';
import { useAuth } from '../../hooks/auth';

interface FormData {
  [name: string]: any;
}

const formSchema = yup.object().shape({
  name: yup.string().required('Nome é obrigatório!'),

  amount: yup
    .number()
    .typeError('Informe um valor numérico!')
    .positive('A quantia deve ser positiva!')
})

type RegisterNavigationProps = BottomTabNavigationProp<
  AppRoutesParamList,
  "Cadastrar"
>;

export const Register = () => {
  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  const {user} = useAuth()

  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  });

  
  const navigation = useNavigation<RegisterNavigationProps>()
  
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(formSchema)
  })
  
  function handleTransactionTypeSelect(type: 'positive' | 'negative') {
    setTransactionType(type)
  }
  
  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true)
  }
  
  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false)
  }
  
  async function handleRegister(form: FormData) {
    if (!transactionType) {
      return Alert.alert('Selecione o tipo da transação!')
    }
    
    if (category.key === 'category') {
      return Alert.alert('Selecione a categoria!')
    }
    
    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      type: transactionType,
      category: category.key,
      date: new Date()
    }
    
    try {
      
      const dataKey = `@gofinances:transactions_user:${user.id}`
      const data = await AsyncStorage.getItem(dataKey)
      const currentData = data ? JSON.parse(data) : []
      
      const formattedData = [
        ...currentData,
        newTransaction
      ]

      await AsyncStorage.setItem(dataKey, JSON.stringify(formattedData))
      Alert.alert('Cadastrado com sucesso!')

      reset();
      setTransactionType('')
      setCategory({
        key: 'category',
        name: 'Categoria',
      })
      
      navigation.navigate('Listagem')
    } catch (error) {
      console.log(error)
      Alert.alert('Não foi possível registrar!')
    }
  }

  return (<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <Container>
      <Header title='Registro' />
      <Form>
        <Fields>

          <InputForm
            name='name'
            placeholder='Nome'
            autoCapitalize='sentences'
            autoCorrect={false}
            control={control}
            error={errors.name && errors.name.message}
          />

          <InputForm
            name='amount'
            placeholder='Preço'
            keyboardType='numeric'
            control={control}
            error={errors.amount && errors.amount.message}

          />

          <TypeWrapper>
            <TransactionTypeButton
              type='up'
              title='Income'
              onPress={() => handleTransactionTypeSelect('positive')}
              isActive={transactionType === 'positive'}
            />
            <TransactionTypeButton
              type='down'
              title='Outcome'
              onPress={() => handleTransactionTypeSelect('negative')}
              isActive={transactionType === 'negative'}
            />
          </TypeWrapper>
          <CategorySelectButton
            title={category.name}
            onPress={handleOpenSelectCategoryModal}
          />
        </Fields>
        <Button
          title='Enviar'
          onPress={handleSubmit(handleRegister)}
        />
      </Form>

      <Modal visible={categoryModalOpen} statusBarTranslucent>
        <CategorySelect
          category={category}
          setCategory={setCategory}
          closeSelectCategory={handleCloseSelectCategoryModal}
        />
      </Modal>

    </Container>
  </TouchableWithoutFeedback>);
}
