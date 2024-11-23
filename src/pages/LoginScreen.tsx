import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    Dimensions,
    ImageBackground,
    useColorScheme,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { LoginScreenProps } from "@/src/types/LoginScreen"

const { width, height } = Dimensions.get('window');

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === 'dark';

    const handleLogin = () => {
        onLogin(username, password);
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <ImageBackground
            source={{ uri: 'https://png.pngtree.com/thumb_back/fw800/background/20210311/pngtree-calculator-childrens-day-toy-background-image_582237.jpg' }}
            style={styles.backgroundImage}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
            >
                <LinearGradient
                    colors={isDarkMode ? ['#1a1a1a80', '#00000080'] : ['#ffffff80', '#f0f0f080']}
                    style={styles.gradientOverlay}
                >
                    <View style={[styles.loginContainer, isDarkMode && styles.loginContainerDark]}>
                        <Text style={[styles.title, isDarkMode && styles.titleDark]}>Calculadora InnoTech</Text>
                        <View style={styles.inputContainer}>
                            <Ionicons name="person-outline" size={24} color={isDarkMode ? "#fff" : "#333"} style={styles.inputIcon} />
                            <TextInput
                                style={[styles.input, isDarkMode && styles.inputDark]}
                                placeholder="Nome de usuário"
                                placeholderTextColor={isDarkMode ? "#999" : "#666"}
                                value={username}
                                onChangeText={setUsername}
                                accessibilityLabel="Nome de usuário"
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Ionicons name="lock-closed-outline" size={24} color={isDarkMode ? "#fff" : "#333"} style={styles.inputIcon} />
                            <TextInput
                                style={[styles.input, isDarkMode && styles.inputDark]}
                                placeholder="Senha"
                                placeholderTextColor={isDarkMode ? "#999" : "#666"}
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={!showPassword}
                                accessibilityLabel="Senha"
                            />
                            <TouchableOpacity onPress={toggleShowPassword} style={styles.eyeIcon}>
                                <Ionicons name={showPassword ? "eye-outline" : "eye-off-outline"} size={24} color={isDarkMode ? "#fff" : "#333"} />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                            style={styles.loginButton}
                            onPress={handleLogin}
                            accessibilityRole="button"
                            accessibilityLabel="Fazer login"
                        >
                            <LinearGradient
                                colors={['indigo', 'blue']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={styles.gradientButton}
                            >
                                <Text style={styles.loginButtonText}>Entrar</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
            </KeyboardAvoidingView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    gradientOverlay: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginContainer: {
        width: width * 0.9,
        maxWidth: 400,
        backgroundColor: '#000',
        padding: 30,
        borderRadius: 20,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 5,
    },
    loginContainerDark: {
        backgroundColor: 'rgba(30, 30, 30, 0.8)',
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 30,
        color: '#333',
    },
    titleDark: {
        color: '#fff',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginBottom: 20,
    },
    inputIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 16,
        color: '#333',
    },
    inputDark: {
        borderColor: '#555',
        color: '#fff',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    eyeIcon: {
        position: 'absolute',
        right: 15,
    },
    loginButton: {
        width: '100%',
        marginTop: 20,
        overflow: 'hidden',
        borderRadius: 25,
    },
    gradientButton: {
        padding: 15,
        alignItems: 'center',
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default LoginScreen;