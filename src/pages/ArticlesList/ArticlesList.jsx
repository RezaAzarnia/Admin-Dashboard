import React, { useEffect, useState } from 'react'
import ArticleCard from '../../Components/ArticeCard/ArticleCard'
import BreadCrump from '../../Components/BreadCrump/BreadCrump'
import { getArticles } from '../../services/Axios/Requests/articles'
import Alert from '../../Components/Alert/Alert'
import './ArticlesList.scss'

export default function ArticlesList() {
  const [articles, setArticles] = useState([])
  const getArticle = async () => {
    const response = await getArticles()
    setArticles(response)
  }
  useEffect(() => {
    getArticle()
  }, [])

  return (
    <>
      <BreadCrump />
      <div className='articles-container'>
        {
          articles.length > 0 ?
            <div className="articles-row">
              {
                articles.map(item => {
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
