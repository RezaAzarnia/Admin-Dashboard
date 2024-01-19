import React, { useState } from 'react'
import { deleteOrder, getOrders } from '../../services/Axios/Requests/orders'
import BreadCrump from '../../Components/BreadCrump/BreadCrump'
import Table from '../../Components/Table/Table'
import Button from '../../Components/Form/Button/Button'
import useConfirmModal from '../../hooks/useConfirmModal'
import useToast from '../../hooks/useToast'
import Alert from '../../Components/Alert/Alert'
import useDeleteItem from '../../hooks/useDeleteItem'
import Paginator from '../../Components/Paginator/Paginator'
import usePagination from '../../hooks/usePagination'
import SkeletonTable from '../../Components/SkeletonLoader/SkeletonTable/SkeletonTable'
import './ManageOrders.scss'
export default function ManageOrders() {
    let productPrice = null;
    let totalPrice = null;
    const orderLimitPerPage = 5;

    const [page, setPage] = useState(1)
    const [orderId, setOrderId] = useState(0)
    const { showToast, ToastComponent } = useToast()
    const { data: orders, isPreviousData, totalPage, computedIndex, isLoading, isError, error } = usePagination('Orders', getOrders, page, orderLimitPerPage)
    const { showConfirmModal: showDeleteModal, hideConfirmModal: hideDeleteModal, ConfirmModalComponent: DeleteModalComponent } = useConfirmModal()

    const { mutate: removeOrder, isLoading: isOrderDeleting } = useDeleteItem(async () => {
        const deleteOrderResponse = await deleteOrder(orderId)
        return deleteOrderResponse;
    }, ['Orders', page], orderId, page, setPage, totalPage, orderLimitPerPage,
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
            <div className="orders-container">
                {
                    orders?.length > 0 ?
                        <Table>
                            <thead>
                                <tr>
                                    <th>count</th>
                                    <th>userName</th>
                                    <th>product name</th>
                                    <th>product photo</th>
                                    <th>price</th>
                                    <th>discount</th>
                                    <th>quantity</th>
                                    <th>total price:</th>
                                    <th>date</th>
                                    <th>status</th>
                                    <th>delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    orders?.map((order, index) => {
                                        productPrice = (order.product.productPrice - (order.product.productPrice / 100) * order.product.productDiscount).toFixed(2);
                                        totalPrice = (productPrice * order.quantity).toFixed(2);
                                        return <tr key={order.id}>
                                            <td>{computedIndex + index}</td>
                                            <td>{order.user.fullName}</td>
                                            <td>{order.product.productTitle}</td>
                                            <td><img src={order.product.productCover} alt="" /></td>
                                            <td>
                                                ${productPrice}
                                            </td>
                                            <td>{order.product.productDiscount}% </td>
                                            <td>{order.quantity}</td>
                                            <td>${totalPrice}</td>
                                            <td>{order.orderDate}</td>
                                            <td className={`order-status ${order.status}`}>{order.status}</td>
                                            <td className='table-button'>
                                                <Button title='delete' mode='error' onclick={() => {
                                                    setOrderId(order.id)
                                                    showDeleteModal()
                                                }} />
                                            </td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </Table>

                        : <Alert message='no orders available' />
                }
                <Paginator
                    page={page}
                    setPage={setPage}
                    isPreviousData={isPreviousData}
                    totalPage={totalPage}
                    data={orders} />
            </div>
            {ToastComponent()}
            {DeleteModalComponent('delete', removeOrder, isOrderDeleting)}
        </>
    )
}
