import { Space, Table, Tag } from 'antd'
import { useEffect, useState } from 'react'
import { getUsers } from '../utils/requests'
import CreateUser from './modals/CreateUser'
import SearchUser from './SearchUser'

export default function Main () {
  const [render, setRender] = useState(false)
  const [userData, setUserData] = useState(null)
  const [searchResult, setSearchResult] = useState([])
  let lastIndex = 0
  const updateIndex = () => {
    lastIndex++
    return lastIndex
  }

  useEffect(() => {
    async function fetchData () {
      await getUsers(setUserData)
    }
    fetchData()
  }, [render])

  const [columns] = useState([
    {
      title: 'First Name',
      dataIndex: 'firstName'
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName'
    },
    {
      title: 'Keywords',
      render: record => {
        return (
          <>
            {record.keywords &&
              record.keywords.map(item => {
                return (
                  <Space key={item.id} size={[0, 8]} wrap>
                    <Tag key={item.id} color='cyan'>
                      {item.name}
                    </Tag>
                  </Space>
                )
              })}
          </>
        )
      }
    },
    {
      title: 'Resume',
      render: record => {
        return (
          <>
            <a
              href={`/uploads/${record.filename}`}
              download={record.fileOriginalName}
            >
              {record.fileOriginalName}
            </a>
          </>
        )
      }
    }
  ])

  return (
    <div className='table'>
      <div className='tableHeader'>
        <SearchUser
          setSearchResult={setSearchResult}
          render={render}
          setRender={setRender}
        />
        <CreateUser render={render} setRender={setRender} />
      </div>
      <Table
        columns={columns}
        rowKey={updateIndex}
        dataSource={searchResult.length > 0 ? searchResult : userData}
        scroll={{ y: 445 }}
        loading={userData ? false : true}
        className='tableStyle'
      />
    </div>
  )
}
