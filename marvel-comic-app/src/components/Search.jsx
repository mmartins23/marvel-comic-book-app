import './Search.scss';
import { useState } from 'react';
import md5 from 'md5';

export default function Search() {
    const [characterName, setCharacterName] = useState('');
    const [characterData, setCharacterData] = useState(null);
    const [comicData, setComicData] = useState(null);

    const publicKey = import.meta.env.VITE_PUBLIC_KEY;
    const privateKey = import.meta.env.VITE_PRIVATE_KEY;

    const handleSubmit = (e) => {
        e.preventDefault();

        getCharacterData();
    }

    const getCharacterData = () => {
        setCharacterData(null);
        setComicData(null);

        const timeStamp = new Date().getTime();
        const hash = generateHash(timeStamp);

        const url = `https://gateway.marvel.com:443/v1/public/characters?apikey=${publicKey}&hash=${hash}&ts=${timeStamp}&nameStartsWith=${characterName}&limit=100`;

        fetch(url).then(res => res.json()).then(result => {
            setCharacterData(result.data);

            console.log(result);
        })
    }

    const generateHash = (timeStamp) => {
        return md5(timeStamp + privateKey + publicKey)
    }
    const handleChange = (e) => {
        setCharacterName(e.target.value);
    }

    const handleReset = () => { }

    return (
        <>
            <form className='search' onSubmit={handleSubmit}>
                <input
                    placeholder='Enter Character Name'
                    type='text'
                    onChange={handleChange}
                />

                <div className='buttons'>
                    <button type='submit'>Get character info</button>
                    <button type='reset' className='reset' onClick={handleReset}>Reset</button>
                </div>
            </form>
        </>
    )
}
