const config = {
    url: process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : 'https://hack-day-backend.herokuapp.com'
}

export default config;