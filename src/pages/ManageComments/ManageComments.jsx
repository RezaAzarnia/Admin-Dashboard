import React, { useEffect, useState } from 'react'
import { acceptCommentById, anwserComment, deleteComment, getComments, rejectCommentById } from '../../services/Axios/Requests/comments'
import Button from '../../Components/Form/Button/Button'
import Input from '../../Components/Form/Input/Input';
import Table from '../../Components/Table/Table'
import BreadCrump from '../../Components/BreadCrump/BreadCrump'
import Modal from '../../Components/Modals/Modal/Modal'
import EditModal from '../../Components/Modals/EditModal/EditModal'
import useToast from '../../hooks/useToast'
import useConfirmModal from '../../hooks/useConfirmModal'
import Alert from '../../Components/Alert/Alert'
import RateShow from '../../Components/RateShow/RateShow'
import './ManageComments.scss'

export default function ManageComments() {
    const [comments, setComments] = useState([])
    const [commentInfo, setCommentInfo] = useState({})
    const [commentId, setCommentId] = useState(0)
    const [isShowCommentBody, setIsShowCommentBody] = useState(false)
    const [isShowAnwserModal, setIsShowAnswerModal] = useState(false)
    const { showConfirmModal: showDeleteModal, hideConfirmModal: hideDeleteModal, ConfirmModalComponent: DeleteModalComponent } = useConfirmModal()
    const { showConfirmModal: showAccepetModal, hideConfirmModal: hideAcceptModal, ConfirmModalComponent: AcceptCommentComponent } = useConfirmModal()
    const { showConfirmModal: showRejectModal, hideConfirmModal: hideRejectModal, ConfirmModalComponent: RejectCommentComponent } = useConfirmModal()
    const { showToast, ToastComponent } = useToast()

    const getComment = async () => {
        const response = await getComments()
        setComments(response)
    }
    const removeComment = async () => {
        const deleteResponse = await deleteComment(commentId)
        switch (deleteResponse.status) {
            case 200:
                showToast('success', deleteResponse.message)
                hideDeleteModal()
                getComment()
                break
            default:
                showToast('error', deleteResponse.message)
                break
        }
    }
    const anwserToComment = async (values) => {
        const errors = [];
        if (!values.anwser) {
            errors.push('please enter the anwser for comment')
        }
        if (errors.length > 0) {
            showToast('error', errors[0])
            return
        }
        const anwserResponse = await anwserComment(commentId, values.anwser)
        switch (anwserResponse.status) {
            case 200:
                showToast('success', anwserResponse.message)
                setIsShowAnswerModal(false)
                getComment()
                break
            default:
                showToast('error', anwserResponse.message)
                break
        }
    }
    const rejectComment = async () => {
        const rejectResponse = await rejectCommentById(commentId)
        switch (rejectResponse.status) {
            case 200:
                showToast('success', rejectResponse.message)
                hideRejectModal()
                getComment()
                break
            default:
                showToast('error', rejectResponse.message)
                break
        }
    }
    const acceptComment = async () => {
        const acceptResponse = await acceptCommentById(commentId)
        switch (acceptResponse.status) {
            case 200:
                showToast('success', acceptResponse.message)
                hideRejectModal()
                getComment()
                break
            default:
                showToast('error', acceptResponse.message)
                break
        }
        hideAcceptModal()
    }
    useEffect(() => {
        getComment()
    }, [])
    return (
        <>
            {ToastComponent()}
            <BreadCrump />
            <div className="comments-container">
                {
                    comments.length > 0 ?
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
                                    comments.length > 0 &&
                                    comments.map((comment, index) => {
                                        return <tr key={comment.id}>
                                            <td className={comment.anwser ? 'hasAnwser' : 'hasNoAnwser'}>{index + 1}</td>
                                            <td>{comment.userInfo.userName}</td>
                                            <td>{comment.product.productTitle}</td>
                                            <td>
                                                <RateShow rate={comment.rate} />
                                            </td>
                                            <td>2023/5/14</td>

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

            </div >
            {/* start comments actions */}
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
