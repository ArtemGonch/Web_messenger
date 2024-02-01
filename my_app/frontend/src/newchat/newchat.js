import { React, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ApiService } from '../services/api_service'

const Newchat = () => {
    const navigate = useNavigate();
    const [baseusers, setbaseusers] = useState([]);
    const [current, setcurrent] = useState([]);
    const [usersmas, setusersmas] = useState([]);
    useEffect(() => {
        (async () => {
            const us = await ApiService('users/');
            setbaseusers(us);
            const curr = await ApiService('users/current')
            setcurrent(curr)
            setusersmas(curr.friend_id);
        })();
    }, []);

    const usersId = baseusers.map(({ id }) => id);
    const users = baseusers.reduce((acc, user) => {
        acc[user.id] = user;
        return acc
    }, {});
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
                                New chat
                            </p>
                            <Link to={`/chats`}
                                className="ml-14 block rounded-full w-7 h-7 p-0 text-yellow-700 "
                            >
                                <svg viewBox="0 0 20 20" class="w-full h-full fill-current">
                                    <path d="M11.0010436,0 C9.89589787,0 9.00000024,0.886706352 9.0000002,1.99810135 L9,8 L1.9973917,8 C0.894262725,8 0,8.88772964 0,10 L0,12 L2.29663334,18.1243554 C2.68509206,19.1602453 3.90195042,20 5.00853025,20 L12.9914698,20 C14.1007504,20 15,19.1125667 15,18.000385 L15,10 L12,3 L12,0 L11.0010436,0 L11.0010436,0 Z M17,10 L20,10 L20,20 L17,20 L17,10 L17,10 Z" />
                                </svg>
                            </Link>
                            <Link to={`/images`}
                                className="ml-4 block w-7 h-7 p-0 text-yellow-700 "
                            >
                                <svg viewBox="0 0 20 20" class="w-full h-full fill-current">
                                    <path d="M11,13 L8,10 L2,16 L11,16 L18,16 L13,11 L11,13 Z M0,3.99406028 C0,2.8927712 0.898212381,2 1.99079514,2 L18.0092049,2 C19.1086907,2 20,2.89451376 20,3.99406028 L20,16.0059397 C20,17.1072288 19.1017876,18 18.0092049,18 L1.99079514,18 C0.891309342,18 0,17.1054862 0,16.0059397 L0,3.99406028 Z M15,9 C16.1045695,9 17,8.1045695 17,7 C17,5.8954305 16.1045695,5 15,5 C13.8954305,5 13,5.8954305 13,7 C13,8.1045695 13.8954305,9 15,9 Z" />
                                </svg>
                            </Link>
                        </div>
                        <div className="contacts p-2 flex-1 overflow-y-scroll">
                            {usersId?.map((user) => {
                                if (user === current.id || current["friend_id"]?.includes(user)) { return null }
                                return (
                                    <button
                                        onClick={
                                            async () => {
                                                current.friend_id.push(user)
                                                await ApiService(`users/${current.id}/`, {
                                                    method: 'patch',
                                                    headers: {
                                                        'Content-Type': 'application/json',
                                                    },
                                                    body: JSON.stringify({ friend_id: Array.from(current.friend_id) }),
                                                });
                                                await ApiService('chats/', {
                                                    method: 'post',
                                                    headers: {
                                                        'Content-Type': 'application/json',
                                                    },
                                                    body: JSON.stringify({ reciever: { "id": user }, last_message: '' }),
                                                });
                                                navigate(`/chat/${user}`);

                                            }
                                        }
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
                                            <p>{users[user] ? users[user]["first_name"] + ' ' + users[user]["last_name"] : null}</p>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}
export default Newchat;