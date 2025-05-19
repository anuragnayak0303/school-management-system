import React from 'react'
import Header from './Header'
import Footer from './Footer'
import ContactForm from './ContactForm'

export default function Admission() {
    return (
        <>
            <Header />
            <section>
                <section className='w-full h-[80vh] relative '>
                    <img src="https://images.pexels.com/photos/3401403/pexels-photo-3401403.jpeg" alt="" className='w-full h-full object-cover' />
                    <div className='w-full z-10 h-[80vh] absolute top-0 left-0  flex justify-center items-end'>
                        <h1 className='text-6xl text-white font-semibold pb-2 uppercase'>ADMISSION OPEN <br /> 2025-26</h1>
                    </div>
                </section>
                <ContactForm/>
            </section>
            <Footer />
        </>
    )
}
