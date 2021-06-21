import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, ScrollView, ToolbarAndroidBase } from 'react-native';
import "react-native-svg";

import { Appbar, ActivityIndicator, Colors, DefaultTheme, Provider as PaperProvider, DataTable } from 'react-native-paper';

import { VictoryLine, VictoryChart, VictoryAxis, VictoryTheme } from "victory-native";

import * as DataService from '../services/dataService/dataService';
import * as Tools from '../tools/calculationTools';

import { useSelector } from 'react-redux';

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0db337',
        accent: '#0DB337',
    },
};

export default function AnalyticsSaldo({ route, navigation }) {

    // Variável para selecionar o estado do usuário logado
    const user = useSelector(user => user);

    // Variáveis recebidas pela rota
    let { operacao, date } = route.params;

    // Data final para seleção
    let endDate = new Date(date);
    endDate.setDate(date.getDate() - 4)

    // Variáveis do gráfico e tabela ref. Fluxo de caixa --
    const [saldoCaixa, setSaldoCaixa] = useState([]);
    const [dates, setDates] = useState([]);
    const [faturamento, setFaturamento] = useState([]);


    // Loading até montar os dados
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const result = await DataService.getRegistersBetweenDates(endDate.toISOString().split('T')[0], date.toISOString().split('T')[0])
                .then((result) => {
                    let quarter = 1;
                    result.forEach((doc) => {
                        setDates((prevArray =>
                            [...prevArray, doc.data().dateRegister]))
                        setSaldoCaixa(prevState => (
                            [...prevState, {
                                quarter: quarter,
                                earnings: doc.data().resultados.fluxo_caixa.saldo_caixa
                            }]))
                        setFaturamento(prevState => (
                            [...prevState, {
                                quarter: quarter,
                                earnings: doc.data().resultados.resultados_financeiros.faturamento_dia
                            }]))
                        quarter++;
                    });
                })
                .catch(erro => {
                    console.log(erro)
                })
                .finally(() => {
                    setLoading(false)
                })
        }
        fetchData()
    }, [])


    const getIcon = () => {
        if (user !== undefined) {
            switch (user.cargo) {
                case 'Diretor':
                    return "alpha-d-box-outline";
                case 'Gestor':
                    return "alpha-g-box-outline";
                case 'Analista':
                    return "alpha-a-box-outline";
                default:
                    return '';
            }
        }
    }

    return (
        <PaperProvider theme={theme}>

            <Appbar.Header>
                <Appbar.Action icon={getIcon()} onPress={() => { }} />
                <Appbar.Content style={{ marginLeft: 6 }} title="EasyFlux" subtitle={operacao} />
                <Appbar.Action icon="arrow-left-bold-box-outline" onPress={() => { navigation.goBack() }} />
            </Appbar.Header>

            <View style={styles.container}>

                <View style={{
                    marginTop: 10, backgroundColor: '#fff',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 30
                }}>

                    <Text>{operacao}</Text>
                    <Text style={{
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        color: '#0DB337',
                        fontSize: 15,
                        fontWeight: 'bold'
                    }}
                    >
                        {`Data: de ${endDate.toISOString().split('T')[0]} até ${date.toISOString().split('T')[0]}`}
                    </Text>
                </View>

                {
                    loading ?

                        <View>
                            <ActivityIndicator animating={true} color={Colors.green500} size='large' />
                        </View>

                        :

                        <View style={{ height: 550, flex: 1, alignContent: 'center', alignItems: 'center', marginBottom: 20 }}>
                            <ScrollView>

                                <View style={{
                                    marginTop: 10, backgroundColor: '#fff',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: 10
                                }}>
                                    <Text style={styles.textTitle}>Gráfico: Evolução saldo de caixa</Text>
                                </View>

                                <VictoryChart
                                    width={380}
                                    theme={VictoryTheme.material}
                                    domainPadding={30}
                                >
                                    <VictoryAxis
                                        dependentAxis
                                        tickFormat={(x) => (`R$${x / 100} k`)}
                                    />
                                    <VictoryLine
                                        data={saldoCaixa && saldoCaixa}
                                        x="quarter"
                                        y="earnings"
                                        labels={({ datum }) => `R$ ${datum.earnings}`}

                                        style={{
                                            data: { stroke: "#0BA414" },
                                            parent: { border: "2px solid #ccc" }
                                        }} />
                                    <VictoryAxis
                                        orientation="bottom"
                                        tickValues={[1, 2, 3, 4, 5]}
                                        tickFormat={dates && dates}
                                        style={{ tickLabels: { fontSize: 9 } }}
                                    />
                                </VictoryChart>

                                <View style={{
                                    marginTop: 10, backgroundColor: '#fff',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: 10
                                }}>
                                    <Text style={styles.textTitle}>Gráfico: Evolução do Faturamento</Text>
                                </View>

                                <VictoryChart
                                    width={380}
                                    theme={VictoryTheme.material}
                                    domainPadding={30}
                                >
                                    <VictoryAxis
                                        dependentAxis
                                        tickFormat={(x) => (`R$${x / 100} k`)}
                                    />
                                    <VictoryLine
                                        data={faturamento && faturamento}
                                        x="quarter"
                                        y="earnings"
                                        labels={({ datum }) => `R$ ${datum.earnings}`}

                                        style={{
                                            data: { stroke: "#0BA414" },
                                            parent: { border: "2px solid #ccc" }
                                        }} />
                                    <VictoryAxis
                                        orientation="bottom"
                                        tickValues={[1, 2, 3, 4, 5]}
                                        tickFormat={dates && dates}
                                        style={{ tickLabels: { fontSize: 9 } }}
                                    />
                                </VictoryChart>

                            </ScrollView>
                        </View>

                }

            </View>

        </PaperProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textTitle: {
        fontSize: 17,
        fontWeight: 'bold',
    },
    textHeaderTable: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#0DB337'
    }
})