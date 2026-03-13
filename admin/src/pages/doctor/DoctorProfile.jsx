import React, { useContext, useEffect } from "react";
import { doctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const DoctorProfile = () => {
  const { dtoken, getProfileData, profileData, setProfileData, backendUrl } =
    useContext(doctorContext);
  const { currency } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);

  const updateProfile = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available,
      };
      const { data } = await axios.post(
        backendUrl + "/api/doctor/update-profile",
        updateData,
        { headers: { dtoken } },
      );
      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        getProfileData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    if (dtoken) {
      getProfileData();
    }
  }, [dtoken]);

  return (
    profileData && (
      <div className="mt-16 px-4 md:px-8 pb-10">
        <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-indigo-500 to-blue-500 h-32"></div>

          <div className="p-6 md:flex gap-8 -mt-16">
            {/* Profile Image */}
            <div className="flex justify-center md:block">
              <img
                src={profileData.image}
                alt=""
                className="w-32 h-32 rounded-xl border-4 border-white shadow-lg object-cover"
              />
            </div>

            {/* Profile Info */}
            <div className="flex-1 mt-4 md:mt-0">
              {/* Name */}
              <h2 className="text-2xl font-bold text-gray-800">
                {profileData.name}
              </h2>

              {/* Degree & Speciality */}
              <p className="text-gray-500 mt-1">
                {profileData.degree} • {profileData.speciality}
              </p>

              {/* Experience Badge */}
              <div className="mt-2">
                <span className="bg-green-100 text-green-600 text-sm px-3 py-1 rounded-full">
                  {profileData.experience} Experience
                </span>
              </div>

              {/* About */}
              <div className="mt-6">
                <h3 className="font-semibold text-gray-800 mb-1">About</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {profileData.about}
                </p>
              </div>

              {/* Fees */}
              <div className="mt-6 flex items-center gap-2">
                <p className="font-medium text-gray-700">Appointment Fee:</p>
                <span className="text-indigo-600 font-semibold text-lg">
                  {currency}
                  {isEdit ? (
                    <input
                      type="number"
                      value={profileData.fees}
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          fees: e.target.value,
                        }))
                      }
                    />
                  ) : (
                    profileData.fees
                  )}
                </span>
              </div>

              {/* Address */}
              <div className="mt-6">
                <h3 className="font-semibold text-gray-800">Address</h3>
                <p className="text-gray-600 text-sm">
                  {isEdit ? (
                    <input
                      type="text"
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          address: { ...prev.address, line1: e.target.value },
                        }))
                      }
                      value={profileData.address.line1}
                    />
                  ) : (
                    profileData.address.line1
                  )}
                  <br />
                  {isEdit ? (
                    <input
                      type="text"
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          address: { ...prev.address, line1: e.target.value },
                        }))
                      }
                      value={profileData.address.line2}
                    />
                  ) : (
                    profileData.address.line2
                  )}
                </p>
              </div>

              {/* Availability Toggle */}
              <div className="flex items-center gap-3 mt-6">
                <input
                  onChange={() =>
                    isEdit &&
                    setProfileData((prev) => ({
                      ...prev,
                      available: !prev.available,
                    }))
                  }
                  checked={profileData.available}
                  type="checkbox"
                  defaultChecked
                  className="w-5 h-5 accent-indigo-600"
                />
                <label className="text-gray-700 font-medium">
                  Available for Appointments
                </label>
              </div>

              {/* Edit Button */}
              {isEdit ? (
                <button
                  onClick={updateProfile}
                  className="mt-6 bg-indigo-600 hover:bg-indigo-700 transition text-white px-6 py-2 rounded-lg shadow-md"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => setIsEdit(true)}
                  className="mt-6 bg-indigo-600 hover:bg-indigo-700 transition text-white px-6 py-2 rounded-lg shadow-md"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorProfile;
