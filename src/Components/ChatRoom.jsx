import React from 'react'
import { useState } from 'react'

import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';
import Header from './Header';
import Sidebar, { SidebarItem } from './Sidebar';
import { HeartHandshake, IndianRupee, Info, Store, UserCircle } from 'lucide-react';

const API_KEY = "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";
// "Explain things like you would to a 10 year old learning how to code."
const systemMessage = { //  Explain things like you're talking to a software professional with 5 years of experience.
  "role": "system", "content": "Act as a sentiment analysis bot,ask some question regarding possible mental health disease,try to ask as many questions as you can regarding mental status "
}
const ChatRoom = () => {
    const [messages, setMessages] = useState([
        {
          message: "Hello, I'm your personal MedBot! How have you been feeling lately !",
          sentTime: "just now",
          sender: "ChatGPT",
          direction:'incoming',
        }
      ]);
      const [isTyping, setIsTyping] = useState(false);
    
      const handleSend = async (message) => {
        const newMessage = {
          message,
          direction: 'outgoing',
          sender: "user"
        };
    
        const newMessages = [...messages, newMessage];
        
        setMessages(newMessages);
    
        // Initial system message to determine ChatGPT functionality
        // How it responds, how it talks, etc.
        setIsTyping(true);
        await processMessageToChatGPT(newMessages);
      };
    
      async function processMessageToChatGPT(chatMessages) { // messages is an array of messages
        // Format messages for chatGPT API
        // API is expecting objects in format of { role: "user" or "assistant", "content": "message here"}
        // So we need to reformat
    
        let apiMessages = chatMessages.map((messageObject) => {
          let role = "";
          if (messageObject.sender === "ChatGPT") {
            role = "assistant";
          } else {
            role = "user";
            console.log(messageObject.message);
          }
          return { role: role, content: messageObject.message}
        });
        
    
        // Get the request body set up with the model we plan to use
        // and the messages which we formatted above. We add a system message in the front to'
        // determine how we want chatGPT to act. 
        const apiRequestBody = {
          "model": "gpt-3.5-turbo",
          "messages": [
            systemMessage,  // The system message DEFINES the logic of our chatGPT
            ...apiMessages // The messages from our chat with ChatGPT
          ]
        }
    
        await fetch("https://api.openai.com/v1/chat/completions", 
        {
          method: "POST",
          headers: {
            "Authorization": "Bearer " + API_KEY,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(apiRequestBody)
        }).then((data) => {
          return data.json();
        }).then((data) => {
          console.log(data);
          setMessages([...chatMessages, {
            message: data.choices[0].message.content,
            sender: "ChatGPT",
            direction:'incoming'
          }]);
          
          
          setIsTyping(false);
        });
      }



  return (
    <div className=' h-screen w-screen bg-gradient-to-b 
    from-blue-200 to-blue-500 object-cover p-0 m-0 flex'>
      
      <Sidebar>
     <SidebarItem icon={<UserCircle size={20} />} text="Sign Out"/>
     <SidebarItem icon={<Store size={20} />}text="Home"/>
     
     <SidebarItem icon={<HeartHandshake size={20} />}text="Personal Support"/>
     <SidebarItem icon={<IndianRupee  size={20} />}text="Subscription"/>
     <SidebarItem icon={< Info size={20} />}text="About us"/>
     

      </Sidebar>
      <div className='w-full relative'>
        
        <MainContainer>
          <ChatContainer className=''>       
            <MessageList 
              scrollBehavior="smooth" 
              typingIndicator={isTyping ? <TypingIndicator content="MedBot is typing" /> : null}
              className='bg-red-500'
            >
              {messages.map((message, i) => {
                
                return <Message key={i} model={message} />
              })}
            </MessageList>
            <MessageInput placeholder="Type message here" onSend={handleSend} className='bg-black' />        
          </ChatContainer>
        </MainContainer>
      </div>


      
    </div>
  )
}

export default ChatRoom

//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

//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