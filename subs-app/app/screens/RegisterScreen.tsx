import React, {JSX, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import api from '../../api/api';
import { saveToken } from '../../utils/auth';
import { router } from 'expo-router';

export default function RegisterScreen(): JSX.Element {
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleRegister = async (): Promise<void> => {
        try {
            const response = await api.post('/auth/register', {
                firstName,
                lastName,
                email,
                password,
            });

            const token: string = response.data.token;
            await saveToken(token);
            Alert.alert('Success', 'Registration successful!');
            router.push('../screens/HomePage');
        } catch (error: any) {
            console.error(error);
            Alert.alert('Registration failed', error.response?.data?.message || 'Something went wrong');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Register</Text>

            <TextInput
                style={styles.input}
                placeholder="First Name"
                value={firstName}
                onChangeText={setFirstName}
            />

            <TextInput
                style={styles.input}
                placeholder="Last Name"
                value={lastName}
                onChangeText={setLastName}
            />

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

            <Button title="Register" onPress={handleRegister} />
            <View style={{ marginTop: 10 }} />
            <Button title="Back to Login" onPress={() => router.push('/login')} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        marginTop: 80,
    },
    heading: {
        fontSize: 24,
        marginBottom: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 12,
        padding: 10,
        borderRadius: 5,
    },
});
