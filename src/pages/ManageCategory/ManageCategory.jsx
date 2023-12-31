import React, { useEffect, useState } from 'react'
import { addCategory, deleteCategory, editCategory, getCategory } from '../../services/Axios/Requests/category'
import { Form, Formik } from 'formik'
import BreadCrump from '../../Components/BreadCrump/BreadCrump'
import SectionHeader from '../../Components/SectionHeader/SectionHeader'
import Table from '../../Components/Table/Table'
import Input from '../../components/Form/Input/Input'
import Button from '../../components/Form/Button/Button'
import EditModal from '../../Components/Modals/EditModal/EditModal'
import useToast from '../../hooks/useToast'
import useConfirmModal from '../../hooks/useConfirmModal'
import Alert from '../../Components/Alert/Alert'
import './ManageCategory.scss'

export default function AddCategory() {
  const { showToast, ToastComponent } = useToast()
  const [categories, setCategories] = useState([])
  const [categoryId, setCategoryId] = useState(0)
  const [isShowEditModal, setIshowEditModal] = useState(false)
  const [editCategoryInitialValues, setEditCategoryInitialValues] = useState({})
  const { showConfirmModal: showDeleteModal, hideConfirmModal: hideDeleteModal, ConfirmModalComponent: DeleteModalComponent } = useConfirmModal()

  const initialValues = {
    categoryName: '',
    categoryShortName: ''
  }
  const getCategories = async () => {
    const response = await getCategory()
    setCategories(response)
  }
  useEffect(() => {
    getCategories()
  }, [])
  const validateCategoryForm = (data) => {
    const errors = []
    if (!data.categoryName.trim()) {
      errors.push("Enter the category name please!")
    }
    if (!data.categoryShortName.trim()) {
      errors.push("Enter the category ShortName please!")
    }
    return errors;
  }
  const handleSubmit = async (data, { resetForm }) => {
    const categoryInputsErrors = validateCategoryForm(data);
    if (categoryInputsErrors.length > 0) {
      showToast('error', categoryInputsErrors.map((item, index) => <p key={index + 1}>{item}</p>))
      return;
    }

    const response = await addCategory({ ...data })
    switch (response.status) {
      case 200:
        showToast('success', response.message)
        resetForm()
        getCategories()
        break
      default:
        showToast('error', response.message)
        break
    }

  }
  const removeCategory = async () => {
    const response = await deleteCategory(categoryId)
    hideDeleteModal()
    switch (response.status) {
      case 200:
        showToast('success', response.message)
        getCategories()
        break
      default:
        showToast('error', response.message)
    }
  }
  const handleEditCategory = async (values) => {
    const categoryErrors = validateCategoryForm(values)
    if (categoryErrors.length > 0) {
      showToast('error', categoryErrors.map((item, index) => <p key={index + 1}>{item}</p>))
      return
    }
    const response = await editCategory(categoryId, { ...values })
    switch (response.status) {
      case 200:
        showToast('success', response.message)
        setIshowEditModal(false)
        getCategories()
        break
      default:
        showToast('error', response.message)
        break
    }
  }

  return (
    <>
      {ToastComponent()}
      {DeleteModalComponent('delete', removeCategory)}
      {
        isShowEditModal &&
        <EditModal
          title='edit category'
          isOpen={isShowEditModal}
          setIsOpen={setIshowEditModal}
          initialValues={editCategoryInitialValues}
          onSubmit={handleEditCategory}>
          <Input type='text' placeholder='baby cloth' lableTitle='category name' name='categoryName' />
          <Input type='text' placeholder='baby-cloth' lableTitle='category shortName' name='categoryShortName' />
        </EditModal>
      }
      <BreadCrump />
      <div className="add-category-container">
        <SectionHeader title='add catgory' />
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Form>
            <div className="row-add-category">
              <Input type='text' placeholder='baby cloth' lableTitle='category name' name='categoryName' />
              <Input type='text' placeholder='baby-cloth' lableTitle='category shortName' name='categoryShortName' />
            </div>
            <div className="save-category-btn">
              <Button title='save' mode='success' type='submit' />
            </div>
          </Form>
        </Formik>
        {
          categories.length > 0 ?
            <div className="category-table">
              <SectionHeader title='categories table' />
              <Table>
                <thead>
                  <tr>
                    <th>id</th>
                    <th>category name</th>
                    <th>short Name</th>
                    <th>edit</th>
                    <th>delete</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    categories?.map((category, index) => {
                      return (
                        <tr key={category.id}>
                          <td>{index + 1}</td>
                          <td>{category.categoryName}</td>
                          <td>{category.categoryShortName}</td>
                          <td>
                            <Button title='edit' mode='success' onclick={() => {
                              setIshowEditModal(true)
                              setCategoryId(category.id)
                              setEditCategoryInitialValues(category)

                            }} />
                          </td>
                          <td>
                            <Button title='delete' mode='error' onclick={() => {
                              showDeleteModal()
                              setCategoryId(category.id)
                            }} />
                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </Table >
            </div>
            : <Alert message='no category available' />
        }
      </div>
    </>
  )
}
