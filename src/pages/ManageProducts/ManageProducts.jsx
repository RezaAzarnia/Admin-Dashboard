import React, { useEffect, useState } from 'react'
import { addDiscount, deleteProduct, editProduct, getProducts } from '../../services/Axios/Requests/products';
import Table from '../../Components/Table/Table'
import BreadCrump from '../../Components/BreadCrump/BreadCrump'
import EditModal from '../../Components/Modals/EditModal/EditModal'
import useToast from '../../hooks/useToast'
import Input from '../../components/Form/Input/Input';
import Button from '../../components/Form/Button/Button'
import UploadButton from '../../Components/Form/UploadButton/UploadButton'
import useConfirmModal from '../../hooks/useConfirmModal';
import Alert from '../../Components/Alert/Alert';
import './ManageProducts.scss'

export default function ManageProducts() {
    const [products, setProducts] = useState([])
    const [productId, setProductId] = useState(0)
    const [isShowEditModal, setIsShowEditModal] = useState(false)
    const [isShowDiscountModal, setIsShowDiscountModal] = useState(false)
    const [editProductInitialValues, setEditProductInitialValues] = useState({})
    const [discountInitialValue, setDiscountInitialValue] = useState({ productDiscount: 0 })
    const [productCover, setProductCover] = useState('')
    const [coverErrors, setCoverErrors] = useState('')
    const { showToast, ToastComponent } = useToast()
    const { showConfirmModal: showDeleteModal, hideConfirmModal: hideDeleteModal, ConfirmModalComponent: DeleteModalComponent } = useConfirmModal()


    useEffect(() => {
        if (coverErrors.length > 0) {
            showToast('error', coverErrors)
        }
        setCoverErrors('')
    }, [coverErrors])

    useEffect(() => {
        getProduct()
    }, [])
    const validateEditForm = (data) => {
        let errors = []

        if (!data.productTitle.trim()) {
            errors.push('please enter product title!')
        }
        if (!data.productPrice) {
            errors.push('please enter the product price')
        } else {
            const numberWithDotRegex = /^[0-9]+(\.[0-9]+)?$/

            if (!numberWithDotRegex.test(data.productPrice)) {
                errors.push('Please enter only numbers for the product price.')
            } else if (data.productPrice <= 0) {
                errors.push("Product price can't be 0 or a negative value. ")
            }
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
    const getProduct = async () => {
        const response = await getProducts()
        setProducts(response)
    }
    const removeProduct = async () => {
        const response = await deleteProduct(productId)
        hideDeleteModal();
        switch (response.status) {
            case 200:
                showToast('success', response.message)
                getProduct()
                break
            default:
                showToast('error', response.message)
                break
        }
    }
    const handleEditProduct = async (values) => {
        const productErrors = validateEditForm(values)
        if (productErrors.length > 0) {
            showToast('error', productErrors.map((item, index) => <p key={index + 1}>{item}</p>))
            return
        }
        //delete the category objetc in edit mode and just send the category id
        const { category, ...newValues } = values;
        const editResponse = await editProduct(productId, { ...newValues })
        switch (editResponse.status) {
            case 200:
                showToast('success', editResponse.message)
                setIsShowEditModal(false)
                getProduct()
                setProductCover('')
                break
            default:
                showToast('error', editResponse.message)
                break
        }
    }
    const handleAddDiscount = async (values) => {
        const { productDiscount } = values;
        const errors = []
        if (productDiscount === discountInitialValue.productDiscount) {
            setIsShowDiscountModal(false)
            return
        }
        if (productDiscount < 0) {
            errors.push('discount can\'t be less than 0')
        } else if (productDiscount >= 100) {
            errors.push('discount can\'t be 100% or more')
        }
        if (errors.length > 0) {
            showToast('error', errors[0])
            return
        }
        const discountResponse = await addDiscount(productId, productDiscount)
        switch (discountResponse.status) {
            case 200:
                showToast('success', discountResponse.message)
                setIsShowDiscountModal(false)
                getProduct()
                break
            default:
                showToast('error', discountResponse.message)
                break
        }

    }
    return (
        <>
            {ToastComponent()}
            {DeleteModalComponent('delete', removeProduct)}
            {
                isShowEditModal &&
                <EditModal isOpen={isShowEditModal}
                    setIsOpen={setIsShowEditModal}
                    initialValues={editProductInitialValues}
                    onSubmit={handleEditProduct}
                    title='edit product'
                >
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
                    <Input type='text'
                        lableTitle='count'
                        placeholder='12'
                        name='productCount'
                    />
                    <div className="edit-product-description-part">
                        <Input type='textarea'
                            name='productDescription'
                            lableTitle='product description'
                        />
                    </div>
                    <div className="edit-product-img">
                        <img src={productCover} alt="" className="edit-product-cover-preview" />
                        <UploadButton
                            name="productCover"
                            setCover={setProductCover}
                            setError={setCoverErrors}
                        />
                    </div>
                    <br />
                </EditModal>
            }
            {isShowDiscountModal &&
                <EditModal
                    title='add dicount'
                    isOpen={isShowDiscountModal}
                    setIsOpen={setIsShowDiscountModal}
                    initialValues={discountInitialValue}
                    onSubmit={handleAddDiscount}
                >
                    <Input type='number' name='productDiscount' lableTitle='enter product disount' />
                </EditModal>
            }
            <BreadCrump />
            <div className="product-action-container">
                {products.length > 0 ?
                    <div className="products-table">
                        <Table>
                            <thead>
                                <tr>
                                    <th>id</th>
                                    <th>product img</th>
                                    <th>product Name</th>
                                    <th>price</th>
                                    <th>discount</th>
                                    <th>count</th>
                                    <th>category </th>
                                    <th>edit</th>
                                    <th>delete</th>
                                    <th>add discount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    products.length > 0 && (
                                        products.map((product, index) => {
                                            return <tr key={product.id}>
                                                <td>{index + 1}</td>
                                                <td><img src={product.productCover} className='product-image' /></td>
                                                <td>{product.productTitle}</td>
                                                <td>${product.productPrice}</td>
                                                <td>{product.productDiscount}%</td>
                                                <td>{product.productCount}</td>
                                                <td>{product.category.categoryName}</td>
                                                <td>
                                                    <Button title='edit' mode='success' onclick={() => {
                                                        setIsShowEditModal(true)
                                                        setProductId(product.id)
                                                        setEditProductInitialValues(product)
                                                        setProductCover(product.productCover)

                                                    }} />
                                                </td>
                                                <td>
                                                    <Button title='delete' mode='error' onclick={() => {
                                                        showDeleteModal()
                                                        setProductId(product.id)
                                                    }} />
                                                </td>
                                                <td className='discount-btn'>
                                                    <Button title='add discount' mode='warning' onclick={() => {
                                                        setProductId(product.id)
                                                        setIsShowDiscountModal(true)
                                                        setDiscountInitialValue({ productDiscount: product.productDiscount })
                                                    }} />
                                                </td>
                                            </tr>
                                        })
                                    )
                                }
                            </tbody>
                        </Table>
                    </div>
                    : <Alert message='no products available' />
                }
            </div>
        </>
    )
}
