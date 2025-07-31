import React, { useState , JSX } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import api from '../../api/api';
import { router } from 'expo-router';

export default function AddSubscription(): JSX.Element {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [renewalDate, setRenewalDate] = useState<Date>(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

    const handleSubmit = async () => {
        if (!name || !price) {
            Alert.alert("Error", "Please fill all fields");
            return
        }
        try {
            await api.post('/api/subscriptions', {
                name,
                price: parseFloat(price),
                renewalDate,
            });

            Alert.alert('Success', 'Subscription Added!');
            router.push('..//screens/subscriptions');
        } catch (error: any) {
            console.error(error);
            Alert.alert('Error', error.response?.data?.message || 'Failed to add subscription.');

        }

    }
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Add New Subscription</Text>

            <TextInput
                style={styles.input}
                placeholder={"Subscription Name"}
                value={name}
                onChangeText={setName}
            />

            <TextInput
                style={styles.input}
                placeholder={"price"}
                value={price}
                onChangeText={setPrice}
                keyboardType={"decimal-pad"}
            />
            <Button
                title={`Pick Renewal Date (${renewalDate.toDateString()})`}
                onPress={() => setShowDatePicker(true)}
            />

            {showDatePicker && (
                <DateTimePicker
                    value={renewalDate}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={(event, selectedDate) => {
                        setShowDatePicker(false);
                        if (selectedDate) {
                            setRenewalDate(selectedDate);
                        }
                    }}
                />
            )}

            <View style={{marginTop: 20}}>
                <Button title="Add Subscription" onPress={handleSubmit}/>
            </View>
        </View>
    );
}
    const styles = StyleSheet.create({

        container: {
            padding: 25,
            marginTop: 60,
        },
        heading: {
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 25,
            textAlign: 'center',
        },
        input: {
            borderWidth: 1,
            borderColor: '#ccc',
            padding: 12,
            borderRadius: 10,
            marginBottom: 15,
            backgroundColor: '#f9f9f9',
        },

    });

