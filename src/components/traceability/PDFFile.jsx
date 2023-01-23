import React from "react";
import {Document, Image, Page, PDFViewer, StyleSheet, Text, View} from "@react-pdf/renderer";
import Logo from '../../assets/logo.jpg'
import General from "./General";

const styles = StyleSheet.create({
    image: {
        width: 35,
        borderRadius:10,
        marginVertical: 15,
        marginHorizontal: 50,
    },
    body:{
        marginVertical: 15,
        marginHorizontal: 50,
    }
});
const PDFFile = ({acopio,report_mp}) => {
    return (
        <PDFViewer style={{width: "100%", height: "100%"}}>
            <Document style={styles.body}>
                <Page size={"A4"}>
                    <View style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                        <Image style={styles.image} src={Logo}/>
                        <Text style={{fontWeight: "ultrabold", textAlign: "center", fontSize: "20",fontFamily: "Times-Roman",marginLeft:25}}>REGISTRO DE
                            TRAZABILIDAD</Text>
                    </View>
                    <General acopio={acopio} report_mp={report_mp}/>
                </Page>
            </Document>
        </PDFViewer>
    );
};

export default PDFFile;
