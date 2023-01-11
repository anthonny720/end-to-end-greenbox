import React, {useEffect, useState} from 'react';
import Layout from "../../hocs/Layout";
import SummaryStock from "../../components/commercial/Summary";
import {useDispatch, useSelector} from "react-redux";
import {
    delete_lot,
    get_condition,
    get_family,
    get_group,
    get_lots,
    get_lots_page,
    get_packaging,
    get_packing,
    get_presentation,
    get_products,
    get_type
} from "../../redux/actions/commercial";
import Table from "../../components/commercial/Table";
import SetPagination from "../../components/util/Pagination";
import Modal from "../../components/util/Modal";
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Form from "../../components/commercial/Form";
import {MySwal} from "../../helpers/util";
import {get_full_packing_list} from "../../redux/actions/logistic";
import {get_business_maquila, get_full_clients} from "../../redux/actions/business_partners";
import Filter from "../../components/commercial/Filter";
import Skeleton from "react-loading-skeleton";

const Commercial = () => {
    const dispatch = useDispatch();
    const [params, setParams] = useState({family: '', client: '', product: '', group: '', fcl: '', cut: ''})
    const products = useSelector(state => state.Commercial.products);
    const clients = useSelector(state => state.Business.full_clients);
    const count = useSelector(state => state.Commercial.count);
    const lots = useSelector(state => state.Commercial.lots);
    const family = useSelector(state => state.Commercial.family);
    const group = useSelector(state => state.Commercial.group);
    const type_inf = useSelector(state => state.Commercial.type_inf);
    const condition = useSelector(state => state.Commercial.condition);
    const presentation = useSelector(state => state.Commercial.presentation);
    const packaging = useSelector(state => state.Commercial.packing);
    const packing = useSelector(state => state.Commercial.packaging);
    const fcl = useSelector(state => state.Logistic.full_packing_list);
    const user = useSelector(state => state.Auth.user);
    const maquila = useSelector(state => state.Business.maquila);


    useEffect(() => {
        dispatch({type: 'GET_VARIETY_COMMERCIAL_FAIL'})
        dispatch({type: 'GET_CUT_COMMERCIAL_FAIL'})
        dispatch(get_products());
        dispatch(get_family(params));
        dispatch(get_group());
        dispatch(get_type());
        dispatch(get_presentation());
        dispatch(get_packaging());
        dispatch(get_packing());
        dispatch(get_business_maquila());
        dispatch(get_condition());
        dispatch(get_full_packing_list());
        dispatch(get_lots(params));
        dispatch(get_full_clients());
    }, [dispatch]);

    /*MODAL*/
    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    let [isOpen, setIsOpen] = useState(false)


    const openModal = () => {
        setIsOpen((prev) => !prev)
        dispatch({type: 'GET_CUT_COMMERCIAL_FAIL'})
    }


    const handleOpenModalAdd = () => {
        setTitle("Registrar")
        setIsOpen(true)
        setContent(<Form products={products ? products : []} close={openModal} packaging={packaging ? packaging : []}
                         group={group ? group : []}
                         condition={condition ? condition : []}
                         family={family ? family : []} packing={packing ? packing : []} fcl={fcl ? fcl : []}
                         clients={clients ? clients : []}
                         presentation={presentation ? presentation : []}
                         maquila={maquila ? maquila : []}
                         type_inf={type_inf ? type_inf : []}/>)
    }
    const handleOpenModalUpdate = (inf) => {
        setTitle(`${inf?.name}`)
        setIsOpen(true)
        setContent(<Form products={products ? products : []} close={openModal} packaging={packaging ? packaging : []}
                         clients={clients ? clients : []}
                         group={group ? group : []}
                         condition={condition ? condition : []}
                         family={family ? family : []} packing={packing ? packing : []}
                         presentation={presentation ? presentation : []} fcl={fcl ? fcl : []}
                         maquila={maquila ? maquila : []}
                         type_inf={type_inf ? type_inf : []} data={inf}/>)
    }

    const handleDelete = (slug) => {
        MySwal.fire({
            title: '¿Desea eliminar este registro?',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            confirmButtonColor: '#d33',
            confirmButtonText: 'Eliminar'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(delete_lot(slug));
            }
        })
    }
    return (<Layout>
        <Modal isOpen={isOpen} close={openModal} title={title} children={content}/>

        <SummaryStock family={family}/>
        <div className={"w-full"}>
            {user && user !== undefined && user !== null && user.get_role_name === 'Logistica' &&
                <FontAwesomeIcon icon={faPlusCircle} className={"mx-[50%] text-red-400 text-xl cursor-pointer"}
                                 onClick={handleOpenModalAdd}/>
            }
            {
                clients && clients !== undefined && clients !== null &&
                products && products !== undefined && products !== null &&
                family && family !== undefined && family !== null &&
                group && group !== undefined && group !== null &&
                type_inf && type_inf !== undefined && type_inf !== null &&
                fcl && fcl !== undefined && fcl !== null ?
                    <Filter clients={clients}
                            type_inf={type_inf}
                            products={products}
                            family={family}
                            group={group}
                            fcl={fcl}
                            set={setParams}
                    />
                    :
                    <Skeleton height={100}/>
            }

            <Table data={lots} update={handleOpenModalUpdate} remove={handleDelete}/>
            <SetPagination count={count} get_data_page={get_lots_page} data={lots ? lots : []} params={params}/>
        </div>

    </Layout>);
};

export default Commercial;
