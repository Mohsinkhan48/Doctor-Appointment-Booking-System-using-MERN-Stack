import React, { useState } from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";

const MyProfile = () => {
  const [userData, setUserData] = useState({
    name: "Mohsin Khan",
    image: assets.profile_pic,
    email: "kmohsinkhan482@gmail.com",
    phone: "0303-4789426",
    address: {
      line1: "Lahore Garden Town",
      line2: "Attaturk block",
    },
    gender: "Male",
    dob: "2002-04-14",
  });

  const [isEdit, setIsEdit] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto p-6 mt-10"
    >
      <div className="bg-white shadow-xl rounded-2xl p-6 md:p-8">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <motion.img
            whileHover={{ scale: 1.05 }}
            src={userData.image}
            alt="profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
          />

          <div className="flex-1 w-full">
            {isEdit ? (
              <input
                className="w-full text-2xl font-semibold border-b focus:outline-none focus:border-blue-500"
                value={userData.name}
                onChange={(e) =>
                  setUserData({ ...userData, name: e.target.value })
                }
              />
            ) : (
              <h2 className="text-2xl font-bold text-gray-800">
                {userData.name}
              </h2>
            )}
            <p className="text-gray-500">{userData.email}</p>
          </div>

          <button
            onClick={() => setIsEdit(!isEdit)}
            className="px-5 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            {isEdit ? "Save" : "Edit"}
          </button>
        </div>

        <hr className="my-6" />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Contact Information
          </h3>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              {isEdit ? (
                <input
                  className="w-full border rounded-lg p-2"
                  value={userData.phone}
                  onChange={(e) =>
                    setUserData({ ...userData, phone: e.target.value })
                  }
                />
              ) : (
                <p className="font-medium">{userData.phone}</p>
              )}
            </div>

            <div>
              <p className="text-sm text-gray-500">Address</p>
              {isEdit ? (
                <>
                  <input
                    className="w-full border rounded-lg p-2 mb-2"
                    value={userData.address.line1}
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        address: {
                          ...userData.address,
                          line1: e.target.value,
                        },
                      })
                    }
                  />
                  <input
                    className="w-full border rounded-lg p-2"
                    value={userData.address.line2}
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        address: {
                          ...userData.address,
                          line2: e.target.value,
                        },
                      })
                    }
                  />
                </>
              ) : (
                <p className="font-medium">
                  {userData.address.line1}
                  <br />
                  {userData.address.line2}
                </p>
              )}
            </div>
          </div>
        </motion.div>

        <hr className="my-6" />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Basic Information
          </h3>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Gender</p>
              {isEdit ? (
                <select
                  className="w-full border rounded-lg p-2"
                  value={userData.gender}
                  onChange={(e) =>
                    setUserData({ ...userData, gender: e.target.value })
                  }
                >
                  <option>Male</option>
                  <option>Female</option>
                </select>
              ) : (
                <p className="font-medium">{userData.gender}</p>
              )}
            </div>
            <div>
              <p className="text-sm text-gray-500">Date of Birth</p>
              {isEdit ? (
                <input
                  type="date"
                  className="w-full border rounded-lg p-2"
                  value={userData.dob}
                  onChange={(e) =>
                    setUserData({ ...userData, dob: e.target.value })
                  }
                />
              ) : (
                <p className="font-medium">{userData.dob}</p>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MyProfile;
