import React, {useEffect, useState} from 'react';
import Layout from "../../hocs/Layout";
import TablePT from "../../components/report_pt/TablePT";
import {useDispatch, useSelector} from "react-redux";
import {get_report_pt_mango, get_report_pt_pineapple} from "../../redux/actions/report";
import Filter from "../../components/report_pt/Filter";

const ReportPTPineapple = () => {
    const dispatch= useDispatch();
    const [params, setParams] = useState({year: '', month: ''});

    const data=useSelector(state=>state.Report.pineapple);
    useEffect(() => {
        dispatch(get_report_pt_pineapple(params))
    }, []);
    const columns = ['', 'Semana', 'Mes','Guia remitente','Factura', 'Fecha de ingreso', 'Fecha de producción', 'Variedad', 'Condición', 'Lote', 'Proveedor', 'Procedencia', 'Kg guia', 'KG neto recibido', 'Descuento', 'Kg aprovechables',
        'Kg procesados', '% Deshidratación', 'Kd descarte', '% Descarte', 'Kg MP neta', 'Kg corona', '% Corona','Kg cáscara y tronco','% Cáscara y tronco','Kg jugo/pulpa','% Jugo/pulpa', 'Merma', '% Merma', 'Kg habilitados', '% Habilitado', 'Kg PT', 'Rings', '1/8', '1/16', 'Rings', '1/8', '1/16', '% Rendimiento pagados','% Rendimiento neto', '% Objetivo'
    ]
    const header = <tr>
        <th className={"text-center bg-gray-300 text-white px-2 py-2 "} colSpan={16}>RECEPCIÓN MP</th>
        <th className={"text-center bg-orange-300 text-white px-2 py-2 "} colSpan={15}>ACONDICIONADO</th>
        <th className={"text-center bg-red-300  text-white px-2 py-2 "} colSpan={1}>Total</th>
        <th className={"text-center bg-yellow-400 text-white px-2 py-2 "} colSpan={3}>RETAIL</th>
        <th className={"text-center bg-green-400 text-white px-2 py-2 "} colSpan={3}>GRANEL</th>
    </tr>
    return (<Layout>
        <Filter action={get_report_pt_mango} setParams={setParams}/>
        <TablePT header={header} columns={columns} data={data?data:[]}/>
    </Layout>);
};

export default ReportPTPineapple;