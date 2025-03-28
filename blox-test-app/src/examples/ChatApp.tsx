import { useState, useRef, useEffect } from "react";
import { Dropdown, Toggle, Modal } from "blox-ui-react";

// Sample data for the chat application
const CONTACTS = [
  { id: "contact1", name: "John Doe", avatar: "JD", status: "online", lastSeen: "now" },
  { id: "contact2", name: "Sarah Smith", avatar: "SS", status: "online", lastSeen: "now" },
  { id: "contact3", name: "Michael Chen", avatar: "MC", status: "offline", lastSeen: "2 hours ago" },
  { id: "contact4", name: "Emily Wilson", avatar: "EW", status: "away", lastSeen: "30 minutes ago" },
  { id: "contact5", name: "Alex Johnson", avatar: "AJ", status: "online", lastSeen: "now" },
  { id: "contact6", name: "Taylor Brown", avatar: "TB", status: "offline", lastSeen: "1 day ago" },
];

const MESSAGE_HISTORY = {
  contact1: [
    { id: "m1", sender: "contact1", text: "Hey there! How are you doing?", time: "10:30 AM", read: true },
    { id: "m2", sender: "me", text: "I'm good, thanks! Just working on this new UI project.", time: "10:32 AM", read: true },
    { id: "m3", sender: "contact1", text: "That sounds interesting! What kind of UI?", time: "10:33 AM", read: true },
    { id: "m4", sender: "me", text: "A React component library. It's going pretty well so far.", time: "10:35 AM", read: true },
    { id: "m5", sender: "contact1", text: "Nice! Let me know if you need any help testing it out.", time: "10:36 AM", read: false },
  ],
  contact2: [
    { id: "m1", sender: "contact2", text: "Did you get a chance to look at the design files I sent?", time: "9:15 AM", read: true },
    { id: "m2", sender: "me", text: "Yes, they look great! I have a few questions about the color palette though.", time: "9:20 AM", read: true },
    { id: "m3", sender: "contact2", text: "Sure, what questions do you have?", time: "9:22 AM", read: false },
  ],
  contact5: [
    { id: "m1", sender: "me", text: "Hey Alex, are we still meeting tomorrow at 2?", time: "Yesterday", read: true },
    { id: "m2", sender: "contact5", text: "Yes, that works for me. See you then!", time: "Yesterday", read: true },
  ],
};

