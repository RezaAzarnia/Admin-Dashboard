import React, { useEffect, useRef, useState } from 'react'
import { Form, Formik } from 'formik';
import { addProduct } from '../../services/Axios/Requests/products';
import { getCategory } from '../../services/Axios/Requests/category';
import BreadCrump from '../../Components/BreadCrump/BreadCrump'
import Input from '../../Components/Form/Input/Input'
import UploadButton from '../../Components/Form/UploadButton/UploadButton'
import Button from '../../Components/Form/Button/Button';
import SectionHeader from '../../Components/SectionHeader/SectionHeader';
import useToast from '../../hooks/useToast'
import './AddProduct.scss'
export default function AddProduct() {
    const [category, setCategory] = useState([])
    const [productCover, setProductCover] = useState('')
    const [coverErrors, setCoverErrors] = useState('')
    const { showToast, ToastComponent } = useToast()
    const initialValues = {
        productTitle: '',
        productPrice: '',
        categoryId: '-1',
        productCount: '',
        productDescription: '',
        productCover,
    }
    useEffect(() => {
        const getCategories = async () => {
            const response = await getCategory()
            setCategory(response)
        }
        getCategories()
    }, [])
    useEffect(() => {
        if (coverErrors.length > 0) {
            showToast('error', coverErrors)
        }
        setCoverErrors('')
    }, [coverErrors])

    const validateProductsForm = (data) => {
        let errors = []

        if (!data.productTitle.trim()) {
            errors.push('please enter product title!')
        }
        if (!data.productPrice) {
            errors.push('please enter the product price')
        } else {
            const numberRegex = /^[0-9]+(\.[0-9]+)?$/

            if (!numberRegex.test(data.productPrice)) {
                errors.push('Please enter only numbers for the product price.')
            } else if (data.productPrice <= 0) {
                errors.push("Product price can't be 0 or a negative value. ")
            }
        }
        if (data.categoryId === '-1') {
            errors.push('please select product category!')
        }
        if (!data.productCount) {
            errors.push('please enter the product count')
        } else {
            const numberRegex = /^[0-9]+$/
            if (!numberRegex.test(data.productCount)) {
                errors.push('Please enter only numbers for the product count.')
            } else if (data.productCount <= 0) {
                errors.push("Product count can't be 0 ")
            }
        }
        if (!data.productDescription) {
            errors.push('please enter product description!')
        }
        if (!data.productCover) {
            errors.push('please upload product cover!')
        }
        return errors;

    }

    const handleSubmit = async (values, { resetForm }) => {
        const productErrors = validateProductsForm(values)
        if (productErrors.length > 0) {
            showToast('error', productErrors.map((item, index) => <p key={index + 1}>{item}</p>))
            return
        }
        values['categoryId'] = Number(values.categoryId)

        const response = await addProduct({
            ...values,
        })

        switch (response.status) {
            case 200:
                showToast('success', response.message)
                resetForm()
                setProductCover('')
                break
            default:
                showToast('error', response.message)
                break
        }
    }

    return (
        <>
            {ToastComponent()}
            <BreadCrump />
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
            >
                <Form>
                    <div className="add-product-container">
                        <SectionHeader title='about product' />
                        <div className="product-infos-part">
                            <div className="row-add-product">
                                <Input type='text'
                                    lableTitle='poduct title'
                                    placeholder='cloth....'
                                    name="productTitle"
                                />

                                <Input type='text'
                                    lableTitle='price'
                                    placeholder='$1235'
                                    name="productPrice"
                                />

                                <Input type='select'
                                    lableTitle='select product category'
                                    name="categoryId"
                                >
                                    <option value='-1'>select product category</option>
                                    {
                                        category.length > 0 &&
                                        category?.map(item => {
                                            return <option value={Number(item.id)} key={item.id}>{item.categoryName}</option>
                                        })
                                    }
                                </Input>
                                <Input type='text'
                                    lableTitle='count'
                                    placeholder='12'
                                    name='productCount'
                                />
                            </div>
                        </div>
                        <div className="product-description-part">
                            <SectionHeader title='product description' />
                            <Input type='textarea'
                                name='productDescription'
                            />
                        </div>
                        <div className="product-image-part">
                            <SectionHeader title='product cover' />
                            <div className="image-upload">
                                {
                                    productCover ? (
                                        <img src={productCover} alt="" className="showimgPreview" />
                                    ) : (
                                        <div className='showimgPreview gray-box'>
                                            <span className='img-size-show'>302 * 355</span>
                                        </div>
                                    )
                                }
                                <UploadButton
                                    name="productCover"
                                    setCover={setProductCover}
                                    setError={setCoverErrors}
                                />
                            </div>
                        </div>
                        <div className="add-product-buttons">
                            <Button title='save product' mode='success' type='submit' />
                            <Button title='cancel' mode='warning' type='button' />
                        </div>
                    </div>
                </Form>
            </Formik >
        </>
    )
}
