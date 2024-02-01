import { React, useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Messages } from "../messages/Messages";
import "./chat_style.css";
import { ApiService } from "../services/api_service";


const Chat = () => {
  const { chatId } = useParams();
  const navigate = useNavigate();
  const [usersmas, setusersmas] = useState([]);
  const [current, setcurrent] = useState([]);
  const [baseusers, setbaseusers] = useState([]);
  useEffect(() => {
    (async () => {
      const us = await ApiService('users/');
      setbaseusers(us);
      const curr = await ApiService('users/current')
      setcurrent(curr)
      setusersmas(curr["friend_id"]);
    })();
  }, []);

  const users = baseusers.reduce((acc, user) => {
    acc[user.id] = user;
    return acc
  }, {});

  const [chats, setchats] = useState([]);
  useEffect(() => {
    (async () => {
      const ch = await ApiService('chats/');
      setchats(ch);
    })();
  }, []);

  const activeChat = chats?.find(
    (chat) => chat["sender"] == current.id && chat["reciever"] == chatId || chat["sender"] == chatId && chat["reciever"] == current.id
  );
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
                Messenger
              </p>
              <Link to={`/newchat`}
                className="ml-14 block rounded-full w-7 h-7 p-0 text-yellow-700"
              >
                <svg viewBox="0 0 20 20" class="w-full h-full fill-current">
                  <path d="M10,1.6c-4.639,0-8.4,3.761-8.4,8.4s3.761,8.4,8.4,8.4s8.4-3.761,8.4-8.4S14.639,1.6,10,1.6z M15,11h-4v4H9  v-4H5V9h4V5h2v4h4V11z" />
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
              {usersmas?.map((id) => {
                return (
                  <div
                    onClick={() => {
                      return navigate(`/chat/${id}`);
                    }}
                    className="flex justify-between items-center p-3 hover:bg-gray-800 rounded-lg relative"
                  >
                    <div className="w-16 h-16 relative flex flex-shrink-0">
                      <img
                        className="shadow-md rounded-full w-full h-full object-cover"
                        src={users[id] ? users[id]["photo"] : ''}
                        alt=""
                      />
                    </div>
                    <div className="flex-auto min-w-0 ml-4 mr-6 hidden md:block group-hover:block">
                      <p>{users[id] ? users[id]["first_name"] + ' ' + users[id]["last_name"] : ''}</p>
                      <div className="flex items-center text-sm text-gray-600">
                        <div className="min-w-0">
                          <p className="truncate"> {chats?.find(
                            (chat) => chat["sender"] == current.id && chat["reciever"] == id || chat["sender"] == id && chat["reciever"] == current.id
                          )?.last_message}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
          {activeChat ? (
            <Messages
              friend={users[chatId]}
              current={current}
              users={users}
              id1={current.id}
              id2={chatId}
              chat={activeChat.id}
            />
          ) : (
            "Выберите чат"
          )}
        </main>
      </div>
    </div>
  );
};

export default Chat;
