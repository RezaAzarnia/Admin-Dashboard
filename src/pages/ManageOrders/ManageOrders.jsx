import React, { useEffect, useState } from 'react'
import { deleteOrder, getUsersOrders } from '../../services/Axios/Requests/orders'
import BreadCrump from '../../Components/BreadCrump/BreadCrump'
import Table from '../../Components/Table/Table'
import Button from '../../Components/Form/Button/Button'
import useConfirmModal from '../../hooks/useConfirmModal'
import useToast from '../../hooks/useToast'
import Alert from '../../Components/Alert/Alert'
import './ManageOrders.scss'
export default function ManageOrders() {
    const [orders, setOrders] = useState([])
    const [orderId, setOrderId] = useState(0)
    const { showToast, ToastComponent } = useToast()
    const { showConfirmModal: showDeleteModal, hideConfirmModal: hideDeleteModal, ConfirmModalComponent: DeleteModalComponent } = useConfirmModal()
    let productPrice = null;
    let totalPrice = null;

    const getOrders = async () => {
        const response = await getUsersOrders()
        setOrders(response)
        console.log(response)
    }
    const removeOrder = async () => {
        const deleteResponse = await deleteOrder(orderId)
        hideDeleteModal()
        switch (deleteResponse.status) {
            case 200:
                showToast('success', deleteResponse.message)
                getOrders()
                break
            default:
                showToast('error', deleteResponse.message)
                break
        }
    }
    useEffect(() => {
        getOrders()
    }, [])


    return (
        <>
            {ToastComponent()}
            {DeleteModalComponent('delete', removeOrder)}
            <BreadCrump />
            <div className="orders-container">
                {
                    orders.length > 0 ?
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
                                    orders.length > 0 &&
                                    orders.map((order, index) => {
                                        productPrice = (order.product.productPrice - (order.product.productPrice / 100) * order.product.productDiscount).toFixed(2);
                                        totalPrice = (productPrice * order.quantity).toFixed(2);
                                        return <tr key={order.id}>
                                            <td>{index + 1}</td>
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
                                            <td><Button title='delete' mode='error' onclick={() => {
                                                setOrderId(order.id)
                                                showDeleteModal()
                                            }} /></td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </Table>

                        : <Alert message='no orders available' />
                }
            </div>
        </>
    )
}
