import { useState } from 'react'
import { ApiService } from '../../services/api_service'
import { useNavigate } from 'react-router-dom'

const RegForm = () => {
    const navigate = useNavigate();
    const [username, setusername] = useState('')
    const [password, setpassword] = useState('')
    const [first_name, setfirst_name] = useState('');
    const [last_name, setlast_name] = useState('');
    const [photo, setphoto] = useState('');
    const [email, setemail] = useState('');
    const ChangePhoto = (event) => {
        setphoto(event.target.files[0]);
    };
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
    const onReg = async (event) => {
        const formData = new FormData();
        formData.append("username", username);
        formData.append("password", password);
        formData.append("first_name", first_name);
        formData.append("last_name", last_name);
        formData.append("photo", photo);
        formData.append("email", email);

        await ApiService('users/', {
            method: 'post',
            headers: {},
            body: formData,
        });
        await onAuth(event)
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
            <div>
                <label
                    htmlFor='first_name'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                    Имя
                </label>
                <input
                    type='text'
                    name='first_name'
                    id='first_name'
                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    placeholder='Артём'
                    required=''
                    value={first_name}
                    onChange={(event) => setfirst_name(event.target.value)}
                />
            </div>
            <div>
                <label
                    htmlFor='last_name'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                    Фамилия
                </label>
                <input
                    type='text'
                    name='last_name'
                    id='last_name'
                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    placeholder='Гончаров'
                    required=''
                    value={last_name}
                    onChange={(event) => setlast_name(event.target.value)}
                />
            </div>
            <div>
                <label
                    htmlFor='photo'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                    Фото
                </label>
                <input type='file' onChange={ChangePhoto} />
            </div>
            <div>
                <label
                    htmlFor='email'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                    Почта
                </label>
                <input
                    type='email'
                    name='email'
                    id='email'
                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    placeholder='name@gmail.com'
                    required=''
                    value={email}
                    onChange={(event) => setemail(event.target.value)}
                />
            </div>
            <button
                onClick={onReg}
                type='submit'
                className='w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
            >
                Зарегистрироваться
            </button>
        </form>
    )
}

export { RegForm }