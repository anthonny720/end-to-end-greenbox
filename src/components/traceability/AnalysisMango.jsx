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

const AnalysisMango = ({analysis}) => {

    return (<View style={{fontSize: "10", marginTop: 4, display: "flex", flexDirection: "row"}}>
        <View>
            <View style={styles.section}>
                <Text style={styles.text}>Color 1</Text>
                <Text style={styles.text}>{Humanize.formatNumber(analysis?.color_1, 2)} %</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.text}>Color 1.5</Text>
                <Text style={styles.text}>{Humanize.formatNumber(analysis?.color_1_5, 2)} %</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.text}>Color 2</Text>
                <Text style={styles.text}>{Humanize.formatNumber(analysis?.color_2, 2)} %</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.text}>Color 2.5</Text>
                <Text style={styles.text}>{Humanize.formatNumber(analysis?.color_2_5, 2)} %</Text>
            </View>
            <View style={styles.section}>
                    <Text style={styles.text}>Color 3</Text>
                <Text style={styles.text}>{Humanize.formatNumber(analysis?.color_3, 2)} %</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.text}>Color 3.5</Text>
                <Text style={styles.text}>{Humanize.formatNumber(analysis?.color_3_5, 2)} %</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.text}>{"Brix < 7"}</Text>
                <Text style={styles.text}>{Humanize.formatNumber(analysis?.brix_7, 2)} %</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.text}>Brix 7-8</Text>
                <Text style={styles.text}>{Humanize.formatNumber(analysis?.brix_7_8, 2)} %</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.text}>Brix 8-9</Text>
                <Text style={styles.text}>{Humanize.formatNumber(analysis?.brix_8_9, 2)} %</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.text}>Brix > 9</Text>
                <Text style={styles.text}>{Humanize.formatNumber(analysis?.brix_9, 2)} %</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.text}>{"Peso > 280 g"}</Text>
                <Text style={styles.text}>{Humanize.formatNumber(analysis?.weight_280, 2)} %</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.text}>Peso 280-300 g</Text>
                <Text style={styles.text}>{Humanize.formatNumber(analysis?.weight_280_300, 2)} %</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.text}>Peso > 300 g</Text>
                <Text style={styles.text}>{Humanize.formatNumber(analysis?.weight_300, 2)} %</Text>
            </View>

        </View>
        <View>
            <View style={styles.section}>
                <Text style={styles.text}>Daños mecánicos</Text>
                <Text style={styles.text}>{Humanize.formatNumber(analysis?.mechanical_damage, 2)} %</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.text}>Rajado</Text>
                <Text style={styles.text}>{Humanize.formatNumber(analysis?.cracked, 2)} %</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.text}>Daños de sol</Text>
                <Text style={styles.text}>{Humanize.formatNumber(analysis?.sun_damage, 2)} %</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.text}>Antracnosis</Text>
                <Text style={styles.text}>{Humanize.formatNumber(analysis?.anthracnose, 2)} %</Text>
            </View>
            <View style={styles.section}>
                    <Text style={styles.text}>Podrido</Text>
                <Text style={styles.text}>{Humanize.formatNumber(analysis?.rot, 2)} %</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.text}>Maduro</Text>
                <Text style={styles.text}>{Humanize.formatNumber(analysis?.mature, 2)} %</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.text}>Latex</Text>
                <Text style={styles.text}>{Humanize.formatNumber(analysis?.latex, 2)} %</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.text}>Queresa</Text>
                <Text style={styles.text}>{Humanize.formatNumber(analysis?.queresa, 2)} %</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.text}>Picaduras de insectos</Text>
                <Text style={styles.text}>{Humanize.formatNumber(analysis?.insect_bite, 2)} %</Text>
            </View>
            <View style={styles.section}>
                    <Text style={styles.text}>Sobre maduro</Text>
                <Text style={styles.text}>{Humanize.formatNumber(analysis?.overripe, 2)} %</Text>
            </View>


        </View>
    </View>);

};

export default AnalysisMango;
