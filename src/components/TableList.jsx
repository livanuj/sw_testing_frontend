import React from 'react';

const TableList = (props) => {
  const { users, setOpen, setAction } = props

  const renderTableRow = (user) => {
    return (
      <tr data-testid="users-list" key={user.id} className="hover:bg-gray-50">
      <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
        <div className="text-sm">
          <div className="font-medium text-gray-700">{user.name}</div>
        </div>
      </th>
      <td className="px-6 py-4">
        {user.username}
      </td>
      <td className="px-6 py-4">
        <div className="text-gray-400">{user.email}</div>
      </td>
      <td className="px-6 py-4">
        <div className="flex gap-2">
          {user.website}
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex justify-end gap-4">
          <a
            x-data="{ tooltip: 'Delete' }"
            onClick={() => {
              setOpen(true)
              setAction({ name: "delete", id: user.id })
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="h-6 w-6"
              x-tooltip="tooltip"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </a>
          <a
            x-data="{ tooltip: 'Edite' }"
            onClick={() => {
              setOpen(true)
              setAction({ name: "edit", id: user.id })
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="h-6 w-6"
              x-tooltip="tooltip"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
              />
            </svg>
          </a>
        </div>
      </td>
    </tr>
    )
  }

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
    <table data-testid="user-table" className="user-table w-full border-collapse bg-white text-left text-sm text-gray-500">
      <thead
        data-testid="user-table-head" 
        className="bg-gray-50">
        <tr>
          <th scope="col" className="px-6 py-4 font-medium text-gray-900">Name</th>
          <th scope="col" className="px-6 py-4 font-medium text-gray-900">Username</th>
          <th scope="col" className="px-6 py-4 font-medium text-gray-900">Email</th>
          <th scope="col" className="px-6 py-4 font-medium text-gray-900">website</th>
          <th scope="col" className="px-6 font-medium text-gray-900 float-right pr-7 pt-2">
            <button
              data-testid="add-user-button"
              type="button"
              className="text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
              onClick={() => {
                setOpen(true)
                setAction({ name: 'create', id: '' })
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-[40px] w-[40px] group-hover:bg-gray-300 border-2 border-transparent" viewBox="0 0 20 20" fill="#6b7280">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
              </svg>
            </button>
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100 border-t border-gray-100">
        {users.map(user => renderTableRow(user))}
      </tbody>
    </table>
  </div>
  )
}

export default TableList;