import React from 'react';
import TableList from './components/TableList';
import Dialog from './components/Dialog';
import { useQuery, useMutation } from 'react-query'
import { deleteUser, getUsers, postUser, putUser } from './queries/userQueries';
import { toast } from 'react-toastify';

const INITIAL_USER_DETAIL = {
  name: '',
  username: '',
  email: '',
  website: '',
}

const INITIAL_ACTION = { name: '', id: '' }

const UserList = () => {
  const [open, setOpen] = React.useState(false);
  const [action, setAction] = React.useState(INITIAL_ACTION);
  const [userDetail, setUserDetail] = React.useState(INITIAL_USER_DETAIL)

  const { isLoading, error, data: users, refetch } = useQuery('users', getUsers)

  const { mutate: createUser } = useMutation(userDetail => postUser(userDetail), {
    onSuccess: () => {
      toast.success("User Created Successfully")
      refetch()
      setOpen(false)
      setAction(INITIAL_ACTION)
    },
    onError: err => toast.error(err.message)
  })

  const { mutate: updateUser } = useMutation(userDetail => putUser(userDetail), {
    onSuccess: () => {
      toast.success("User Updated Successfully")
      refetch()
      setOpen(false)
      setAction(INITIAL_ACTION)
    },
    onError: err => toast.error(err.message)
  })

  const { mutate: destroyUser } = useMutation(userId => deleteUser(userId), {
    onSuccess: () => {
      toast.success("User Deleted Successfully")
      refetch()
      setOpen(false)
      setAction(INITIAL_ACTION)
    },
    onError: err => toast.error(err.message)
  })

  React.useEffect(() => {
    if (!open) return

    if (action.name === 'edit') {
      const editUser = users.find(usr => usr.id === action.id)
      setUserDetail(editUser)
    } else {
      setUserDetail(INITIAL_USER_DETAIL)
    }
  }, [action])

  if (isLoading) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  const handleSubmit = () => {
    switch(action.name) {
      case "create":
        createUser(userDetail)
        break;
      case "edit":
        updateUser(userDetail)
        break;
      case "delete":
        destroyUser(action.id)
        break;
    }
  }

  const handleOnTextChange = (name, val) => {
    setUserDetail({
      ...userDetail,
      [name]: val
    })
  }

  const renderEditForm = () => {
    if (!open) return

    return (
      <div className="w-96 mx-auto px-16">
        <form className="mt-8">
          <div className="mx-auto max-w-lg ">
            <div className="py-1">
              <span className="px-1 text-sm text-gray-600">Name</span>
              <input
                data-testid="user-input-name"
                value={userDetail.name}
                onChange={(e) => handleOnTextChange('name', e.target.value)}
                placeholder=""
                type="text"
                className="text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
              />
            </div>
            <div className="py-1">
              <span className="px-1 text-sm text-gray-600">Username</span>
              <input
                data-testid="user-input-username"
                value={userDetail.username}
                onChange={(e) => handleOnTextChange('username', e.target.value)}
                placeholder=""
                type="text"
                className="text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
              />
            </div>
            <div className="py-1">
              <span className="px-1 text-sm text-gray-600">Email</span>
              <input
                data-testid="user-input-email"
                value={userDetail.email}
                onChange={(e) => handleOnTextChange('email', e.target.value)}
                placeholder=""
                type="email"
                className="text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
              />
            </div>
            <div className="py-1">
              <span className="px-1 text-sm text-gray-600">Website</span>
              <input
                data-testid="user-input-website"
                value={userDetail.website}
                onChange={(e) => handleOnTextChange('website', e.target.value)}
                placeholder=""
                type="text"
                className="text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
              />
            </div>
          </div>
        </form>
      </div>
    )
  }

  const renderDeleteConfirm = () => {
    return (
      <div className="w-96 mx-auto px-16">
        Are you sure?
      </div>
    )
  }

  return (
    <>
      <div className={`grid place-items-center ${open ? "opacity-20" : null}`}>
        <TableList users={users} setOpen={setOpen} setAction={setAction} />
      </div>
      <Dialog
        submitLabel={action.name === "delete" ? "Confirm" : "Submit"}
        modalTitle={action.name}
        open={open}
        onClose={() => setOpen(false)}
        handleSubmit={handleSubmit}
      >
        {action.name === "delete" ? renderDeleteConfirm() : renderEditForm()}
      </Dialog>
    </>
  )
}

export default UserList;