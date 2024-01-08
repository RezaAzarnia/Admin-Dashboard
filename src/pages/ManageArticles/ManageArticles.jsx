import React, { useState } from 'react'
import { deleteArticle, getPaginatedArticles } from '../../services/Axios/Requests/articles'
import BreadCrump from '../../Components/BreadCrump/BreadCrump'
import SectionHeader from '../../Components/SectionHeader/SectionHeader'
import Table from '../../Components/Table/Table'
import Alert from '../../Components/Alert/Alert'
import Button from '../../Components/Form/Button/Button'
import useConfirmModal from '../../hooks/useConfirmModal'
import useToast from '../../hooks/useToast'
import useDeleteItem from '../../hooks/useDeleteItem'
import usePagination from '../../hooks/usePagination'
import Paginator from '../../Components/Paginator/Paginator'
import './ManageArticles.scss'

export default function ManageArticles() {
    const [page, setPage] = useState(1)
    const [articleId, setArticleId] = useState(0)
    const { showToast, ToastComponent } = useToast()

    const { showConfirmModal: showDeleteModal, hideConfirmModal: hideDeleteModal, ConfirmModalComponent: DeleteModalComponent } = useConfirmModal()
    const { data: articles, isPreviousData, totalPage, computedIndex } = usePagination('Articles', getPaginatedArticles, page)

    const { mutate: removeArticle } = useDeleteItem(async () => {
        const deleteResponse = await deleteArticle(articleId)
        hideDeleteModal()
        switch (deleteResponse.status) {
            case 200:
                showToast('success', deleteResponse.message)
                return deleteResponse;
            default:
                showToast('error', deleteResponse.message)
                return Promise.reject(deleteResponse.message)
        }
    }, ["Articles", page], articleId)

    return (
        <>
            <BreadCrump />
            <div className="manage-articles-container">
                {
                    articles?.length > 0 ? (
                        <>
                            <SectionHeader title='articles Table' />
                            <Table>
                                <thead>
                                    <tr>
                                        <th>id</th>
                                        <th>article cover</th>
                                        <th>article title</th>
                                        <th>author</th>
                                        <th>published date</th>
                                        <th>delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {articles?.map((article, index) => {
                                        return <tr key={article.id}>
                                            <td>{computedIndex + index}</td>
                                            <td>
                                                <img src={article.articleCover} />
                                            </td>
                                            <td>
                                                {article.articleTitle}
                                            </td>
                                            <td>
                                                {article.author}
                                            </td>
                                            <td>{article.publishedDate}</td>
                                            <td><Button title='delete' mode='error' onclick={() => {
                                                showDeleteModal()
                                                setArticleId(article.id)
                                            }} /></td>
                                        </tr>
                                    })}
                                </tbody>
                            </Table>
                        </>
                    ) :
                        <Alert message='there is no article yet!' />
                }
                <Paginator
                    page={page}
                    setPage={setPage}
                    isPreviousData={isPreviousData}
                    totalPage={totalPage}
                    data={articles} />
            </div>

            {ToastComponent()}
            {DeleteModalComponent('delete', removeArticle)}
        </>
    )
}
