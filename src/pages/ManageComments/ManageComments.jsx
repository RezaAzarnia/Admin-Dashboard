import React, { useState } from 'react'
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
import useDeleteItem from '../../hooks/useDeleteItem';
import useItemMutation from '../../hooks/useItemMutation';
import usePagination from '../../hooks/usePagination';
import Paginator from '../../Components/Paginator/Paginator';
import SkeletonTable from '../../Components/SkeletonLoader/SkeletonTable/SkeletonTable';
import './ManageComments.scss'

export default function ManageComments() {
    const commentLimitPerPage = 5;
    const [page, setPage] = useState(1)
    const { data: comments, isPreviousData, totalPage, computedIndex, isLoading, isError, error } = usePagination('Comments', getComments, page, commentLimitPerPage)
    const { showToast, ToastComponent } = useToast()
    const [commentInfo, setCommentInfo] = useState({})
    const [commentId, setCommentId] = useState(0)
    const [isShowCommentBody, setIsShowCommentBody] = useState(false)
    const [isShowAnwserModal, setIsShowAnswerModal] = useState(false)
    const { showConfirmModal: showDeleteModal, hideConfirmModal: hideDeleteModal, ConfirmModalComponent: DeleteModalComponent } = useConfirmModal()
    const { showConfirmModal: showAccepetModal, hideConfirmModal: hideAcceptModal, ConfirmModalComponent: AcceptCommentComponent } = useConfirmModal()
    const { showConfirmModal: showRejectModal, hideConfirmModal: hideRejectModal, ConfirmModalComponent: RejectCommentComponent } = useConfirmModal()

    const { mutate: removeComment, isLoading: isRemoveCommentLoading } = useDeleteItem(async () => {
        const deleteCommentResponse = await deleteComment(commentId)
        return deleteCommentResponse;
    }, ['Comments', page], commentId, page, setPage, totalPage, commentLimitPerPage,
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

    const { mutate: anwserToComment, isLoading: isAnwserLoading } = useItemMutation(async (values) => {
        const errors = [];
        if (!values.anwser) {
            errors.push('please enter the anwser for comment')
        }
        if (errors.length > 0) {
            return Promise.reject(errors)
        }
        const anwserResponse = await anwserComment(commentId, values.anwser)
        setIsShowAnswerModal(false);
        return anwserResponse;
    }, "Comments",
        (success) => {
            showToast('success', success.message)
        },
        (error) => {
            showToast('error', error)
        }

    )

    const { mutate: rejectComment, isLoading: isRejectCommentLoading } = useItemMutation(async () => {
        const rejectCommentResponse = await rejectCommentById(commentId)
        return rejectCommentResponse;
    }, 'Comments',
        (success) => {
            showToast('success', success.message)
            hideRejectModal();
        },
        (error) => {
            showToast('error', error)
            hideRejectModal();
        }
    )

    const { mutate: acceptComment, isLoading: isAcceptCommentLoading } = useItemMutation(async () => {
        const acceptCommentResponse = await acceptCommentById(commentId)
        return acceptCommentResponse
    }, 'Comments',
        (success) => {
            showToast('success', success.message)
            hideAcceptModal()
        },
        (error) => {
            showToast('error', error)
            hideAcceptModal()
        })

    if (isLoading) {
        return <SkeletonTable />
    }
    if (isError) {
        return <Alert message={error} />
    }
    return (
        <>
            <BreadCrump />
            <div className="comments-container">
                {
                    comments?.length > 0 ?
                        <Table isLoading={isPreviousData}>
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
                                            <td className={comment.anwser ? 'hasAnwser' : 'hasNoAnwser'}>{computedIndex + index}</td>
                                            <td>{comment.userInfo.userName}</td>
                                            <td>{comment.product.productTitle}</td>
                                            <td>
                                                <RateShow rate={comment.rate} />
                                            </td>
                                            <td>{comment.date}</td>

                                            <td className='table-button'>
                                                <Button title='seeComment' mode='success' onclick={() => {
                                                    setIsShowCommentBody(true)
                                                    setCommentInfo(comment)
                                                }} />
                                            </td>

                                            <td className='table-button'>
                                                <Button title='anwser' mode='success' onclick={() => {
                                                    setIsShowAnswerModal(true)
                                                    setCommentId(comment.id)
                                                }} />
                                            </td>
                                            {
                                                comment.isAccept === 1 ? (
                                                    <td className='table-button'>
                                                        <Button title='reject' mode='error' onclick={() => {
                                                            showRejectModal()
                                                            setCommentId(comment.id)
                                                        }} />
                                                    </td>

                                                ) : (
                                                    <td className='table-button'>
                                                        <Button title='accept' mode='success' onclick={() => {
                                                            showAccepetModal()
                                                            setCommentId(comment.id)
                                                        }} />
                                                    </td>
                                                )
                                            }

                                            <td className='table-button'>
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
                />
            </div >
            {/* start comments actions */}
            {ToastComponent()}
            {AcceptCommentComponent('accept', acceptComment, isAcceptCommentLoading)}
            {RejectCommentComponent('reject', rejectComment, isRejectCommentLoading)}
            {DeleteModalComponent('delete', removeComment, isRemoveCommentLoading)}

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
                    isLoading={isAnwserLoading}
                >
                    <div className="comment-anwser-textarea">
                        <Input type='textarea' lableTitle='anwser comment body' name='anwser' />
                    </div>
                </EditModal>
            }
        </>
    )
}
