import React from 'react';
import Humanize from "humanize-plus";
import {StyleSheet, Text, View} from "@react-pdf/renderer";

const styles = StyleSheet.create({
    text: {
        fontSize: 10,
        textAlign: "justify",
        fontFamily: "Times-Roman",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "black",
        padding: "3px",
        minWidth: "50%",
        fontWeight: "ultrabold"
    }, view: {
        width: "100%", marginHorizontal: 50

    }, section: {
        display: "flex", flexDirection: "row"
    },
});
const AnalysisGoldenberry = ({analysis}) => {

    return (<View style={{fontSize: "10", marginTop: 4, display: "flex", flexDirection: "row"}}>
        <View>
            <View style={styles.section}>
                <Text style={styles.text}>Maduración 1</Text>
                <Text style={styles.text}>{Humanize.formatNumber(analysis?.maturation_1, 2)} %</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.text}>Maduración 2</Text>
                <Text style={styles.text}>{Humanize.formatNumber(analysis?.maturation_2, 2)} %</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.text}>Maduración 3</Text>
                <Text style={styles.text}>{Humanize.formatNumber(analysis?.maturation_3, 2)} %</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.text}>Hongos y fermentado</Text>
                <Text style={styles.text}>{Humanize.formatNumber(analysis?.mushroom, 2)} %</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.text}>Verde</Text>
                <Text style={styles.text}>{Humanize.formatNumber(analysis?.green, 2)} %</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.text}>Rajado</Text>
                <Text style={styles.text}>{Humanize.formatNumber(analysis?.cracked, 2)} %</Text>
            </View>

        </View>
        <View>
            <View style={styles.section}>
                <Text style={styles.text}>Aplastado</Text>
                <Text style={styles.text}>{Humanize.formatNumber(analysis?.crushed, 2)} %</Text>
            </View><View style={styles.section}>
            <Text style={styles.text}>{"Pequeño < 17mm"}</Text>
            <Text style={styles.text}>{Humanize.formatNumber(analysis?.small, 2)} %</Text>
        </View><View style={styles.section}>
            <Text style={styles.text}>Caliz</Text>
            <Text style={styles.text}>{Humanize.formatNumber(analysis?.caliz, 2)} %</Text>
        </View><View style={styles.section}>
            <Text style={styles.text}>Fitosanitario</Text>
            <Text style={styles.text}>{Humanize.formatNumber(analysis?.phytosanitary, 2)} %</Text>
        </View><View style={styles.section}>
            <Text style={styles.text}>Aguado</Text>
            <Text style={styles.text}>{Humanize.formatNumber(analysis?.watery, 2)} %</Text>
        </View>
        </View>
    </View>);

};

export default AnalysisGoldenberry;
