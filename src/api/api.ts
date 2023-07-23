import axios, { AxiosResponse } from 'axios'
import { RepoModel } from '../model/repoModel'
import { UserModel } from '../model/userModel'

const API_URL = 'https://api.github.com'
const USER_SEARCH_URL = `${API_URL}/search/users`
const USER_REPO_URL = `${API_URL}/users`

export type ResponseUser = {
  total_count: number
  incomplete_results: boolean
  items: Array<UserModel>
}

export type ResponseRepo = Array<RepoModel>

export type RequestQuery = {
  per_page: number
  page: number
}

export type UserQuery = RequestQuery & {
  q: string
}

interface IgithubAPI {
  getUser: (query: UserQuery) => Promise<ResponseUser>

  getRepo: (userName: string, query: RequestQuery) => Promise<ResponseRepo>
}

export const githubAPI: IgithubAPI = {
  getUser: async (query) => {
    return axios
      .get(USER_SEARCH_URL, { params: query })
      .then((r: AxiosResponse) => r.data)
  },

  getRepo: async (userName, query) => {
    return axios
      .get(`${USER_REPO_URL}/${userName}/repos`, { params: query })
      .then((r: AxiosResponse) => r.data)
  },
}
