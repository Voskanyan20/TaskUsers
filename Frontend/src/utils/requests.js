import { error, succesPost } from './Messages'
import instance from './axios'

const getUsers = async setUserData => {
  return await instance
    .get(`/getUsers`)
    .then(resp => {
      setUserData(resp.data)
    })
    .catch(err => {
      error(err.message)
    })
}

const createUser = async (FormData, render, setRender) => {
  await instance
    .post('/createUser', FormData)
    .then(() => {
      setRender(!render)
      succesPost()
    })
    .catch(err => {
      error(err.message)
    })
}

const searchUsers = async (
  firstName,
  lastName,
  keywords,
  setSearchResults,
  render,
  setRender
) => {
  await instance
    .post('/searchUsers', {
      firstName: firstName,
      lastName: lastName,
      keywords: keywords
    })
    .then(res => {
      console.log(res)
      setSearchResults(res.data)
      setRender(!render)
      succesPost()
    })
    .catch(err => {
      console.log(err)
      error(err.message)
    })
}

export { getUsers, createUser, searchUsers }
