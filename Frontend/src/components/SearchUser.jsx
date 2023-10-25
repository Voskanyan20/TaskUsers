import { Button, Form, Input, Modal } from 'antd'
import { useState } from 'react'
import { cancel } from '../utils/Messages'
import { searchUsers } from '../utils/requests'

const SearchUser = ({ setSearchResult, render, setRender }) => {
  const [open, setOpen] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [keywords, setKeywords] = useState('')

  const SearchUsers = async () => {
    searchUsers(
      firstName,
      lastName,
      keywords,
      setSearchResult,
      render,
      setRender
    )
    setOpen(false)
  }
  const Cancel = () => {
    setOpen(false)
  }

  return (
    <>
      <Button
        onClick={() => {
          setOpen(true)
        }}
      >
        Search
      </Button>
      <Modal
        title='Search User'
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
            SearchUsers()
          }}
        >
          <Form.Item label='FirstName' name='firstName'>
            <Input
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              className='modal_input'
            />
          </Form.Item>
          <Form.Item label='LastName' name='lastName'>
            <Input
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              className='modal_input'
            />
          </Form.Item>
          <Form.Item label='Keywords' name='keywords'>
            <Input
              value={keywords}
              onChange={e => setKeywords(e.target.value)}
              className='modal_input'
            />
          </Form.Item>
          <Form.Item wrapperCol={{ span: 24 }}>
            <div className='modalButton'>
              <Button onClick={Cancel}>Cancel</Button>
              <Button type='primary' htmlType='submit'>
                Search
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
export default SearchUser
