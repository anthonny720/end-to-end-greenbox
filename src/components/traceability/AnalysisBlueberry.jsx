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
const AnalysisBlueberry = ({analysis}) => {

    return (<View style={{fontSize: "10", marginTop: 4, display: "flex", flexDirection: "row"}}>
        <View>

            <View style={styles.section}>
                <Text style={styles.text1}>Brix promedio</Text>
                <Text style={styles.text1}>{Humanize.formatNumber(analysis?.average_brix, 2)} %</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.text1}>Brix máx</Text>
                <Text style={styles.text1}>{Humanize.formatNumber(analysis?.max_brix, 2)} %</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.text1}>Brix min</Text>
                <Text style={styles.text1}>{Humanize.formatNumber(analysis?.min_brix, 2)} %</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.text1}>Calibre 1</Text>
                <Text style={styles.text1}>{Humanize.formatNumber(analysis?.caliber_1, 2)} %</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.text1}>Calibre 2</Text>
                <Text style={styles.text1}>{Humanize.formatNumber(analysis?.caliber_2, 2)} %</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.text1}>Calibre 3</Text>
                <Text style={styles.text1}>{Humanize.formatNumber(analysis?.caliber_3, 2)} %</Text>
            </View>
        </View>
        <View>
            <View style={styles.section}>
                <Text style={styles.text1}>Verde</Text>
                <Text style={styles.text2}>{Humanize.formatNumber(analysis?.green, 2)} %</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.text1}>Aplastado</Text>
                <Text style={styles.text2}>{Humanize.formatNumber(analysis?.crushed, 2)} %</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.text1}>Daños mecánicos</Text>
                <Text style={styles.text2}>{Humanize.formatNumber(analysis?.mechanical_damages, 2)} %</Text>
            </View>


        </View>
    </View>);

};

export default AnalysisBlueberry;