function ChatApp() {
  const [activeContact, setActiveContact] = useState("contact1");
  const [messages, setMessages] = useState(MESSAGE_HISTORY);
  const [newMessage, setNewMessage] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");

  const messageEndRef = useRef(null);

  // Filter contacts based on status
  const filteredContacts = CONTACTS.filter((contact) => {
    if (statusFilter === "all") return true;
    return contact.status === statusFilter;
  });

  // Scroll to bottom of messages
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, activeContact]);

  // Mark messages as read when viewed
  useEffect(() => {
    if (!activeContact) return;

    const updatedMessages = { ...messages };
    updatedMessages[activeContact] = updatedMessages[activeContact]?.map((msg) => {
      if (msg.sender !== "me") {
        return { ...msg, read: true };
      }
      return msg;
    });

    setMessages(updatedMessages);
  }, [activeContact]);

  // Send a new message
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const updatedMessages = { ...messages };
    const currentContactMessages = updatedMessages[activeContact] || [];

    const newMsg = {
      id: `m${Date.now()}`,
      sender: "me",
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      read: true,
    };

    updatedMessages[activeContact] = [...currentContactMessages, newMsg];
    setMessages(updatedMessages);
    setNewMessage("");
  };

  // Get unread message count
  const getUnreadCount = (contactId) => {
    return messages[contactId]?.filter((msg) => !msg.read && msg.sender !== "me").length || 0;
  };

  // Handle contact selection
  const handleContactSelect = (contactId) => {
    setActiveContact(contactId);
  };

  return (
    <div className={`h-full max-h-[calc(100vh-300px)] border min-h-[calc(100vh-300px)] flex ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
      {/* Left Sidebar - Contacts */}
      <div className={`w-72 border-r ${darkMode ? "border-gray-700" : "border-gray-200"} flex flex-col`}>
        {/* Header */}
        <div className={`p-4 border-b ${darkMode ? "border-gray-700" : "border-gray-200"} flex justify-between items-center`}>
          <h2 className="text-lg font-semibold">Chats</h2>
          <div className="flex space-x-2">
            <button
              onClick={() => setShowSettings(true)}
              className={`p-2 rounded-full ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}>
              ⚙️
            </button>
            <Dropdown>
              <Dropdown.Trigger className={`p-2 rounded-full ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}>+</Dropdown.Trigger>

              <Dropdown.Menu className={`w-48 rounded-md shadow-lg py-1 ${darkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"}`}>
                <Dropdown.Item className={`px-4 py-2 text-sm ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}>New Chat</Dropdown.Item>
                <Dropdown.Item className={`px-4 py-2 text-sm ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}>New Group</Dropdown.Item>
                <Dropdown.Item className={`px-4 py-2 text-sm ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}>New Channel</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>

        {/* Status Filter */}
        <div className={`p-3 border-b ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
          <Toggle.Group
            type="single"
            value={statusFilter}
            onChange={setStatusFilter}
            className="flex w-full">
            <Toggle
              value="all"
              className={`flex-1 py-2 text-center text-sm rounded-l ${statusFilter === "all" ? (darkMode ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-800") : darkMode ? "bg-gray-800" : "bg-gray-100"}`}>
              All
            </Toggle>
            <Toggle
              value="online"
              className={`flex-1 py-2 text-center text-sm ${statusFilter === "online" ? (darkMode ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-800") : darkMode ? "bg-gray-800" : "bg-gray-100"}`}>
              Online
            </Toggle>
            <Toggle
              value="offline"
              className={`flex-1 py-2 text-center text-sm rounded-r ${statusFilter === "offline" ? (darkMode ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-800") : darkMode ? "bg-gray-800" : "bg-gray-100"}`}>
              Offline
            </Toggle>
          </Toggle.Group>
        </div>

        {/* Search */}
        <div className={`p-3 border-b ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
          <div className="relative">
            <input
              type="text"
              placeholder="Search conversations..."
              className={`w-full pl-8 pr-4 py-2 rounded-md ${darkMode ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400" : "bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500"}`}
            />
            <span className="absolute left-2.5 top-2.5 text-gray-400">🔍</span>
          </div>
        </div>

        {/* Contact List */}
        <div className="flex-1 overflow-y-auto">
          {filteredContacts.length > 0 ? (
            filteredContacts.map((contact) => {
              const unreadCount = getUnreadCount(contact.id);
              const lastMessage = messages[contact.id]?.[messages[contact.id]?.length - 1];

              return (
                <div
                  key={contact.id}
                  onClick={() => handleContactSelect(contact.id)}
                  className={`p-3 flex items-center ${darkMode ? (activeContact === contact.id ? "bg-gray-800" : "hover:bg-gray-800") : activeContact === contact.id ? "bg-blue-50" : "hover:bg-gray-50"} cursor-pointer`}>
                  <div className="relative">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${darkMode ? "bg-gray-700" : "bg-blue-100"} text-sm font-medium`}>{contact.avatar}</div>
                    <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 ${darkMode ? "border-gray-900" : "border-white"} ${contact.status === "online" ? "bg-green-500" : contact.status === "away" ? "bg-yellow-500" : "bg-gray-500"}`}></span>
                  </div>

                  <div className="flex-1 min-w-0 ml-3">
                    <div className="flex justify-between">
                      <span className="font-medium truncate">{contact.name}</span>
                      <span className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{lastMessage?.time}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className={`text-sm truncate ${unreadCount > 0 ? (darkMode ? "text-white font-medium" : "text-gray-900 font-medium") : darkMode ? "text-gray-400" : "text-gray-500"}`}>{lastMessage ? (lastMessage.sender === "me" ? `You: ${lastMessage.text}` : lastMessage.text) : "No messages yet"}</p>
                      {unreadCount > 0 && <span className="ml-2 px-2 py-0.5 bg-blue-500 text-white text-xs rounded-full">{unreadCount}</span>}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-6 text-center text-gray-500">No contacts found</div>
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {activeContact ? (
          <>
            {/* Chat Header */}
            <div className={`p-4 border-b ${darkMode ? "border-gray-700" : "border-gray-200"} flex items-center`}>
              <div className="relative">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${darkMode ? "bg-gray-700" : "bg-blue-100"} text-sm font-medium`}>{CONTACTS.find((c) => c.id === activeContact)?.avatar}</div>
                <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 ${darkMode ? "border-gray-900" : "border-white"} ${CONTACTS.find((c) => c.id === activeContact)?.status === "online" ? "bg-green-500" : CONTACTS.find((c) => c.id === activeContact)?.status === "away" ? "bg-yellow-500" : "bg-gray-500"}`}></span>
              </div>

              <div className="ml-3">
                <h3 className="font-medium">{CONTACTS.find((c) => c.id === activeContact)?.name}</h3>
                <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{CONTACTS.find((c) => c.id === activeContact)?.status === "online" ? "Online" : `Last seen ${CONTACTS.find((c) => c.id === activeContact)?.lastSeen}`}</p>
              </div>

              <div className="ml-auto flex space-x-2">
                <button className={`p-2 rounded-full ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}>📞</button>
                <button className={`p-2 rounded-full ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}>📹</button>
                <Dropdown>
                  <Dropdown.Trigger className={`p-2 rounded-full ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}>•••</Dropdown.Trigger>

                  <Dropdown.Menu className={`w-48 rounded-md shadow-lg py-1 ${darkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"}`}>
                    <Dropdown.Item className={`px-4 py-2 text-sm ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}>View Profile</Dropdown.Item>
                    <Dropdown.Item className={`px-4 py-2 text-sm ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}>Search in Conversation</Dropdown.Item>
                    <Dropdown.Item className={`px-4 py-2 text-sm ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}>Mute Notifications</Dropdown.Item>
                    <Dropdown.Item className={`px-4 py-2 text-sm text-red-600 ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}>Block Contact</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>

            {/* Messages */}
            <div className={`flex-1 p-4 overflow-y-auto ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}>
              {messages[activeContact]?.length > 0 ? (
                <div className="space-y-3">
                  {messages[activeContact].map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-xs md:max-w-md rounded-lg px-4 py-2 ${message.sender === "me" ? (darkMode ? "bg-blue-600 text-white" : "bg-blue-500 text-white") : darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-900"}`}>
                        <p>{message.text}</p>
                        <div className={`text-xs mt-1 text-right ${message.sender === "me" ? "text-blue-200" : darkMode ? "text-gray-400" : "text-gray-500"}`}>
                          {message.time} {message.sender === "me" && (message.read ? "✓✓" : "✓")}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messageEndRef} />
                </div>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-5xl mb-4">💬</div>
                    <p className={darkMode ? "text-gray-400" : "text-gray-500"}>No messages yet</p>
                  </div>
                </div>
              )}
            </div>

            {/* Message Input */}
            <div className={`p-4 border-t ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
              <div className="flex items-center">
                <button className={`p-2 mr-2 rounded-full ${darkMode ? "hover:bg-gray-700 text-gray-400" : "hover:bg-gray-100 text-gray-600"}`}>😊</button>
                <button className={`p-2 mr-2 rounded-full ${darkMode ? "hover:bg-gray-700 text-gray-400" : "hover:bg-gray-100 text-gray-600"}`}>📎</button>
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Type a message..."
                  className={`flex-1 py-2 px-4 rounded-lg border border-gray-300/50 shadow-inner ${darkMode ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400" : "bg-gray-100 text-gray-900 placeholder-gray-500"}`}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className={`ml-2 p-2 w-10 rounded-lg border ${newMessage.trim() ? "border-blue-700  bg-blue-500 text-white" : darkMode ? "bg-gray-700 text-gray-500" : "bg-gray-200 text-gray-400"}`}>
                  ↑
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">💬</div>
              <p className={darkMode ? "text-gray-400" : "text-gray-500"}>Select a chat to start messaging</p>
            </div>
          </div>
        )}
      </div>

      {/* Settings Modal */}
      <Modal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        className={darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"}>
        <Modal.Header className={`p-4 border-b ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
          <h3 className="text-lg font-semibold">Settings</h3>
          <Modal.CloseButton
            onClose={() => setShowSettings(false)}
            className={`absolute top-4 right-4 ${darkMode ? "text-gray-400 hover:text-white" : "text-gray-400 hover:text-gray-900"}`}>
            ×
          </Modal.CloseButton>
        </Modal.Header>

        <Modal.Body className="p-4">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <label className="font-medium">Dark Mode</label>
              <Toggle
                pressed={darkMode}
                onChange={setDarkMode}
                className={`p-0.5 w-12 h-6 rounded-full transition-colors ${darkMode ? "bg-blue-600" : "bg-gray-300"}`}>
                <span className={`block w-5 h-5 rounded-full bg-white transform transition-transform ${darkMode ? "translate-x-6" : "translate-x-0"}`}></span>
              </Toggle>
            </div>

            <div className="flex items-center justify-between">
              <label className="font-medium">Notifications</label>
              <Toggle
                pressed={notificationsEnabled}
                onChange={setNotificationsEnabled}
                className={`p-0.5 w-12 h-6 rounded-full transition-colors ${notificationsEnabled ? "bg-blue-600" : "bg-gray-300"}`}>
                <span className={`block w-5 h-5 rounded-full bg-white transform transition-transform ${notificationsEnabled ? "translate-x-6" : "translate-x-0"}`}></span>
              </Toggle>
            </div>

            <div>
              <label className="font-medium block mb-2">Chat Wallpaper</label>
              <div className="grid grid-cols-6 gap-2">
                {["#ffffff", "#f3f4f6", "#dbeafe", "#dcfce7", "#fef3c7", "#fee2e2"].map((color) => (
                  <button
                    key={color}
                    style={{ backgroundColor: color }}
                    className="w-8 h-8 rounded-full border border-gray-300"></button>
                ))}
              </div>
            </div>

            <div>
              <label className="font-medium block mb-2">Message Text Size</label>
              <select className={`w-full p-2 rounded ${darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"}`}>
                <option>Small</option>
                <option selected>Medium</option>
                <option>Large</option>
                <option>Extra Large</option>
              </select>
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer className={`p-4 border-t ${darkMode ? "border-gray-700" : "border-gray-200"} flex justify-end space-x-2`}>
          <button
            onClick={() => setShowSettings(false)}
            className={`px-4 py-2 rounded ${darkMode ? "bg-gray-700 hover:bg-gray-600 text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-900"}`}>
            Cancel
          </button>
          <button
            onClick={() => setShowSettings(false)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded">
            Save
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ChatApp;
