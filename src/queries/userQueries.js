import axios from 'axios';

export const getUsers = async () => {
  const url = `http://localhost:3001/api/v1/users`;
  try {
    const response = await axios.get(url);

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw new Error(error.response?.data?.message || "Something went wrong");
  }
}

export const postUser =  async (userDetail) => {
  const url = `http://localhost:3001/api/v1/users`;
  try {
    const response = await axios.post(url, userDetail);

    if (response.status === 201) {
      return response.data;
    }
  } catch (error) {
    throw new Error(error.response?.data?.message || "User cannot be created");
  }
}

export const putUser =  async (userDetail) => {
  const url = `http://localhost:3001/api/v1/users/${userDetail.id}`;

  try {
    const response = await axios.put(url, userDetail);

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw new Error(error.response?.data?.message || "User cannot be updated");
  }
}

export const deleteUser =  async (userId) => {
  const url = `http://localhost:3001/api/v1/users/${userId}`;

  try {
    const response = await axios.delete(url);

    if (response.status === 204) {
      return response.data;
    }
  } catch (error) {
    throw new Error(error.response?.data?.message || "User cannot be deleted");
  }
}
