import {useState} from 'react';
import { useSharedState } from '../SharedStateContext';
const Testmonial = () => {
    const {grayText,textColor,lightDark} = useSharedState()
  return (
    <section className={`py-24 px-6 text-center text-${textColor}`}>
        <h2 className="text-4xl font-bold mb-16">
          What Our Users Say
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {["Amazing platform!", "Got hired in 2 weeks!", "Very easy to use!"].map(
            (text, i) => (
              <div
                key={i}
                className={`p-8 rounded-2xl shadow-md bg-${lightDark}`}
              >
                <p className={`text-${grayText} mb-4`}>"{text}"</p>
                <span className="font-semibold">★★★★★</span>
              </div>
            )
          )}
        </div>
      </section>

  );
};

export default Testmonial;