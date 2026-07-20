import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { DoctorProfile } from "../../components/DoctorPorfile/DoctorPorfile";


const ProfilePageDoctor = () =>  {
  const {doctorId } = useParams();
  

  const navigate = useNavigate();

  const [doctor, setDoctor] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
      const obtenerDoctor = async () => {
       try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/doctors`);

        const data = await response.json();

        const doctorEncontrado = data.find(
          (doctor) => doctor._id === doctorId
        );

        setDoctor(doctorEncontrado)
       } catch (error) {
         console.log('Error al obtener doctor:', error);
       } finally {
         setCargando(false)
       }
     };

     obtenerDoctor();
  }, [doctorId]);

  const eliminarCuenta = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/doctors/${doctorId}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      navigate("/register-doctor");
    }
  } catch (error) {
    console.log("Error al eliminar cuenta:", error);
  }
};

if (cargando) {
  return (
    <p className="text-center mt-10">
      Cargando...
    </p>
  );
}

   return (
     <div className="min-h-[calc(100vh-80px)] bg-slate-700 flex items-center justify-center p-8">
      <div className="w-full max-w-md">
        {doctor && (
          <DoctorProfile
           doctor={doctor}
           eliminarCuenta={eliminarCuenta}
           />
        )}

        <button
         onClick={() => navigate(`/doctor-dashboard/${doctorId}`)}
         className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition block mx-auto"
        >
          Volver
         </button>
      </div>
   </div>
  );
};

export { ProfilePageDoctor };

































































// // export { ProfilePageDoctor };

// // import { useEffect, useState } from "react";
// // import { useNavigate, useParams } from "react-router";
// // import { DoctorProfile } from "../../components/DoctorPorfile/DoctorPorfile";

// // const ProfilePageDoctor = () => {
// //   const { doctorId } = useParams();

// //   const navigate = useNavigate();

// //   const [doctor, setDoctor] = useState(null);
// //   const [cargando, setCargando] = useState(true);

// //   useEffect(() => {
// //     const obtenerDoctor = async () => {
// //       try {
// //         const response = await fetch(
// //           `${import.meta.env.VITE_API_URL}/api/doctors`
// //         );

// //         const data = await response.json();

// //         const doctorEncontrado = data.find(
// //           (doctor) => doctor._id === doctorId
// //         );

// //         setDoctor(doctorEncontrado);
// //       } catch (error) {
// //         console.log("Error al obtener doctor:", error);
// //       } finally {
// //         setCargando(false);
// //       }
// //     };

// //     obtenerDoctor();
// //   }, [doctorId]);

// //   const eliminarCuenta = async () => {
// //     try {
// //       const response = await fetch(
// //         `${import.meta.env.VITE_API_URL}/api/doctors/${doctorId}`,
// //         {
// //           method: "DELETE",
// //         }
// //       );

// //       if (response.ok) {
// //         navigate("/register-doctor");
// //       }
// //     } catch (error) {
// //       console.log("Error al eliminar cuenta:", error);
// //     }
// //   };

// //   if (cargando) {
// //     return (
// //       <p className="text-white text-center mt-10">
// //         Cargando...
// //       </p>
// //     );
// //   }

//   return (
//     <div className="min-h-[calc(100vh-80px)] bg-slate-700 flex items-center justify-center p-8">
//       <div className="w-full max-w-md">
//         {doctor && (
//           <DoctorProfile
//             doctor={doctor}
//             eliminarCuenta={eliminarCuenta}
//           />
//         )}

//         <button
//           onClick={() => navigate(`/doctor-dashboard/${doctorId}`)}
//           className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition block mx-auto"
//         >
//           Volver
//         </button>
//       </div>
//     </div>
//   );
// };

// export { ProfilePageDoctor };