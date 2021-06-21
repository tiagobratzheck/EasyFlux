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


export default function Faq({ navigation }) {
    return (
        <PaperProvider theme={theme}>

            <Appbar.Header>
                <Appbar.Content title="EasyFlux" subtitle="FAQ" />
                <Appbar.Action icon="login" onPress={() => navigation.navigate('login')} />
            </Appbar.Header>

            <View style={styles.container}>

                <ScrollView>

                    <View style={styles.textBox}>
                        <Text style={{ fontWeight: "bold" }}>1) Tela de Login:</Text>
                        <Text style={styles.text}>Tela inicial do aplicativo onde o usuário irá informar
                            seu email e senha para entrar no aplicativo. É possível salvar as credenciais na opção "Lembrar email
                            e senha". O Botão "Definir senha" possui a funcionalidade de registrar a senha para um novo usuário
                            cadastrado pelo Diretor.</Text>
                    </View>
                    <View style={styles.imageBox}>
                        <Image style={{ height: 320, width: 300 }}
                            source={require('../images/faq_login.png')}
                        />
                    </View>

                    <View style={styles.textBox}>
                        <Text style={{ fontWeight: "bold" }}>2) Appbar:</Text>
                        <Text style={styles.text}>A barra superior da tela superior da tela Home apresenta as
                            seguintes funcionalidades: Identificação do cargo do usuário logado (D para Diretor, A para analista
                            e G para Gestor) No canto direito, encontra-se o botão de cadastro de usuário (habilitado apenas para
                            diretores) e botão de logout.</Text>
                    </View>
                    <View style={styles.imageBox}>
                        <Image style={{ height: 95, width: 360 }}
                            source={require('../images/faq_appbar.png')}
                        />
                    </View>

                    <View style={styles.textBox}>
                        <Text style={{ fontWeight: "bold" }}>3) Seleção da data:</Text>
                        <Text style={styles.text}>Primeira opção de seleção na tela Home. Após selecionar a data, os dados
                            serão apresentados na tela. Se não houver lançamentos, a opção de cadastro é exibida.</Text>
                    </View>
                    <View style={styles.imageBox}>
                        <Image style={{ height: 80, width: 360 }}
                            source={require('../images/faq_dateselector.png')}
                        />
                    </View>

                    <View style={styles.textBox}>
                        <Text style={{ fontWeight: "bold" }}>4) Cadastro:</Text>
                        <Text style={styles.text}>A opção de cadastro de lançamentos é habilitada apenas para diretores. Nessa
                            opção é possível cadastrar os dados financeiros para o dia selecionado.</Text>
                    </View>
                    <View style={styles.imageBox}>
                        <Image style={{ height: 130, width: 360 }}
                            source={require('../images/faq_cadastrar.png')}
                        />
                    </View>

                    <View style={styles.textBox}>
                        <Text style={{ fontWeight: "bold" }}>5) Indices:</Text>
                        <Text style={styles.text}>Os indices são apresentados de acordo com o total de clientes recebidos
                            e contas pagas. Esses indicadores possuem o objetivo que informar de forma clara e objetiva o resultado
                            do fluxo financeiro de um dia. Cada cor indica uma situação - desde a mais crítica até a mais positiva.</Text>
                    </View>
                    <View style={styles.imageBox}>
                        <Image style={{ height: 190, width: 360 }}
                            source={require('../images/faq_indice1.png')}
                        />
                    </View>
                    <View style={styles.imageBox}>
                        <Image style={{ height: 190, width: 360 }}
                            source={require('../images/faq_indice2.png')}
                        />
                    </View>

                    <View style={styles.textBox}>
                        <Text style={{ fontWeight: "bold" }}>6) Histórico:</Text>
                        <Text style={styles.text}>O quadro de histórico apresenta o resultado do fluxo de caixa e
                            o saldo do caixa no dia da análise. Os botões ao lado, redirecionam para os gráficos, onde é possível
                            observar os históricos de fluxo. </Text>
                    </View>
                    <View style={styles.imageBox}>
                        <Image style={{ height: 100, width: 360 }}
                            source={require('../images/faq_historico.png')}
                        />
                    </View>

                    <View style={styles.textBox}>
                        <Text style={{ fontWeight: "bold" }}>7) Atualizar e deletar:</Text>
                        <Text style={styles.text}>As funções de atualizar e deletar estão habilitadas apenas para os diretores.
                            Os usuários analistas e gestores podem atualizar apenas os valores de contas pagas e clientes recebidos.
                            Essas funções são restritas devido a sensibilidade dos dados financeiros. </Text>
                    </View>
                    <View style={styles.imageBox}>
                        <Image style={{ height: 80, width: 360 }}
                            source={require('../images/faq_updatedelete.png')}
                        />
                    </View>

                    <View style={styles.textBox}>
                        <Text style={{ fontWeight: "bold" }}>8) Seleção do histórico:</Text>
                        <Text style={styles.text}>As telas referentes ao histórico, fornecem os intervalos das datas seleciodas.
                            Os dados apresentados nessa tela serão os registrados dentro do intervalo apresentado. O padrão será sempre 5 dias
                            anteriores a partir da data selecionada na tela home.</Text>
                    </View>
                    <View style={styles.imageBox}>
                        <Image style={{ height: 100, width: 360 }}
                            source={require('../images/faq_date.png')}
                        />
                    </View>

                    <View style={styles.textBox}>
                        <Text style={{ fontWeight: "bold" }}>9) Tabelas:</Text>
                        <Text style={styles.text}>As tabelas fornecem os dados históricos referentes aos fluxos financeiros.
                            As tabelas são apresentadas após o gráfico do histórico do fluxo de caixa. São apresentadas as tabelas:
                            Registros de fluxo; Contas pagas e inadimplência.</Text>
                    </View>
                    <View style={styles.imageBox}>
                        <Image style={{ height: 300, width: 360 }}
                            source={require('../images/faq_table.png')}
                        />
                    </View>

                    <View style={styles.textBox}>
                        <Text style={{ fontWeight: "bold" }}>10) Tela Home:</Text>
                        <Text style={styles.text}>Abaixo é apresentada a tela home do EasyFlux.</Text>
                    </View>
                    <View style={styles.imageBox}>
                        <Image style={{ height: 600, width: 280 }}
                            source={require('../images/faq_home.png')}
                        />
                    </View>

                    <View style={styles.textBox}>
                        <Text style={{ fontWeight: "bold" }}>11) Tela dos gráficos - Fluxo:</Text>
                        <Text style={styles.text}>Abaixo é apresentada a tela referente ao histório do fluxo
                            de caixa do EasyFlux.</Text>
                    </View>
                    <View style={styles.imageBox}>
                        <Image style={{ height: 600, width: 280 }}
                            source={require('../images/faq_fluxo.png')}
                        />
                    </View>

                    <View style={[styles.textBox, { marginBottom: 40, marginTop: 50 }]}>
                        <Text style={{ textAlign: 'center', fontWeight: "bold" }}>EasyFlux -
                            O melhor aplicativo de controle de fluxo de caixa!</Text>
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
    textBox: {
        marginTop: 20,
        marginBottom: 5,
        width: 350,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },
    text: {
        textAlign: 'justify'
    },
    imageBox: {
        width: 350,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    }
})
