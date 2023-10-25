import { message } from 'antd'

const succesPost = () => {
  message.success('POST 200: (Success Request)')
}

const error = err => {
  message.error(err)
}

const cancel = err => {
  message.info('Cancel')
}

export { succesPost, error, cancel }
