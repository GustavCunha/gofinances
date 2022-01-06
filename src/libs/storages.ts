import AsyncStorage from "@react-native-async-storage/async-storage";
import { DataListProps } from "../screens/Dashboard/Dashboard";

interface User {
    id: string;
    name: string;
    email: string;
    photo?: string;
}

const userStorageKey = '@gofinances:user';

export async function removeTransaction(id: string): Promise<void> {

    const user = await AsyncStorage.getItem(userStorageKey);
    if(user) {
        const userFormatted = JSON.parse(user) as User ;
        const dataKey = `@gofinances:transactions_user:${userFormatted.id}`;

        const data = await AsyncStorage.getItem(dataKey);
        const transactions = data ? JSON.parse(data) : [];

        const transactionsFilttered = transactions.filter((item: DataListProps) => item.id !== id);
    
        await AsyncStorage.setItem(dataKey, JSON.stringify(transactionsFilttered));
        // console.log(transactionsFilttered);
    }

}