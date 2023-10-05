import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/getData')
            .then(response => {
                setData(response.data);
            });
    }, []);

    const handleSubmit = () => {
        axios.post('http://localhost:3001/setData', {
            name: name,
            mobile: mobile
        })
        .then(() => {
            axios.get('http://localhost:3001/getData')
                .then(response => {
                    setData(response.data);
                });
        });
    };

    return (
        <div>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
            <input value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="Mobile" />
            <button onClick={handleSubmit}>Submit</button>

            <ul>
                {data.map((item, index) => (
                    <li key={index}>{item.name} - {item.mobile}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;
