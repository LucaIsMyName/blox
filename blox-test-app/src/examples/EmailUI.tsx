import { useState } from "react";
import { Button } from "../components/ui/Button";
import { Avatar } from "../components/ui/Avatar";
import { ContextMenu } from "blox-ui-react";

// Sample data for the email client
const FOLDERS = [
  { id: "inbox", name: "Inbox", icon: "📥", count: 3 },
  { id: "starred", name: "Starred", icon: "⭐", count: 0 },
  { id: "sent", name: "Sent", icon: "📤", count: 0 },
  { id: "drafts", name: "Drafts", icon: "📝", count: 2 },
  { id: "trash", name: "Trash", icon: "🗑️", count: 0 },
];

const LABELS = [
  { id: "work", name: "Work", color: "blue" },
  { id: "personal", name: "Personal", color: "green" },
  { id: "important", name: "Important", color: "red" },
  { id: "updates", name: "Updates", color: "purple" },
];

const EMAILS = [
  {
    id: "email-1",
    from: "John Doe <john@example.com>",
    subject: "Meeting Notes - Project Kickoff",
    preview: "Here are the notes from our kickoff meeting yesterday. Let me know if you have any questions.",
    time: "10:30 AM",
    read: false,
    starred: true,
    labels: ["work"],
  },
  {
    id: "email-2",
    from: "Sarah Johnson <sarah@example.com>",
    subject: "Weekend plans?",
    preview: "Hey! I was wondering if you wanted to check out that new restaurant downtown this weekend?",
    time: "Yesterday",
    read: true,
    starred: false,
    labels: ["personal"],
  },
  {
    id: "email-3",
    from: "Michael Chen <michael@example.com>",
    subject: "Updated design files",
    preview: "I've updated the design files with the feedback from yesterday's meeting. You can find them in the shared folder.",
    time: "Mar 27",
    read: true,
    starred: true,
    labels: ["work"],
  },
  {
    id: "email-4",
    from: "Netflix <info@netflix.com>",
    subject: "New shows added to your list",
    preview: "We've added new shows and movies that match your interests. Log in to see what's new for you.",
    time: "Mar 26",
    read: true,
    starred: false,
    labels: ["updates"],
  },
  {
    id: "email-5",
    from: "GitHub <noreply@github.com>",
    subject: "Security alert: New sign-in from unknown location",
    preview: "We noticed a new sign-in to your account from an unknown location. If this was you, you can ignore this email.",
    time: "Mar 25",
    read: false,
    starred: false,
    labels: ["important", "updates"],
  },
  {
    id: "email-6",
    from: "Alex Wong <alex@example.com>",
    subject: "Happy Birthday!",
    preview: "Happy Birthday! Hope you have an amazing day filled with joy and celebration. Wishing you all the best!",
    time: "Mar 24",
    read: true,
    starred: true,
    labels: ["personal"],
  },
];

