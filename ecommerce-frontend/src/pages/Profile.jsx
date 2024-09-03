import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";
import { Tooltip } from "react-tooltip";

const ProfileSection = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentField, setCurrentField] = useState("");
  

  const { user } = useSelector((state) => state.userAuth);

  const [formData, setFormData] = useState({
    username: user.username,
    name: user.name,
    email: user.email,
  });

  const handleEditClick = (field) => {
    setCurrentField(field);
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [currentField]: e.target.value,
    });
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
   <div className="min-h-screen flex flex-col justify-center align-middle w-full " >
     <div className="p-8 bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white rounded-2xl shadow-2xl mx-auto glass-effect self-center ">
      <div className="flex items-center space-x-6 mb-8">
        <div className="relative group">
          
        </div>
        <div>
          <h2 className="text-3xl font-bold text-white">{user.username}</h2>
          <p className="text-sm text-gray-300">{user.email}</p>
        </div>
      </div>

      <div className="space-y-6">
        {Object.keys(formData).map((field) => (
          <div
            key={field}
            className="flex justify-between items-center p-4 bg-gray-800 bg-opacity-60 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 glass-effect"
          >
            <span className="capitalize text-gray-300 font-semibold">{field}:</span>
            <div className="flex items-center space-x-3">
              <span className="font-medium text-white">{formData[field]}</span>
              <Tooltip
                text={`Edit ${field}`}
                position="top"
                backgroundColor="rgba(0, 0, 0, 0.8)"
                textColor="#fff"
              >
                <FaEdit
                  className="text-xl cursor-pointer text-gray-400 hover:text-blue-500 transition-colors duration-300"
                  onClick={() => handleEditClick(field)}
                />
              </Tooltip>
            </div>
          </div>
        ))}
      </div>

      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-black p-10 rounded-lg shadow-2xl max-w-md w-full text-white relative glass-effect">
            <IoClose
              className="absolute top-4 right-4 text-3xl cursor-pointer hover:text-gray-400 transition duration-300"
              onClick={() => setIsEditing(false)}
            />
            <h3 className="text-2xl font-semibold capitalize mb-6">
              Edit {currentField}
            </h3>
            <input
              type="text"
              value={formData[currentField]}
              onChange={handleInputChange}
              className="w-full p-4 bg-gray-800 bg-opacity-70 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-inner glass-effect"
            />
            <div className="mt-8 flex justify-end space-x-4">
              <button
                className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-500 transition duration-300"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-500 transition duration-300 shadow-lg"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
   </div>
  );
};

export default ProfileSection;
