import React from 'react'
import { Link } from 'react-router-dom'
import './ArticleCard.scss'
import DOMPurify from 'dompurify'
export default function ArticleCard({ id, articleCover, author, articleTitle, articleBody, publishedDate }) {
    const sanitizedBody = { __html: DOMPurify.sanitize(articleBody) };
    return (
        <article className="article-card">
            <Link to={`/article/${id}`} className='article-card-link'>
                <div className="img-box">
                    <img src={articleCover} alt="" className="article-banner" />
                </div>
                <div className="article-content">
                    <h3 className="article-card-title" >{articleTitle}</h3>
                    <p className="article-text" dangerouslySetInnerHTML={sanitizedBody}>
                    </p>
                    <div className="acticle-content-footer">
                        <div className="author">
                            <img src="./images/profile.png" alt="" className="author-avater" />
                            <div className="author-info">
                                <h4 className="author-name">{author}</h4>
                                <div className="publish-date">{publishedDate}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </article>
    )
}
