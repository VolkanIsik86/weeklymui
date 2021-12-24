//https://a-carreras-c.medium.com/development-and-production-variables-for-react-apps-c04af8b430a5
const dev = {
    url: {
        API_URL: 'http://localhost:5000'
    }
};
const prod = {
    url: {
        API_URL: 'http://192.168.50.5:5001'
    }
};
export const config = process.env.NODE_ENV === 'development' ? dev : prod;