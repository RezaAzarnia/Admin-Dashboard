import React, { useEffect, useState } from 'react'
import Input from '../../Components/Form/Input/Input';
import BreadCrump from '../../Components/BreadCrump/BreadCrump';
import TextEditor from '../../Components/Form/TextEditor';
import SectionHeader from '../../Components/SectionHeader/SectionHeader';
import UploadButton from '../../Components/Form/UploadButton/UploadButton';
import Button from '../../Components/Form/Button/Button';
import Toast from '../../Components/Toast/Toast'
import { Form, Formik } from 'formik';
import { addArticle } from '../../services/Axios/Requests/articles';
import './AddArticle.scss'

export default function AddArtice() {
    const [articleCover, setArticleCover] = useState('')
    const [coverErrors, setCoverErrors] = useState('')
    const [toastItems, setToastItems] = useState({})
    const [isShowToast, setIsShowToast] = useState(false)
    const initialValuee = {
        articleTitle: '',
        articleCover,
        articleBody: ''
    }
    useEffect(() => {
        if (coverErrors.length > 0) {
            setIsShowToast(true)
            setToastItems({
                mode: 'error',
                title: coverErrors
            })
        }
        setCoverErrors('')
    }, [coverErrors])

    const valdateArticleForm = (data) => {
        let errors = []
        if (!data.articleTitle.trim()) {
            errors.push('please enter article title')
        }
        if (!data.articleBody.trim()) {
            errors.push('please enter article body!')
        }
        if (!data.articleCover) {
            errors.push('please upload article cover!')
        }
        return errors;
    }
    const handleSubmit = async (values, { resetForm }) => {
        const articleErrors = valdateArticleForm(values)

        if (articleErrors.length > 0) {
            setIsShowToast(true)
            setToastItems({
                mode: 'error',
                title: articleErrors.map((item, index) => <p key={index + 1}>{item}</p>)
            })
            return
        }
        const trimedArticleData = Object.fromEntries(Object.entries(values).map(([key, value]) => [key, value.trim()]))
        const response = await addArticle({ ...trimedArticleData })

        setIsShowToast(true)
        switch (response.status) {
            case 200:
                setToastItems({
                    mode: 'success',
                    title: response.message
                })
                resetForm()
                setArticleCover('')
                break
            default:
                setToastItems({
                    mode: 'error',
                    title: response.message
                })
                break
        }
    }
    return (
        <>
            {isShowToast && <Toast {...toastItems} isShowToast={isShowToast} setIsShowToast={setIsShowToast} />}
            <BreadCrump />
            <div className="addAticle-container">
                <SectionHeader title='add article' />
                <div className="add-article-part">
                    <Formik
                        initialValues={initialValuee}
                        onSubmit={handleSubmit}
                    >
                        <Form>
                            <div className="row-add-article">
                                <Input type='text'
                                    placeholder='test article in the website'
                                    lableTitle='article title'
                                    name='articleTitle'
                                />
                            </div>
                            <div className="editor-part">
                                <TextEditor name='articleBody' />
                            </div>
                            <div className="article-image-part">
                                <SectionHeader title='article cover' />
                                <div className="image-upload">
                                    {
                                        articleCover ? (
                                            <img src={articleCover} alt="" className="showimgPreview" />
                                        ) : (
                                            <div className='showimgPreview gray-box'>
                                                <span className='img-size-show'>302 * 355</span>
                                            </div>
                                        )
                                    }
                                    <UploadButton
                                        name="articleCover"
                                        setCover={setArticleCover}
                                        setError={setCoverErrors}
                                    />
                                </div>
                            </div>
                            <div className="add-article-buttons">
                                <Button title='save article' mode='success' type='submit' />
                                <Button title='cancel' mode='warning' />
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div >
        </>
    )
}
