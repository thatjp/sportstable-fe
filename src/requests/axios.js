import axios from 'axios'

// Want to use async/await? Add the `async` keyword to your outer function/method.
export const signup = async (username, email, password, password2) => {
  try {
    const response = await axios.post(`http://127.0.0.1:8000/users/register/`, {
      username: username,
      email: email,
      password: password,
      password2: password2,
    });
    if (response.status === 201) {
      console.log('register', response.data); 
      return response.data
    }
  } catch (error) {
    console.error(error);
  }
}

export const login = async (email, password) => {
  try {
    const response = await axios.post(`http://127.0.0.1:8000/users/login/`, {
      email: email,
      password: password,
    });
    if (response.status === 200) {
      console.log('resp', response.data);
      return response.data
    }
  } catch (error) {
    console.error(error);
  }
}