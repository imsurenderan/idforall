"use client"
import React, { useState } from "react";
import AddForm from "./AddForm";

const UsersTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="flex flex-col px-4 h-screen">
      <div className="overflow-x-auto">
        <h2 className="lg:text-4xl text-center my-8">Users List</h2>
        <div className="flex justify-center">
          <button
            className="w-[140px] bg-blue-500 hover:bg-blue-800 text-white rounded-lg p-2"
            onClick={openModal}
          >
            Register a User
          </button>
        </div>
        <div className="flex justify-center p-1.5 inline-block align-middle">
          <div className="overflow-hidden w-[60%] rounded-lg">
            <table className="min-w-full">
              <thead className="bg-gray-600">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs text-white font-bold uppercase"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs text-white font-bold uppercase"
                  >
                    Age
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs text-white font-bold uppercase"
                  >
                    Address
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="odd:bg-white even:bg-gray-100">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                    John Brown
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    45
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    New York No. 1 Lake Park
                  </td>
                </tr>
                <tr className="odd:bg-white even:bg-gray-100">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                    Jim Green
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    27
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    London No. 1 Lake Park
                  </td>
                </tr>
                <tr className="odd:bg-white even:bg-gray-100">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                    Joe Black
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    31
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    Sidney No. 1 Lake Park
                  </td>
                </tr>
                <tr className="odd:bg-white even:bg-gray-100">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                    Edward King
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    16
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    LA No. 1 Lake Park
                  </td>
                </tr>
                <tr className="odd:bg-white even:bg-gray-100">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                    Jim Red
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    45
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    Melbourne No. 1 Lake Park
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {isModalOpen && <AddForm closeModal={closeModal} />}
    </div>
  );
};

export default UsersTable;
