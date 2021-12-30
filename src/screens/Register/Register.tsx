import React, { useState } from 'react';
import {useNavigation} from '@react-navigation/native';
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from 'react-native';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

import { Button } from '../../components/Forms/Button/Button';
import { Select } from '../../components/Forms/Select/Select';
import { InputForm } from '../../components/Forms/InputForm/InputForm';
import { TransactionTypeButton } from '../../components/Forms/TransactionTypeButton/TransactionTypeButton';

import { CategoryModal } from '../CategoryModal/CategoryModal';
import { 
    Container, 
    Fields, 
    Form, 
    Header, 
    Title, 
    TransactionsType
} from './Register.styles';

const schema = Yup.object().shape({
    name: Yup.string().required('Nome é obrigatório'),
    amount: Yup
        .number()
        .typeError('Informe um valor númerico')
        .positive('O valor não pode ser negativo')
        .required('Valor é obrigatório'),
})

interface FormData {
    name: string;
    amount: string;
}

export function Register() {
    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria',
    })
    const [transactionType, setTransactionType] = useState('');
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);

    const navigation = useNavigation();

    const {
        control,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm({
        resolver: yupResolver(schema)
    });

    function handleTransactionsTypeSelect(type: 'positive' | 'negative') {
        setTransactionType(type);
    }

    function handleOpenCategoryModal() {
        setCategoryModalOpen(true);
    }

    function handleCloseCategoryModal() {
        setCategoryModalOpen(false);
    } 

    async function handleRegister(form: FormData) {
        if(!transactionType) {
            return Alert.alert('Ops 😕','Selecione o tipo da transação');
        }

        if(category.key === 'category') 
            return Alert.alert('Ops 😕','Selecione a categoria');

        const newTransaction = {
            id: String(uuid.v4()),
            name: form.name,
            amount: form.amount,
            type: transactionType,
            category: category.key,
            date: new Date(),
        }
        
        try {
            const dataKey = '@gofinances:transactions';
            const data = await AsyncStorage.getItem(dataKey);
            const currentData = data ? JSON.parse(data) : [];

            const dataFormatted = [
                ...currentData,
                newTransaction
            ]
            await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));

            reset();
            setTransactionType('');
            setCategory({
                key: 'category',
                name: 'Categoria'
            });

            navigation.navigate('Listagem');
        } catch (error) {
            console.log(error);
            Alert.alert('Erro ⚠', 'Não foi possível salvar');
        }  
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Container>
        
                <Header>
                    <Title>Cadastro</Title>
                </Header>

                <Form>
                    <Fields>
                        <InputForm
                            control={control}
                            name='name' 
                            placeholder='Nome'
                            autoCapitalize='sentences'
                            autoCorrect={false}
                            error={errors.name && errors.name.message}
                        />
                        <InputForm 
                            control={control}
                            name='amount' 
                            placeholder='Preço'
                            keyboardType='numeric'
                            error={errors.amount && errors.amount.message}
                        />
                        <TransactionsType>
                            <TransactionTypeButton 
                                title='Entrada' 
                                type='up'
                                isActive={transactionType === 'positive'}
                                onPress={() => handleTransactionsTypeSelect('positive')}
                            />
                            <TransactionTypeButton 
                                title='Saída' 
                                type='down'
                                isActive={transactionType === 'negative'}
                                onPress={() => handleTransactionsTypeSelect('negative')}
                            />
                        </TransactionsType>

                        <Select 
                            title={category.name} 
                            onPress={handleOpenCategoryModal}
                        />
                    </Fields>
                    <Button 
                        title='Enviar' 
                        onPress={handleSubmit(handleRegister)}
                    />
                </Form>

                <Modal visible={categoryModalOpen}>
                    <CategoryModal 
                        category={category}
                        setCategory={setCategory}
                        closeSelectModal={handleCloseCategoryModal}
                    />
                </Modal>
            </Container>
        </TouchableWithoutFeedback>
    )
}
