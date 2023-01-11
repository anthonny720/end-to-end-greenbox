import React, {useEffect, useState} from 'react';
import Layout from "../../hocs/Layout";
import {Tab} from "@headlessui/react";
import {map} from 'lodash'
import KPIPineapple from "../../components/planning/KPIPineapple";
import KPIMango from "../../components/planning/KPIMango";
import KPIAguaymanto from "../../components/planning/KPIAguaymanto";
import {useDispatch, useSelector} from "react-redux";
import Filter from "../../components/planning/Filter";
import Modal from "../../components/util/Modal";
import FormPlanningPineapple from "../../components/planning/FormPineapple";
import FormPlanningMango from "../../components/planning/FormMango";
import FormPlanningAguaymanto from "../../components/planning/FormAguaymanto";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const KPI = () => {
    let [categories] = useState(["Piña", 'Mango', 'Aguaymanto'])
    const dispatch = useDispatch();
    const [params, setParams] = useState({year: '', week: ''});

    const kpi_pineapple = useSelector(state => state.Planning.pineapple)
    const kpi_mango = useSelector(state => state.Planning.mango)
    const kpi_aguaymanto = useSelector(state => state.Planning.aguaymanto)

    /*MODAL*/
    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    let [isOpen, setIsOpen] = useState(false)

    const openModal = () => {
        setIsOpen((prev) => !prev)
    }

    const handleOpenModalUpdatePineapple = (row) => {
        setTitle(`${row.date}`)
        setIsOpen(true)
        setContent(<FormPlanningPineapple data={row} params={params}
                                          close={openModal}/>)
    }

    const handleOpenModalUpdateMango = (row) => {
        setTitle(`${row.date}`)
        setIsOpen(true)
        setContent(<FormPlanningMango data={row} params={params}
                                      close={openModal}/>)
    }

    const handleOpenModalUpdateAguaymanto = (row) => {
        setTitle(`${row.date}`)
        setIsOpen(true)
        setContent(<FormPlanningAguaymanto data={row} params={params}
                                           close={openModal}/>)
    }


    useEffect(() => {
        dispatch({type: 'GET_KPI_PINEAPPLE_FAIL'})
        dispatch({type: 'GET_KPI_MANGO_FAIL'})
        dispatch({type: 'GET_KPI_AGUAYMANTO_FAIL'})
    }, []);


    return (<Layout>
        <Modal isOpen={isOpen} close={openModal} title={title} children={content}/>
        <Filter ft={setParams}/>
        <Tab.Group>
            <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
                {map(categories, category => (<Tab
                    key={category}
                    className={({selected}) => classNames('w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-white', 'ring-white ring-opacity-60 ring-offset-2 ring-offset-green-400 focus:outline-none focus:ring-2', selected ? 'bg-[#26d07d] shadow' : 'text-white    hover:bg-white/[0.12] hover:text-white')}
                >
                    {category}
                </Tab>))}
            </Tab.List>
            <Tab.Panels className="mt-2">
                <Tab.Panel

                    className={classNames('rounded-xl bg-white p-3', 'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2')}
                >
                    <KPIPineapple update={handleOpenModalUpdatePineapple} data={kpi_pineapple ? kpi_pineapple : []}
                                  week={params.week}/>

                </Tab.Panel>

                <Tab.Panel

                    className={classNames('rounded-xl bg-white p-3', 'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2')}
                >
                    <KPIMango update={handleOpenModalUpdateMango} data={kpi_mango ? kpi_mango : []} week={params.week}/>

                </Tab.Panel>

                <Tab.Panel

                    className={classNames('rounded-xl bg-white p-3', 'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2')}
                >
                    <KPIAguaymanto update={handleOpenModalUpdateAguaymanto} data={kpi_aguaymanto ? kpi_aguaymanto : []}
                                   week={params.week}/>
                </Tab.Panel>


            </Tab.Panels>
        </Tab.Group>
    </Layout>);
};

export default KPI;
