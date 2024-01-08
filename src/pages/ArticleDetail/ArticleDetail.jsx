import React from 'react'
import BreadCrump from '../../Components/BreadCrump/BreadCrump'
import SectionHeader from '../../Components/SectionHeader/SectionHeader'
import DOMPurify from 'dompurify'
import { useParams } from 'react-router-dom'
import { FaRegCalendarAlt, FaUser } from "react-icons/fa";
import useFetchSingleItem from '../../hooks/useFetchSingleItem'
import { getSingleArticle } from '../../services/Axios/Requests/articles'
import './ArticleDetail.scss'
export default function ArticleDetail() {
    const { id } = useParams('id');
    const { data: article } = useFetchSingleItem("Articles", id, getSingleArticle)
    const { articleTitle, author, publishedDate, articleCover, articleBody } = article || {}
    return (
        <>
            <BreadCrump />
            <div className="article-container">
                <SectionHeader title={articleTitle} />
                <div className="article-author-row">
                    <div className="article-author">
                        <FaUser />
                        <span>{author}</span>
                    </div>
                    <div className="article-publishDate">
                        <FaRegCalendarAlt />
                        <span>{publishedDate}</span>
                    </div>
                </div>
                <div className="article-cover">
                    <img src={articleCover} />
                </div>
                <div className="articel-body-container">
                    <div className='article-body' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(articleBody) }}></div>


                </div>
            </div >
        </>
    )
}
