import React, { useState } from 'react'
import { acceptCommentById, anwserComment, deleteComment, getComments, rejectCommentById } from '../../services/Axios/Requests/comments'
import Button from '../../Components/Form/Button/Button'
import Input from '../../components/Form/Input/Input';
import Table from '../../Components/Table/Table'
import BreadCrump from '../../Components/BreadCrump/BreadCrump'
import Modal from '../../Components/Modals/Modal/Modal'
import EditModal from '../../Components/Modals/EditModal/EditModal'
import useToast from '../../hooks/useToast'
import useConfirmModal from '../../hooks/useConfirmModal'
import Alert from '../../Components/Alert/Alert'
import RateShow from '../../Components/RateShow/RateShow'
import useDeleteItem from '../../hooks/useDeleteItem';
import useItemMutation from '../../hooks/useItemMutation';
import usePagination from '../../hooks/usePagination';
import Paginator from '../../Components/Paginator/Paginator';
import './ManageComments.scss'

export default function ManageComments() {
    const [page, setPage] = useState(1)
    const { data: comments, isPreviousData, totalPage, computedIndex } = usePagination('Comments', getComments, page)
    const { showToast, ToastComponent } = useToast()
    const [commentInfo, setCommentInfo] = useState({})
    const [commentId, setCommentId] = useState(0)
    const [isShowCommentBody, setIsShowCommentBody] = useState(false)
    const [isShowAnwserModal, setIsShowAnswerModal] = useState(false)
    const { showConfirmModal: showDeleteModal, hideConfirmModal: hideDeleteModal, ConfirmModalComponent: DeleteModalComponent } = useConfirmModal()
    const { showConfirmModal: showAccepetModal, hideConfirmModal: hideAcceptModal, ConfirmModalComponent: AcceptCommentComponent } = useConfirmModal()
    const { showConfirmModal: showRejectModal, hideConfirmModal: hideRejectModal, ConfirmModalComponent: RejectCommentComponent } = useConfirmModal()

    const { mutate: removeComment } = useDeleteItem(async () => {
        const deleteCommentResponse = await deleteComment(commentId)
        hideDeleteModal()
        switch (deleteCommentResponse.status) {
            case 200:
                showToast('success', deleteCommentResponse.message)
                return deleteCommentResponse;
            default:
                showToast('error', deleteCommentResponse.message)
                return Promise.reject(deleteCommentResponse.message)
        }
    }, 'Comments', commentId)
    const { mutate: anwserToComment } = useItemMutation(async (values) => {
        const errors = [];
        if (!values.anwser) {
            errors.push('please enter the anwser for comment')
        }
        if (errors.length > 0) {
            showToast('error', errors[0])
            return Promise.reject(errors[0])
        }
        const anwserResponse = await anwserComment(commentId, values.anwser)
        setIsShowAnswerModal(false)
        switch (anwserResponse.status) {
            case 200:
                showToast('success', anwserResponse.message)
                break
            default:
                showToast('error', anwserResponse.message)
                return Promise.reject(anwserResponse.message)
        }
    }, "Comments")
    const { mutate: rejectComment } = useItemMutation(async () => {
        const rejectCommentResponse = await rejectCommentById(commentId)
        hideRejectModal()
        switch (rejectCommentResponse.status) {
            case 200:
                showToast('success', rejectCommentResponse.message)
                return rejectCommentResponse
            default:
                showToast('error', rejectCommentResponse.message)
                return Promise.reject(rejectCommentResponse.message)
        }
    }, 'Comments')
    const { mutate: acceptComment } = useItemMutation(async () => {
        const acceptCommentResponse = await acceptCommentById(commentId)
        hideAcceptModal()
        switch (acceptCommentResponse.status) {
            case 200:
                showToast('success', acceptCommentResponse.message)
                return acceptCommentResponse
            default:
                showToast('error', acceptCommentResponse.message)
                return Promise.reject(acceptCommentResponse.message)
        }
    }, 'Comments')

    return (
        <>
            <BreadCrump />
            <div className="comments-container">
                {
                    comments?.length > 0 ?
                        <Table>
                            <thead>
                                <tr>
                                    <th>id</th>
                                    <th>user</th>
                                    <th>productName</th>
                                    <th>rate</th>
                                    <th>date</th>
                                    <th>see comment</th>
                                    <th>answser</th>
                                    <th>accept / reject</th>
                                    <th>delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    comments?.map((comment, index) => {
                                        return <tr key={comment.id}>
                                            <td className={comment.anwser ? 'hasAnwser' : 'hasNoAnwser'}>{index + 1}</td>
                                            <td>{comment.userInfo.userName}</td>
                                            <td>{comment.product.productTitle}</td>
                                            <td>
                                                <RateShow rate={comment.rate} />
                                            </td>
                                            <td>{comment.date}</td>

                                            <td>
                                                <Button title='seeComment' mode='success' onclick={() => {
                                                    setIsShowCommentBody(true)
                                                    setCommentInfo(comment)
                                                }} />
                                            </td>

                                            <td>
                                                <Button title='anwser' mode='success' onclick={() => {
                                                    setIsShowAnswerModal(true)
                                                    setCommentId(comment.id)
                                                }} />
                                            </td>
                                            {
                                                comment.isAccept === 1 ? (
                                                    <td>
                                                        <Button title='reject' mode='error' onclick={() => {
                                                            showRejectModal()
                                                            setCommentId(comment.id)
                                                        }} />
                                                    </td>

                                                ) : (
                                                    <td><Button title='accept' mode='success' onclick={() => {
                                                        showAccepetModal()
                                                        setCommentId(comment.id)
                                                    }} /></td>
                                                )
                                            }

                                            <td>
                                                <Button title='delete' mode='error' onclick={() => {
                                                    showDeleteModal()
                                                    setCommentId(comment.id)
                                                }} />
                                            </td>

                                        </tr>
                                    })
                                }
                            </tbody>
                        </Table>
                        : <Alert message='No comments available.' />
                }
                <Paginator
                    page={page}
                    setPage={setPage}
                    isPreviousData={isPreviousData}
                    totalPage={totalPage}
                    data={comments} />
            </div >
            {/* start comments actions */}
            {ToastComponent()}
            {AcceptCommentComponent('accept', acceptComment)}
            {RejectCommentComponent('reject', rejectComment)}
            {DeleteModalComponent('delete', removeComment)}

            {isShowCommentBody &&
                <Modal isOpen={isShowCommentBody} setIsOpen={setIsShowCommentBody} title='comment body' >
                    <p>{commentInfo.commentBody}</p>
                </Modal>
            }
            {isShowAnwserModal &&
                <EditModal
                    title='anwser comment'
                    isOpen={isShowAnwserModal}
                    setIsOpen={setIsShowAnswerModal}
                    initialValues={{ anwser: '' }}
                    onSubmit={anwserToComment}
                >
                    <div className="comment-anwser-textarea">
                        <Input type='textarea' lableTitle='anwser comment body' name='anwser' />
                    </div>
                </EditModal>
            }
        </>
    )
}
