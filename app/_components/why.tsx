"use client";
import { useSharedState } from "../SharedStateContext";
const Stafs = () => {
  const {content,textColor} = useSharedState();

  return (
    <div>
      <section className={`py-24 px-6 text-${textColor}`}>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">

          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/why-choose-us.jpg"
              className="rounded-3xl shadow-xl"
              alt="workers"
            />
          </div>

          <div>
            <h2 className="text-4xl font-bold mb-6">
              {content.why_choose_us}
            </h2>
            <ul className="space-y-4 text-gray-600">
              <li>✔ {content.verified_employers}</li>
              <li>✔ {content.ai_matching}</li>
              <li>✔ {content.secure_platform}</li>
              <li>✔ {content.global_opportunities}</li>
            </ul>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Stafs;
