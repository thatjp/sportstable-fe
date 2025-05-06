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
      return response.data
    }
  } catch (error) {
    console.error(error);
  }
}

export const logout = async (accessToken, refreshToken) => {
  try {
    const response = await axios.post(`http://127.0.0.1:8000/users/logout/`, {
      refresh_token: refreshToken,
    },
    {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    if (response.status === 200) {
      return response.data
    }
  } catch (error) {
    console.error(error);
  }
}

export const getNbaTeams = async (accessToken) => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/nba`,
    {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    if (response.status === 200) {
      return response.data
    }
  } catch (error) {
    console.error(error);
  }
}

export const getNbaTeamGames = async (accessToken, teamId) => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/nba/games/${teamId}`,
    {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    if (response.status === 200) {
      return response.data
    }
  } catch (error) {
    console.error(error);
  }
}

export const getLastWeeksGames = async (accessToken, teamId) => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/mlb/games_last_week`,
    {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    if (response.status === 200) {
      return response.data
    }
  } catch (error) {
    console.error(error);
  }
}