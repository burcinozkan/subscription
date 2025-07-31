import React, { useEffect, useState , JSX  } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import api from '../../api/api'; // api.ts doğru yolda olmalı
import { useRouter } from 'expo-router';

type Subscription = {
    id: number;
    name: string;
    price: number;
    renewalDate: string;
};

export default function SubscriptionsScreen(): JSX.Element {
    const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();

    useEffect(() => {
        const fetchSubscriptions = async () => {
            try {
                const response = await api.get('/subscriptions');
                setSubscriptions(response.data);
            } catch (error) {
                console.error('Error fetching subscriptions:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSubscriptions();
    }, []);

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" />
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Your Subscriptions</Text>
            <FlatList
                data={subscriptions}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.title}>{item.name}</Text>
                        <Text>Price: ${item.price}</Text>
                        <Text>Renewal: {item.renewalDate}</Text>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        marginTop: 50,
    },
    heading: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    card: {
        padding: 15,
        marginBottom: 15,
        backgroundColor: '#f1f1f1',
        borderRadius: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
