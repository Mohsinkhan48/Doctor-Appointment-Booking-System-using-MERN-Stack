import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

const AddDoctor = () => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 year");
  const [fees, setFees] = useState("");
  const [speciality, setSpeciality] = useState("General Physician");
  const [degree, setDegree] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [about, setAbout] = useState("");

  const { backendUrl, aToken } = useContext(AdminContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (
        !image ||
        !name ||
        !email ||
        !password ||
        !fees ||
        !degree ||
        !addressLine1 ||
        !addressLine2 ||
        !about
      ) {
        return toast.error("Please fill all fields and upload image");
      }
      const formData = new FormData();
      formData.append("image", image);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fees", Number(fees));
      formData.append("speciality", speciality);
      formData.append("degree", degree);
      formData.append(
        "address",
        JSON.stringify({ line1: addressLine1, line2: addressLine2 }),
      );
      formData.append("about", about);

      console.log("Backend URL:", backendUrl);
      console.log("Token being sent:", aToken);

      const res = await axios.post(
        `${backendUrl}/api/admin/add-doctor`,
        formData,
        {
          headers: {
            atoken: aToken,
          },
        },
      );

      if (res.data.success) {
        toast.success("Doctor added successfully");
        setImage(null);
        setName("");
        setEmail("");
        setPassword("");
        setExperience("1 year");
        setFees("");
        setSpeciality("General Physician");
        setDegree("");
        setAddressLine1("");
        setAddressLine2("");
        setAbout("");
      } else {
        toast.error(res.data.message || "Error adding doctor");
        console.log(res.data.message);
      }
    } catch (error) {
      console.log("FULL ERROR RESPONSE:");
      console.log(error.response);
      console.log("ERROR DATA:", error.response?.data);
      console.log("ERROR STATUS:", error.response?.status);
      console.log("ERROR MESSAGE:", error.message);

      toast.error(error.response?.data?.message || "Error adding doctor");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-10">
        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 mb-8">
          Add New Doctor
        </h2>

        <form onSubmit={onSubmitHandler} className="space-y-8">
          {/* Upload Section */}
          <div className="flex items-center gap-6">
            <label htmlFor="doc-img" className="cursor-pointer group">
              <img
                src={image ? URL.createObjectURL(image) : assets.upload_area}
                alt="Doctor upload"
                className="w-28 h-28 object-cover rounded-full 
                border-2 border-dashed border-gray-300 
                bg-gray-50 p-1
               group-hover:border-indigo-500

                transition-all duration-300"
              />
            </label>

            <input
              type="file"
              id="doc-img"
              hidden
              onChange={(e) => setImage(e.target.files[0])}
            />

            <p className="text-gray-500 text-sm">
              Upload doctor profile picture
            </p>
          </div>

          {/* Form Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* LEFT */}
            <div className="space-y-5">
              <Input
                onChange={(e) => setName(e.target.value)}
                value={name}
                label="Doctor Name"
                placeholder="Enter name"
              />
              <Input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                label="Doctor Email"
                type="email"
                placeholder="Enter email"
              />
              <Input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                label="Password"
                type="password"
                placeholder="Enter password"
              />

              <Select
                label="Experience"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                options={[
                  "1 year",
                  "2 years",
                  "3 years",
                  "4 years",
                  "5 years",
                  "6 years",
                  "7 years",
                  "8 years",
                  "9 years",
                  "10 years",
                ]}
              />

              <Input
                onChange={(e) => setFees(e.target.value)}
                value={fees}
                label="Fees"
                type="number"
                placeholder="Doctor fees"
              />
            </div>

            {/* RIGHT */}
            <div className="space-y-5">
              <Select
                label="Speciality"
                value={speciality}
                onChange={(e) => setSpeciality(e.target.value)}
                options={[
                  "General Physician",
                  "Gynecologist",
                  "Pediatrician",
                  "Gastroenterologist",
                  "Neurologist",
                  "Dermatologist",
                ]}
              />

              <Input
                onChange={(e) => setDegree(e.target.value)}
                value={degree}
                label="Education"
                placeholder="Doctor education"
              />

              <div>
                <label className="form-label">Address</label>
                <input
                  onChange={(e) => setAddressLine1(e.target.value)}
                  value={addressLine1}
                  className="form-input mb-3"
                  placeholder="Address line 1"
                />
                <input
                  onChange={(e) => setAddressLine2(e.target.value)}
                  value={addressLine2}
                  className="form-input"
                  placeholder="Address line 2"
                />
              </div>
            </div>
          </div>

          {/* About */}
          <div>
            <label className="form-label">About Doctor</label>
            <textarea
              onChange={(e) => setAbout(e.target.value)}
              value={about}
              rows="5"
              placeholder="Write about doctor..."
              className="form-input resize-none"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full md:w-auto px-10 py-3 rounded-xl
bg-gradient-to-r from-indigo-600 to-violet-600
text-white font-semibold shadow-md
hover:shadow-xl hover:scale-105
active:scale-95
transition-all duration-300"
          >
            Add Doctor
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDoctor;

/* Reusable Input */
const Input = ({ label, type = "text", placeholder, value, onChange }) => (
  <div>
    <label className="form-label">{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="form-input"
    />
  </div>
);

/* Reusable Select */
const Select = ({ label, options, value, onChange }) => (
  <div>
    <label className="form-label">{label}</label>
    <select value={value} onChange={onChange} className="form-input">
      {options.map((opt, i) => (
        <option key={i} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);
