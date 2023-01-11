import React from 'react';
import {useFormik} from "formik";
import * as Yup from "yup";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import {map} from "lodash";
import {useDispatch, useSelector} from "react-redux";
import {add_lots, get_cut, get_variety, update_lot} from "../../redux/actions/commercial";


const Form = ({
                  data,
                  close,
                  products,
                  group,
                  type_inf,
                  presentation,
                  packaging,
                  packing,
                  clients,
                  maquila,
                  fcl
              }) => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.Auth.user);
    const variety = useSelector(state => state.Commercial.variety);
    const cut = useSelector(state => state.Commercial.cut);

    console.log(data)


    /*Formik*/
    const formik = useFormik({
        initialValues: initialValues(data),
        validationSchema: Yup.object(newSchema()),
        validateOnChange: true,
        onSubmit: (form) => {
            data ? dispatch(update_lot(data.slug, form)) : dispatch(add_lots(form))
            close()
        }
    })
    return (<div className="w-full z-20">
        <form className="bg-white px-8 pt-6 pb-8 mb-4">
            {user && user !== undefined && user !== null && user.get_role_name === 'Logistica' &&
                <div className={'grid grid-cols-2 gap-2'}>
                    {/*FCL*/}
                    <div>
                        <p className={`${formik.errors.fcl ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>FCL/LCL:</p>
                        <select value={formik.values.fcl}
                                onChange={(value) => formik.setFieldValue('fcl', value.target.value)}
                                className="scrollbar-hide form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300       rounded transition       ease-in-out
                    m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                aria-label="Default select example">
                            <option value={null}></option>
                            {fcl !== null && map(fcl, p => (
                                <option key={p.id} value={p.id}>{p.reception_short_name}</option>))}
                        </select>
                    </div>
                    {/*Client*/}
                    <div>
                        <p className={`${formik.errors.client ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>Cliente:</p>
                        <select value={formik.values.client}
                                onChange={(value) => formik.setFieldValue('client', value.target.value)}
                                className="scrollbar-hide form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300       rounded transition       ease-in-out
                    m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                aria-label="Default select example">
                            <option value={null}></option>
                            {clients !== null && map(clients, p => (<option key={p.id} value={p.id}>{p.name}</option>))}
                        </select>
                    </div>

                    {/*Group*/}
                    <div>
                        <p className={`${formik.errors.group ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>Grupo:</p>
                        <select value={formik.values.group}
                                onChange={(value) => formik.setFieldValue('group', value.target.value)}
                                className="scrollbar-hide mt-4 form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300       rounded transition       ease-in-out
                    m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                aria-label="Default select example">
                            <option value={null}></option>
                            {group !== null && map(group, g => (<option key={g.id} value={g.id}>{g.name}</option>))}
                        </select>
                    </div>
                    {/*Products*/}
                    <div>
                        <p className={`${formik.errors.product ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>Materia
                            prima:</p>
                        <select value={formik.values.product}
                                onChange={(value) => {
                                    formik.setFieldValue('product', value.target.value)
                                    formik.setFieldValue('cut', '')
                                    formik.setFieldValue('variety', '')
                                    dispatch(get_cut(value.target.value))
                                    dispatch(get_variety(value.target.value))
                                }}
                                className="scrollbar-hide mt-4 form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300       rounded transition       ease-in-out
                    m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                aria-label="Default select example">
                            <option value={null}></option>
                            {products !== null && map(products, product => (
                                <option key={product.id} value={product.id}>{product.name}</option>))}
                        </select>
                    </div>

                    {/*Cut*/}
                    {cut && cut !== null && cut !== undefined && cut.length > 0 &&
                        <div>
                            <p className={`${formik.errors.cut ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>Corte:</p>
                            <select value={formik.values.cut}
                                    onChange={(value) => formik.setFieldValue('cut', value.target.value)}
                                    className="scrollbar-hide mt-4 form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300       rounded transition       ease-in-out
                    m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    aria-label="Default select example">
                                <option value={null}></option>
                                {cut !== null && map(cut, c => (<option key={c.id} value={c.id}>{c.name}</option>))}
                            </select>
                        </div>
                    }

                    {/*Variety*/}
                    {variety && variety !== null && variety !== undefined && variety.length > 0 &&
                        <div>
                            <p className={`${formik.errors.variety ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>Variedad:</p>
                            <select value={formik.values.variety}
                                    onChange={(value) => formik.setFieldValue('variety', value.target.value)}
                                    className="scrollbar-hide mt-4 form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300       rounded transition       ease-in-out
                    m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    aria-label="Default select example">
                                <option value={null}></option>
                                {variety !== null && map(variety, v => (
                                    <option key={v.id} value={v.id}>{v.name}</option>))}
                            </select>
                        </div>
                    }
                    {/*Presentation*/}
                    <div>
                        <p className={`${formik.errors.presentation ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>Presentación:</p>
                        <select value={formik.values.presentation}
                                onChange={(value) => formik.setFieldValue('presentation', value.target.value)}
                                className="scrollbar-hide mt-4 form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300       rounded transition       ease-in-out
                    m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                aria-label="Default select example">
                            <option value={null}></option>
                            {presentation !== null && map(presentation, p => (
                                <option key={p.id} value={p.id}>{p.name}</option>))}
                        </select>
                    </div>

                    {/*Packaging*/}
                    <div>
                        <p className={`${formik.errors.packing ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>Embalaje:</p>
                        <select value={formik.values.packing}
                                onChange={(value) => formik.setFieldValue('packing', value.target.value)}
                                className="scrollbar-hide mt-4 form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300       rounded transition       ease-in-out
                    m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                aria-label="Default select example">
                            <option value={null}></option>
                            {packaging !== null && map(packaging, p => (
                                <option key={p.id} value={p.id}>{p.name}</option>))}
                        </select>
                    </div>
                    {/*Packing*/}
                    <div>
                        <p className={`${formik.errors.packaging ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>Empaque:</p>
                        <select value={formik.values.packaging}
                                onChange={(value) => formik.setFieldValue('packaging', value.target.value)}
                                className="scrollbar-hide mt-4 form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300       rounded transition       ease-in-out
                    m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                aria-label="Default select example">
                            <option value={null}></option>
                            {packing !== null && map(packing, p => (<option key={p.id} value={p.id}>{p.name}</option>))}
                        </select>
                    </div>
                    {/*Lote*/}
                    <div>
                        <p className={`${formik.errors.name ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>Lote:</p>
                        <input type={"text"} maxLength={50}
                               className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50 "
                               value={`${formik.values.name}`}
                               onChange={text => formik.setFieldValue('name', text.target.value)}/>
                    </div>
                    {/*Boxes*/}
                    <div>
                        <p className={`${formik.errors.boxes ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>N°
                            cajas:</p>
                        <input type={"text"} maxLength={50}
                               className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50 "
                               value={`${formik.values.boxes}`}
                               onChange={text => formik.setFieldValue('boxes', text.target.value)}/>
                    </div>
                    {/*Bags*/}
                    <div>
                        <p className={`${formik.errors.bags ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>N°
                            bolsas:</p>
                        <input type={"text"} maxLength={50}
                               className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50 "
                               value={`${formik.values.bags}`}
                               onChange={text => formik.setFieldValue('bags', text.target.value)}/>
                    </div>
                    {/*Provider*/}
                    <div>
                        <p className={`${formik.errors.provider ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>Proveedor:</p>
                        <select value={formik.values.provider}
                                onChange={(value) => formik.setFieldValue('provider', value.target.value)}
                                className="scrollbar-hide mt-4 form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300       rounded transition       ease-in-out
                    m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                aria-label="Default select example">
                            <option value={null}></option>
                            {maquila !== null && map(maquila, p => (
                                <option key={p.id} value={p.id}>{p.name}</option>))}
                        </select>
                    </div>

                    <div>
                        <p className={`${formik.errors.production_date ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>Fecha
                            Producción:</p>
                        <input type={"date"}
                               className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50 "
                               value={`${formik.values.production_date}`}
                               onChange={text => formik.setFieldValue('production_date', text.target.value)}/>
                    </div>
                    <div>
                        <p className={`${formik.errors.expiring_date ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>Fecha
                            vencimiento:</p>
                        <input type={"date"}
                               className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50 "
                               value={`${formik.values.expiring_date}`}
                               onChange={text => formik.setFieldValue('expiring_date', text.target.value)}/>
                    </div>
                    {/*Observation*/}
                    <div className={"col-span-2"}>
                        <p className={`${formik.errors.observation ? "text-red-500" : " text-base mt-4 font-medium leading-none text-gray-800"}`}>
                            Observaciones:</p>
                        <input type={"text"} maxLength={50}
                               className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50 "
                               value={`${formik.values.observation}`}
                               onChange={text => formik.setFieldValue('observation', text.target.value)}/>
                    </div>

                </div>
            }

            {user && user !== undefined && user !== null && user.get_role_name === 'Calidad' &&
                <div className={'grid grid-cols-2 gap-2'}>
                    {/*Type*/}
                    <div className={"col-span-2"}>
                        <p className={`${formik.errors.type_inf ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>Certificación:</p>
                        <select value={formik.values.type_inf}
                                onChange={(value) => formik.setFieldValue('type_inf', value.target.value)}
                                className="scrollbar-hide form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300       rounded transition       ease-in-out
                    m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                aria-label="Default select example">
                            <option value={null}></option>
                            {type_inf !== null && map(type_inf, t => (
                                <option key={t.id} value={t.id}>{t.name}</option>))}
                        </select>
                    </div>
                    <div>
                        <p className={`${formik.errors.fosetyl ? "text-red-500" : " text-base mt-4 font-medium leading-none text-gray-800"}`}>
                            Fosetyl %:</p>
                        <input type={"text"} maxLength={5}
                               className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50 "
                               value={`${formik.values.fosetyl}`}
                               onChange={text => formik.setFieldValue('fosetyl', text.target.value)}/>
                    </div>
                    <div>
                        <p className={`${formik.errors.pesticides ? "text-red-500" : " text-base mt-4 font-medium leading-none text-gray-800"}`}>
                            Pesticidas %:</p>
                        <input type={"text"} maxLength={5}
                               className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50 "
                               value={`${formik.values.pesticides}`}
                               onChange={text => formik.setFieldValue('pesticides', text.target.value)}/>
                    </div>
                </div>}

            {user && user !== undefined && user !== null && user.get_role_name === 'Operaciones' &&
                <div>
                    <p className={`${formik.errors.objective ? "text-red-500" : " text-base mt-4 font-medium leading-none text-gray-800"}`}>
                        Objetivo kg:</p>
                    <input type={"text"} maxLength={9}
                           className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50 "
                           value={`${formik.values.objective}`}
                           onChange={text => formik.setFieldValue('objective', text.target.value)}/>
                </div>
            }


            <div className="w-full flex justify-center">
                <button onClick={formik.handleSubmit} type="button"
                        className="max-w-xl mx-2 my-2 bg-green-300 transition duration-150 ease-in-out focus:outline-none hover:bg-green-100 rounded-full text-white font-bold px-6 py-2 text-xs">
                    <FontAwesomeIcon icon={faPaperPlane}/>
                </button>
            </div>
        </form>

    </div>);
};
const initialValues = (data) => {
    return {
        product: data?.product || '',
        objective: data?.objective || '',
        group: data?.group || '',
        type_inf: data?.type_inf || '',
        cut: data?.cut || '',
        presentation: data?.presentation || '',
        packaging: data?.packaging || '',
        packing: data?.packing || '',
        provider: data?.provider || '',
        variety: data?.variety || '',
        name: data?.name || '',
        production_date: data?.production_date || '',
        expiring_date: data?.expiring_date || '',
        boxes: data?.boxes || 0,
        bags: data?.bags || 0,
        fcl: data?.fcl || '',
        observation: data?.observation || '',
        pesticides: data?.pesticides || '',
        fosetyl: data?.fosetyl || '',
        client: data?.client || '',


    }
}
const newSchema = () => {
    return {
        product: Yup.number().min(1).required(),
        objective: Yup.number().min(0),
        group: Yup.number().min(1).required(),
        type_inf: Yup.number().min(1),
        cut: Yup.number().min(1),
        client: Yup.number().min(1),
        presentation: Yup.number().min(1).required(),
        packaging: Yup.number().min(1),
        packing: Yup.number().min(1),
        variety: Yup.number().min(1),
        provider: Yup.number().min(1),
        name: Yup.string().min(1).required(),
        production_date: Yup.date().required(),
        expiring_date: Yup.date().required(),
        boxes: Yup.number().integer(),
        bags: Yup.number().integer(),
        fcl: Yup.number().min(1),
        observation: Yup.string(),
        pesticides: Yup.number().min(0).max(100),
        fosetyl: Yup.number().min(0).max(100),
    }
}
export default Form;