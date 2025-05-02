import React, { useState } from "react";
import { useAppStore } from "../store";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { HOST } from "../utils/constants";
import { getColor } from "../lib/utils";

const ContactList = ({ contacts, isChannel = false }) => {
  const {
    selectedChatData,
    setSelectedChatData,
    setSelectedChatType,
    setSelectedChatMessage,
  } = useAppStore();

  const [imageErrors, setImageErrors] = useState({});

  const handleClick = (contact) => {
    if (isChannel) {
      setSelectedChatType("channel");
    } else {
      setSelectedChatType("contact");
    }
    setSelectedChatData(contact);

    if (selectedChatData && selectedChatData._id !== contact._id) {
      setSelectedChatMessage([]);
    }
  };

  return (
    <div className="mt-5">
      {contacts.map((contact) => (
        <div
          key={contact._id}
          className={`pl-10 py-2 transition-all duration-300 cursor-pointer ${
            selectedChatData && selectedChatData._id === contact._id
              ? "bg-[#8417ff] hover:bg-[#8417ff]"
              : "bg-[#f1f1f111]"
          }`}
          onClick={() => handleClick(contact)}
        >
          <div className="flex gap-5 items-center justify-start text-neutral-500">
            {!isChannel && (
              <Avatar className="h-10 w-10 rounded-full overflow-hidden">
                {contact.images ? (
                  <AvatarImage
                    src={`${HOST}/${contact.images}`}
                    alt="profile"
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <div
                    className={` ${selectedChatData && selectedChatData._id === contact._id ? "bg-[#ffffff22]/50 border-2 border-white/70":getColor(contact.color)}  w-10 h-10 flex items-center justify-center text-lg font-bold rounded-full 
                    )} `}
                  >
                    {contact.firstName
                      ? contact.firstName.charAt(0).toUpperCase()
                      : contact.email.charAt(0).toUpperCase()}
                  </div>
                )}
              </Avatar>
            )}
            {isChannel &&(
                <div className="bg-[#ffffff22] h-10 w-10 flex items-center justify-center rounded-full">
                  #
                </div>
              )}
            <div className="text-white">
              {isChannel ? (
                <span>{contact.name}</span>
              ) : (
                <span>
                  {contact.firstName && contact.lastName
                    ? `${contact.firstName} ${contact.lastName}`
                    : contact.email || "Unknown"}
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactList;
