import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Navigation} from 'swiper/modules';
import { FaUser, FaUserFriends, FaMoneyCheckAlt, FaExchangeAlt, FaFileInvoiceDollar, FaDownload } from 'react-icons/fa';

function Features() {
    const motivationItems = [
        {
            icon: <FaUser />,
            title: 'Account Management',
            subtitle: 'Easily manage your accounts, track your transactions, and stay on top of your finances with our intuitive platform.',
        },
        {
            icon: <FaUserFriends />,
            title: 'Beneficiary Addition',
            subtitle: 'Add beneficiaries for both internal and external account holders quickly and securely.',
        },
        {
            icon: <FaMoneyCheckAlt />,
            title: 'Internal Payments',
            subtitle: 'Make payments within the bank seamlessly, whether to your own accounts or to other account holders.',
        },
        {
            icon: <FaExchangeAlt />,
            title: 'External Payments',
            subtitle: 'Transfer money outside the bank using IMPS, RTGS, and NEFT with ease and confidence.',
        },
        {
            icon: <FaFileInvoiceDollar />,
            title: 'Transaction Management',
            subtitle: 'Filter transactions, verify them, and receive email confirmations upon successful completion.',
        },
        {
            icon: <FaDownload />,
            title: 'Statement Download',
            subtitle: 'Download your account statements easily and keep track of your financial records.',
        },
    ];

    return (
        <section id="features" className="py-14 lg:py-24 relative ">
            <div className="container mx-auto">
                <div className={`mb-12 lg:mb-16`}>
                    <div className="col-span-1">
                        <h2 className="text-3xl lg:text-4xl text-primary-dark-blue pb-5">
                            Why choose ENQ bank?
                        </h2>
                        <p className="text-neutral-grayish-blue text-sm lg:text-base leading-5">
                            We leverage Open Banking to turn your bank account into your financial hub. Control your finances like never before.
                        </p>
                    </div>
                </div>
                <Swiper
                  modules={[Navigation]}
                    spaceBetween={30}
                    slidesPerView={1}
                    loop={true}
                   
                    navigation
                    breakpoints={{
                        640: {slidesPerView: 1,},
                        768: {slidesPerView: 2,},
                        1024: {slidesPerView: 3,},
                    }}
                >
                    {motivationItems.map((item) => (
                        <SwiperSlide key={item.title} className="bg-black/30 border border-gray-200 rounded-lg p-6 shadow-lg backdrop-blur-sm w-80 h-60">
                            <div className="flex items-center justify-center mb-4">
                                <div className="text-4xl text-slate-500 bg-black p-3 rounded-full">
                                    {item.icon}
                                </div>
                            </div>
                            <h2 className="text-xl font-semibold mb-4 text-primary-dark-blue">
                                {item.title}
                            </h2>
                            <p className="text-neutral-grayish-blue text-sm font-light lg:text-base leading-5">
                                {item.subtitle}
                            </p>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}

export default Features;