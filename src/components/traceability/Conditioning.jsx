import React from 'react';
import {StyleSheet, Text, View} from "@react-pdf/renderer";
import {map} from "lodash";
import Humanize from "humanize-plus";

const styles = StyleSheet.create({
    text1: {
        fontSize: 10,
        textAlign: "center",
        fontFamily: "Times-Roman",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "black",
        padding: "3px",
        width: "9%",
        fontWeight: "bold"
    }, view: {
        width: "100%", marginHorizontal: 50

    }, section: {
        display: "flex", flexDirection: "row"
    }
});
const Conditioning = ({conditioning}) => {
    return (<View style={styles.view}>
        <Text style={{fontSize: "10", fontFamily: "Times-Roman"}}>4) CONTROL DE ACONDICIONADO</Text>
        <View style={{fontSize: "10", marginTop: 4}}>
            <View style={styles.section}>
                <Text style={styles.text1}>Fecha de proceso</Text>
                <Text style={styles.text1}>Kg</Text>
                <Text style={styles.text1}>Cloro en red</Text>
                <Text style={styles.text1}>Cloro en tina</Text>
                <Text style={styles.text1}>Brix</Text>
                <Text style={styles.text1}>pH</Text>
                <Text style={styles.text1}>Espesor</Text>
                <Text style={styles.text1}>Apariencia</Text>
                <Text style={styles.text1}>Sabor</Text>
            </View>
            {map(conditioning, data => {
                return (<View style={styles.section}>
                        <Text style={styles.text1}>{new Date(data?.process_date).toLocaleDateString('es-PE', {
                            timeZone: 'UTC',
                        })}</Text>
                        <Text style={styles.text1}>{Humanize.formatNumber(data?.kg_processed, 2)}</Text>
                        <Text style={styles.text1}>{Humanize.formatNumber(data?.chlorine, 2)}</Text>
                        <Text style={styles.text1}>{Humanize.formatNumber(data?.disinfection, 0)}</Text>
                        <Text style={styles.text1}>{Humanize.formatNumber(data?.brix, 2)}</Text>
                        <Text style={styles.text1}>{Humanize.formatNumber(data?.ph, 2)}</Text>
                        <Text style={styles.text1}>{Humanize.formatNumber(data?.width, 2)}</Text>
                        <Text style={styles.text1}>{Humanize.formatNumber(data?.appearance, 0)}</Text>
                        <Text style={styles.text1}>{Humanize.formatNumber(data?.flavor, 0)}</Text>
                    </View>)
            })}
            <Text style={{fontSize: 10, fontFamily: "Times-Roman",marginTop:4}}>Observaciones</Text>
            <Text style={{fontSize: 10, fontFamily: "Times-Roman",}}>
                __________________________________________________________________________________________________
                __________________________________________________________________________________________________
                __________________________________________________________________________________________________
                __________________________________________________________________________________________________
                __________________________________________________________________________________________________
                __________________________________________________________________________________________________
                __________________________________________________________________________________________________


            </Text>
        </View>
    </View>)
};

export default Conditioning;
