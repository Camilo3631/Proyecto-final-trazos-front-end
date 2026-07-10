const Hero = () => {
    return (
     <div className="min-h-[calc(100vh-80px)] bg-slate-700 text-white flex flex-col items-center justify-center text-center px-6">
      <img src="/Logo.png" alt="Mój Lekarz" className="h-23 w-auto mb-6" />
      <h1 className="text-4xl font-bold mb-4">
        Tu salud, nuestra prioridad
      </h1>
      <p className="text-lg text-gray-300 mb-10 max-w-xl">
        Agenda citas medicas de forma rápida y sencilla con los mejores especialistas.
      </p>
     </div>
   );
};


export { Hero };
