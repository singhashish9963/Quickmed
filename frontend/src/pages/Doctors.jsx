import React, { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Doctors = () => {
  const { speciality } = useParams() // Get the speciality from the URL
  const [filterDoc, setFilterDoc] = useState([])
  const { doctors } = useContext(AppContext)
  const [showFilter, setShowFilter] = useState(false)
  const navigate = useNavigate()

  const applyFilter = () => {
    if (speciality) {
      const filteredDoctors = doctors.filter(doc => doc.speciality === speciality)
      setFilterDoc(filteredDoctors)
    } else {
      setFilterDoc(doctors)
    }
  }

  useEffect(() => {
    applyFilter()
  }, [doctors, speciality])

  const handleNavigation = (speciality) => {
    navigate(speciality ? `/doctors/${speciality}` : `/doctors`)
  }

  return (
    <div>
      <p className='text-gray-600'>
        Browse through the list of doctors available at our clinic. You can filter the doctors by their speciality.
      </p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        <button className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? 'bg-primary text-white': ''}`} onClick={()=>setShowFilter(prev=>!prev)}>Filters</button>
        <div className={` flex-col gap-4 text-sm text-gray-600 ${showFilter ? 'flex' : 'hidden sm:flex'} sm:block`}>
            <p onClick={() => handleNavigation('Gynecologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Gynecologist" ? 'bg-indigo-100 text-black' : '' }`}>Gynecologist</p>
            <p onClick={() => handleNavigation('General Physician')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "General physician" ? 'bg-indigo-100 text-black' : '' }`}>General Physician</p>
            <p onClick={() => handleNavigation('Dermatologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Dermatologist" ? 'bg-indigo-100 text-black' : '' }`}>Dermatologist</p>
            <p onClick={() => handleNavigation('Pediatricians')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Pediatricians" ? 'bg-indigo-100 text-black' : '' }`}>Pediatricians</p>
            <p onClick={() => handleNavigation('Neurologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Neurologist" ? 'bg-indigo-100 text-black' : '' }`}>Neurologist</p>
          <p onClick={() => handleNavigation('Gastroenterologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Gastroenterologist" ? 'bg-indigo-100 text-black' : '' }`}>Gastroenterologist</p>
        </div>
        <div className='border flex gap-14 flex-wrap border-white rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'>
          {filterDoc.map((item, index) => (
            <div
              onClick={() => navigate(`/appointment/${item._id}`)}
              className='border w-52 border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'
              key={index}
            >
              <img className='bg-blue-50' src={item.image} alt="" />
              <div className='p-4'>
                <div className='flex flex-row items-center gap-2 text-sm text-center text-green-500'>
                  <p className='w-2 h-2 bg-green-500 rounded-full '></p>
                  <p>Available</p>
                </div>
                <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                <p className='text-gray-600 text-sm'>{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Doctors