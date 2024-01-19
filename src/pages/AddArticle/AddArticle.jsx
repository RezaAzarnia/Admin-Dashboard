import React, { useEffect, useRef, useState } from 'react'
import { Form, Formik } from 'formik';
import { addArticle } from '../../services/Axios/Requests/articles';
import Input from '../../components/Form/Input/Input';
import BreadCrump from '../../Components/BreadCrump/BreadCrump';
import TextEditor from '../../Components/Form/TextEditor';
import SectionHeader from '../../Components/SectionHeader/SectionHeader';
import UploadButton from '../../Components/Form/UploadButton/UploadButton';
import Button from '../../Components/Form/Button/Button';
import useItemMutation from '../../hooks/useItemMutation';
import useToast from '../../hooks/useToast';
import './AddArticle.scss'

export default function AddArtice() {
    const { showToast, ToastComponent } = useToast()
    const [articleCover, setArticleCover] = useState('')
    const [coverErrors, setCoverErrors] = useState('')
    const resetFormRef = useRef()

    const initialValue = {
        articleTitle: '',
        articleDescription: '',
        articleBody: '',
        articleCover
    }
    useEffect(() => {
        if (coverErrors.length > 0) {
            showToast('error', coverErrors)
        }
        setCoverErrors('')
    }, [coverErrors])

    const valdateArticleForm = (data) => {
        let errors = []
        if (!data.articleTitle.trim()) {
            errors.push('please enter article title!')
        }
        if (!data.articleDescription.trim()) {
            errors.push('please enter article description!')
        }
        if (!data.articleBody.trim()) {
            errors.push('please enter article body!')
        }
        if (!data.articleCover) {
            errors.push('please upload article cover!')
        }
        return errors;
    }
    const { mutate: createArticle, isLoading: isCreateArticleLoading } = useItemMutation(async (values) => {
        const articleErrors = valdateArticleForm(values)
        if (articleErrors.length > 0) {
            return Promise.reject(articleErrors);
        }
        const createArticleResponse = await addArticle({ ...values })
        return createArticleResponse;
    }, 'Articles',
        (success) => {
            showToast('success', success.message)
            resetFormRef.current()
            setArticleCover('')
        }, (error) => {
            showToast('error', error)
        })

    return (
        <>
            {ToastComponent()}
            <BreadCrump />
            <div className="addAticle-container">
                <SectionHeader title='add article' />
                <div className="add-article-part">
                    <Formik
                        initialValues={initialValue}
                        onSubmit={(values, { resetForm }) => {
                            resetFormRef.current = resetForm;
                            createArticle(values)
                        }}
                    >
                        <Form>
                            <div className="row-add-article">
                                <Input type='text'
                                    placeholder='test article in the website'
                                    lableTitle='article title'
                                    name='articleTitle'
                                />
                                <Input type='textarea'
                                    placeholder='article description'
                                    lableTitle='article description'
                                    name='articleDescription'
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
                                <Button title='save article' mode='success' type='submit' isLoading={isCreateArticleLoading} />
                                <Button title='cancel' mode='warning' type='button' />
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div >
        </>
    )
}
