import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, ScrollView, ToolbarAndroidBase } from 'react-native';
import "react-native-svg";

import { Appbar, ActivityIndicator, Colors, DefaultTheme, Provider as PaperProvider, DataTable } from 'react-native-paper';

import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from "victory-native";

import TableChart from '../components/tableChart';

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

export default function AnalyticsFluxo({ route, navigation }) {

    // Variável para selecionar o estado do usuário logado
    const user = useSelector(user => user);

    // Variáveis recebidas pela rota
    let { operacao, date } = route.params;

    // Data final para seleção
    let endDate = new Date(date);
    endDate.setDate(date.getDate() - 4)

    // Variáveis do gráfico e tabela ref. Fluxo de caixa --
    const [fluxoCaixa, setFluxoCaixa] = useState([]);
    const [dates, setDates] = useState([]);
    const [tableData, setTableData] = useState([]);


    // Loading até montar os dados
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const result = await DataService.getRegistersBetweenDates(endDate.toISOString().split('T')[0], date.toISOString().split('T')[0])
                .then((result) => {
                    let quarter = 1;
                    result.forEach((doc) => {
                        let fluxo = (doc.data().resultados.fluxo_caixa.total_clientes_recebidos - doc.data().resultados.fluxo_caixa.total_contas_pagas);
                        setDates((prevArray =>
                            [...prevArray, doc.data().dateRegister]))
                        setFluxoCaixa(prevState => (
                            [...prevState, {
                                quarter: quarter,
                                earnings: parseFloat(fluxo.toFixed(2))
                            }]))
                        setTableData(prevState => (
                            [...prevState, {
                                date: doc.data().dateRegister,
                                areceber: doc.data().resultados.resultados_financeiros.clientes_receber_dia,
                                recebidos: doc.data().resultados.fluxo_caixa.total_clientes_recebidos,
                                apagar: doc.data().resultados.resultados_financeiros.contas_pagar_dia,
                                pagos: doc.data().resultados.fluxo_caixa.total_contas_pagas
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

                        <View style={{ height: 550, flex: 1, alignContent: 'center', alignItems: 'center' }}>
                            <ScrollView>

                                <View style={{
                                    marginTop: 10, backgroundColor: '#fff',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: 10
                                }}>
                                    <Text style={styles.textTitle}>{`Gráfico: ${operacao}`}</Text>
                                </View>

                                <VictoryChart
                                    width={380}
                                    theme={VictoryTheme.material}
                                    domainPadding={10}
                                >
                                    <VictoryAxis
                                        dependentAxis
                                        tickFormat={(x) => (`R$${x / 1000} k`)}
                                    />
                                    <VictoryBar
                                        alignment="start"
                                        barRatio={0.7}
                                        data={fluxoCaixa && fluxoCaixa}
                                        x="quarter"
                                        y="earnings"
                                        labels={({ datum }) => `R$ ${datum.earnings}`}
                                        style={{
                                            labels: {
                                                fontSize: 16,
                                                fill: ({ datum }) => datum.earnings > 0 ? "#0BA414" : "#c43a31"
                                            }
                                        }}
                                        style={{
                                            data: { fill: ({ datum }) => datum.earnings > 0 ? "#0BA414" : "#c43a31" }
                                        }} />
                                    <VictoryAxis
                                        orientation="bottom"
                                        tickValues={[1, 2, 3, 4, 5]}
                                        tickFormat={dates && dates}
                                        style={{ tickLabels: { fontSize: 11 } }}
                                    />
                                </VictoryChart>

                                {typeof tableData !== 'undefined' ?
                                    <View>

                                        <View style={{
                                            marginTop: 10, backgroundColor: '#fff',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginBottom: 10
                                        }}>
                                            <Text style={styles.textTitle}>Tabela de registros</Text>
                                        </View>

                                        <View style={styles.tableContainer}>
                                            <DataTable >
                                                <DataTable.Header >
                                                    <DataTable.Title style={styles.tableStyle}>
                                                        <Text style={styles.textHeaderTable}>Data</Text>
                                                    </DataTable.Title>
                                                    <DataTable.Title style={styles.tableStyle}>
                                                        <Text style={styles.textHeaderTable}>Recebidos</Text>
                                                    </DataTable.Title>
                                                    <DataTable.Title style={styles.tableStyle}>
                                                        <Text style={styles.textHeaderTable}>Pagos</Text>
                                                    </DataTable.Title>
                                                    <DataTable.Title style={styles.tableStyle}>
                                                        <Text style={styles.textHeaderTable}>Resultado</Text>
                                                    </DataTable.Title>
                                                </DataTable.Header>
                                                {tableData && tableData.map((item, index) => {
                                                    return (
                                                        <DataTable.Row key={index}>
                                                            <DataTable.Cell style={styles.tableStyle}>{item.date}</DataTable.Cell>
                                                            <DataTable.Cell style={styles.tableStyle}>
                                                                <Text style={{ fontSize: 12 }}>{`R$ ${item.recebidos.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`}</Text>
                                                            </DataTable.Cell>
                                                            <DataTable.Cell style={styles.tableStyle}>
                                                                <Text style={{ fontSize: 12 }}>{`R$ ${item.pagos.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`}</Text>
                                                            </DataTable.Cell>
                                                            <DataTable.Cell style={styles.tableStyle}>
                                                                <Text style={Tools.getStyle(item.recebidos, item.pagos)}>
                                                                    {Tools.getIndice(item.recebidos, item.pagos)}
                                                                </Text>
                                                            </DataTable.Cell>
                                                        </DataTable.Row>
                                                    )
                                                })}
                                            </DataTable>
                                        </View>

                                        <View style={{
                                            marginTop: 10, backgroundColor: '#fff',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginBottom: 10
                                        }}>
                                            <Text style={styles.textTitle}>Tabela de Contas</Text>
                                        </View>

                                        <View style={styles.tableContainer}>
                                            <TableChart
                                                table="contas"
                                                firstColumn="Data"
                                                secondColumn="À pagar"
                                                thirdColumn="Pagas"
                                                forthColumn="% pago"
                                                tableData={tableData} />
                                        </View>

                                        <View style={{
                                            marginTop: 10, backgroundColor: '#fff',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginBottom: 10
                                        }}>
                                            <Text style={styles.textTitle}>Tabela de inadimplência</Text>
                                        </View>

                                        <View style={styles.tableContainer}>
                                            <TableChart
                                                table="recebidos"
                                                firstColumn="Data"
                                                secondColumn="À receber"
                                                thirdColumn="Recebidos"
                                                forthColumn="% recebido"
                                                tableData={tableData} />
                                        </View>

                                    </View>
                                    :
                                    null
                                }

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
    boxContainer: {
        flex: 4,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    graphs: {
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    tableContainer: {
        backgroundColor: '#fff',
        alignContent: 'space-around',
        justifyContent: 'space-evenly',
        width: 390,
        marginBottom: 40
    },
    tableStyle: {
        justifyContent: 'space-evenly',
        alignContent: 'space-between',
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