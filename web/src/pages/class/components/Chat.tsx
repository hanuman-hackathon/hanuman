import { useEffect, useReducer, useRef, useState } from "react";

import { Message } from "../types";
import SendMessageIcon from "../assets/SendMessageIcon";

function AIMessage(text: string) {
  return (
    <div
      key={text}
      className="flex justify-start border max-w-[60%] bg-off-white rounded-tl-md rounded-tr-md rounded-br-md"
    >
      <p className="text-md p-[10px] max-w-[80%]">{text}</p>
    </div>
  );
}

function HumanMessage(text: string) {
  return (
    <div
      key={text}
      className="flex ml-auto justify-end min-w-[20%] max-w-[60%] bg-logo-blue text-white rounded-tl-md rounded-tr-md rounded-bl-md"
    >
      <p className="text-md p-[10px] max-w-[80%]">{text}</p>
    </div>
  );
}

export default function Chat() {
  const [currMessage, setCurrMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        " Hello there! Hello there! Hello there!Hello there!Hello there!Hello there!Hello there! Hello there!",
    },
    {
      role: "user",
      content: "asdf adsf asdf",
    },
    {
      role: "assistant",
      content:
        " Hello there! Hello there! Hello there!Hello there!Hello there!Hello there!Hello there! Hello there!",
    },
    {
      role: "user",
      content: "asdf adsf asdf",
    },
    {
      role: "assistant",
      content:
        " Hello there! Hello there! Hello there!Hello there!Hello there!Hello there!Hello there! Hello there!",
    },
    {
      role: "user",
      content: "asdf adsf asdf",
    },
    {
      role: "assistant",
      content:
        " Hello there! Hello there! Hello there!Hello there!Hello there!Hello there!Hello there! Hello there!",
    },
    {
      role: "user",
      content: "asdf adsf asdf",
    },
    {
      role: "assistant",
      content:
        " Hello there! Hello there! Hello there!Hello there!Hello there!Hello there!Hello there! Hello there!",
    },
    {
      role: "user",
      content: "asdf adsf asdf",
    },
    {
      role: "assistant",
      content:
        " Hello there! Hello there! Hello there!Hello there!Hello there!Hello there!Hello there! Hello there!",
    },
    {
      role: "user",
      content: "asdf adsf asdf",
    },
    {
      role: "assistant",
      content:
        " Hello there! Hello there! Hello there!Hello there!Hello there!Hello there!Hello there! Hello there!",
    },
    {
      role: "user",
      content: "asdf adsf asdf",
    },
    {
      role: "assistant",
      content:
        " Hello there! Hello there! Hello there!Hello there!Hello there!Hello there!Hello there! Hello there!",
    },
    {
      role: "user",
      content: "asdf adsf asdf",
    },
    {
      role: "assistant",
      content:
        " Hello there! Hello there! Hello there!Hello there!Hello there!Hello there!Hello there! Hello there!",
    },
    {
      role: "user",
      content: "asdf adsf asdf",
    },
    {
      role: "assistant",
      content:
        " Hello there! Hello there! Hello there!Hello there!Hello there!Hello there!Hello there! Hello there!",
    },
    {
      role: "user",
      content: "asdf adsf asdf",
    },
    {
      role: "assistant",
      content:
        " Hello there! Hello there! Hello there!Hello there!Hello there!Hello there!Hello there! Hello there!",
    },
    {
      role: "user",
      content: "asdf adsf asdf",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  function sendMessage() {
    if (currMessage !== "") {
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "user", content: currMessage },
      ]);
    }

    setLoading(true);
    setCurrMessage("");

    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "assistant", content: "Hello there!" },
      ]);
      setLoading(false);
    }, 1000);
  }

  return (
    <div className="flex flex-col w-full max-h-full min-h-full gap-5 px-6 py-8 overflow-hidden bg-white rounded-xl shadow-standard">
      <div
        ref={chatContainerRef}
        className="flex flex-col h-full gap-3 px-5 overflow-y-scroll"
        style={{ scrollBehavior: "smooth" }}
      >
        {messages.map((message) => {
          return message.role === "assistant"
            ? AIMessage(message.content)
            : HumanMessage(message.content);
        })}
        {loading && (
          <div className="assistant-box">
            <p className="assistant-text">. . .</p>
          </div>
        )}
      </div>
      <div className="gap-5 px-5 min-h-10">
        <div className="flex justify-between h-10">
          <input
            className="w-[95%] h-full border rounded-md px-2"
            placeholder="Send a message"
            value={currMessage}
            onChange={(e) => setCurrMessage(e.target.value)}
          />
          <button
            className="send-button"
            onClick={() => {
              sendMessage();
            }}
          >
            <SendMessageIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
