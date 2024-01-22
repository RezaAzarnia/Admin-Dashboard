import React, { useRef, useState } from 'react'
import { addUser, deleteUser, editUser, getUsers } from '../../services/Axios/Requests/users'
import { Formik, Form } from 'formik'
import { FaEyeSlash, FaEye } from "react-icons/fa";
import BreadCrump from '../../Components/BreadCrump/BreadCrump'
import SectionHeader from '../../Components/SectionHeader/SectionHeader'
import Input from '../../Components/Form/Input/Input'
import Table from '../../Components/Table/Table'
import Button from '../../Components/Form/Button/Button'
import EditModal from '../../Components/Modals/EditModal/EditModal'
import useToast from '../../hooks/useToast'
import useConfirmModal from '../../hooks/useConfirmModal';
import Alert from '../../Components/Alert/Alert'
import useDeleteItem from '../../hooks/useDeleteItem';
import useItemMutation from '../../hooks/useItemMutation';
import usePagination from '../../hooks/usePagination';
import Paginator from '../../Components/Paginator/Paginator';
import SkeletonTable from '../../Components/SkeletonLoader/SkeletonTable/SkeletonTable';
import './ManageUsers.scss'

export default function ManageUsers() {
  //define the pagination stuffs
  const usersLimitPerPage = 5;
  const [page, setPage] = useState(1)
  const { data: users, totalPage, isPreviousData, computedIndex, isError, error, isLoading } = usePagination('Users', getUsers, page, usersLimitPerPage)

  const { showToast, ToastComponent } = useToast()
  const [showPassword, setShowPassword] = useState(false)
  const [isShowEditModal, setIsShowEditModal] = useState(false)
  const [editUserInitialValue, setEditUserInitialValue] = useState({})
  const [userId, setUserId] = useState(0);
  const { showConfirmModal: showDeleteModal, hideConfirmModal: hideDeleteModal, ConfirmModalComponent: DeleteModalComponent } = useConfirmModal()
  const resetFormRef = useRef();
  const initialValues = {
    fullName: "",
    userName: "",
    userEmail: "",
    password: ""
  }
  const validateUsersForm = (data) => {
    const errors = []
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!data.fullName.trim()) {
      errors.push("Enter user firstName please!!")
    }
    if (!data.userName.trim()) {
      errors.push("Enter userName please!!")
    }
    if (!data.userEmail.trim()) {
      errors.push("Enter user email please!!",)
    } else if (!emailRegex.test(data.userEmail.trim())) {
      errors.push("Please enter a valid email")
    }
    if (!data.password) {
      errors.push("Enter user password please!!")
    } else if (!data.password.match(/^(?!.*\s+$).*$/)) {
      errors.push("Enter valid password!!")
    }
    else if (data.password.length < 8) {
      errors.push("password should at least 8 characters")
    }
    return errors
  }
  const { mutate: createUser, isLoading: isCreateUserLoading } = useItemMutation(async (data) => {
    const usersErrors = validateUsersForm(data)
    if (usersErrors.length > 0) {
      return Promise.reject(usersErrors)
    }
    const createUserResponse = await addUser({ ...data })
    return createUserResponse;

  }, 'Users',
    (success) => {
      showToast('success', success.message)
      resetFormRef.current()
    },
    (error) => {
      showToast('error', error)
    }
  )
  const { mutate: editUserInfo, isLoading: isEditUserLoading } = useItemMutation(async (values) => {
    const formErros = validateUsersForm(values)
    const isUserValuesChanged = Object.keys(values).some((key) => values[key] !== editUserInitialValue[key]);

    //check if user email changed or not if changed the useremail existense will be checked in service
    const isUserEmailChanged = (values['userEmail'] !== editUserInitialValue['userEmail']);

    if (!isUserValuesChanged) { //check if all inputs values not changed => do nothing 
      setIsShowEditModal(false)
      return Promise.reject('')
    }
    if (formErros.length > 0) {
      return Promise.reject(formErros)
    }
    const editResponse = await editUser(userId, { ...values }, isUserEmailChanged)
    setIsShowEditModal(false)
    return editResponse

  }, 'Users',
    (success) => {
      showToast('success', success.message)
    },
    (error) => {
      showToast('error', error)
    })
  const { mutate: removeUser, isLoading: isUserDeleting } = useDeleteItem(async () => {
    const deleteUserResponse = await deleteUser(userId)
    return deleteUserResponse;
  }, ['Users', page], userId, page, setPage, totalPage, usersLimitPerPage,
    (success) => {
      console.log(success)
      showToast('success', success.message)
      hideDeleteModal()
    }
    ,
    (error) => {
      showToast('error', error)
      hideDeleteModal()
    }
  )

  if (isError) {
    return <Alert message={error} />
  }
  return (
    <>
      <BreadCrump />
      <div className="users-container">
        <div className="add-user-part">
          <SectionHeader title='add user' />
          <Formik initialValues={initialValues} onSubmit={(values, { resetForm }) => {
            resetFormRef.current = resetForm;
            createUser(values);
          }}>
            <Form>
              <div className="add-user-row">
                <Input type='text' placeholder='jack' lableTitle='enter user fullName: ' name='fullName' />
                <Input type='text' placeholder='jack' lableTitle='enter userName: ' name='userName' />
                <Input type='text' placeholder='jack@gamil.com' lableTitle='enter user email: ' name='userEmail' />
                <div className="password-input-part">
                  <Input type={`${showPassword ? 'text' : 'password'}`}
                    placeholder='password'
                    lableTitle='enter password:'
                    name='password' />
                  <div className='password-icon' onClick={() => setShowPassword(prev => !prev)}>
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </div>
                </div>
                <div className="save-user-btn">
                  <Button title='save user' mode='success' type='submit' isLoading={isCreateUserLoading} />
                </div>
              </div>
            </Form>
          </Formik>
        </div>
        {
          isLoading ? <SkeletonTable /> :
            users?.length > 0 ?
              <div className="users-table">
                <SectionHeader title='users' />
                <Table isLoading={isPreviousData}>
                  <thead>
                    <tr>
                      <th>index</th>
                      <th>name</th>
                      <th>username</th>
                      <th>email</th>
                      <th>regitserDate</th>
                      <th>edit</th>
                      <th>delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      users?.map((user, index) => {
                        return (
                          <tr key={user.id}>
                            <td>{computedIndex + index}</td>
                            <td>{user.fullName}</td>
                            <td>{user.userName}</td>
                            <td>{user.userEmail}</td>
                            <td>{user.registerDate}</td>
                            <td className='table-button'>
                              <Button title='edit' mode='success' onclick={() => {
                                setIsShowEditModal(true);
                                setEditUserInitialValue({ ...user })
                                setUserId(user.id)
                              }} />
                            </td>
                            <td className='table-button'>
                              <Button title='delete' mode='error' onclick={() => {
                                showDeleteModal()
                                setUserId(user.id)
                              }} />
                            </td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </Table>
              </div>
              : <Alert message='no users available' />
        }

        <Paginator
          page={page}
          setPage={setPage}
          isPreviousData={isPreviousData}
          totalPage={totalPage}
          data={users} />
      </div >

      {ToastComponent()}
      {DeleteModalComponent('delete', removeUser, isUserDeleting)}
      {
        isShowEditModal &&
        <EditModal
          title='edit user'
          isOpen={isShowEditModal}
          isLoading={isEditUserLoading}
          setIsOpen={setIsShowEditModal}
          onSubmit={editUserInfo}
          initialValues={editUserInitialValue}
        >
          <Input type='text' placeholder='jack' lableTitle='enter user fullName:' name='fullName' />
          <Input type='text' placeholder='jack' lableTitle='enter username' name='userName' />
          <Input type='email' placeholder='jack@gmai.com' lableTitle='enter user email:' name='userEmail' />
          <Input type='password' placeholder='password' lableTitle='enter password:' name='password' />
        </EditModal>
      }
    </>
  )
}
