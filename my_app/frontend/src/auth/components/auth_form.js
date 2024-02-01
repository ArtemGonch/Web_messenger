import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { ApiService } from '../../services/api_service'

const AuthForm = () => {
    const navigate = useNavigate();
    const [username, setusername] = useState('');
    const [isAuthForm, setIsAuthForm] = useState(true);
    const [password, setpassword] = useState('');
    const onAuth = async (event) => {
        event.preventDefault()
        window.localStorage.removeItem("access");
        window.localStorage.removeItem("refresh");
        const { access, refresh } = await ApiService('token/', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        })
        window.localStorage.setItem('access', access);
        window.localStorage.setItem('refresh', refresh);
        navigate('/chats');
    }
    return (
        <form onSubmit={(event) => event.preventDefault()} className='space-y-4 md:space-y-6' action='#'>
            <div>
                <label
                    htmlFor='username'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                    Ник
                </label>
                <input
                    type='text'
                    name='username'
                    id='username'
                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    placeholder='Artem'
                    required=''
                    value={username}
                    onChange={(event) => setusername(event.target.value)}
                />
            </div>
            <div>
                <label
                    htmlFor='password'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                    Пароль
                </label>
                <input
                    type='password'
                    name='password'
                    id='password'
                    placeholder='••••••••'
                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    required=''
                    value={password}
                    onChange={(event) => setpassword(event.target.value)}
                />
            </div>
            <button
                onClick={isAuthForm ? onAuth : () => setIsAuthForm(true)}
                className='w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
            >

                Вход
            </button>
        </form>
    )
}

export { AuthForm }