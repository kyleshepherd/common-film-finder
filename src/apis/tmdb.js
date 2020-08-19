import axios from 'axios'

export default axios.create({
	baseURL: 'https://api.tmdb.org/3',
})
