import { useState, useEffect } from 'react';
import axios from 'axios';

const rapidApiKey = process.env.RAPID_API_KEY;

const useFetch = (endpoint, query) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const options = {
        method: 'GET',
        url: `https://jsearch.p.rapidapi.com/${endpoint}`,
        params: { query: 'Python developer in Texas, USA', page: '1', num_pages: '1' },
        headers: {
            'X-RapidAPI-Key': '77aeb65547msh0ffd5ed1337bfeap18c30ejsn3bbad9385b69',
            'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
        },
        params: { ...query }
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.request(options);
            setData(response.data.data);
            console.log(response)
            setLoading(false);   
        } catch (e) {
            setError(e);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const refetch = () => {
        setLoading(true);
        fetchData();
    }

    return { data, loading, error, refetch };
}

export default useFetch;