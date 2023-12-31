import React, { useEffect, useState } from 'react'
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
import './ManageUsers.scss'


export default function ManageUsers() {
  const { showToast, ToastComponent } = useToast()
  const [users, setUsers] = useState([])
  const [showPassword, setShowPassword] = useState(false)
  const [isShowEditModal, setIsShowEditModal] = useState(false)
  const [userId, setUserId] = useState(0);
  const [editUserInitialValue, setEditUserInitialValue] = useState({})
  const { showConfirmModal: showDeleteModal, hideConfirmModal: hideDeleteModal, ConfirmModalComponent: DeleteModalComponent } = useConfirmModal()


  const initialValues = {
    fullName: "",
    userName: "",
    userEmail: "",
    password: ""
  }
  const getUser = async () => {
    const response = await getUsers()
    setUsers(response)
  }
  useEffect(() => {
    getUser()
  }, [])

  const validateUsersForm = (data) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const errors = []
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
  const submitAddUser = async (data, { resetForm }) => {
    const usersErrors = validateUsersForm(data)
    if (usersErrors.length > 0) {
      showToast('error', usersErrors.map((item, index) => <p key={index + 1}>{item}</p>))
      return
    }
    const response = await addUser({ ...data })
    switch (response.status) {
      case 200:
        showToast('success', response.message)
        resetForm()
        getUser()
        break;

      default:
        showToast('error', response.message)
        break
    }
  }
  const removeUser = async () => {

    const response = await deleteUser(userId)
    hideDeleteModal()
    switch (response.status) {
      case 200:
        showToast('success', response.message)
        getUser()
        break
      default:
        showToast('error', response.message)
        break
    }
  }
  const editUserValues = async (values) => {

    const formErros = validateUsersForm(values)
    const areValuesChanged = Object.keys(values).some((key) => values[key] !== editUserInitialValue[key]);
    const isUserEmailChanged = values['userEmail'] !== editUserInitialValue['userEmail'];

    if (!areValuesChanged) { //check if all inputs values not changed => do nothing 
      setIsShowEditModal(false)
      return
    }

    if (formErros.length > 0) {
      showToast('error', formErros.map((item, index) => <p key={index + 1}>{item}</p>))
      return
    }
    const editResponse = await editUser(userId, { ...values }, isUserEmailChanged)

    switch (editResponse.status) {
      case 200:
        showToast('success', editResponse.message)
        getUser()
        setIsShowEditModal(false)
        break
      default:
        showToast('error', editResponse.message)
        break
    }

  }
  return (
    <>
      {ToastComponent()}
      {DeleteModalComponent('delete', removeUser)}
      {
        isShowEditModal &&
        <EditModal
          isOpen={isShowEditModal}
          setIsOpen={setIsShowEditModal}
          onSubmit={editUserValues}
          initialValues={editUserInitialValue}
          title='edit user'
        >
          <Input type='text' placeholder='jack' lableTitle='enter user fullName:' name='fullName' />
          <Input type='text' placeholder='jack' lableTitle='enter username' name='userName' />
          <Input type='email' placeholder='jack@gmai.com' lableTitle='enter user email:' name='userEmail' />
          <Input type='password' placeholder='password' lableTitle='enter password:' name='password' />
        </EditModal>
      }
      <BreadCrump />
      <div className="users-container">
        <div className="add-user-part">
          <SectionHeader title='add user' />
          <Formik initialValues={initialValues} onSubmit={submitAddUser}>
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
          users.length > 0 ?
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
                          <td>{index + 1}</td>
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
      </div>


    </>
  )
}
