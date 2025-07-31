//JWT token'ı güvenli şekilde kaydetme, alma ve silme işlemlerini yapar
//Giriş yapan kullanıcıya backend JWT token döner. Bu token'ı:
//
// Hafızada güvenli şekilde saklaman gerekir.
//
// Her istekle birlikte Authorization: Bearer token başlığıyla göndermen gerekir.

//hem Android'de hem iOS'ta şifreli ve güvenli veri saklama imkânı sağlar.


import * as SecureStore from 'expo-secure-store';

export const saveToken = async (token) => {
    await SecureStore.setItemAsync('token', token);
};

export const getToken = async () => {
    return await SecureStore.getItemAsync('token');
};

export const removeToken = async () => {
    await SecureStore.deleteItemAsync('token');
};
