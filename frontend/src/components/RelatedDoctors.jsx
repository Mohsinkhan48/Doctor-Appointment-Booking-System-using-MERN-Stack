import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const RelatedDoctors = ({speciality,docId}) => {
    const {doctors} = useContext(AppContext)
    const [relDocs, setRelDocs] = useState([])

    const navigate = useNavigate()

    useEffect(()=>{
        if(doctors.length >0 && speciality){
            const doctorsData = doctors.filter((doc)=>doc.speciality === speciality && doc._id !== docId)
            setRelDocs(doctorsData)
        }

    },[doctors,docId,speciality])
  return (
    <>
    <section className="w-full py-16">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Related <span className="text-blue-600">Doctors</span>
          </h1>
          <p className="mt-4 text-gray-600 text-sm md:text-base">
            Simply browse through our extensive list of trusted doctors.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {relDocs.slice(0, 5).map((item, index) => (
            <div
             onClick={()=>{
                navigate(`/appointment/${item._id}`);
                scrollTo(0,0)
             }}
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-sm
              hover:shadow-xl transition-all duration-300 group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-56 object-cover
                  group-hover:scale-105 transition-transform duration-500"
                />

                <div className="absolute top-4 left-4 bg-green-500 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1">
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                  Available
                </div>
              </div>

              <div className="p-5 text-center">
                <h3 className="text-lg font-semibold text-gray-900">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {item.speciality}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <button
         onClick={()=>{navigate('/doctors'); scrollTo(0,0)}}
            className="px-8 py-3 bg-blue-600 text-white rounded-full font-medium
            hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            View More Doctors
          </button>
        </div>
      </div>
    </section>
    </>
  )
}

export default RelatedDoctors