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
        minWidth: "25%",
        fontWeight: "ultrabold"
    }, view: {
        width: "100%", marginHorizontal: 50

    }, section: {
        display: "flex", flexDirection: "row"
    },
});
const AnalysisBanano = ({analysis}) => {


    return (<View style={{fontSize: "10", marginTop: 4, display: "flex", flexDirection: "row"}}>
        <View>

            <View style={styles.section}>
                <Text style={styles.text1}>Maduración 1</Text>
                <Text style={styles.text1}>{Humanize.formatNumber(analysis?.maturation_1, 2)} %</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.text1}>Maduración 2</Text>
                <Text style={styles.text1}>{Humanize.formatNumber(analysis?.maturation_2, 2)} %</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.text1}>Daños mecánicos</Text>
                <Text style={styles.text1}>{Humanize.formatNumber(analysis?.mechanical_damages, 2)} %</Text>
            </View>
        </View>
        <View>
            <View style={styles.section}>
                <Text style={styles.text1}>Corte de cuello</Text>
                <Text style={styles.text1}>{Humanize.formatNumber(analysis?.broken_neck, 2)} %</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.text1}>Rozadura</Text>
                <Text style={styles.text1}>{Humanize.formatNumber(analysis?.chafing, 2)} %</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.text1}>Cicatriz</Text>
                <Text style={styles.text1}>{Humanize.formatNumber(analysis?.scar, 2)} %</Text>
            </View>


        </View>
    </View>);

};

export default AnalysisBanano;
