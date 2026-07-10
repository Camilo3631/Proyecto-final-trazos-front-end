import { DoctorCard } from '../DoctorList/DoctorCard'
       
const DoctorList = ({ doctores }) => {
    return (
      <div className="grid gird-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {doctores.map((doctor) => (
          <DoctorCard key={doctor._id} doctor={doctor} />
        ))}
      </div>
   );
};

export { DoctorList }