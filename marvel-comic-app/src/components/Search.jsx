import './Search.scss';
import { useState } from 'react';

export default function Search() {
    const [characterName, setCharacterName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const handleChange = (e) => {
        setCharacterName(e.target.value);
    }

    const handleReset = () => {}

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
