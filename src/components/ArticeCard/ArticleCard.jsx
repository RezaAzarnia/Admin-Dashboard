import React from 'react'
import { Link } from 'react-router-dom'
import './ArticleCard.scss'
export default function ArticleCard({ id, articleCover, author, articleTitle, publishedDate,
    articleDescription = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas numquam ad dignissimos atque minima rerum facilis ratione iusto quam debitis sapiente, assumenda deleniti voluptatum dolore iure voluptate blanditiis? Veniam, amet?',
}) {

    return (
        <article className='article-card'>
            <Link to={`/article/${id}`} className='article-card-link'>
                <div className="img-box">
                    <img src={articleCover} alt="" className="article-banner" />
                </div>
                <div className="article-content">
                    <h3 className='article-card-title'>{articleTitle}</h3>
                    <p className='article-text' >{articleDescription}</p>
                    <div className="acticle-content-footer">
                        <div className="author">
                            <img src="./images/profile.jpg" alt="" className="author-avater" />
                            <div className="author-info">
                                <h4 className='author-name'>{author}</h4>
                                <div className='publish-date'>{publishedDate}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </article>

    )
}
