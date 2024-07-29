import React from 'react';

function AboutUs() {
    return (
        <section id="about-us" className="py-14 lg:py-24 relative ">
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold text-center mb-8 text-primary-dark-blue">About Us</h2>
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="backdrop-blur-sm border border-gray-200 rounded-lg p-6 bg-black/30" >
                        <h3 className="text-2xl font-semibold mb-4 text-primary-dark-blue">Our Mission</h3>
                        <p className="text-neutral-grayish-blue mb-4">
                            At ENQ Bank, we are committed to providing exceptional banking services that empower our customers to achieve their financial goals. Our mission is to deliver innovative solutions, personalized service, and secure banking experiences.
                        </p>
                        <h3 className="text-2xl font-semibold mb-4 text-primary-dark-blue">Our Values</h3>
                        <p className="text-neutral-grayish-blue">
                            Integrity, innovation, and customer satisfaction are at the core of our values. We strive to build long-term relationships with our customers based on trust and mutual respect.
                        </p>
                    </div>
                    <div className="backdrop-blur-sm border border-gray-200 rounded-lg p-6 bg-black/30">
                        <h3 className="text-2xl font-semibold mb-4 text-primary-dark-blue">Our History</h3>
                        <p className="text-neutral-grayish-blue mb-4">
                            Founded in 2024, ENQ Bank has grown to become a leading financial institution. Our journey has been marked by a commitment to excellence and a passion for innovation.
                        </p>
                        <h3 className="text-2xl font-semibold mb-4 text-primary-dark-blue">Our Team</h3>
                        <p className="text-neutral-grayish-blue">
                            Our team of professionals is dedicated to providing top-notch banking services. We believe in fostering a collaborative and inclusive environment where everyone can thrive.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AboutUs;
