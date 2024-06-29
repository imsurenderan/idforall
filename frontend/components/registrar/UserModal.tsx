import React from "react";

const UserModal = ({ user, closeModal }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-5 w-[300px] relative">
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-gray-700 hover:text-gray-900"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold text-center text-purple-700 mb-3">
          User Details
        </h2>
        <div className="text-center">
          <img
            src={user.image}
            alt="User Image"
            className="mt-4 w-[90px] h-[90px] rounded-full mx-auto"
          />
          <p className="mt-4 text-gray-700">
            <strong>Name:</strong> {user.name}
          </p>
          <p className="mt-2 text-gray-700">
            <strong>Date of Birth:</strong> {user.dob}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
