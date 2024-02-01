import { React, useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ApiService } from "../services/api_service";

const Images = () => {
    const [baseusers, setbaseusers] = useState([]);
    const { imageId } = useParams();
    const navigate = useNavigate();
    const [current, setcurrent] = useState([]);
    const [images, setimages] = useState([]);
    const [photo, setphoto] = useState('');

    useEffect(() => {
        (async () => {
            const imgs = await ApiService('images/');
            setimages(imgs);
        })();
    }, []);
    useEffect(() => {
        (async () => {
            const us = await ApiService('users/');
            setbaseusers(us);
            const curr = await ApiService('users/current')
            setcurrent(curr)
        })();
    }, []);

    const usersId = baseusers.map(({ id }) => id);
    const users = baseusers.reduce((acc, user) => {
        acc[user.id] = user;
        return acc
    }, {});
    const ChangePhoto = (event) => {
        console.log(event.target.files[0])
        setphoto(event.target.files[0]);
    };

    const OnSend = async () => {
        const formData = new FormData();
        formData.append("user", current.id);
        formData.append("img", photo);
        await ApiService('images/', {
            method: 'post',
            headers: {

            },
            body: formData,
        })
        window.location.reload();
    }
    return (
        <div className="h-screen w-full flex antialiased text-gray-200 bg-gray-900 overflow-hidden">
            <div className="flex-1 flex flex-col">
                <main className="flex-grow flex flex-row min-h-0">
                    <section className="flex flex-col flex-none overflow-auto w-24 hover:w-64 group lg:max-w-sm md:w-2/5 transition-all duration-300 ease-in-out">
                        <div className="header p-4 flex flex-row items-center flex-none overflow-y-scroll">
                            <Link to={'/'} className="w-16 h-16 relative flex flex-shrink-0">
                                <img
                                    className="rounded-full w-full h-full object-cover"
                                    alt=""
                                    src="https://cdn-icons-png.flaticon.com/128/5968/5968771.png"
                                />
                            </Link>
                            <p className="ml-20 text-md font-bold hidden md:block group-hover:block">
                                Photos
                            </p>
                            <Link to={`/newchat`}
                                className="ml-14 block rounded-full w-7 h-7 p-0 text-yellow-700 "
                            >
                                <svg viewBox="0 0 20 20" class="w-full h-full fill-current">
                                    <path d="M10,1.6c-4.639,0-8.4,3.761-8.4,8.4s3.761,8.4,8.4,8.4s8.4-3.761,8.4-8.4S14.639,1.6,10,1.6z M15,11h-4v4H9  v-4H5V9h4V5h2v4h4V11z" />
                                </svg>
                            </Link>
                            <Link to={`/chats`}
                                className="ml-7 block rounded-full w-7 h-7 p-0 text-yellow-700 "
                            >
                                <svg viewBox="0 0 20 20" class="w-full h-full fill-current">
                                    <path d="M11.0010436,0 C9.89589787,0 9.00000024,0.886706352 9.0000002,1.99810135 L9,8 L1.9973917,8 C0.894262725,8 0,8.88772964 0,10 L0,12 L2.29663334,18.1243554 C2.68509206,19.1602453 3.90195042,20 5.00853025,20 L12.9914698,20 C14.1007504,20 15,19.1125667 15,18.000385 L15,10 L12,3 L12,0 L11.0010436,0 L11.0010436,0 Z M17,10 L20,10 L20,20 L17,20 L17,10 L17,10 Z" />
                                </svg>
                            </Link>
                        </div>
                        <div className="contacts p-2 flex-1 overflow-y-scroll">
                            {usersId?.map((user) => {
                                if (!(current ? current["friend_id"]?.includes(user) : null) && user != current.id) { return null }
                                return (
                                    <div
                                        onClick={() => {
                                            return navigate(`/image/${user}`);
                                        }}
                                        className="flex justify-between items-center p-3 hover:bg-gray-800 rounded-lg relative" id="newchat"
                                    >
                                        <div className="w-16 h-16 relative flex flex-shrink-0">
                                            <img
                                                className="shadow-md rounded-full w-full h-full object-cover"
                                                src={users[user] ? users[user]["photo"] : null}
                                                alt=""
                                            />
                                        </div>
                                        <div className="flex-auto min-w-0 ml-4 mr-6 hidden md:block group-hover:block">
                                            <p>{users[user] ? (users[user]["first_name"] + ' ' + users[user]["last_name"]) : null}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>
                    <section class="flex flex-col flex-auto border-l border-gray-800">
                        <div class="chat-header px-6 py-4 flex flex-row flex-none justify-between items-center shadow">
                            <div class="flex">
                                <div class="w-12 h-12 mr-4 relative flex flex-shrink-0">
                                    <img
                                        class="shadow-md rounded-full w-full h-full object-cover"
                                        src={users[imageId] ? users[imageId]["photo"] : "https://themes.muffingroup.com/be/navigation/wp-content/uploads/2018/07/navigation-slider-bg.jpg"}
                                        alt=""
                                    />
                                </div>
                                <div class="text-sm">
                                    <p class="font-bold">{users[imageId] ? (users[imageId]["first_name"] + ' ' + users[imageId]["last_name"]) : 'Выберите фото'}</p>
                                    {imageId == current.id ? <input type='file' onChange={ChangePhoto} /> : ''}
                                    <button
                                        onClick={OnSend}
                                        className="ml-0 block rounded-full w-7 h-7 p-0 text-yellow-700 "
                                    >

                                        {imageId == current.id ? <svg viewBox="0 0 20 20" class="w-full h-full fill-current">
                                            <path d="M0,6.00585866 C0,4.89805351 0.893899798,4 2.0048815,4 L5,4 L7,2 L13,2 L15,4 L17.9951185,4 C19.102384,4 20,4.89706013 20,6.00585866 L20,15.9941413 C20,17.1019465 19.1017876,18 18.0092049,18 L1.99079514,18 C0.891309342,18 0,17.1029399 0,15.9941413 L0,6.00585866 Z M10,16 C12.7614237,16 15,13.7614237 15,11 C15,8.23857625 12.7614237,6 10,6 C7.23857625,6 5,8.23857625 5,11 C5,13.7614237 7.23857625,16 10,16 Z M10,14 C11.6568542,14 13,12.6568542 13,11 C13,9.34314575 11.6568542,8 10,8 C8.34314575,8 7,9.34314575 7,11 C7,12.6568542 8.34314575,14 10,14 Z" />
                                        </svg> : ''}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <ul className='container mx-auto flex items-center flex-wrap pt-4 pb-12 overflow-y-scroll'>
                            {(images).map((image) => {
                                return (
                                    image.user == imageId ?
                                        <li className='w-full md:w-1/3 xl:w-1/4 p-6 flex flex-col'>
                                            <img className='hover:grow hover:shadow-lg' src={image?.img} alt='' />
                                        </li> : ''
                                )
                            })}
                        </ul>
                    </section>
                </main>
            </div>
        </div>
    );
}
export default Images;