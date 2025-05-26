import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { motion } from 'framer-motion';

export default function ContactPage() {
    const contactInfo = [
        {
            icon: '📍',
            content: (
                <>
                    Jodhpur-Nagaur Highway, NH62,<br />
                    Vill : Soyla, Teh.: Bawadi,<br />
                    Jodhpur, Rajasthan-342037
                </>
            )
        },
        {
            icon: '✉️',
            content: 'enquiry@dpssoyla.com'
        },
        {
            icon: '📞',
            content: '+91 954 954 9195'
        }
    ];

    return (
        <>
            <Header />
            <main className="p-6 md:p-12 bg-gray-50 space-y-16">
                {/* Social Media & Contact Info */}
                <section className="text-center">
                    <motion.h2
                        className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        Our Social Media
                    </motion.h2>
                    <motion.p
                        className="text-gray-600 mb-10"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        Stay connected with us on social media for latest updates.
                    </motion.p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {contactInfo.map((item, index) => (
                            <motion.div
                                key={index}
                                className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition"
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: false }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                            >
                                <div className="text-green-500 text-3xl mb-3">{item.icon}</div>
                                <p className="text-gray-700 leading-relaxed">{item.content}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Contact Form & Map */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
                    <motion.div
                        className="bg-white p-8 rounded-2xl shadow-md space-y-6"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.6 }}
                    >
                        <h3 className="text-2xl font-semibold text-gray-800 mb-2">Get in Touch</h3>
                        <p className="text-gray-600 mb-6">If you have any questions, please contact us!</p>

                        <label className="block">
                            <span className="block font-medium text-gray-700">Your name</span>
                            <input
                                type="text"
                                className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                        </label>
                        <label className="block">
                            <span className="block font-medium text-gray-700">Your email</span>
                            <input
                                type="email"
                                className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                        </label>
                        <label className="block">
                            <span className="block font-medium text-gray-700">Subject</span>
                            <input
                                type="text"
                                className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                        </label>
                        <label className="block">
                            <span className="block font-medium text-gray-700">Your message (optional)</span>
                            <textarea
                                className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                rows="5"
                            ></textarea>
                        </label>
                        <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
                            Send Message
                        </button>
                    </motion.div>

                    <motion.div
                        className="rounded-2xl overflow-hidden shadow-md"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.6 }}
                    >
                        <iframe
                            title="Dundlod Public School, Soyla Location"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3561.747599739441!2d73.845948!3d26.7704304!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDQ2JzEzLjUiTiA3M8KwNTAnNDQuMSJF!5e0!3m2!1sen!2sin!4v1652883205397!5m2!1sen!2sin"
                            width="100%"
                            height="500"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                        ></iframe>
                    </motion.div>
                </section>
            </main>
            <Footer />
        </>
    );
}
