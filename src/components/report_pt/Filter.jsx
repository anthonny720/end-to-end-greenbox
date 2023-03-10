import React from 'react';
import {useFormik} from "formik";
import {useDispatch} from "react-redux";

const Filter = ({action, setParams}) => {
    const dispatch = useDispatch()
    /*Formik*/
    const formik = useFormik({
        initialValues: initialValues(), validateOnChange: true, onSubmit: (form) => {
            setParams(form)
            dispatch(action(form))
        }
    })
    return (<form className="w-full  shadow p-5 rounded-lg bg-white" onChange={formik.submitForm}>
        <div className="flex items-center justify-between mt-4">
            <p className="font-medium">
                Filtros
            </p>
        </div>

        <div>
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-4 mt-4">
                <select value={formik.values.year}
                        onChange={(value) => formik.setFieldValue('year', value.target.value)}
                        className={`${formik.errors.year && "text-red-500"} px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm`}>
                    {Array.from(Array(20).keys()).map(year => (
                        <option key={2022 + year} value={2022 + year}>{2022 + year}</option>))}
                </select>
                <select value={formik.values.month}
                        onChange={(value) => formik.setFieldValue('month', value.target.value)}
                        className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm">
                    <option value={''}>Todos los meses</option>
                    <option value="1">Enero</option>
                    <option value="2">Febrero</option>
                    <option value="3">Marzo</option>
                    <option value="4">Abril</option>
                    <option value="5">Mayo</option>
                    <option value="6">Junio</option>
                    <option value="7">Julio</option>
                    <option value="8">Agosto</option>
                    <option value="9">Septiembre</option>
                    <option value="10">Octubre</option>
                    <option value="11">Noviembre</option>
                    <option value="12">Diciembre</option>
                </select>

            </div>
        </div>
    </form>);
};
const initialValues = () => {
    return {
        year: new Date().getFullYear(), month: new Date().getMonth() + 1,
    }
}

export default Filter;
