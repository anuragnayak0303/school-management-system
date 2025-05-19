import React from 'react'
import Header from './Header'
import { motion } from 'framer-motion';
import Footer from './Footer';

export default function Mission() {
    return (
        <>
            <Header />
            <section className='w-full h-[80vh] relative '>
                <img src="https://images.pexels.com/photos/3401403/pexels-photo-3401403.jpeg" alt="" className='w-full h-full object-cover' />
                <div className='w-full z-10 h-[80vh] absolute top-0 left-0 bg-[#00000098] flex justify-center items-end'>
                    <h1 className='text-6xl text-white font-semibold pb-2'>MISSION AND VISION</h1>
                </div>
            </section>

            <section className="bg-[#dfebf6] py-20 px-6 md:px-20">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 ">

                    {/* Animated Image */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="rounded-3xl overflow-hidden border-4 border-blue-800"
                    >
                        <img
                            src="https://www.dpssoyla.com/wp-content/uploads/2025/01/Gallery-image-416.webp"
                            alt="Mission Ceremony"
                            className="w-full object-cover"
                        />
                    </motion.div>

                    {/* Animated Text */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="text-gray-700"
                    >
                        <h2 className="text-6xl font-bold font-serif text-blue-900 mb-10 Paprika ">MISSION</h2>
                        <hr className='mb-10 border-gray-300' />
                        <p className="text-xl leading-relaxed italic">
                            At  <span className="font-semibold italic text-black"> Dundlod Public School</span>, our aim is to provide a holistic education that nurtures every aspect of a child’s development—academically, socially, emotionally, and physically. We strive to create a learning environment where students are encouraged to reach their highest potential, cultivate a lifelong love for learning, and develop the skills needed to succeed in an ever-evolving world.
                        </p>
                    </motion.div>
                </div>
            </section>
            <section className='w-full h-[25vh] bg-white flex justify-center items-center px-4 '>
                <h1 className='text-5xl font-bold font-serif text-blue-900 font-playfair mr-3.5'>WE FOCUS ON</h1>
                <hr className='border-1 border-gray-300 w-full max-w-9/15' />
            </section>
            <section className="bg-gray-100 py-20 px-6 md:px-20">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">

                    {/* Animated Text */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: false }}
                        className="text-gray-700"
                    >
                        <h2 className="text-4xl font-bold text-blue-900 mb-6">VISION</h2>
                        <p className="text-lg leading-relaxed">
                            <span className="font-semibold italic text-black">At Dundlod Public School</span>, our vision is to be a leading educational institution where every student is inspired to achieve excellence and empowered to reach their fullest potential. We envision a school where learning is a transformative journey, guided by innovative teaching, a nurturing environment, and a commitment to holistic development.
                        </p>
                    </motion.div>

                    {/* Animated Image */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: false }}
                        className="rounded-xl overflow-hidden "
                    >
                        <img
                            src="https://www.dpssoyla.com/wp-content/uploads/2025/01/Gallery-image-63.jpg"
                            alt="Vision March"
                            className="w-full object-cover opacity-50 relative"
                        />

                    </motion.div>
                </div>
            </section>
            <section className='w-full h-[25vh] bg-white flex justify-center items-center px-4 '>
                <h1 className='text-5xl font-bold font-serif text-blue-900 font-playfair mr-3.5 uppercase'>We aspire to </h1>
                <hr className='border-1 border-gray-300 w-full max-w-9/15' />
            </section>
            <section className="bg-white py-20 px-6 md:px-20">
                <div className='w-full flex gap-8'>
                    <div className="max-w-[50%] mx-auto ">
                        <div>
                            <motion.img
                                src="https://www.dpssoyla.com/wp-content/uploads/2025/01/DSC_0003-768x512.jpg"
                                alt="Learning and Global"
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: false }}
                                className="w-full h-[66vh] rounded-lg shadow-md"
                            />
                        </div>

                        <div className="flex flex-col justify-center gap-12">
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: false }}
                                className="text-gray-700 text-center mt-20"
                            >
                                <h3 className="text-green-600 text-2xl font-bold mb-2">Personalized Learning Journey</h3>
                                <p className="text-gray-700 text-base leading-relaxed">
                                    We envision a learning environment that recognizes the unique strengths and needs of each student. By tailoring our teaching methods to cater to individual learning styles, we aim to foster a love for learning and promote self-discovery, enabling students to uncover their true potential.
                                </p>
                            </motion.div>


                        </div>
                    </div>
                    <div className="max-w-[50%] mx-auto ">
                        <div>
                            <motion.img
                                src="https://www.dpssoyla.com/wp-content/uploads/2025/01/Gallery-image-11-768x512.webp"
                                alt="Learning and Global"
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: false }}
                                className="w-full h-[66vh] rounded-lg shadow-md"
                            />
                        </div>

                        <div className="flex flex-col justify-center gap-12">
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: false }}
                                className="text-gray-700 text-center mt-20"
                            >
                                <h3 className="text-green-600 text-2xl font-bold mb-2">Global Perspective</h3>
                                <p className="text-gray-700 text-base leading-relaxed">
                                    We aspire to cultivate a global mindset in our students, promoting cultural awareness, empathy, and open-mindedness. Through cross-cultural exchanges, international collaborations, and exposure to global issues, we prepare our students to become responsible global citizens.
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </div>
                <div className='w-full flex gap-8 mt-14'>
                    <div className="max-w-[50%] mx-auto ">
                        <div>
                            <motion.img
                                src="https://www.dpssoyla.com/wp-content/uploads/2025/01/dm6.jpg"
                                alt="Learning and Global"
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: false }}
                                className="w-full h-[66vh] rounded-lg shadow-md"
                            />
                        </div>

                        <div className="flex flex-col justify-center gap-12">
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: false }}
                                className="text-gray-700 text-center mt-20"
                            >
                                <h3 className="text-green-600 text-2xl font-bold mb-2">Future-Ready Skills</h3>
                                <p className="text-gray-700 text-base leading-relaxed">
                                    Our vision encompasses equipping students with the skills and competencies needed to succeed in an increasingly interconnected and rapidly changing world. We emphasize critical thinking, problem-solving, communication, and collaboration, empowering students to navigate challenges with confidence and adaptability.
                                </p>
                            </motion.div>


                        </div>
                    </div>
                    <div className="max-w-[50%] mx-auto ">
                        <div>
                            <motion.img
                                src="https://www.dpssoyla.com/wp-content/uploads/2025/01/Gallery-image-59-1024x683.jpg"
                                alt="Learning and Global"
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: false }}
                                className="w-full h-[66vh] rounded-lg shadow-md"
                            />
                        </div>

                        <div className="flex flex-col justify-center gap-12">
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: false }}
                                className="text-gray-700 text-center mt-20"
                            >
                                <h3 className="text-green-600 text-2xl font-bold mb-2">
                                    Engaged and Empowered Community
                                </h3>
                                <p className="text-gray-700 text-base leading-relaxed">
                                    Our vision is to create a school community where parents, educators, and students work collaboratively towards shared goals. Through open communication and active engagement, we cultivate a supportive network that enriches the overall learning journey.
                                </p>


                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer/>
        </>
    )
}
