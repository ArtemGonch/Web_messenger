
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ApiService } from "../services/api_service";
export const Messages = (props) => {
  const { id1, id2, current, chat, friend, users } = props;
  const [messages, setmessages] = useState([]);
  useEffect(() => {
    (async () => {
      const ms = await ApiService('messages/');
      setmessages(ms);
    })();
  }, []);

  const [newmessage, setnewmesage] = useState('');
  const OnSend = async () => {
    const formData = new FormData();
    formData.append("user", current);
    formData.append("message", newmessage);
    formData.append("chat", chat);
    await ApiService('messages/', {
      method: 'post',
      headers: {},
      body: formData,
    })
    window.location.reload();
  }

  const activeMessages = messages?.filter((message) => message.chat === chat)
  return (
    <section class="flex flex-col flex-auto border-l border-gray-800">
      <div class="chat-header px-6 py-4 flex flex-row flex-none justify-between items-center shadow">
        <div class="flex">
          <Link to={`/image/${id2}`} class="w-12 h-12 mr-4 relative flex flex-shrink-0">
            <img
              class="shadow-md rounded-full w-full h-full object-cover"
              src={friend ? friend["photo"] : null}
              alt=""
            />
          </Link>
          <div class="text-sm">
            <p class="font-bold">{friend["first_name"] + ' ' + friend["last_name"]}</p>
          </div>
          <div class="text-sm" style={{ marginLeft: 750 }}>
            <p class="font-bold">{users[id1] ? users[id1]["first_name"] + ' ' + users[id1]["last_name"] : ''}</p>
          </div>
          <Link to={`/image/${id1}`} class="w-12 h-12 mr-4 relative flex flex-shrink-0">
            <img
              class="shadow-md rounded-full w-full h-full object-cover"
              src={users[id1] ? users[id1]["photo"] : ''}
              alt=""
            />
          </Link>
        </div>
      </div>
      <div class="chat-body p-4 flex-1 overflow-y-scroll">
        {activeMessages.map((message, id) => {
          return (
            <div class={message.user.id == id2 ? "flex flex-row justify-start" : "flex flex-row justify-end"}>
              <div className="w-8 h-8 relative flex flex-shrink-0 mr-4 mt-4">
                <img
                  class="shadow-md rounded-full w-full h-full object-cover"
                  src={
                    message.user.id == id2 ? friend["photo"] : users[id1]["photo"]
                  }
                  alt=""
                />
              </div>
              <div class="messages text-sm text-gray-700 grid grid-flow-row gap-2">
                <div class="flex items-center group">
                  <p class="px-6 py-3 rounded-t-full rounded-r-full bg-gray-800 max-w-xs lg:max-w-md text-gray-200">
                    {message["message"]}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div class="chat-footer flex-none">
        <div class="flex flex-row items-center p-4">
          <div class="relative flex-grow">
            <label>
              <input
                className="rounded-full py-2 pl-3 pr-10 w-full border border-gray-800 focus:border-gray-700 bg-gray-800 focus:bg-gray-900 focus:outline-none text-gray-200 focus:shadow-md transition duration-300 ease-in"
                type="text"
                placeholder="Aa"
                value={newmessage}
                onChange={(event) => setnewmesage(event.target.value)}
              />
              <button
                onClick={OnSend}
                type="button"
                class="absolute top-0 right-0 mt-2 mr-3 flex flex-shrink-0 focus:outline-none block text-yellow-700 hover:text-blue-700 w-6 h-6"
              >
                <svg viewBox="0 0 20 20" class="w-full h-full fill-current">
                  <path d="M11.0010436,0 C9.89589787,0 9.00000024,0.886706352 9.0000002,1.99810135 L9,8 L1.9973917,8 C0.894262725,8 0,8.88772964 0,10 L0,12 L2.29663334,18.1243554 C2.68509206,19.1602453 3.90195042,20 5.00853025,20 L12.9914698,20 C14.1007504,20 15,19.1125667 15,18.000385 L15,10 L12,3 L12,0 L11.0010436,0 L11.0010436,0 Z M17,10 L20,10 L20,20 L17,20 L17,10 L17,10 Z" />
                </svg>
              </button>
            </label>
          </div>
        </div>
      </div>
    </section>
  );
};
