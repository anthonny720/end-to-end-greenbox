import React, {useEffect, useState} from 'react';
import Layout from "../../hocs/Layout";
import Cards from "../../components/commercial/Cards";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {get_kardex, get_lot} from "../../redux/actions/commercial";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import {setAlert} from "../../redux/actions/alert";
import FullCalendar from "@fullcalendar/react";
import FormKardex from "../../components/commercial/FormKardex";
import Modal from "../../components/util/Modal";
import Humanize from "humanize-plus";

const CommercialDetail = () => {
    const {slug} = useParams();
    const lot = useSelector(state => state.Commercial.lot);
    const events = useSelector(state => state.Commercial.events);
    const user = useSelector(state => state.Auth.user);
    const navigate = useNavigate();

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(get_lot(slug));
        dispatch(get_kardex(slug));
    }, [])


    if (user && user.get_role_name !== 'Logistica') {
        dispatch(setAlert('No tienes permisos para acceder a esta sección', 'error'));

        navigate('/commercial');
    }

    /*MODAL*/
    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    let [isOpen, setIsOpen] = useState(false)

    const openModal = () => {
        setIsOpen((prev) => !prev)
    }
    const handleOpenModalAdd = (date) => {
        setTitle("Kardex")
        setIsOpen(true)
        setContent(<FormKardex lot={lot?.id} date={date} close={openModal} slug={slug}/>)
    }

    return (<Layout>
        <Modal isOpen={isOpen} close={openModal} title={title} children={content}/>

        <Cards data={lot}/>
        <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            selectable={true}
            initialView="dayGridMonth"
            headerToolbar={{center: "title", left: "prev", right: "next,today"}}
            events={events !== null && events && events}
            select={function (start) {
                handleOpenModalAdd(start.startStr)
            }}
            eventClick={function (info) {
                dispatch(setAlert(info.event.title, "info"))
            }}
        />
        <div className={"flex w-full gap-3 mt-4 justify-center"}>


            <div className="bg-green-200 p-2 h-8 w-max mb-4 md:mb-0 rounded-md flex items-center justify-center">
                <div className="flex items-center">
                    <div className="h-1 w-1 rounded-full bg-white mr-1"/>
                    <span
                        className="text-xs text-black font-normal">Ingreso total: {Humanize.formatNumber(lot?.summary?.input, 2)}</span>
                </div>
            </div>
            <div className="bg-red-200 p-2 h-8 w-max mb-4 md:mb-0 rounded-md flex items-center justify-center">
                <div className="flex items-center">
                    <div className="h-1 w-1 rounded-full bg-white mr-1"/>
                    <span
                        className="text-xs text-black font-normal">Ingreso mes actual: {Humanize.formatNumber(lot?.summary?.input_month, 2)}</span>
                </div>
            </div>
            <div className="bg-green-200 p-2 h-8 w-max mb-4 md:mb-0 rounded-md flex items-center justify-center">
                <div className="flex items-center">
                    <div className="h-1 w-1 rounded-full bg-white mr-1"/>
                    <span
                        className="text-xs text-black font-normal">Salida total: {Humanize.formatNumber(lot?.summary?.output, 2)}</span>
                </div>
            </div>
            <div className="bg-red-200 p-2 h-8 w-max mb-4 md:mb-0 rounded-md flex items-center justify-center">
                <div className="flex items-center">
                    <div className="h-1 w-1 rounded-full bg-white mr-1"/>
                    <span
                        className="text-xs text-black font-normal">Salida mes actual: {Humanize.formatNumber(lot?.summary?.output_month, 2)}</span>
                </div>
            </div>
        </div>
    </Layout>);
};

export default CommercialDetail;
