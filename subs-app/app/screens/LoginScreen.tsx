import React, { useState , JSX} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import api from '../../api/api';
import { saveToken } from '../../utils/auth';
import { router } from 'expo-router';

export default function LoginScreen(): JSX.Element {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleLogin = async () => {
        try {
            const response = await api.post('/auth/login', { email, password });
            const token = response.data.token;
            if (typeof token === 'string') {
                await saveToken(token);
                Alert.alert('Success', 'Login successful!');
                router.push('/screens/HomePage');
            }
        } catch (error: any) {
            console.error(error);
            Alert.alert('Login failed', error.response?.data?.message || 'Something went wrong');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Welcome Back</Text>

            <TextInput
                style={styles.input}
                placeholder="Email"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push('../screens/RegisterScreen')}>
                <Text style={styles.linkText}>Don't have an account? Register</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30,
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    heading: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
        color: '#111',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#f9f9f9',
        padding: 15,
        marginBottom: 15,
        borderRadius: 12,
        fontSize: 16,
    },
    button: {
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
    linkText: {
        color: '#4CAF50',
        textAlign: 'center',
        marginTop: 20,
        fontSize: 14,
    },
});
