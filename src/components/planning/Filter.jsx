import React from 'react';
import {useFormik} from "formik";
import {useDispatch} from "react-redux";
import {get_kpi_aguaymanto, get_kpi_mango, get_kpi_pineapple} from "../../redux/actions/planning";
import * as Yup from "yup";

const Filter = ({ft}) => {
    const dispatch = useDispatch()
    /*Formik*/
    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(newSchema()),
        validateOnChange: true,
        onSubmit: (form) => {
            ft({week: form.week, year: form.year})
            dispatch(get_kpi_pineapple({week: form.week, year: form.year}))
            dispatch(get_kpi_mango({week: form.week, year: form.year}))
            dispatch(get_kpi_aguaymanto({week: form.week, year: form.year}))
        }
    })
    return (<form className="w-full  shadow p-2 rounded-lg bg-white" onChange={formik.handleSubmit}>

        <div className="flex items-center justify-between  gap-2 ">
            <p className="font-medium mt-2">
                Filtros:
            </p>
            <select value={formik.values.year}
                    onChange={(value) => formik.setFieldValue('year', value.target.value)}
                    className={`${formik.errors.year && "text-red-500"} px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm`}>
                <option value={''} disabled>Seleccione un año</option>
                {Array.from(Array(20).keys()).map(year => (
                    <option key={2022 + year} value={2022 + year}>{2022 + year}</option>))}
            </select>

            <select value={formik.values.week}
                    onChange={(value) => formik.setFieldValue('week', value.target.value)}
                    className={`${formik.errors.week && "text-red-500"} px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm`}>
                <option value={''} disabled>Seleccione una semana</option>
                {Array.from(Array(53).keys()).map(week => (
                    <option key={1 + week} value={1 + week}>{1 + week}</option>))}
            </select>


        </div>


    </form>);
};
const initialValues = () => {
    return {
        year: '', week: ''
    }
}
const newSchema = () => {
    return {
        year: Yup.number(), week: Yup.number()
    }
}

export default Filter;
