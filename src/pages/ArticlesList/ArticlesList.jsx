import React from 'react'
import ArticleCard from '../../Components/ArticeCard/ArticleCard'
import BreadCrump from '../../Components/BreadCrump/BreadCrump'
import { getArticles } from '../../services/Axios/Requests/articles'
import useInfiniteScroll from '../../hooks/useInfiniteScroll'
import Alert from '../../Components/Alert/Alert'
import Button from '../../Components/Form/Button/Button'
import './ArticlesList.scss'

export default function ArticlesList() {
  const { data: articles, isFetchingNextPage, hasNextPage, fetchNextPage, isLoading, isError, error } = useInfiniteScroll('Articles', getArticles, 4);
  const ArticleSkeletonLoader = () => {
    return (
      <article className="article-card skeleton-loading">
        <div className="img-box skeleton"></div>
        <div className="article-content">
          <h3 className="article-card-title skeleton"></h3>
          <p className="article-text skeleton"></p>
          <div className="acticle-content-footer">
            <div className="author">
              <div className="author-avater skeleton"></div>
            </div>
          </div>
        </div>
      </article>
    )
  }
  if (isLoading) {
    console.log('loading')
    return (
      <div className='articles-container'>
        <div className="articles-row">
          {Array.from({ length: 4 }, (_, i) => <ArticleSkeletonLoader key={i + 1} />)}
        </div>
      </div>
    )
  }
  if (isError) {
    return <Alert message={error} />
  }
  return (
    <>
      <BreadCrump />
      <div className='articles-container'>
        {
          articles?.length > 0 ?
            <div className="articles-row">
              {
                articles?.map(item => {
                  return <ArticleCard {...item} key={item.id} />
                })
              }
            </div>
            : <Alert message='no article avalible' />
        }
        {
          hasNextPage &&
          <div className="load-more-button">
            <Button title='load more' mode='success' onclick={fetchNextPage} disabled={!hasNextPage} isLoading={isFetchingNextPage} />
          </div>
        }
      </div>
    </>
  )
}
