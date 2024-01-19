import React, { useEffect, useState } from 'react'
import { addDiscount, deleteProduct, editProduct, getProducts } from '../../services/Axios/Requests/products';
import Table from '../../Components/Table/Table'
import BreadCrump from '../../Components/BreadCrump/BreadCrump'
import EditModal from '../../Components/Modals/EditModal/EditModal'
import useToast from '../../hooks/useToast'
import Input from '../../components/Form/Input/Input';
import Button from '../../Components/Form/Button/Button'
import UploadButton from '../../Components/Form/UploadButton/UploadButton'
import useConfirmModal from '../../hooks/useConfirmModal';
import Alert from '../../Components/Alert/Alert';
import useDeleteItem from '../../hooks/useDeleteItem'
import useItemMutation from '../../hooks/useItemMutation'
import Paginator from '../../Components/Paginator/Paginator';
import usePagination from '../../hooks/usePagination';
import SkeletonTable from '../../Components/SkeletonLoader/SkeletonTable/SkeletonTable';
import './ManageProducts.scss'

export default function ManageProducts() {
    //get items
    const productLimitPerPage = 5;
    const [page, setPage] = useState(1)
    const { data: products, isPreviousData, totalPage, computedIndex, isLoading, isError, error } = usePagination('Products', getProducts, page, productLimitPerPage)
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

    const validateEditForm = (data) => {
        let errors = []

        if (!data.productTitle.trim()) {
            errors.push('please enter product title!')
        }
        if (!data.productPrice.trim()) {
            errors.push('please enter the product price')
        } else {
            const numberWithDotRegex = /^[0-9]+(\.[0-9]+)?$/

            if (!numberWithDotRegex.test(data.productPrice.trim())) {
                errors.push('Please enter only numbers for the product price.')
            } else if (data.productPrice <= 0) {
                errors.push("Product price can't be 0 or a negative value. ")
            }
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
    const { mutate: handleAddDiscount, isLoading: isEditDicountLoading } = useItemMutation(async (values) => {
        const errors = []
        const { productDiscount } = values;
        //check if theer is no edit on add discount close and do nothing
        if (productDiscount === discountInitialValue.productDiscount || productDiscount === '') {
            setIsShowDiscountModal(false)
            return Promise.reject('')
        }
        if (productDiscount < 0) {
            errors.push('discount can\'t be less than 0')
        } else if (productDiscount >= 100) {
            errors.push('discount can\'t be 100% or more')
        }

        if (errors.length > 0) {
            return Promise.reject(errors)
        }
        const discountResponse = await addDiscount(productId, productDiscount)
        setIsShowDiscountModal(false)
        return discountResponse

    }, "Products",
        (success) => {
            showToast('success', success.message)

        },
        (error) => {
            showToast('error', error)
        })
    const { mutate: handleEditProduct, isLoading: isEditProductLoading } = useItemMutation(async (values) => {
        const productErrors = validateEditForm(values)
        //check if product values did not change no request to sderver
        const isProductsValuesChanged = Object.keys(values).some((key) => values[key] !== editProductInitialValues[key]);
        if (!isProductsValuesChanged) {
            setIsShowEditModal(false)
            return Promise.reject('')
        }
        if (productErrors.length > 0) {
            //add this  reject to don't have any request on error
            return Promise.reject(productErrors)
        }
        //delete the category objetc in edit mode and just send the category id
        const { category, ...newValues } = values;

        const editResponse = await editProduct(productId, { ...newValues })
        setIsShowEditModal(false)
        return editResponse
    }, "Products",
        (success) => {
            showToast('success', success.message)
            setProductCover('')
        },
        (error) => {
            showToast('error', error)
        }
    )
    const { mutate: removeProduct, isLoading: isProductDeleting } = useDeleteItem(async () => {
        const removeResponse = await deleteProduct(productId)
        return removeResponse;
    }, ["Products", page], productId, page, setPage, totalPage, productLimitPerPage,
        (success) => {
            showToast('success', success.message)
            hideDeleteModal()
        }
        ,
        (error) => {
            showToast('error', error)
            hideDeleteModal()
        }
    )
    if (isLoading) {
        return <SkeletonTable />
    }
    if (isError) {
        return <Alert message={error} />
    }

    return (
        <>
            <BreadCrump />
            <div className="product-action-container">
                {
                    products?.length > 0 ?

                        <div className="products-table">
                            <Table isLoading={isPreviousData}>
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
                                        products?.map((product, index) => {
                                            return <tr key={product.id}>
                                                <td>{computedIndex + index}</td>
                                                <td><img src={product.productCover} className='product-image' /></td>
                                                <td>{product.productTitle}</td>
                                                <td>${product.productPrice}</td>
                                                <td>{product.productDiscount}%</td>
                                                <td>{product.productCount}</td>
                                                <td>{product.category.categoryName}</td>
                                                <td className='table-button'>
                                                    <Button title='edit' mode='success' onclick={() => {
                                                        setIsShowEditModal(true)
                                                        setProductId(product.id)
                                                        setEditProductInitialValues(product)
                                                        setProductCover(product.productCover)

                                                    }} />
                                                </td>
                                                <td className='table-button'>
                                                    <Button title='delete' mode='error' onclick={() => {
                                                        showDeleteModal()
                                                        setProductId(product.id)
                                                    }} />
                                                </td>
                                                <td className='table-button'>
                                                    <Button title='add discount' mode='warning' onclick={() => {
                                                        setProductId(product.id)
                                                        setIsShowDiscountModal(true)
                                                        setDiscountInitialValue({ productDiscount: product.productDiscount })
                                                    }} />
                                                </td>
                                            </tr>
                                        })
                                    }
                                </tbody>
                            </Table>

                        </div>
                        : <Alert message='no products available' />
                }
                <Paginator
                    page={page}
                    setPage={setPage}
                    isPreviousData={isPreviousData}
                    totalPage={totalPage}
                    data={products} />
            </div>
            {ToastComponent()}
            {DeleteModalComponent('delete', removeProduct, isProductDeleting)}
            {
                isShowEditModal &&
                <EditModal
                    title='edit product'
                    isOpen={isShowEditModal}
                    setIsOpen={setIsShowEditModal}
                    initialValues={editProductInitialValues}
                    onSubmit={handleEditProduct}
                    isLoading={isEditProductLoading}
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
                    isLoading={isEditDicountLoading}
                >
                    <Input type='number' name='productDiscount' lableTitle='enter product disount' />
                </EditModal>
            }
        </>
    )
}
