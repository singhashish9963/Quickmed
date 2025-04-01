import { createContext } from "react";

export const AppContext=createContext()

const calculateAge=(dob)=>{
    const today=new Date()
    const birthDate=new Date(dob)

    let age=today.getFullYear()-birthDate.getFullYear()
    return age
}
const months=['','JAN','FEB','MAR','APR','MAY','JUNE','JULY','AUG','SEP','OCT','NOV','DEC']

const slotDateFormat=(slotDate)=>{
  const dateArray=slotDate.split('_')
  return dateArray[0]+" "+months[Number(dateArray[1])]+' '+dateArray[2]
}

const AppContextProvider=(props)=>{
    const value={calculateAge,slotDateFormat}
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
export default AppContextProvider