import React, { useState } from "react";

const AddForm = ({ closeModal }) => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const dob = event.target.dob.value;
    console.log({ name, dob, image });
    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-5 max-w-md">
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-gray-700 hover:text-gray-900"
        >
          &times;
        </button>
        <h1 className="text-2xl font-bold text-center text-purple-700 mb-3">
          Register a User
        </h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 font-bold mb-2">
              Full Name
            </label>
            <input
              className="w-full px-4 py-2 rounded-lg border border-gray-400"
              id="name"
              name="name"
              type="text"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">
              Date of Birth
            </label>
            <input
              className="w-full px-4 py-2 rounded-lg border border-gray-400"
              id="dob"
              name="dob"
              type="date"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">
              National ID
            </label>
            <input
              className="w-full px-4 py-2 rounded-lg border border-gray-400"
              id="name"
              name="name"
              type="text"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">
              Additional Info
            </label>
            <input
              className="w-full px-4 py-2 rounded-lg border border-gray-400"
              id="name"
              name="name"
              type="text"
              required
            />
          </div>
          <div>
            {preview && (
              <div className="w-full flex justify-center">
                <img
                  src={preview}
                  alt="Image Preview"
                  className="mt-4 w-[90px] h-[90px] rounded-full"
                />
              </div>
            )}
          </div>
          <div className="flex gap-3">
            <button
              className="w-full bg-white hover:bg-red-500 hover:text-white transition duration-500 text-black border border-red-400 font-bold py-2 px-4 rounded-lg"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button className="w-full bg-purple-700 hover:bg-purple-900 transition duration-500 text-white font-bold py-2 px-4 rounded-lg">
              Create User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddForm;
