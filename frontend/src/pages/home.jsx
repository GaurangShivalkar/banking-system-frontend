import * as React from "react";
import { useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();
  
    const handleLogin = () => {
      // Navigate to the login route
      navigate("/login");
    };
  
    const handleSignUp = () => {
      // Navigate to the sign up route
      navigate("/registration");
    };
  
 
  
    const navLinks = [
      { text: "Saving", href: "#saving" },
      { text: "Current", href: "#current" },
      { text: "Banking", href: "#banking" },
    ];
  
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-2 bg-green-200 shadow-md">
        <div className="text-2xl font-extrabold text-green-900">BANK</div>
        <div className="hidden md:flex items-center space-x-4">
          {navLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="text-sm text-gray-800 hover:text-emerald-600"
            >
              {link.text}
            </a>
          ))}
        </div>
        <div className="space-x-2">
          <button
            className="px-3 py-1 text-sm text-white bg-emerald-600 rounded-3xl hover:bg-emerald-700"
            onClick={handleLogin}
          >
            Login
          </button>
          <button
            className="px-3 py-1 text-sm text-emerald-600 bg-white border border-emerald-600 rounded-3xl hover:text-white hover:bg-emerald-600"
            onClick={handleSignUp}
          >
            Sign up
          </button>
    
        </div>
      </nav>
    );
  }

function MainSection() {
    const navigate = useNavigate();
    const handleCreateAccount = () => {
        // Navigate to the create account route
        navigate("/createAccount");
      };
  return (
    <section className="mt-10 w-full max-w-[1023px] max-md:mt-10 max-md:max-w-full">
      <div className="flex gap-5 max-md:flex-col max-md:gap-0">
        <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
          <div className="flex flex-col px-5 mt-4 max-md:mt-10">
            <h1 className="text-5xl font-bold leading-[59px] text-zinc-900 max-md:text-4xl max-md:leading-[54px]">
              Direct your
              <br />
              finances to
              <br />
              prosperity
            </h1>
            <p className="mt-8 text-lg leading-6 text-zinc-400">
              Welcome to the future of digital banking where
              <br />
              your financial health is our top priority.
            </p>
            <div className="flex gap-3 mt-7">
              <button 
                className="justify-center self-start px-7 py-5 text-lg leading-7 text-white bg-emerald-600 rounded-3xl max-md:px-5"
                onClick={handleCreateAccount}>
                Open Account
              </button>
              <button className="justify-center px-7 py-5 text-lg leading-7 text-emerald-600 bg-white rounded-3xl border border-emerald-600 border-solid max-md:px-5">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
          <div className="shrink-0 mx-auto max-w-full rounded bg-zinc-300 h-[378px] w-[493px] max-md:mt-10" />
        </div>
      </div>
    </section>
  );
}

function Card({ title, description, imgSrc, alt }) {
  return (
    <article className="flex flex-col grow justify-center items-center px-11 pt-3 pb-5 mt-1 w-full bg-white rounded shadow max-md:px-5 max-md:mt-9">
      <img loading="lazy" src={imgSrc} alt={alt} className="w-8 aspect-square" />
      <h2 className="mt-3.5 text-xl font-bold leading-8 text-center text-zinc-900">
        {title}
      </h2>
      <p className="self-stretch mt-6 text-base leading-6 text-center text-zinc-400">
        {description}
      </p>
      <a href="#" className="mt-5 text-base leading-7 text-emerald-400">Learn more</a>
    </article>
  );
}

function Footer() {
  const cardData = [
    { title: "Credit cards", description: "Manage your everyday expenses", imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/d4f25288851ea87e58f408a5a495366511ccb7ee7c93f3a02078ef4ce320fb89?apiKey=794c38372b674dc6b8c9540bd5fd676d&", alt: "Credit cards icon" },
    { title: "Save", description: "Grow your savings faster", imgSrc: "#", alt: "Save icon" },
    { title: "Loans", description: "No need to leave your house", imgSrc: "#", alt: "Loans icon" }
  ];

  return (
    <section className="px-5 mt-11 w-full max-w-[1019px] max-md:mt-10 max-md:max-w-full">
      <div className="flex gap-5 max-md:flex-col max-md:gap-0">
        {cardData.map((card, index) => (
          <Card
            key={index}
            title={card.title}
            description={card.description}
            imgSrc={card.imgSrc}
            alt={card.alt}
          />
        ))}
      </div>
    </section>
  );
}

function HomePage() {
  return (
    <div className="flex flex-col justify-center bg-white shadow-sm">
        <Header />
      <div className=" px-40 py-12 items-center pb-11 w-full bg-white rounded-lg shadow-sm max-md:max-w-full">
        
        <MainSection />
        <Footer />
      </div>
    </div>

  );
}

export default HomePage;