import React, { useState, useLayoutEffect } from 'react';
import { StyleSheet, View, Alert, Image, Text } from 'react-native';
import { Appbar, Button, DefaultTheme, Provider as PaperProvider, ActivityIndicator, Colors } from 'react-native-paper';

import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';


const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0db337',
        accent: '#0DB337',
    },
};


export default function About({ navigation }) {

    const [loading, setLoading] = useState(false);
    const [myPosition, setMyPosition] = useState(null)
    const [myLocation, setMyLocation] = useState({
        latitude: -28.45628460500394,
        longitude: -52.814531916923066,
        latitudeDelta: 0.025,
        longitudeDelta: 0.025
    });

    useLayoutEffect(() => {
        const fetchLocation = async () => {
            setLoading(true)
            let { status } = await Location.requestForegroundPermissionsAsync()
            if (status !== 'granted') {
                Alert.alert("Permissão de acesso a localização negada!")
            } else {
                try {
                    const mylocation = await Location.getCurrentPositionAsync()
                    setMyPosition(mylocation.coords)
                    setLoading(false)
                } catch (error) {
                    Alert.alert("Erro ao acessar as coordenadas do GPS!")
                }
            }
        }
        fetchLocation()
    }, [])


    return (
        <PaperProvider theme={theme}>

            <Appbar.Header>
                <Appbar.Content title="EasyFlux" subtitle="sobre" />
                <Appbar.Action icon="login" onPress={() => navigation.goBack()} />
            </Appbar.Header>

            <View style={styles.container}>

                <View style={{ marginBottom: 20 }}>
                    <Text>Nossa localização:</Text>
                </View>

                {loading ?
                    <View style={{ marginBottom: 20 }}>
                        <ActivityIndicator animating={true} color={Colors.green500} size='large' />
                    </View>
                    :
                    <MapView
                        style={styles.mapContainer}
                        region={myLocation}
                    >
                        {myPosition ?
                            <Marker
                                coordinate={{
                                    latitude: myPosition.latitude,
                                    longitude: myPosition.longitude
                                }}
                                title="Onde estamos"
                                description="Nosso escritório está localizado aqui!"
                            >
                            </Marker>
                            :
                            null}
                    </MapView>
                }

                <View style={{ flexDirection: 'row', alignContent: 'space-around', justifyContent: 'space-evenly' }}>
                    <Button icon="frequently-asked-questions" mode="text" onPress={() => navigation.navigate('faq')}>
                        <Text style={{ fontSize: 14 }}>FAQ</Text>
                    </Button>

                    <Button icon="tools" mode="text" onPress={() => navigation.navigate('techinfo')}>
                        <Text style={{ fontSize: 14 }}>ARQUITETURA</Text>
                    </Button>
                </View>

                <View style={{ flexDirection: 'column', alignItems: 'center', marginTop: 40 }}>
                    <Image style={{height: 60, width: 130}}
                        source={require('../images/Easy_logo.png')}
                    />
                    <Text style={{fontSize: 13}}>
                        EasyFlux - Desenvolvido por: 
                    </Text>
                    <Text style={{fontSize: 11}}>
                        Copyright {'\u00A9'} EASY CO | All rights reserved
                    </Text>
                </View>

            </View>
        </PaperProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    mapContainer: {
        height: 380,
        width: 380,
        marginBottom: 20
    }
})
