import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } =
    useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);
      formData.append("address", JSON.stringify(userData.address));
      image && formData.append("image", image);

      const { data } = await axios.post(
        `${backendUrl}/api/user/update-profile`,
        formData,
        {
          headers: {
            token,
          },
        },
      );

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    userData && (
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto p-6 mt-10"
      >
        <div className="bg-white shadow-xl rounded-2xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {isEdit ? (
              <label htmlFor="image">
                <div className="inline-block relative cursor-pointer">
                  <img
                    src={image ? URL.createObjectURL(image) : userData.image}
                    alt="profile"
                    className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
                  />
                  <img
                    className="w-10 absolute bottom-12 right-12"
                    src={image ? "" : assets.upload_icon}
                    alt=""
                  />
                </div>
                <input
                  onChange={(e) => setImage(e.target.files[0])}
                  type="file"
                  id="image"
                  hidden
                />
              </label>
            ) : (
              <motion.img
                whileHover={{ scale: 1.05 }}
                src={userData.image}
                alt="profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
              />
            )}

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
              onClick={() => {
                if (isEdit) {
                  updateUserProfileData();
                } else {
                  setIsEdit(true);
                }
              }}
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
    )
  );
};

export default MyProfile;
