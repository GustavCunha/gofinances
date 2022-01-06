import React, { useState } from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { View } from 'react-native';
import { OutputText } from './DateField.styles';
import { format } from 'date-fns';

interface Props {
    value: Date,
    mode: string,
    onChange: () => void
}

export function DateField({value, mode = 'date', onChange}: Props) {
    const [isVisible, setIsVisible] = useState(false);
    
    function formatDate(date: Date) {
        let dateFormatted = '';
        switch (mode) {
            case 'date':
                dateFormatted = format(date, 'dd/MM/yyyy')
                break;
            case 'time':
                dateFormatted = format(date, 'HH:mm')
                break;    
            default:
                dateFormatted = format(date, 'dd/MM/yyyy')
                break;
        }
        return dateFormatted;
    }

    function toogleModalDate() {
        setIsVisible(!isVisible);
    }

    return (
        <View>
            <OutputText onPress={toogleModalDate}>{formatDate(value)}</OutputText> 
            <DateTimePickerModal 
                isVisible={isVisible}
                mode={mode}
                value={value}
                onConfirm={onChange}
                onCancel={toogleModalDate}
            />
        </View>
    )
}