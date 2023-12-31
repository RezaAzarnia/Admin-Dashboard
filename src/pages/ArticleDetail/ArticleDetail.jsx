import React, { useEffect, useState } from 'react'
import BreadCrump from '../../Components/BreadCrump/BreadCrump'
import SectionHeader from '../../Components/SectionHeader/SectionHeader'
import DOMPurify from 'dompurify'
import { useParams } from 'react-router-dom'
import { getSingleArticle } from '../../services/Axios/Requests/articles'
import { FaRegCalendarAlt, FaUser } from "react-icons/fa";

import './ArticleDetail.scss'
export default function ArticleDetail() {
    const { id } = useParams('id');
    const [article, setArticle] = useState({})

    const getArticleInfo = async () => {
        const response = await getSingleArticle(id)
        setArticle(response)
    }
    useEffect(() => {
        getArticleInfo()
    }, [id])

    return (
        <>
            <BreadCrump />
            <div className="article-container">
                <SectionHeader title={article.articleTitle} />
                <div className="article-author-row">
                    <div className="article-author">
                        <FaUser />
                        <span>{article.author}</span>
                    </div>
                    <div className="article-publishDate">
                        <FaRegCalendarAlt />
                        <span>{article.publishedDate}</span>
                    </div>
                </div>
                <div className="article-cover">
                    <img src={article.articleCover} />
                </div>
                <div className="articel-body-container">
                    <div className='article-body' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(article.articleBody) }}></div>


                </div>
            </div >
        </>
    )
}
