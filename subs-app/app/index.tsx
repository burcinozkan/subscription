import { View, Text, Button } from 'react-native';
import { Link } from 'expo-router';

export default function HomeScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>🏠 Ana Sayfa</Text>
            <Link href="/login">Giriş Yap</Link>
        </View>
    );
}
