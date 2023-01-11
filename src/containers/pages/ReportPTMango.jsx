import React, {useEffect, useState} from 'react';
import Layout from "../../hocs/Layout";
import TablePT from "../../components/report_pt/TablePT";
import {useDispatch, useSelector} from "react-redux";
import {get_report_pt_mango} from "../../redux/actions/report";
import Filter from "../../components/report_pt/Filter";
import Modal from "../../components/util/Modal";
import Form from "../../components/home/Form";
import FormPTMango from "../../components/report_pt/FormMango";

const ReportPTMango = () => {
    const data=useSelector(state=>state.Report.mango);
    const [params, setParams] = useState({year: '', month: ''});

    /*MODAL*/
    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    let [isOpen, setIsOpen] = useState(false)


    const openModal = () => {
        setIsOpen((prev) => !prev)
    }

    const dispatch= useDispatch();

    useEffect(() => {
        dispatch(get_report_pt_mango(params))
    }, []);

    const columns = ['', 'Semana', 'Mes','Guia remitente','Factura', 'Fecha de ingreso', 'Fecha de producción', 'Variedad', 'Condición', 'Lote', 'Proveedor', 'Procedencia', 'Kg guia', 'KG neto recibido', 'Descuento', 'Kg aprovechables',
        'Kg procesados', '% Deshidratación', 'Kg descarte', '% Descarte', 'Kg MP neta', 'Kg cáscara y pepa', '% Cáscara y pepa', 'Merma', '% Merma', 'Kg habilitados', '% Habilitado', 'Kg PT', 'Slices', 'Cachete', 'Chunks','Cubos', 'Slices', 'Cachete', 'Chunks','Cubos', 'Recuperable', '% Rendimiento pagados','% Rendimiento neto', '% Objetivo'
    ]

     const handleOpenModalEdit = (data) => {
        setTitle(data?.lot)
        setIsOpen(true)
        setContent(<FormPTMango data={data} params={params} close={openModal} id={data?.id}/>)
    }

    const header = <tr>
        <th className={"text-center bg-gray-300 text-white px-2 py-2 "} colSpan={16}>RECEPCIÓN MP</th>
        <th className={"text-center bg-orange-300 text-white px-2 py-2 "} colSpan={11}>ACONDICIONADO</th>
        <th className={"text-center bg-red-300  text-white px-2 py-2 "} colSpan={1}>Total</th>
        <th className={"text-center bg-yellow-400 text-white px-2 py-2 "} colSpan={4}>RETAIL</th>
        <th className={"text-center bg-green-400 text-white px-2 py-2 "} colSpan={4}>GRANEL</th>
    </tr>
    return (<Layout>
        <Modal isOpen={isOpen} close={openModal} title={title} children={content}/>
        <Filter action={get_report_pt_mango} setParams={setParams}/>
        <TablePT update={handleOpenModalEdit} header={header} columns={columns} data={data?data:[]}/>
    </Layout>);
};

export default ReportPTMango;
