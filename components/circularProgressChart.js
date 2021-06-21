import React from 'react'
import { View, Text } from 'react-native';

import * as Tools from '../tools/calculationTools';
import * as Styles from '../tools/styleTools';

import { AnimatedCircularProgress } from 'react-native-circular-progress';

export default function CircularProgressChart(props) {
    return (
        <View>
            <AnimatedCircularProgress
                size={120}
                width={18}
                fill={parseFloat(Tools.getContasPagas(props.realizado, props.arealizar))}
                tintColor={Styles.getColor(props.realizado, props.arealizar)}
                onAnimationComplete={() => { }}
                backgroundColor="#fff">
                {
                    (fill) => (
                        <Text>
                            {`${Tools.getContasPagas(props.realizado, props.arealizar)} %`}
                        </Text>
                    )
                }
            </AnimatedCircularProgress>
        </View>
    )
}
