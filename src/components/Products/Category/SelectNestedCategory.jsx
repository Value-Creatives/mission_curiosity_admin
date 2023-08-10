import React, { useState, useEffect } from 'react';
import { toastError } from '../../Utility/ToastUtils';
import { getCategory } from '../../../services/category.service';
import Select from 'react-select'

export default function SelectNestedCategory({ onChange, onChangeParentCategoryArr, currentCategoryId = "", parentCategoryIdArr = [], categoryId = '', preselectedCategoryId: preselectedParentCategoryArr = '', bannedIds = [] }) {
    const [innerCategoryId, setInnerCategoryId] = useState('')
    const [innerParentCategoryIdArr, setInnerParentCategoryIdArr] = useState([])
    const [categoryArr, setCategoryArr] = useState([])
    const [selectOptions, setSelectOptions] = useState([[]])

    useEffect(() => {
        setDataOnInit()
    }, [preselectedParentCategoryArr])




    const setDataOnInit = async () => {
        try {
            const arr = await getCategoryData()
            // console.log(preselectedParentCategoryArr, "preselectedParentCategoryArr preselectedParentCategoryArr preselectedParentCategoryArr preselectedParentCategoryArr preselectedParentCategoryArr preselectedParentCategoryArr preselectedParentCategoryArr preselectedParentCategoryArr preselectedParentCategoryArr preselectedParentCategoryArr preselectedParentCategoryArr preselectedParentCategoryArr preselectedParentCategoryArr preselectedParentCategoryArr preselectedParentCategoryArr preselectedParentCategoryArr preselectedParentCategoryArr preselectedParentCategoryArr preselectedParentCategoryArr preselectedParentCategoryArr preselectedParentCategoryArr preselectedParentCategoryArr preselectedParentCategoryArr preselectedParentCategoryArr ")
            if (preselectedParentCategoryArr && preselectedParentCategoryArr.length > 0) {

                let tempArr = []

                for (const [index, ele] of preselectedParentCategoryArr.entries()) {
                    if (index == 0) {
                        let selectedOption = arr.find(el => el._id == ele.parentId);
                        tempArr.push({ selectedOption: selectedOption ? { label: selectedOption.name, value: selectedOption._id } : {}, arr: [...arr] })
                        const arr2 = await getCategoryData(index + 2, ele.parentId);
                        tempArr.push({ selectedOption: {}, arr: [...arr2] })
                    }
                    else {
                        let selectedOption = tempArr[index].arr.find(el => el._id == ele.parentId);
                        tempArr[index].selectedOption = selectedOption ? { label: selectedOption.name, value: selectedOption._id } : {}
                        let arr = await getCategoryData(index + 2, ele.parentId);
                        if (arr.some(elx => elx._id == currentCategoryId)) {
                            arr = []
                        }



                        tempArr.push({ selectedOption: {}, arr: [...arr] })
                    }
                }
                setSelectOptions([...tempArr])
            }
            else {
                setSelectOptions([{ selectedOption: {}, arr: [...arr] }]);
            }
        } catch (error) {
            console.error(error)
        }
    }

    const onChangeSelect = async (index, value, valueObj) => {
        try {
            if (onChange)
                onChange(value)

            let arr = await getCategoryData(index + 2, value)
            console.log({ arr })
            // setSelectOptions(prev => [...prev.filter((el, i) => i <= index), arr])

            // to reset the value of react select
            let tempInnerArr = selectOptions.filter((el, i) => i <= index)

            let tempArr = tempInnerArr.map((el, i) => {
                let obj = {
                    ...el
                }
                if (i == index) {
                    obj.selectedOption = valueObj
                }
                return obj
            })

            if (arr.some(elx => elx._id == currentCategoryId)) {
                arr = []
            }


            setSelectOptions(() => [...tempArr, { selectedOption: {}, arr: arr }])

        } catch (error) {
            console.error(error)
        }
    }



    const getCategoryData = async (level = 1, parentId = undefined) => {
        try {
            let query = `level=${level}`;
            if (parentId) {
                query = query + `&parentCategoryId=${parentId}`
            }
            const res = await getCategory(query);
            // console.log(res?.data)
            if (res?.data?.data) {
                return (res?.data?.data)
            }
        } catch (error) {
            console.error(error);
            toastError(error)
        }
        return ([])
    }



    useEffect(() => {

    }, [selectOptions])


    return (
        <div>
            <h6>
                Select Category:
            </h6>
            {selectOptions.map(((el, i) => (
                // console.log(el, "element")
                <div key={i}>
                    {
                        el.arr && el.arr.length > 0 &&
                        <Select defaultValue={el?.selectedOption?.value} value={el?.selectedOption} options={el?.arr.map(ele => ({ label: ele?.name, value: ele?._id }))} onChange={(val) => onChangeSelect(i, val.value, val)} />
                        // 
                    }
                </div>
            )))
            }


        </div >
    )

}
