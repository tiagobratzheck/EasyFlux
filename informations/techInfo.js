import React from 'react';
import { StyleSheet, View, Alert, Image, Text, ScrollView } from 'react-native';
import { Appbar, Button, DefaultTheme, Provider as PaperProvider, ActivityIndicator, Colors } from 'react-native-paper';


const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0db337',
        accent: '#0DB337',
    },
};


export default function TechInfo({ navigation }) {
    return (
        <PaperProvider theme={theme}>

            <Appbar.Header>
                <Appbar.Content title="EasyFlux" subtitle="Informações técnicas" />
                <Appbar.Action icon="login" onPress={() => navigation.navigate('login')} />
            </Appbar.Header>

            <View style={styles.container}>
                <ScrollView>

                    <View style={{ marginBottom: 30, alignItems: 'center', marginTop: 20 }}>
                        <Text style={{ fontSize: 20 }}>Informações técnicas</Text>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Text>
                            Aplicativo desenvolvido com:
                        </Text>
                        <Image style={{ height: 50, width: 40 }}
                            source={require('../images/expo_logo.png')}
                        />
                    </View>
                    <Text style={{ fontSize: 11, textAlign: 'center', width: 380 }}>Esse MVP foi desenvolvido com EXPO para
                        a execução de testes e coletas de feedback de potenciais clientes.</Text>

                    <View style={{ marginBottom: 30, alignItems: 'center' }}>
                        <Text style={{ fontSize: 20, marginTop: 30 }}>Arquitetura da aplicação</Text>
                    </View>

                    <View style={styles.arquiContainer}>

                        <Text style={{ textAlign: 'justify', fontWeight: 'bold' }}>-{`>`}APPLICATION</Text>
                        <Text style={{ textAlign: 'justify', fontWeight: 'bold' }}>--{`>`}actions</Text>
                        <Text style={{ textAlign: 'justify' }}>----{`>`}userAction</Text>
                        <Text style={styles.textStyle}>Ação a ser executada quando o usuário entra no aplicativo</Text>

                        <Text style={{ textAlign: 'justify', fontWeight: 'bold' }}>--{`>`}components</Text>
                        <Text style={{ textAlign: 'justify' }}>----{`>`}circularProgressChart</Text>
                        <Text style={styles.textStyle}>Componente que renderiza a barra circular da tela home</Text>
                        <Text style={{ textAlign: 'justify' }}>----{`>`}tableChart</Text>
                        <Text style={styles.textStyle}>Componente que renderiza as tabelas de contas pagas e recebidas da tela de gráficos</Text>

                        <Text style={{ textAlign: 'justify', fontWeight: 'bold' }}>--{`>`}images</Text>
                        <Text style={styles.textStyle}>Pasta com as imagens da aplicação</Text>

                        <Text style={{ textAlign: 'justify', fontWeight: 'bold' }}>--{`>`}informations</Text>
                        <Text style={{ textAlign: 'justify' }}>----{`>`}about</Text>
                        <Text style={styles.textStyle}>Informações sobre o aplicativo e a localização da sede</Text>

                        <Text style={{ textAlign: 'justify' }}>----{`>`}faq</Text>
                        <Text style={styles.textStyle}>Tela com as informações de usabilidade</Text>

                        <Text style={{ textAlign: 'justify' }}>----{`>`}techInfo</Text>
                        <Text style={styles.textStyle}>Tela com as informações técnicas</Text>

                        <Text style={{ textAlign: 'justify', fontWeight: 'bold' }}>--{`>`}reducers</Text>
                        <Text style={{ textAlign: 'justify' }}>----{`>`}userReducer</Text>
                        <Text style={styles.textStyle}>Reducer para envio da estado do usuário</Text>

                        <Text style={{ textAlign: 'justify', fontWeight: 'bold' }}>--{`>`}services</Text>
                        <Text style={{ textAlign: 'justify', fontWeight: 'bold' }}>----{`>`}dataService</Text>
                        <Text style={{ textAlign: 'justify' }}>--------{`>`}dataService</Text>
                        <Text style={styles.textStyle}>Funções com o Firebase referentes a coleção de registros</Text>

                        <Text style={{ textAlign: 'justify', fontWeight: 'bold' }}>----{`>`}employeeService</Text>
                        <Text style={{ textAlign: 'justify' }}>--------{`>`}employeeService</Text>
                        <Text style={styles.textStyle}>Funções com o Firebase referentes a coleção de usuários</Text>

                        <Text style={{ textAlign: 'justify', fontWeight: 'bold' }}>----{`>`}loginService</Text>
                        <Text style={{ textAlign: 'justify' }}>--------{`>`}loginService</Text>
                        <Text style={styles.textStyle}>Funções com o Firebase referentes ao login e criação de usuários</Text>

                        <Text style={{ textAlign: 'justify', fontWeight: 'bold' }}>--{`>`}tools</Text>
                        <Text style={{ textAlign: 'justify' }}>----{`>`}calculationTools</Text>
                        <Text style={styles.textStyle}>Funções de calculo para os resultados financeiros</Text>

                        <Text style={{ textAlign: 'justify' }}>----{`>`}styleTools</Text>
                        <Text style={styles.textStyle}>Funções de estilo</Text>

                        <Text style={{ textAlign: 'justify', fontWeight: 'bold' }}>--{`>`}views</Text>
                        <Text style={{ textAlign: 'justify' }}>----{`>`}analyticsFluxo</Text>
                        <Text style={styles.textStyle}>Tela com os gráficos e tabelas de fluxo de caixa</Text>

                        <Text style={{ textAlign: 'justify' }}>----{`>`}analyticsSaldo</Text>
                        <Text style={styles.textStyle}>Telas com os gráficos de evolução do saldo e faturamento</Text>

                        <Text style={{ textAlign: 'justify' }}>----{`>`}employeeRegister</Text>
                        <Text style={styles.textStyle}>Tela para registro de usuários</Text>

                        <Text style={{ textAlign: 'justify' }}>----{`>`}employees</Text>
                        <Text style={styles.textStyle}>Tela com a tela de usuários registrados</Text>

                        <Text style={{ textAlign: 'justify' }}>----{`>`}home</Text>
                        <Text style={styles.textStyle}>Tela home com as informações principais</Text>

                        <Text style={{ textAlign: 'justify' }}>----{`>`}login</Text>
                        <Text style={styles.textStyle}>Tela de login</Text>

                        <Text style={{ textAlign: 'justify' }}>----{`>`}registro</Text>
                        <Text style={styles.textStyle}>Tela de registro de dados financeiros</Text>

                        <Text style={{ textAlign: 'justify' }}>----{`>`}userRegister</Text>
                        <Text style={styles.textStyle}>Tela para definição da senha de usuários novos</Text>

                        <Text style={{ textAlign: 'justify' }}>--{`>`}App</Text>
                        <Text style={styles.textStyle}>Arquivo index da aplicação</Text>

                    </View>

                </ScrollView>
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
    arquiContainer: {
        marginTop: 20,
        marginBottom: 5,
        width: 350,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },
    textStyle: {
        fontSize: 11,
        color: '#0B4DA4',
        textAlign: 'center',
        paddingBottom: 17
    }
})
