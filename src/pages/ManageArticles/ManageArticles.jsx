import React, { useEffect, useState } from 'react'
import { deleteArticle, getArticles } from '../../services/Axios/Requests/articles'
import BreadCrump from '../../Components/BreadCrump/BreadCrump'
import SectionHeader from '../../Components/SectionHeader/SectionHeader'
import Table from '../../Components/Table/Table'
import Alert from '../../Components/Alert/Alert'
import Button from '../../components/Form/Button/Button'
import useConfirmModal from '../../hooks/useConfirmModal'
import useToast from '../../hooks/useToast'
import './ManageArticles.scss'
export default function ManageArticles() {
    const { showConfirmModal: showDeleteModal, hideConfirmModal: hideDeleteModal, ConfirmModalComponent: DeleteModalComponent } = useConfirmModal()
    const { showToast, ToastComponent } = useToast()

    const [articles, setArticles] = useState([])
    const [articleId, setArticleId] = useState(0)

    const getArticle = async () => {
        const response = await getArticles()
        setArticles(response)
    }
    const removeArticle = async () => {
        const deleteResponse = await deleteArticle(articleId)
        switch (deleteResponse.status) {
            case 200:
                showToast('success', deleteResponse.message)
                hideDeleteModal()
                getArticle()
                break;
            default:
                showToast('error', deleteResponse.message)
                break;
        }
    }
    useEffect(() => {
        getArticle()
    }, [])

    return (
        <>
            {DeleteModalComponent('delete', removeArticle)}
            {ToastComponent()}
            <BreadCrump />
            <div className="manage-articles-container">
                {
                    articles.length > 0 ? (
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
                                    {articles.map((article, index) => {
                                        return <tr key={article.id}>
                                            <td>{index + 1}</td>
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
            </div>

        </>
    )
}
