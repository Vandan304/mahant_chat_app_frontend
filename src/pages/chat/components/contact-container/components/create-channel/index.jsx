import React, { useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FaPlus } from "react-icons/fa6";
import { Avatar } from "@radix-ui/react-avatar";
import Lottie from "react-lottie";
import { animationDefaultOptions } from "@/lib/utils";
import {
  GET_ALL_CONTACTS_ROUTE,
  HOST,
  SEARCH_CONTACTS_ROUTE,
} from "../../../../../../utils/constants";
import { getColor } from "../../../../../../lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { apiClient } from "@/lib/api-client";
import { ScrollArea } from "../../../../../../components/ui/scroll-area";
import { useAppStore } from "../../../../../../store";
import { Button } from "../../../../../../components/ui/button";
import MultipleSelector from "../../../../../../components/ui/multiselect";
const CreateChannel = () => {
  const { setSelectedChatType, setSelectedChatData } = useAppStore();
  const [newChannelModal, setNewChannelModal] = useState(false);
  const [searchedContacts, setSearchedContacts] = useState([]);
  const [allContacts, setAllContacts] = useState([]);
  const [selectedContacts, setselectedContacts] = useState([]);
  const [channelName, setChannelName] = useState("");
  useEffect(() => {
    const getData = async () => {
      const response = await apiClient.get(GET_ALL_CONTACTS_ROUTE, {
        withCredentials: true,
      });
      setAllContacts(response.data.contacts);
    };
    getData();
  }, []);

  const createChannel = async () => {};
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <FaPlus
              className="text-neutral-400 text-opacity-90 font-light text-start hover:text-neutral-100 cursor-pointer transition-all duration-300"
              onClick={() => setNewChannelModal(true)}
            />
          </TooltipTrigger>
          <TooltipContent className="bg-[#1c1b1e] border-none mb-2 p-3 text-white">
            Create New Channel
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Dialog open={newChannelModal} onOpenChange={setNewChannelModal}>
        <DialogContent className="bg-[#181920] border-none text-white w-[400px] h-[400px] flex flex-col">
          <DialogHeader>
            <DialogTitle>Please fill the details for new channel</DialogTitle>
          </DialogHeader>
          <div>
            <Input
              placeholder="Channel Name"
              className="rounded-lg p-6 bg-[#2c2e3b] border-none"
              onChange={(e) => setChannelName(e.target.value)}
              value={channelName}
            />
          </div>
          <div>
            <MultipleSelector className="rounded-lg bg-[#2c2e3b] border-none py-2 text-white"
              defaultOptions={allContacts}
              placeholder ="Search Contacts"
              value={selectedContacts}
              onChange={setselectedContacts}
              emptyIndicator={
                <p className="text-center text-lg leading-10 text-gray-600">No result found</p>
              }
             />
          </div>
          <Button className="w-full bg-purple-700 hover:bg-purple-900 transition-all duration-300"
          onClick={createChannel}
          >
            Create Channel
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateChannel;
