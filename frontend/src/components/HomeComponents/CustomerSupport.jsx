import React from 'react';
import { FaPhone, FaEnvelope, FaCommentDots } from 'react-icons/fa';

function CustomerSupport() {
    const supportItems = [
        {
            icon: <FaPhone />,
            title: 'Phone Support',
            description: 'Call us at <strong>1-800-123-4567</strong>. Our representatives are available 24/7 to assist you.',
        },
        {
            icon: <FaEnvelope />,
            title: 'Email Support',
            description: 'Send us an email at <strong>varada864@gmail.com</strong> and we\'ll get back to you within 24 hours.',
        },
        {
            icon: <a href='https://wa.me/9820793511'><FaCommentDots /></a>,
            title: 'Live Chat',
            description: 'Chat with our support team in real-time. Click the live chat icon on the bottom right of the screen.',
        },
    ];

    return (
        <section id="customer-support" className="py-14 lg:py-24 relative ">
            <div className="container mx-auto text-center">
                <h2 className="text-3xl font-bold mb-8 text-primary-dark-blue">Customer Support</h2>
                <p className="text-neutral-grayish-blue mb-12">
                    Our dedicated support team is here to help you with any questions or issues you may have. Contact us through any of the following channels:
                </p>
                <div className="grid md:grid-cols-3 gap-8">
                    {supportItems.map((item) => (
                              <div key={item.title} className="bg-black/30 border border-gray-200 rounded-lg p-6 shadow-lg backdrop-blur-sm">
                              <div className="flex items-center justify-center mb-4">
                                  <div className="text-4xl text-slate-500 bg-black p-3 rounded-full">
                                    {item.icon}
                                </div>
                            </div>
                            <h3 className="text-xl font-semibold mb-4 text-primary-dark-blue">{item.title}</h3>
                            <p className="text-neutral-grayish-blue" dangerouslySetInnerHTML={{ __html: item.description }} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default CustomerSupport;
