import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ScrollView,
} from 'react-native';
import { evaluate } from 'mathjs';
import { Ionicons } from '@expo/vector-icons';
import { HistoryItem } from '../types/HistoryItem';

const ModernCalculator: React.FC = () => {
    const [input, setInput] = useState('');
    const [result, setResult] = useState('');
    const [history, setHistory] = useState<HistoryItem[]>([]);
    const [showHistory, setShowHistory] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(true);

    const buttons = [
        ['AC', '⌫', '(', ')', '%'],
        ['7', '8', '9', '÷'],
        ['4', '5', '6', '×'],
        ['1', '2', '3', '-'],
        ['0', '.', '√', '+'],
        ['^', '='],
    ];

    useEffect(() => {
        try {
            if (input) {
                const calculatedResult = evaluate(input.replace('×', '*').replace('÷', '/').replace('√', 'sqrt'));
                setResult(calculatedResult.toString());
            } else {
                setResult('');
            }
        } catch (error) {
            // Não exibimos erro aqui para evitar feedback constante
        }
    }, [input]);

    const handleButtonPress = (value: string) => {
        switch (value) {
            case 'AC':
                setInput('');
                setResult('');
                break;
            case '⌫':
                setInput(input.slice(0, -1));
                break;
            case '=':
                try {
                    const calculatedResult = evaluate(input.replace('×', '*').replace('÷', '/').replace('√', 'sqrt'));
                    setInput(calculatedResult.toString());
                    setResult('');
                    setHistory([{ expression: input, result: calculatedResult.toString() }, ...history]);
                } catch (error) {
                    Alert.alert('Erro', 'Cálculo inválido');
                }
                break;
            case '√':
                setInput(input + 'sqrt(');
                break;
            default:
                setInput(input + value);
        }
    };

    const renderButton = (button: string, index: number) => {
        const isOperator = '+-×÷^%'.includes(button);
        const isWideButton = button === '0' || button === '=';
        const buttonStyle = [
            styles.button,
            isOperator && styles.operatorButton,
            isWideButton && styles.wideButton,
            { backgroundColor: isDarkMode ? '#333' : '#e0e0e0' }
        ];
        const textStyle = [
            styles.buttonText,
            isOperator && styles.operatorText,
            { color: isDarkMode ? '#fff' : '#000' }
        ];

        return (
            <TouchableOpacity
                key={index}
                style={buttonStyle}
                onPress={() => handleButtonPress(button)}
                accessibilityLabel={button}
            >
                {button === '⌫' ? (
                    <Ionicons name="backspace-outline" size={24} color={isDarkMode ? '#fff' : '#000'} />
                ) : (
                    <Text style={textStyle}>{button}</Text>
                )}
            </TouchableOpacity>
        );
    };

    return (
        <View style={[styles.container, { backgroundColor: isDarkMode ? '#000' : '#fff' }]}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => setShowHistory(!showHistory)} style={styles.headerButton}>
                    <Text style={[styles.headerButtonText, { color: isDarkMode ? '#fff' : '#000' }]}>
                        {showHistory ? 'Calculadora' : 'Ver Histórico'}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setIsDarkMode(!isDarkMode)} style={styles.headerButton}>
                    <Ionicons name={isDarkMode ? 'sunny-outline' : 'moon-outline'} size={24} color={isDarkMode ? '#fff' : '#000'} />
                </TouchableOpacity>
            </View>
            {showHistory ? (
                <ScrollView style={styles.historyContainer}>
                    {history.map((item, index) => (
                        <View key={index} style={[styles.historyItem, { backgroundColor: isDarkMode ? '#1a1a1a' : '#f0f0f0' }]}>
                            <Text style={[styles.historyExpression, { color: isDarkMode ? '#bbb' : '#333' }]}>{item.expression}</Text>
                            <Text style={[styles.historyResult, { color: isDarkMode ? '#fff' : '#000' }]}>{item.result}</Text>
                        </View>
                    ))}
                </ScrollView>
            ) : (
                <>
                    <View style={[styles.displayContainer, { backgroundColor: isDarkMode ? '#1a1a1a' : '#f0f0f0' }]}>
                        <Text style={[styles.input, { color: isDarkMode ? '#fff' : '#000' }]}>{input}</Text>
                        <Text style={[styles.result, { color: isDarkMode ? '#bbb' : '#666' }]}>{result}</Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        {buttons.map((row, rowIndex) => (
                            <View key={rowIndex} style={styles.row}>
                                {row.map((button, buttonIndex) => renderButton(button, buttonIndex))}
                            </View>
                        ))}
                    </View>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    headerButton: {
        padding: 10,
    },
    headerButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    displayContainer: {
        padding: 20,
        alignItems: 'flex-end',
        borderRadius: 10,
        margin: 10,
    },
    input: {
        fontSize: 32,
        marginBottom: 10,
    },
    result: {
        fontSize: 24,
    },
    buttonContainer: {
        padding: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    button: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        borderRadius: 50,
        margin: 5,
    },
    operatorButton: {
        backgroundColor: '#f8a51d',
    },
    wideButton: {
        flex: 2.2,
    },
    buttonText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    operatorText: {
        color: '#000',
    },
    historyContainer: {
        flex: 1,
        padding: 10,
    },
    historyItem: {
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
    },
    historyExpression: {
        fontSize: 18,
        marginBottom: 5,
    },
    historyResult: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default ModernCalculator;