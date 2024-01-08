import React, { useRef, useState } from 'react'
import { addUser, deleteUser, editUser, getPaginatedUsers } from '../../services/Axios/Requests/users'
import { Formik, Form } from 'formik'
import { FaEyeSlash, FaEye } from "react-icons/fa";
import BreadCrump from '../../Components/BreadCrump/BreadCrump'
import SectionHeader from '../../Components/SectionHeader/SectionHeader'
import Input from '../../components/Form/Input/Input'
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
import './ManageUsers.scss'

export default function ManageUsers() {
  //define the pagination stuffs
  const [page, setPage] = useState(1)
  const { data: users, totalPage, isPreviousData, computedIndex } = usePagination('Users', getPaginatedUsers, page)

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
    if (!data.password.trim()) {
      errors.push("Enter user password please!!")
    } else if (data.password.length < 8) {
      errors.push("password should at least 8 characters")
    }
    return errors
  }

  const { mutate: createUser } = useItemMutation(async (data) => {
    const usersErrors = validateUsersForm(data)
    if (usersErrors.length > 0) {
      showToast('error', usersErrors.map((item, index) => <p key={index + 1}>{item}</p>))
      return Promise.reject(usersErrors[0])
    }
    const createUserResponse = await addUser({ ...data })
    switch (createUserResponse.status) {
      case (200):
        showToast('success', createUserResponse.message)
        resetFormRef.current()
        return createUserResponse;
      default:
        showToast('error', createUserResponse.message)
        return Promise.reject(createUserResponse.message)

    }
  }, 'Users')

  const { mutate: removeUser, isLoading: isUserDeleting } = useDeleteItem(async () => {
    console.log(userId)
    const deleteUserResponse = await deleteUser(userId)
    hideDeleteModal()
    switch (deleteUserResponse.status) {
      case (200):
        showToast('success', deleteUserResponse.message)
        return deleteUserResponse;
      default:
        showToast('error', deleteUserResponse.message)
        return Promise.reject(deleteUserResponse.message)
    }
  }, ['Users', page], userId)

  const { mutate: editUserInfo } = useItemMutation(async (values) => {
    const formErros = validateUsersForm(values)
    const isUserValuesChanged = Object.keys(values).some((key) => values[key] !== editUserInitialValue[key]);

    //check if user email changed or not if changed the useremail existense will be checked in service
    const isUserEmailChanged = (values['userEmail'] !== editUserInitialValue['userEmail']);

    if (!isUserValuesChanged) { //check if all inputs values not changed => do nothing 
      setIsShowEditModal(false)
      return Promise.reject('no change on user')
    }

    if (formErros.length > 0) {
      showToast('error', formErros.map((item, index) => <p key={index + 1}>{item}</p>))
      return Promise.reject(formErros[0])
    }
    const editResponse = await editUser(userId, { ...values }, isUserEmailChanged)

    switch (editResponse.status) {
      case 200:
        showToast('success', editResponse.message)
        setIsShowEditModal(false)
        return editResponse
      default:
        showToast('error', editResponse.message)
        return Promise.reject(editResponse.message)
    }
  }, 'Users')

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
                  <Button title='save user' mode='success' type='submit' />
                </div>
              </div>
            </Form>
          </Formik>
        </div>
        {
          users?.length > 0 ?

            <div className="users-table">
              <SectionHeader title='users' />
              <Table>
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
                          <td>
                            <Button title='edit' mode='success' onclick={() => {
                              setIsShowEditModal(true);
                              setEditUserInitialValue({ ...user })
                              setUserId(user.id)
                            }} />
                          </td>
                          <td>
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
          isOpen={isShowEditModal}
          setIsOpen={setIsShowEditModal}
          onSubmit={editUserInfo}
          initialValues={editUserInitialValue}
          title='edit user'
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
