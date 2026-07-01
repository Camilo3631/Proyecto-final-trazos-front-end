import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa'

const Footer = () => {
    return (
        <footer className='bg-slate-700 text-white px-6 py-8 mt-auto'>
            <div className='max-w-4xl mx-auto flex flex-col items-center gap-4'>
                <p className='text-lg font-semibold'>Mój Lekarz</p>
                <p className='txt-sm text-gray-300'>Twoje zdrowie, nasza troska</p>

                <div className='flex gap-6 mt-2'>
                   <a href="#" aria-label='fFacebook' className='hover:text-blue-400 transition'>
                   <FaFacebook size={19} />
                  </a>
                  <a href="#" aria-label="Instagram" className="hover:text-pink-400 transition">
                  <FaInstagram size={19} />
                  </a>
                  <a href="#" aria-label="Twitter" className="hover:text-sky-400 transition">
                   <FaTwitter size={19} />
                  </a>
                </div>

                 <p className="text-xs text-gray-400 mt-4">
                © 2026 Mój Lekarz. Todos los derechos reservados.
              </p>
          </div>
      </footer>
      )
   }

export { Footer };