import React, { useEffect, useState } from "react";

function Features() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const motivationItems = [
        {
            iconPath: '/icons/icon-online.svg',
            title: 'Account Management',
            subtitle:
                'Easily manage your accounts, track your transactions, and stay on top of your finances with our intuitive platform.',
        },
        {
            iconPath: '/icons/icon-budgeting.svg',
            title: 'Beneficiary Addition',
            subtitle:
                'Add beneficiaries for both internal and external account holders quickly and securely.',
        },
        {
            iconPath: '/icons/icon-onboarding.svg',
            title: 'Internal Payments',
            subtitle:
                'Make payments within the bank seamlessly, whether to your own accounts or to other account holders.',
        },
        {
            iconPath: '/icons/icon-api.svg',
            title: 'External Payments',
            subtitle:
                'Transfer money outside the bank using IMPS, RTGS, and NEFT with ease and confidence.',
        },
    ];

    return (
        <section id="features" className="px-14 bg-neutral-light-grayish-blue lg:py-10">
            <div className="container text-center lg:text-left">
                <div className={`grid lg:grid-cols-2 mb-12 lg:mb-16 transition-opacity duration-500 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="col-span-1">
                        <h2 className="text-3xl lg:text-4xl text-primary-dark-blue pb-5">
                            Why choose ENQ bank?
                        </h2>
                        <p className="text-neutral-grayish-blue text-sm lg:text-base leading-5">
                            We leverage Open Banking to turn your bank account into your
                            financial hub. Control your finances like never before.
                        </p>
                    </div>
                </div>
                <div className={`grid grid-cols-1 gap-9 lg:gap-6 lg:grid-cols-4 transition-opacity duration-500 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                    {motivationItems.map((item) => (
                        <div key={item.title} className="justify-center">
                            <div className="flex justify-center lg:justify-start transition-transform duration-500 ease-in-out transform" style={{ transform: isVisible ? 'translateY(0)' : 'translateY(20px)' }}>
                                <img src={item.iconPath} alt="" />
                            </div>
                            <h2 className="text-lg text-primary-dark-blue py-4 lg:pt-9 lg:pb-6 lg:text-xl lg:font-bold">
                                {item.title}
                            </h2>
                            <p className="text-neutral-grayish-blue text-sm font-light lg:text-base leading-5">
                                {item.subtitle}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Features;
