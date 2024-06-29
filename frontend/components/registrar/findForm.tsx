import React, { useState } from "react";
import UserModal from "./UserModal";

const dummyUsers = [
  {
    id: 1,
    name: "John Brown",
    dob: "1975-05-20",
    image: "https://via.placeholder.com/90", // Placeholder image URL
  },
  {
    id: 2,
    name: "Jim Green",
    dob: "1994-07-16",
    image: "https://via.placeholder.com/90", // Placeholder image URL
  },
  {
    id: 3,
    name: "Joe Black",
    dob: "1989-11-02",
    image: "https://via.placeholder.com/90", // Placeholder image URL
  },
];

const UserSearch = () => {
  const [userId, setUserId] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  const handleInputChange = (event) => {
    setUserId(event.target.value);
  };

  const handleSearch = () => {
    const user = dummyUsers.find((u) => u.id === parseInt(userId, 10));
    if (!user) {
      alert("user not found");
    }
    setSelectedUser(user);
  };

  const closeModal = () => {
    setSelectedUser(null);
  };

  return (
    <div className="bg-gradient-to-br from-purple-700 to-pink-500 min-h-screen flex flex-col justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-5 w-[30%] h-[270px]">
        <h1 className="text-2xl font-bold text-center text-purple-700 mb-3">
          Find User Details
        </h1>
        <div className="space-y-6 mt-8">
          <div>
            <label className="block text-gray-700 font-bold mb-2">
              User ID
            </label>
            <input
              className="w-full px-4 py-2 rounded-lg border border-gray-400"
              id="userId"
              name="userId"
              type="text"
              value={userId}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <button
              className="w-full bg-purple-700 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded-lg"
              onClick={handleSearch}
            >
              Find User
            </button>
          </div>
        </div>
      </div>
      {selectedUser && (
        <UserModal user={selectedUser} closeModal={closeModal} />
      )}
    </div>
  );
};

export default UserSearch;
