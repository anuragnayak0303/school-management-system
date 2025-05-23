import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { motion } from 'framer-motion';

export default function Campus() {
    return (
        <>
            <Header />
            <main className="relative">
                {/* Banner Section */}
                <section
                    className="relative bg-cover bg-center h-screen flex items-center justify-center text-white"
                    style={{
                        backgroundImage: "url('/images/campus-banner.png')",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        height: '100vh',
                    }}
                >
                    <div className="absolute inset-0 bg-white bg-opacity-70"></div>
                    <div className="relative z-10 max-w-4xl px-6 text-left">
                        <h1 className="text-5xl font-bold text-blue-800 mb-4 leading-tight">
                            Where Learning Meets <br /> Excellence
                        </h1>
                        <p className="text-gray-700 italic text-lg max-w-2xl">
                            Our campus is designed to foster academic success, creativity, and personal growth.
                            With state-of-the-art infrastructure and thoughtfully designed spaces, we aim to
                            provide an inspiring and nurturing environment for every student.
                        </p>
                    </div>
                </section>

                {/* Academic Facilities */}
                <section className="bg-white py-20 px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl text-blue-800 font-bold italic">Academic Facilities</h2>
                        <p className="text-gray-600 mt-4 max-w-3xl mx-auto">
                            Discover the state-of-the-art facilities that support an enriching academic experience at our campus.
                        </p>
                    </div>

                    {/* Side-by-side facility sections */}
                    <SideFeature
                        image="https://images.pexels.com/photos/207691/pexels-photo-207691.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                        title="Smart Classrooms"
                        description="Modern teaching aids including interactive boards and multimedia systems to make learning engaging and effective."
                    />
                    <SideFeature
                        image="http://images.pexels.com/photos/256431/pexels-photo-256431.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                        title="Library"
                        description="A well-stocked library with books, e-resources, and journals that promote research and independent learning."
                        reverse
                    />
                    <SideFeature
                        image="https://images.pexels.com/photos/5427682/pexels-photo-5427682.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                        title="Laboratories"
                        description="Fully equipped labs for science, computers, and languages encourage practical exploration and experimentation."
                    />
                    <SideFeature
                        image="https://images.pexels.com/photos/10643469/pexels-photo-10643469.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                        title="Computer Center"
                        description="High-performance computer labs with the latest hardware and software to support coding, design, and research activities."
                        reverse
                    />
                    <SideFeature
                        image="https://images.pexels.com/photos/19253501/pexels-photo-19253501/free-photo-of-urbex-old-abandoned-lecture-hall-somewhere-in-belgium.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                        title="Seminar Hall"
                        description="Spacious seminar halls equipped with audio-visual systems for guest lectures, workshops, and presentations."
                    />
                    <SideFeature
                        image="https://images.pexels.com/photos/8927014/pexels-photo-8927014.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                        title="Sports Complex"
                        description="Comprehensive facilities for a variety of indoor and outdoor sports, including basketball, football, cricket, badminton, and more."
                        reverse
                    />
                </section>

                {/* Extra Campus Features */}
                <SideFeature
                    image="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80"
                    title="Collaborative Study Spaces"
                    description="Our campus features open and tech-enabled collaborative areas that encourage group learning and creative brainstorming sessions."
                />
                <SideFeature
                    image="https://www.dpssoyla.com/wp-content/uploads/2025/01/04-768x369.jpg"
                    title="Green & Sustainable Campus"
                    description="Designed with sustainability in mind, our green campus includes eco-friendly buildings, solar panels, and botanical gardens."
                    reverse
                />
            </main>
            <Footer />
        </>
    );
}

// Reusable Side-by-Side Feature Section with Animation
function SideFeature({ image, title, description, reverse = false }) {
    return (
        <section className="py-16 px-6 bg-white">
            <div className={`max-w-6xl mx-auto flex flex-col md:flex-row items-center ${reverse ? 'md:flex-row-reverse' : ''}`}>
                <motion.div
                    className="md:w-1/2 w-full"
                    initial={{ x: reverse ? 100 : -100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: false }}
                >
                    <img src={image} alt={title} className="w-full rounded-lg shadow-md" />
                </motion.div>
                <motion.div
                    className="md:w-1/2 w-full mt-10 md:mt-0 md:px-10"
                    initial={{ x: reverse ? -100 : 100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: false }}
                >
                    <h2 className="text-3xl font-bold text-blue-800 mb-4">{title}</h2>
                    <p className="text-gray-700 text-lg">{description}</p>
                </motion.div>
            </div>
        </section>
    );
}
