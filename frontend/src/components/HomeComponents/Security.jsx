import React from 'react';
import { FaShieldAlt, FaLock, FaUserSecret } from 'react-icons/fa';

function Security() {
    const securityItems = [
        {
            icon: <FaShieldAlt />,
            title: 'Advanced Encryption',
            description: 'We utilize sophisticated encryption methods to ensure your data remains secure and protected.',
        },
        {
            icon: <FaLock />,
            title: 'Secure Authentication',
            description: 'Our secure authentication process includes OTP based verification to keep your accounts safe.',
        },
        {
            icon: <FaUserSecret />,
            title: 'Privacy Protection',
            description: 'We provide password-protected PDFs for transaction statements to ensure your financial documents remain confidential.',
        },
    ];

    return (
        <section id="security" className="py-14 lg:py-24 relative ">
            <div className="container mx-auto text-center">
                <div className="text-3xl font-bold mb-8 text-primary-dark-blue6">
                    <div className="col-span-1">
                        <h2 className="text-3xl lg:text-4xl text-primary-dark-blue pb-5">
                            Our Security Features
                        </h2>
                    </div>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {securityItems.map((item) => (
                        <div key={item.title} className="bg-black/30 border border-gray-200 rounded-lg p-6 shadow-lg backdrop-blur-sm">
                            <div className="flex items-center justify-center mb-4">
                                <div className="text-4xl text-slate-500 bg-black p-3 rounded-full">
                                    {item.icon}
                                </div>
                            </div>
                            <h2 className="text-xl font-semibold mb-4 text-primary-dark-blue">
                                {item.title}
                            </h2>
                            <p className="text-neutral-grayish-blue">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Security;
