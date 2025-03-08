import React, { useState, useEffect } from 'react';

const SuccessAnimation = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setAnimate(true);
    }, 300);
  }, []);

  return (
    <div className="flex absolute top-1/3 left-1/2 items-center justify-center h-64">
      <div className="bg-white shadow-lg rounded-lg p-8 flex flex-col items-center justify-center w-80 transform transition-all duration-500 ease-out hover:shadow-xl">
        <div className="relative">
          {/* Green circle background with scale animation */}
          <div className={`h-20 w-20 rounded-full bg-green-500 flex items-center justify-center transform transition-all duration-700 ${
            animate ? 'scale-100' : 'scale-0'
          }`}>
            {/* Checkmark with draw animation */}
            <svg 
              className={`h-12 w-12 text-white transition-all duration-500 ${
                animate ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
              }`}
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="3" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              strokeDasharray="30"
              strokeDashoffset={animate ? "0" : "30"}
              style={{ transition: "stroke-dashoffset 0.8s ease-in-out 0.6s" }}
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
        </div>
        
        {/* Success text with slide-up animation */}
        <div className={`mt-6 text-center transition-all duration-700 transform ${
          animate ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}
        style={{ transitionDelay: "0.9s" }}>
          <h2 className="text-2xl font-bold text-green-600">Success!</h2>
          <p className="text-gray-600 mt-2">Your action has been completed.</p>
        </div>

        {/* Animated border effect */}
        <div className={`absolute inset-0 rounded-lg transition-all duration-1000 ${
          animate ? 'border-4 border-green-200 opacity-0 scale-110' : 'border-0 border-green-500 opacity-100 scale-100'
        }`} style={{ transitionDelay: "0.3s" }}></div>
      </div>
    </div>
  );
};

export {SuccessAnimation}