import React from "react";
import MainLayer from "./main_layer";
import { Route, Routes } from "react-router-dom";
import Chat from "./chat/chat";
import Newchat from "./newchat/newchat";
import Images from "./images/images";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/chat/:chatId" element={<Chat />} />
        <Route path="/chats" element={<Chat />} />
        <Route path="/" element={<MainLayer />} />
        <Route path="/newchat" element={<Newchat />} />
        <Route path="/image/:imageId" element={<Images />} />
        <Route path="/images" element={<Images />} />
      </Routes>
    </div>
  );
};

export default App;
