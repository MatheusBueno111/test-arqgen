import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://rickandmortyapi.com/api/',
})

export const api = {
  getCharacter: (queryParams?: string) =>
    instance.get(`/character/${queryParams}`),
}
