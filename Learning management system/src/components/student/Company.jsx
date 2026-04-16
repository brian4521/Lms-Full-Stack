import React from "react";
import microsoft_logo from "../../assets/microsoft_logo.svg";
import paypal_logo from "../../assets/paypal_logo.svg";
import adobe_logo from "../../assets/adobe_logo.svg";
import accenture_logo from "../../assets/accenture_logo.svg";
import walmart_logo from "../../assets/walmart_logo.svg";

const Company = () => {
  return (
    <div className="pt-16">
      <center>
        <p className=" text-gray-500 font-bold text-2xl">
          Trusted by top companies
        </p>
      </center>

      <div className="flex flex-wrap items-center justify-center gap-6 md:gap-16 mt-5 md:mt-10">
        <img src={microsoft_logo} alt="Microsoft" className="w-20 md:w-28" />
        <img src={paypal_logo} alt="Paypal" className="w-20 md:w-28" />
        <img src={walmart_logo} alt="Walmart" className="w-20 md:w-28" />
        <img src={accenture_logo} alt="Accenture" className="w-20 md:w-28" />
        <img src={adobe_logo} alt="Adobe" className="w-20 md:w-28" />
      </div>
    </div>
  );
};

export default Company;