function EmailUI() {
  const [selectedFolder, setSelectedFolder] = useState("inbox");
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [emails, setEmails] = useState(EMAILS);
  const [selectedLabels, setSelectedLabels] = useState([]);

  // Filter emails based on selected folder and labels
  const filteredEmails = emails.filter((email) => {
    if (selectedFolder === "starred" && !email.starred) return false;
    if (selectedLabels.length > 0 && !selectedLabels.some((label) => email.labels.includes(label))) return false;
    return true;
  });

  // Toggle star on an email
  const toggleStar = (emailId) => {
    setEmails(emails.map((email) => (email.id === emailId ? { ...email, starred: !email.starred } : email)));
  };

  // Toggle a label filter
  const toggleLabelFilter = (labelId) => {
    setSelectedLabels(selectedLabels.includes(labelId) ? selectedLabels.filter((id) => id !== labelId) : [...selectedLabels, labelId]);
  };

  // Mark an email as read
  const markAsRead = (emailId) => {
    setEmails(emails.map((email) => (email.id === emailId ? { ...email, read: true } : email)));
  };

  // Get the current email
  const currentEmail = emails.find((email) => email.id === selectedEmail);

  return (
    <div className="h-full min-h-[calc(100vh-200px)] max-h-[calc(100vh-200px)] overflow-hidden flex">
      {/* Left Sidebar - Folders & Labels */}
      <aside className="w-16 bg-gray-900 text-white flex flex-col items-center py-4">
        {FOLDERS.map((folder) => (
          <button
            key={folder.id}
            onClick={() => setSelectedFolder(folder.id)}
            className={`relative w-12 h-12 mb-2 flex flex-col items-center justify-center rounded ${selectedFolder === folder.id ? "bg-gray-700" : "hover:bg-gray-800"}`}>
            <span className="text-xl ">{folder.icon}</span>
            {folder.count > 0 && <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">{folder.count}</span>}
          </button>
        ))}

        <div className="border-t border-gray-700 w-8 my-2"></div>

        {LABELS.map((label) => (
          <button
            key={label.id}
            onClick={() => toggleLabelFilter(label.id)}
            className={`w-12 h-12 mb-2 flex items-center justify-center rounded ${selectedLabels.includes(label.id) ? "bg-gray-700" : "hover:bg-gray-800"}`}>
            <span className={`w-4 h-4 rounded-full bg-${label.color}-500`}></span>
          </button>
        ))}
      </aside>

      {/* Email List */}
      <div className="w-64 md:w-80 bg-white border-r border-gray-200 overflow-y-auto">
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <input
              type="text"
              placeholder="Search emails..."
              className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-md"
            />
            <span className="absolute left-2.5 top-2.5 text-gray-400">🔍</span>
          </div>
        </div>

        <div className="divide-y divide-gray-100">
          {filteredEmails.length === 0 ? (
            <div className="p-6 text-center text-gray-500">No emails found</div>
          ) : (
            filteredEmails.map((email) => (
              <ContextMenu key={email.id}>
                <ContextMenu.Trigger>
                  <div
                    onClick={() => {
                      setSelectedEmail(email.id);
                      markAsRead(email.id);
                    }}
                    className={`p-3 hover:bg-gray-50 cursor-pointer ${selectedEmail === email.id ? "bg-blue-50" : ""}`}>
                    <section className="flex">
                      <section className="relative">
                        <Avatar>
                          <span>{email.from.charAt(0).toUpperCase()}</span>
                        </Avatar>
                        <span className={`absolute border-blue-700 shadow top-0.5 right-0.5 w-2 h-2 rounded-full ${email.read ? "bg-transparent" : "bg-blue-500"}`}></span>
                      </section>
                      <div className="flex items-center mb-1 flex-1">
                        <span className="ml-2 text-sm font-semibold text-gray-900 truncate">{email.from.split("<")[0]}</span>
                        <span className="ml-auto text-xs text-gray-500 whitespace-nowrap">{email.time}</span>
                      </div>
                    </section>
                    <section className="flex">
                      <div className="max-w-[calc(100%-theme(size.2)-theme(size.4))]">
                        <div className={`text-sm truncate ${email.read ? "text-gray-600" : "font-semibold text-gray-900"}`}>{email.subject}</div>
                        <div className="text-xs text-gray-500 truncate">{email.preview}</div>
                      </div>
                      <div className="mt-2 flex items-center flex-1">
                        {email.labels.map((labelId) => {
                          const label = LABELS.find((l) => l.id === labelId);
                          return (
                            <div>
                              {" "}
                              <span
                                key={labelId}
                                className={`mr-1 w-2 h-2 rounded-full bg-${label.color}-500`}></span>
                            </div>
                          );
                        })}

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleStar(email.id);
                          }}
                          className="ml-auto text-gray-400 hover:text-yellow-400">
                          {email.starred ? "★" : "☆"}
                        </button>
                      </div>
                    </section>
                  </div>
                </ContextMenu.Trigger>

                <ContextMenu.Content className="bg-white rounded-md shadow-lg border border-gray-200 py-1 w-48">
                  <ContextMenu.Item
                    className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                    onSelect={() => markAsRead(email.id)}>
                    Mark as {email.read ? "unread" : "read"}
                  </ContextMenu.Item>
                  <ContextMenu.Item
                    className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                    onSelect={() => toggleStar(email.id)}>
                    {email.starred ? "Remove star" : "Add star"}
                  </ContextMenu.Item>
                  <ContextMenu.Separator className="my-1 border-t border-gray-200" />
                  <ContextMenu.Item className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer">Archive</ContextMenu.Item>
                  <ContextMenu.Item className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer">Delete</ContextMenu.Item>
                </ContextMenu.Content>
              </ContextMenu>
            ))
          )}
        </div>
      </div>

      {/* Email Content */}
      <div className="flex-1 bg-white overflow-y-auto">
        {currentEmail ? (
          <div className="p-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold mb-4">{currentEmail.subject}</h1>

              <div className="flex items-center justify-betweenw-full mb-6">
                <Avatar>{currentEmail.from.charAt(0)}</Avatar>

                <div className="ml-3">
                  <div className="font-medium text-sm">{currentEmail.from.split("<")[0]}</div>
                  <div className="text-xs text-gray-500">{currentEmail.from.match(/<(.+)>/)?.[1] || ""}</div>
                </div>

                <div className="ml-auto text-sm text-gray-500">{currentEmail.time}</div>
              </div>

              <div className="flex space-x-2">
                {currentEmail.labels.map((labelId) => {
                  const label = LABELS.find((l) => l.id === labelId);
                  return (
                    <span
                      key={labelId}
                      className={`px-2 py-1 text-xs rounded-full bg-${label.color}-100 text-${label.color}-800`}>
                      {label.name}
                    </span>
                  );
                })}
              </div>
            </div>

            <div className="prose max-w-none">
              <p>{currentEmail.preview}</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.</p>
              <p>Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              <p>
                Best regards,
                <br />
                The Sender
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex space-x-4">
                <Button>Reply</Button>
                <Button variant="secondary">Forward</Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <div className="text-5xl mb-4">📬</div>
              <p className="text-gray-500">Select an email to read</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default EmailUI;
