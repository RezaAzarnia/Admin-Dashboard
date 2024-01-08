import React, { useRef, useState } from 'react'
import { addCategory, deleteCategory, editCategory, getPaginatedCategory } from '../../services/Axios/Requests/category'
import { Form, Formik } from 'formik'
import BreadCrump from '../../Components/BreadCrump/BreadCrump'
import SectionHeader from '../../Components/SectionHeader/SectionHeader'
import Table from '../../Components/Table/Table'
import Input from '../../components/Form/Input/Input'
import Button from '../../Components/Form/Button/Button'
import EditModal from '../../Components/Modals/EditModal/EditModal'
import useToast from '../../hooks/useToast'
import useConfirmModal from '../../hooks/useConfirmModal'
import Alert from '../../Components/Alert/Alert'
import useItemMutation from '../../hooks/useItemMutation'
import useDeleteItem from '../../hooks/useDeleteItem'
import usePagination from '../../hooks/usePagination'
import Paginator from '../../Components/Paginator/Paginator'
import './ManageCategory.scss'

export default function AddCategory() {
  const [page, setPage] = useState(1)
  const { showToast, ToastComponent } = useToast()
  const [categoryId, setCategoryId] = useState(0)
  const [isShowEditModal, setIshowEditModal] = useState(false)
  const [editCategoryInitialValues, setEditCategoryInitialValues] = useState({})
  const { showConfirmModal: showDeleteModal, hideConfirmModal: hideDeleteModal, ConfirmModalComponent: DeleteModalComponent } = useConfirmModal()
  //category
  const { data: categories, isPreviousData, totalPage, computedIndex } = usePagination('Categories', getPaginatedCategory, page)
  const resetFormRef = useRef()
  const initialValues = {
    categoryName: '',
    categoryShortName: ''
  }

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

  const { mutate: createCategory, isLoading: isCreateCategoryLoading } = useItemMutation(async (data) => {
    const categoryFormErrors = validateCategoryForm(data);

    if (categoryFormErrors.length > 0) {
      showToast('error', categoryFormErrors.map((item, index) => <p key={index + 1}>{item}</p>))
      return Promise.reject(categoryFormErrors[0])
    }
    const createCategoryResponse = await addCategory(data)

    switch (createCategoryResponse.status) {
      case 200:
        showToast('success', createCategoryResponse.message)
        resetFormRef.current();
        return createCategoryResponse
      default:
        showToast('error', createCategoryResponse.message)
        return Promise.reject(createCategoryResponse.message)
    }
  }, 'Categories')

  const { mutate: removeCategory, isLoading: isDeleteLoading } = useDeleteItem(async () => {
    const deleteCategroyResponse = await deleteCategory(categoryId)
    hideDeleteModal()
    switch (deleteCategroyResponse.status) {
      case 200:
        showToast('success', deleteCategroyResponse.message)
        return deleteCategroyResponse
      default:
        showToast('error', deleteCategroyResponse.message)
        return Promise.reject(deleteCategroyResponse.message)
    }
  }, ["Categories", page], categoryId)

  const { mutate: handleEditCategory, isLoading: isEditLoading } = useItemMutation(async (values) => {
    const categoryErrors = validateCategoryForm(values)
    //chacke if catgory values changed or not in edit mode
    const isCategoryValuesChanged = Object.keys(values).some((key) => values[key] !== editCategoryInitialValues[key]);
    if (!isCategoryValuesChanged) {
      setIshowEditModal(false)
      return Promise.reject('no values changes')
    }
    if (categoryErrors.length > 0) {
      showToast('error', categoryErrors.map((item, index) => <p key={index + 1}>{item}</p>))
      return Promise.reject(categoryErrors[0])
    }

    const editCategoryResponse = await editCategory(categoryId, { ...values })
    setIshowEditModal(false)

    switch (editCategoryResponse.status) {
      case 200:
        showToast('success', editCategoryResponse.message)
        return editCategoryResponse
      default:
        showToast('error', editCategoryResponse.message)
        return Promise.reject(editCategoryResponse)
    }
  }, "Categories")

  return (
    <>
      <BreadCrump />
      <div className="add-category-container">
        <SectionHeader title='add catgory' />
        <Formik initialValues={initialValues} onSubmit={(values, { resetForm }) => {
          resetFormRef.current = resetForm;
          createCategory(values)
        }}>
          <Form>
            <div className="row-add-category">
              <Input type='text' placeholder='baby cloth' lableTitle='category name' name='categoryName' />
              <Input type='text' placeholder='baby-cloth' lableTitle='category shortName' name='categoryShortName' />
            </div>
            <div className="save-category-btn">
              <Button title='save' mode='success' type='submit' isLoading={isCreateCategoryLoading} />
            </div>
          </Form>
        </Formik>
        {
          categories?.length > 0 ?
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
                          <td>{computedIndex + index}</td>
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
        <Paginator
          page={page}
          setPage={setPage}
          isPreviousData={isPreviousData}
          totalPage={totalPage}
          data={categories} />
      </div>
      {ToastComponent()}
      {DeleteModalComponent('delete', removeCategory, isDeleteLoading)}
      {
        isShowEditModal &&
        <EditModal
          title='edit category'
          isLoading={isEditLoading}
          isOpen={isShowEditModal}
          setIsOpen={setIshowEditModal}
          initialValues={editCategoryInitialValues}
          onSubmit={handleEditCategory}>
          <Input type='text' placeholder='baby cloth' lableTitle='category name' name='categoryName' />
          <Input type='text' placeholder='baby-cloth' lableTitle='category shortName' name='categoryShortName' />
        </EditModal>
      }
    </>
  )
}
