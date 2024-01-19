import React, { useState } from 'react'
import { deleteArticle, getArticles } from '../../services/Axios/Requests/articles'
import BreadCrump from '../../Components/BreadCrump/BreadCrump'
import Table from '../../Components/Table/Table'
import Alert from '../../Components/Alert/Alert'
import Button from '../../Components/Form/Button/Button'
import useConfirmModal from '../../hooks/useConfirmModal'
import useToast from '../../hooks/useToast'
import useDeleteItem from '../../hooks/useDeleteItem'
import usePagination from '../../hooks/usePagination'
import Paginator from '../../Components/Paginator/Paginator'
import SkeletonTable from '../../Components/SkeletonLoader/SkeletonTable/SkeletonTable'
import './ManageArticles.scss'

export default function ManageArticles() {
    //paginated articles
    const articlesLimitPerPage = 5;
    const [page, setPage] = useState(1)
    const [articleId, setArticleId] = useState(0)
    const { showToast, ToastComponent } = useToast()

    const { data: articles, isPreviousData, isError, error, totalPage, computedIndex, isLoading } = usePagination('Articles', getArticles, page, articlesLimitPerPage)
    const { showConfirmModal: showDeleteModal, hideConfirmModal: hideDeleteModal, ConfirmModalComponent: DeleteModalComponent } = useConfirmModal()


    const { mutate: removeArticle, isLoading: isArticleRemoveLoading } = useDeleteItem(async () => {
        const deleteResponse = await deleteArticle(articleId)
        return deleteResponse
    }, ["Articles", page], articleId, page, setPage, totalPage, articlesLimitPerPage,
        (success) => {
            showToast('success', success.message)
            hideDeleteModal()
        }
        ,
        (error) => {
            showToast('error', error)
            hideDeleteModal()
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
            <div className="manage-articles-container">
                {
                    articles?.length > 0 ? (
                        <>
                            <Table isLoading={isPreviousData}>
                                <thead>
                                    <tr>
                                        <th scope="col">id</th>
                                        <th scope="col">article cover</th>
                                        <th scope="col">article title</th>
                                        <th scope="col">author</th>
                                        <th scope="col">published date</th>
                                        <th>delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {articles?.map((article, index) => {
                                        return <tr key={article.id}>
                                            <td data-label='id'>
                                                {computedIndex + index}
                                            </td>
                                            <td data-label='cover'>
                                                <img src={article.articleCover} />
                                            </td>
                                            <td data-label='title'>
                                                {article.articleTitle}
                                            </td>
                                            <td data-label='author'>
                                                {article.author}
                                            </td>
                                            <td data-label='date'>{article.publishedDate}</td>
                                            <td className='table-button' >
                                                <Button title='delete' mode='error' onclick={() => {
                                                    showDeleteModal()
                                                    setArticleId(article.id)
                                                }} />
                                            </td>
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
            {DeleteModalComponent('delete', removeArticle, isArticleRemoveLoading)}
        </>
    )
}
