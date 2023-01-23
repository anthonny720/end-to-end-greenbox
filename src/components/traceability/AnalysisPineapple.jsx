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

const AnalysisPineapple = ({analysis}) => {
    return (
        <View style={{fontSize: "10", marginTop: 4, display: "flex", flexDirection: "row"}}>
            <View>

                <View style={styles.section}>
                    <Text style={styles.text}>Maduración 0</Text>
                    <Text style={styles.text}>{Humanize.formatNumber(analysis?.maturation_0_plant, 2)} %</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.text}>Maduración 1</Text>
                    <Text style={styles.text}>{Humanize.formatNumber(analysis?.maturation_1_plant, 2)} %</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.text}>Maduración 2</Text>
                    <Text style={styles.text}>{Humanize.formatNumber(analysis?.maturation_2_plant, 2)} %</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.text}>Maduración 3</Text>
                    <Text style={styles.text}>{Humanize.formatNumber(analysis?.maturation_3_plant, 2)} %</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.text}>Maduración 4</Text>
                    <Text style={styles.text}>{Humanize.formatNumber(analysis?.maturation_4_plant, 2)} %</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.text}>Maduración 5</Text>
                    <Text style={styles.text}>{Humanize.formatNumber(analysis?.maturation_5_plant, 2)} %</Text>
                </View>
            </View>
        </View>

    );

};

export default AnalysisPineapple;
