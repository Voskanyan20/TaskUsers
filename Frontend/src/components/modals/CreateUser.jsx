import { Button, Form, Input, Modal } from 'antd'
import { useState } from 'react'
import { createUser } from '../../utils/requests'
import { cancel } from '../../utils/Messages'
import Keywords from './Keywords'

const CreateUser = ({ render, setRender }) => {
  const [open, setOpen] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [keywords, setKeywords] = useState([])
  const [file, setFile] = useState(null)

  const handleFileChange = event => {
    setFile(event.target.files[0])
  }
  const CreateUsers = async () => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('firstName', firstName)
    formData.append('lastName', lastName)
    formData.append('keywords', JSON.stringify(keywords))

    createUser(formData, render, setRender)
    setOpen(false)
  }
  const Cancel = () => {
    cancel()
    setOpen(false)
  }

  return (
    <>
      <Button
        onClick={() => {
          setOpen(true)
        }}
      >
        Create User
      </Button>
      <Modal
        title='Create User'
        centered
        open={open}
        footer={null}
        onCancel={() => {
          cancel()
          setOpen(false)
        }}
        destroyOnClose
        width={700}
      >
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 12 }}
          layout='horizontal'
          style={{ maxWidth: 800 }}
          onFinish={() => {
            CreateUsers()
          }}
        >
          <Form.Item
            label='FirstName'
            name='firstName'
            rules={[
              { required: true, message: 'Please write your firstName' },
              { min: 3 }
            ]}
            hasFeedback
          >
            <Input
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              className='modal_input'
            />
          </Form.Item>
          <Form.Item
            label='LastName'
            name='lastName'
            rules={[
              { required: true, message: 'Please write your lastName' },
              { min: 3 }
            ]}
            hasFeedback
          >
            <Input
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              className='modal_input'
            />
          </Form.Item>
          <Form.Item label='Keywords' name='keywords'>
            <Keywords
              keywords={keywords}
              setKeywords={setKeywords}
              render={render}
              setRender={setRender}
            />
          </Form.Item>
          <Form.Item label='File' name='file' rules={[{ required: true }]}>
            <Input
              type='file'
              accept='.docx , .txt , .pdf , .doc'
              value={file}
              onChange={handleFileChange}
              className='modal_input'
            />
          </Form.Item>

          <Form.Item wrapperCol={{ span: 24 }}>
            <div className='modalButton'>
              <Button onClick={Cancel}>Cancel</Button>
              <Button type='primary' htmlType='submit'>
                Add
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
export default CreateUser
