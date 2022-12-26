import React from 'react';
import {useFormik} from "formik";
import {map} from "lodash";
import {useDispatch, useSelector} from "react-redux";
import {get_cut, get_family, get_lots} from "../../redux/actions/commercial";

const Filter = ({
                    set, clients, products, family, group, fcl, type_inf
                }) => {
    const dispatch = useDispatch();
    const cut = useSelector(state => state.Commercial.cut);


    /*Formik*/
    const formik = useFormik({
        initialValues: initialValues(), validateOnChange: true, onSubmit: (form) => {
            dispatch(get_lots(form))
            dispatch(get_family(form));
            set({family: form.family, client: form.client, product: form.product, group: form.group, fcl: form.fcl})
        }
    })
    return (<form className="w-full  shadow p-2 rounded-t bg-white" onChange={formik.submitForm}>

        <div className="flex items-center justify-between  gap-2 ">
            <div>
                <p className={`${formik.errors.client ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>Cliente:</p>
                <select value={formik.values.client}
                        onChange={(value) => formik.setFieldValue('client', value.target.value)}
                        className="scrollbar-hide mt-4 form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300       rounded transition       ease-in-out
                    m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none text-xs"
                        aria-label="Default select example">
                    <option value={''}>Todos</option>
                    <option value={"sn"}>Sin cliente</option>
                    {clients !== null && map(clients, p => (<option key={p.id} value={p.id}>{p.name}</option>))}
                </select>
            </div>
            <div>
                <p className={`${formik.errors.product ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>Materia
                    Prima:</p>
                <select value={formik.values.product}
                        onChange={(value) => {
                            formik.setFieldValue('product', value.target.value)
                            dispatch(get_cut(value.target.value))
                        }}
                        className="scrollbar-hide mt-4 form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300       rounded transition       ease-in-out
                    m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none text-xs"
                        aria-label="Default select example">
                    <option value={''}>Todos</option>
                    {products !== null && map(products, p => (<option key={p.id} value={p.id}>{p.name}</option>))}
                </select>
            </div>
            {cut && cut !== null && cut !== undefined && cut.length > 0 && <div>
                <p className={`${formik.errors.cut ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>Corte:</p>
                <select value={formik.values.cut}
                        onChange={(value) => formik.setFieldValue('cut', value.target.value)}
                        className="scrollbar-hide mt-4 form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300       rounded transition       ease-in-out
                    m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none text-xs"
                        aria-label="Default select example">
                    <option value={''}>Todos</option>
                    {cut !== null && map(cut, p => (<option key={p.id} value={p.id}>{p.name}</option>))}
                </select>
            </div>}
            <div>
                <p className={`${formik.errors.family ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>Familia:</p>
                <select value={formik.values.family}
                        onChange={(value) => formik.setFieldValue('family', value.target.value)}
                        className="scrollbar-hide mt-4 form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300       rounded transition       ease-in-out
                    m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none text-xs"
                        aria-label="Default select example">
                    <option value={''}>Todos</option>
                    {family !== null && map(family, p => (<option key={p.id} value={p.id}>{p.name}</option>))}
                </select>
            </div>
            <div>
                <p className={`${formik.errors.group ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>Grupo:</p>
                <select value={formik.values.group}
                        onChange={(value) => formik.setFieldValue('group', value.target.value)}
                        className="scrollbar-hide mt-4 form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300       rounded transition       ease-in-out
                    m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none text-xs"
                        aria-label="Default select example">
                    <option value={''}>Todos</option>
                    {group !== null && map(group, p => (<option key={p.id} value={p.id}>{p.name}</option>))}
                </select>
            </div>
            <div>
                <p className={`${formik.errors.fcl ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>FCL/LCL:</p>
                <select value={formik.values.fcl}
                        onChange={(value) => formik.setFieldValue('fcl', value.target.value)}
                        className="scrollbar-hide mt-4 form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300       rounded transition       ease-in-out
                    m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none text-xs"
                        aria-label="Default select example ">
                    <option value={''}>Todos</option>
                    {fcl !== null && map(fcl, p => (<option key={p.id} value={p.id}>{p.reception_short_name}</option>))}
                </select>
            </div>
            <div>
                <p className={`${formik.errors.type_inf ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>Certificación:</p>
                <select value={formik.values.type_inf}
                        onChange={(value) => formik.setFieldValue('type_inf', value.target.value)}
                        className="scrollbar-hide mt-4 form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300       rounded transition       ease-in-out
                    m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none text-xs"
                        aria-label="Default select example">
                    <option value={''}>Todos</option>
                    {type_inf !== null && map(type_inf, p => (<option key={p.id} value={p.id}>{p.name}</option>))}
                </select>
            </div>


        </div>


    </form>);
};
const initialValues = () => {
    return {
        family: '', client: '', product: '', group: '', fcl: '', type_inf: '', cut: ''
    }
}
export default Filter;