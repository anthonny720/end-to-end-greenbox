import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import * as Yup from "yup";
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {map} from "lodash";
import {update_report} from "../../redux/actions/costs";


const FormCosts = ({data, close, params}) => {
    const categories = useSelector(state => state.Products.categories);


    const columns = [
        {name: 'kg_processed', title: 'Kg procesados', type: 'text', maxLength: 7},
        {name: 'kg_total', title: 'Kg PT', type: 'text', maxLength: 7},

    ]

    const dispatch = useDispatch();
    /*Formik*/
    const formik = useFormik({
        initialValues: initialValues(data),
        validationSchema: Yup.object(newSchema()),
        validateOnChange: true,
        onSubmit: (form, onSubmitProps) => {
            dispatch(update_report(form, data.id, params))
            close()
        }
    })


    return (<form className="bg-white  rounded px-8 pt-6 pb-8 mb-4">
        {/*CATEGORY*/}
        <div>
            <p className={`${formik.errors.category ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>Producto:</p>
            <select value={formik.values.category}
                    onChange={(value) => formik.setFieldValue('category', value.target.value)}
                    className="scrollbar-hide form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300       rounded transition       ease-in-out
                    m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    aria-label="Default select example">
                <option value={null}>Seleccione un producto</option>
                {categories !== null && map(categories, category => (
                    <option key={category.id} value={category.id}>{category.name}</option>))}
            </select>
        </div>
        <div className={`grid grid-cols-2 gap-2`}>

            {

                map(columns, (column, index) => (
                    <div key={index}>
                        <p className={`${formik.errors[column.name] ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>{column.title}:</p>
                        <input type={column.type} maxLength={column.maxLength}
                               className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50 uppercase"
                               value={`${formik.values[column.name]}`}
                               onChange={text => formik.setFieldValue(column.name, text.target.value)}/>
                    </div>))

            }
        </div>


        <div className="w-full flex justify-center">
            <button onClick={formik.handleSubmit} type="button"
                    className="max-w-xl mx-2 my-2 bg-green-300 transition duration-150 ease-in-out focus:outline-none hover:bg-green-100 rounded-full text-white font-bold px-6 py-2 text-xs">
                <FontAwesomeIcon icon={faPaperPlane}/>
            </button>
        </div>

    </form>)

};


const initialValues = (data) => {
    return {
        kg_processed: data?.kg_processed || 0,
        kg_total: data?.kg_total || 0,
        category: data?.category || null,

    }
}
const newSchema = () => {
    return {
        kg_processed: Yup.number().min(0).required(true),
        kg_total: Yup.number().integer().min(0).required(true),
        category: Yup.number().required(true),
    }
}


export default FormCosts;
