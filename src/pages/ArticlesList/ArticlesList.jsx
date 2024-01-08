import React from 'react'
import ArticleCard from '../../Components/ArticeCard/ArticleCard'
import BreadCrump from '../../Components/BreadCrump/BreadCrump'
import { getAllArticles } from '../../services/Axios/Requests/articles'
import Alert from '../../Components/Alert/Alert'
import useFetchItem from '../../hooks/useFetchItem'
import './ArticlesList.scss'

export default function ArticlesList() {
  const { data: articles } = useFetchItem('Articles', getAllArticles)
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
      </div>
    </>
  )
}
