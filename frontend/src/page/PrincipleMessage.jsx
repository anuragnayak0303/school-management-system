import React from 'react'
import Header from './Header'
import Footer from './Footer'

export default function PrincipleMessage() {
    return (
        <>
            <Header />
            <section>
                <section className='w-full h-[18vh] bg-white flex justify-center items-center pl-10 '>
                    <h1 className='text-5xl font-bold font-serif text-blue-900 font-playfair mr-3.5'>Principal</h1>
                    <hr className='border-1 border-gray-300 w-full max-w-9/10' />
                </section>
                <section className='w-full pr-10 flex justify-end'>
                    <div className=' '>

                        <h1 className='text-lg mb-6 max-w-2xl text-gray-500  italic font-pacifico  '>Dear Students, Parents, and Valued Members of Our Learning Community,</h1>
                        <h1 className='text-lg w-full mb-6 max-w-2xl text-gray-500  italic font-pacifico  '>It is with immense pleasure and great enthusiasm that I welcome you to <strong>Dundlod Public School</strong>. As the proud Principal of this esteemed institution, I am honored to be part of a community that is dedicated to nurturing young minds, fostering excellence, and shaping the leaders of tomorrow.</h1>
                        <p className='text-lg w-full mb-6 max-w-2xl text-gray-500  italic font-pacifico  '>
                            At <strong>Dundlod Public School</strong>, our mission is to provide an exceptional and transformative educational experience that goes beyond academics. We firmly believe in creating an environment where students not only gain knowledge but also develop the skills, values, and character traits that will serve them well throughout their lives.
                        </p>
                        <p className='text-lg w-full mb-6 max-w-2xl text-gray-500  italic font-pacifico '>

                            Our dedicated team of educators works tirelessly to cultivate a dynamic, student-focused learning environment. We are committed to recognizing and celebrating the unique talents and strengths of every student, nurturing a passion for learning, and inspiring intellectual curiosity. Through innovative teaching methodologies, interactive classrooms, and the integration of technology, we aim to empower our students to become critical thinkers, creative problem solvers, and effective communicators. We are not just focused on academic success; we believe in nurturing well-rounded individuals. Our extensive co-curricular and extracurricular programs offer students opportunities to explore their passions, develop leadership skills, and cultivate a sense of social responsibility. Whether it’s through sports, arts, community service, or cultural events, we encourage our students to discover their full potential beyond the classroom. We take pride in our dynamic and inclusive community.We embrace different cultures, backgrounds, and perspectives, creating an environment that encourages mutual respect, understanding, and empathy. Our commitment to fostering an inclusive atmosphere ensures that every student feels valued, safe, and supported
                        </p>
                        <p className='text-lg w-full mb-6 max-w-2xl text-gray-500  italic font-pacifico '>
                            As Principal, I am committed to building strong partnerships between the school, parents, and the broader community. We believe that collaboration and open communication are integral to a student’s success. Together, we can create an unwavering support system that enables our students to flourish academically and personally. I encourage all students to dream big, set ambitious goals, and work diligently to achieve them. Here at Dundlod Public School, we provide the guidance, mentorship, and resources needed to turn those dreams into reality
                        </p>

                        <p className='text-lg w-full mb-6 max-w-2xl text-gray-500  italic font-pacifico '>
                            I extend my gratitude to our passionate educators, dedicated staff, and supportive parents for their unwavering commitment to our students’ growth and success.I am excited to begin this journey with all of you and eagerly anticipate witnessing the outstanding accomplishments of our students.
                        </p>
                        <p className='text-lg w-full mb-8 max-w-2xl text-gray-500  italic font-pacifico '>
                            Wishing you all a fulfilling and inspiring academic year ahead!
                        </p>

                        <hr className=' border-gray-300 mb-4' />
                        <h1 className='text-lg w-full mb max-w-2xl text-gray-500 font-black text-end'>Mr. Anurag Nayak</h1>
                        <h1 className='text-lg text-gray-500 mb-10 text-end'>Principle</h1>
                    </div>
                </section>
            </section>
            <Footer />
        </>
    )
}
