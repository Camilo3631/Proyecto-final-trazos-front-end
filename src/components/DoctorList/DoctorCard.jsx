import { FaUserMd } from "react-icons/fa";

const DoctorCard = ({ doctor }) => {
    return (
     <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col gap-3">
       <div className="flex items-center gap-3">
        <FaUserMd className="text-blue-500 text-4xl"/>
        </div>
         <h3 className="text-lg font-semibold">{doctor.name}</h3>
        <p className="text-sm text-gray-400">{doctor.especialidad}</p>
     </div>
    );
};

export { DoctorCard }