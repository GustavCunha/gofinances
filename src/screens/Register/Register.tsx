import React, { useState } from 'react';
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from 'react-native';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';

import { Button } from '../../components/Forms/Button/Button';
import { Select } from '../../components/Forms/Select/Select';
import { Input } from '../../components/Forms/Input/Input';
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

    const {
        control,
        handleSubmit,
        formState: {errors}
    } = useForm({
        resolver: yupResolver(schema)
    });

    function handleTransactionsTypeSelect(type: 'up' | 'down') {
        setTransactionType(type);
    }

    function handleOpenCategoryModal() {
        setCategoryModalOpen(true);
    }

    function handleCloseCategoryModal() {
        setCategoryModalOpen(false);
    } 

    function handleRegister(form: FormData) {
        if(!transactionType) {
            return Alert.alert('Ops 😕','Selecione o tipo da transação');
        }

        if(category.key === 'category') 
            return Alert.alert('Ops 😕','Selecione a categoria');

        const data = {
            name: form.name,
            amount: form.amount,
            transactionType,
            category: category.key
        }
        console.log(data);     
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
                                isActive={transactionType === 'up'}
                                onPress={() => handleTransactionsTypeSelect('up')}
                            />
                            <TransactionTypeButton 
                                title='Saída' 
                                type='down'
                                isActive={transactionType === 'down'}
                                onPress={() => handleTransactionsTypeSelect('down')}
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
