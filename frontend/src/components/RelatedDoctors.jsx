import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const RelatedDoctors = ({speciality,docId}) => {
    const {doctors}=useContext(AppContext)
    const [relDoc,setRelDocs]=useState([])
    const navigate=useNavigate()
    useEffect(()=>{
       if(doctors.length>0){
        const doctorsData=doctors.filter(doc=>doc.speciality===speciality && doc._id!==docId)
        setRelDocs(doctorsData)
       }
    },[doctors,speciality,docId])

  return (
    <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
      <h1 className='text-3xl items-center font-medium'>MORE DOCTORS TO BOOK</h1>
      <p className='w-full text-center gap-4 pt-1 gap-y-10 px-3 sm:px-0'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perferendis recusandae veniam nulla!</p>
      <div className='border flex gap-14  flex-wrap border-white rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'>{relDoc.slice(0,5).map((item,index)=>(
        <div onClick={()=>{navigate(`/appointment/${item._id}`);scrollTo(0,0)}} className='border w-52 border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500 ' key={index}>
            <img className='bg-blue-50' src={item.image} alt="" />
            <div className='p-4'>
            <div className={`flex flex-row items-center gap-2 text-sm text-center ${item.available ? ' text-green-500':'text-gray-500'} `}>
                    <p className={`w-2 h-2 ${item.available ? ' bg-green-500':'bg-gray-500'} rounded-full `}></p>
                    <p>{item.available ? 'Available':'Not Available'}</p>
                </div>
                <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                <p className='text-gray-600 text-sm'>{item.speciality}</p>
            </div>
        </div>
      ))}</div>
      <button onClick={()=>{navigate('/doctors')}} className='bg-blue-500 text-white px-12 py-3 rounded-full mt-10 cursor-pointer'>more</button>
    </div>
  )
}

export default RelatedDoctors
