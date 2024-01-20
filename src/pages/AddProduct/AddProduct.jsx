import React, { memo, useEffect, useRef, useState } from 'react'
import { Form, Formik } from 'formik';
import { addProduct } from '../../services/Axios/Requests/products';
import { categoryService } from '../../services/Axios/Requests/category';
import BreadCrump from '../../Components/BreadCrump/BreadCrump'
import Input from '../../Components/Form/Input/Input'
import UploadButton from '../../Components/Form/UploadButton/UploadButton'
import Button from '../../Components/Form/Button/Button';
import SectionHeader from '../../Components/SectionHeader/SectionHeader';
import useToast from '../../hooks/useToast'
import useFetchItem from '../../hooks/useFetchItem';
import useItemMutation from '../../hooks/useItemMutation';
import './AddProduct.scss'

function AddProduct() {
    const [productCover, setProductCover] = useState('')
    const [coverErrors, setCoverErrors] = useState('')
    const { showToast, ToastComponent } = useToast()
    const { data: category } = useFetchItem('Categories', () => categoryService.getAllCategory())
    const resetFormRef = useRef()

    const initialValues = {
        productTitle: '',
        productPrice: '',
        categoryId: '-1',
        productCount: '',
        productDescription: '',
        productCover,
    }
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
        if (!data.productPrice.trim()) {
            errors.push('please enter the product price')
        } else {
            const numberRegex = /^[0-9]+(\.[0-9]+)?$/

            if (!numberRegex.test(data.productPrice.trim())) {
                errors.push('Please enter only numbers for the product price.')
            } else if (data.productPrice <= 0) {
                errors.push("Product price can't be 0 or a negative value. ")
            }
        }
        if (data.categoryId === '-1') {
            errors.push('please select product category!')
        }
        if (!data.productCount.trim()) {
            errors.push('please enter the product count')
        } else {
            const numberRegex = /^[0-9]+$/
            if (!numberRegex.test(data.productCount.trim())) {
                errors.push('Please enter only numbers for the product count.')
            } else if (data.productCount <= 0) {
                errors.push("Product count can't be 0 ")
            }
        }
        if (!data.productDescription.trim()) {
            errors.push('please enter product description!')
        }
        if (!data.productCover) {
            errors.push('please upload product cover!')
        }
        return errors;

    }
    const { mutate: handleSubmit, isLoading: isCreateProdductLoading } = useItemMutation(async (values) => {
        const productErrors = validateProductsForm(values);
        if (productErrors.length > 0) {
            return Promise.reject(productErrors);
        }
        // numbering the category id
        values['categoryId'] = +(values.categoryId);
        const response = await addProduct({ ...values });
        return response;
    }, "Products",
        (success) => {
            showToast('success', success.message);
            setProductCover('');
            resetFormRef.current();
        }, (error) => {
            showToast('error', error);
        })
    return (
        <>
            {ToastComponent()}
            <BreadCrump />
            <Formik
                initialValues={initialValues}
                onSubmit={(values, { resetForm }) => {
                    resetFormRef.current = resetForm;
                    handleSubmit(values)
                }}
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
                                        category?.length > 0 &&
                                        category?.reverse().map(item => {
                                            return <option value={+item.id} key={item.id}>{item.categoryName}</option>
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
                            <Button title='save product' mode='success' type='submit' isLoading={isCreateProdductLoading} />
                            <Button title='cancel' mode='warning' type='button' />
                        </div>
                    </div>
                </Form>
            </Formik >
        </>
    )
}
export default memo(AddProduct)