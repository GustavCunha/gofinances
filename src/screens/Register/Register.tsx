import React, { useState } from 'react';
import { Modal } from 'react-native';

import { Button } from '../../components/Forms/Button/Button';
import { Select } from '../../components/Forms/Select/Select';
import { Input } from '../../components/Forms/Input/Input';
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

export function Register() {
    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria',
    })
    const [transactionType, setTransactionType] = useState('');
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);

    function handleTransactionsTypeSelect(type: 'up' | 'down') {
        setTransactionType(type);
    }

    function handleOpenCategoryModal() {
        setCategoryModalOpen(true);
    }

    function handleCloseCategoryModal() {
        setCategoryModalOpen(false);
    } 

    function handleRegister() {
        
    }


    return (
        <Container>
            <Header>
                <Title>Cadastro</Title>
            </Header>

            <Form>
                <Fields>
                    <Input 
                        placeholder='Nome'
                    />
                    <Input 
                        placeholder='Preço'
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
                <Button title='Enviar' />
            </Form>

            <Modal visible={categoryModalOpen}>
                <CategoryModal 
                    category={category}
                    setCategory={setCategory}
                    closeSelectModal={handleCloseCategoryModal}
                />
            </Modal>
        </Container>
    )
}
