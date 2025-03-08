'use client';

import { useState } from 'react';

const features = [
  {
    title: 'AI Resume Proces',
    description:
      'You can create as many applications as you want. You can also create unlimited integrations.',
    plans: [
      {
        name: 'Free',
        value: '3',
      },
      {
        name: 'Pro',
        value: '30',
      },
      {
        name: 'Lifetime',
        value: 'unlimited',
      },
    ],
  },
  {
    title: 'Job Description',
    plans: [
      {
        name: 'Free',
        value: true,
      },
      {
        name: 'Pro',
        value: true,
      },
      {
        name: 'Lifetime',
        value: true,
      },
    ],
    description:
      'You can create as many applications as you want. You can also create unlimited integrations.',
  },
  {
    title: 'Edit Resume',
    plans: [
      {
        name: 'Free',
        value: true,
      },
      {
        name: 'Pro',
        value: true,
      },
      {
        name: 'Lifetime',
        value: true,
      },
    ],
    description:
      'You can create as many applications as you want. You can also create unlimited integrations.',
  },
  {
    title: 'Track applications',
    plans: [
      {
        name: 'Free',
        value: false,
      },
      {
        name: 'Pro',
        value: true,
      },
      {
        name: 'Lifetime',
        value: true,
      },
    ],
    description:
      'You can create as many applications as you want. You can also create unlimited integrations.',
  },
  {
    title: 'Connect LinkedIn',
    plans: [
      {
        name: 'Free',
        value: false,
      },
      {
        name: 'Pro',
        value: true,
      },
      {
        name: 'Lifetime',
        value: true,
      },
    ],
    description:
      'You can create as many applications as you want. You can also create unlimited integrations.',
  },
  {
    title: 'Support',
    plans: [
      {
        name: 'Free',
        value: false,
      },
      {
        name: 'Pro',
        value: false,
      },
      {
        name: 'Lifetime',
        value: 'Email support',
      },
    ],
    description:
      'You can create as many applications as you want. You can also create unlimited integrations.',
  },
  {
    title: 'Specialist Analyze',
    plans: [
      {
        name: 'Free',
        value: false,
      },
      {
        name: 'Pro',
        value: false,
      },
      {
        name: 'Lifetime',
        value: 'Get human help',
      },
    ],
    description:
      'You can create as many applications as you want. You can also create unlimited integrations.',
  },
];
const plans = [
  {
    name: 'Free',
    description: 'Free plan for small teams',
    price: 0,
    priceAnnual: 0,
  },
  {
    name: 'Pro',
    description: 'Everything at your fingertips.',
    price: '$19',
    priceAnnual: '$15',
  },
  {
    name: 'Lifetime',
    description: 'Everything at your fingertips.',
    price: '$89',
    priceAnnual: '$89',
  },
];

const FeatureRow = ({
  name,
  description,
  plans,
}: {
  name: string;
  description: string;
  plans: Array<{
    name: string;
    value: string;
  }>;
}) => {
  return (
    <>
      <div title={description} className="px-6 flex flex-col justify-end">
        <div className="py-2 text-slate-400 border-b border-slate-800">{name}</div>
      </div>
      {plans.map((plan) => (
        <div key={plan.name} className="px-6 flex flex-col justify-end">
          <div className="flex items-center h-full border-b border-slate-800 py-2 text-slate-400">
            {plan.value ? (
              <svg
                className="shrink-0 fill-purple-500 mr-3"
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="9"
              >
                <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
              </svg>
            ) : null}
            {plan.value}
            <span>
              <span className="md:hidden">{name}</span>
            </span>
          </div>
        </div>
      ))}
    </>
  );
};

export default function Pricing() {
  const [annual, setAnnual] = useState<boolean>(true);

  return (
    <div className="relative">
      {/* Blurred shape */}
      <div
        className="max-md:hidden absolute bottom-0 -mb-20 left-2/3 -translate-x-1/2 blur-2xl opacity-70 pointer-events-none"
        aria-hidden="true"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="434" height="427">
          <defs>
            <linearGradient id="bs5-a" x1="19.609%" x2="50%" y1="14.544%" y2="100%">
              <stop offset="0%" stopColor="#A855F7" />
              <stop offset="100%" stopColor="#6366F1" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            fill="url(#bs5-a)"
            fillRule="evenodd"
            d="m661 736 461 369-284 58z"
            transform="matrix(1 0 0 -1 -661 1163)"
          />
        </svg>
      </div>
      {/* Content */}
      <div className="grid md:grid-cols-4 xl:-mx-6 text-sm [&>div:nth-of-type(-n+4)]:py-6 [&>div:nth-last-of-type(-n+4)]:pb-6 max-md:[&>div:nth-last-of-type(-n+4)]:mb-8 max-md:[&>div:nth-of-type(-n+4):nth-of-type(n+1)]:rounded-t-3xl max-md:[&>div:nth-last-of-type(-n+4)]:rounded-b-3xl md:[&>div:nth-of-type(2)]:rounded-tl-3xl md:[&>div:nth-of-type(4)]:rounded-tr-3xl md:[&>div:nth-last-of-type(3)]:rounded-bl-3xl md:[&>div:nth-last-of-type(1)]:rounded-br-3xl [&>div]:bg-slate-700/20 [&>div:nth-of-type(4n+1)]:bg-transparent max-md:[&>div:nth-of-type(4n+5)]:hidden max-md:[&>div:nth-of-type(4n+2)]:order-1 max-md:[&>div:nth-of-type(4n+3)]:order-2 max-md:[&>div:nth-of-type(4n+4)]:order-3 max-md:md:[&>div:nth-of-type(n)]:mb-0 [&>div:nth-of-type(4n+3)]:relative [&>div:nth-of-type(4n+3)]:before:absolute [&>div:nth-of-type(4n+3)]:before:-inset-px [&>div:nth-of-type(4n+3)]:before:rounded-[inherit] [&>div:nth-of-type(4n+3)]:before:border-x-2 [&>div:nth-of-type(3)]:before:border-t-2 [&>div:nth-last-of-type(2)]:before:border-b-2 [&>div:nth-of-type(4n+3)]:before:border-purple-500 [&>div:nth-of-type(4n+3)]:before:-z-10 [&>div:nth-of-type(4n+3)]:before:pointer-events-none">
        {/* Pricing toggle */}
        <div className="px-6 flex flex-col justify-end">
          <div className="pb-5 md:border-b border-slate-800">
            {/* Toggle switch */}
            <div className="max-md:text-center">
              <div className="inline-flex items-center whitespace-nowrap">
                <div className="text-sm text-slate-500 font-medium mr-2 md:max-lg:hidden">
                  Monthly
                </div>
                <div className="relative">
                  <input
                    type="checkbox"
                    id="toggle"
                    className="peer sr-only"
                    checked={annual}
                    onChange={() => setAnnual(!annual)}
                  />
                  <label
                    htmlFor="toggle"
                    className="relative flex h-6 w-11 cursor-pointer items-center rounded-full bg-slate-400 px-0.5 outline-slate-400 transition-colors before:h-5 before:w-5 before:rounded-full before:bg-white before:shadow-xs before:transition-transform before:duration-150 peer-checked:bg-purple-500 peer-checked:before:translate-x-full peer-focus-visible:outline peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gray-400 peer-focus-visible:peer-checked:outline-purple-500"
                  >
                    <span className="sr-only">Pay Yearly</span>
                  </label>
                </div>
                <div className="text-sm text-slate-500 font-medium ml-2">
                  Yearly <span className="text-teal-500">(-20%)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Pro price */}

        <div className="px-6 flex flex-col justify-end">
          <div className="grow pb-4 mb-4 border-b border-slate-800">
            <div className="text-base font-medium bg-clip-text text-transparent bg-linear-to-r from-purple-500 to-purple-200 pb-0.5">
              Pro
            </div>
            <div className="mb-1">
              <span className="text-lg font-medium text-slate-500">$</span>
              <span className="text-3xl font-bold text-slate-50">
                {annual ? '24' : '29'}
              </span>
              <span className="text-sm text-slate-600 font-medium">/mo</span>
            </div>
            <div className="text-slate-500">Can handle easy tasks.</div>
          </div>
          <div className="pb-4 border-b border-slate-800">
            <a
              className="btn-sm text-slate-900 bg-linear-to-r from-white/80 via-white to-white/80 hover:bg-white w-full transition duration-150 ease-in-out group"
              href="#0"
            >
              Get Started{' '}
              <span className="tracking-normal text-purple-500 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">
                -&gt;
              </span>
            </a>
          </div>
        </div>
        {/* Team price */}
        <div className="px-6 flex flex-col justify-end">
          <div className="grow pb-4 mb-4 border-b border-slate-800">
            <div className="text-base font-medium bg-clip-text text-transparent bg-linear-to-r from-purple-500 to-purple-200 pb-0.5">
              Team
            </div>
            <div className="mb-1">
              <span className="text-lg font-medium text-slate-500">$</span>
              <span className="text-3xl font-bold text-slate-50">
                {annual ? '49' : '54'}
              </span>
              <span className="text-sm text-slate-600 font-medium">/mo</span>
            </div>
            <div className="text-slate-500">Everything at your fingertips.</div>
          </div>
          <div className="pb-4 border-b border-slate-800">
            <a
              className="btn-sm text-white bg-purple-500 hover:bg-purple-600 w-full transition duration-150 ease-in-out group"
              href="#0"
            >
              Get Started{' '}
              <span className="tracking-normal text-purple-300 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">
                -&gt;
              </span>
            </a>
          </div>
        </div>
        {/* Enterprise price */}
        <div className="px-6 flex flex-col justify-end">
          <div className="grow pb-4 mb-4 border-b border-slate-800">
            <div className="text-base font-medium bg-clip-text text-transparent bg-linear-to-r from-purple-500 to-purple-200 pb-0.5">
              Enterprise
            </div>
            <div className="mb-1">
              <span className="text-lg font-medium text-slate-500">$</span>
              <span className="text-3xl font-bold text-slate-50">
                {annual ? '79' : '85'}
              </span>
              <span className="text-sm text-slate-600 font-medium">/mo</span>
            </div>
            <div className="text-slate-500">Everything at your fingertips.</div>
          </div>
          <div className="pb-4 border-b border-slate-800">
            <a
              className="btn-sm text-slate-900 bg-linear-to-r from-white/80 via-white to-white/80 hover:bg-white w-full transition duration-150 ease-in-out group"
              href="#0"
            >
              Get Started{' '}
              <span className="tracking-normal text-purple-500 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">
                -&gt;
              </span>
            </a>
          </div>
        </div>

        {/* # Features */}
        <div className="px-6 flex flex-col justify-end">
          <div className="py-2 text-slate-50 font-medium mt-4">Features</div>
        </div>
        <div className="px-6 flex flex-col justify-end">
          <div className="py-2 text-slate-50 font-medium mt-4 md:hidden">
            Features
          </div>
        </div>
        <div className="px-6 flex flex-col justify-end">
          <div className="py-2 text-slate-50 font-medium mt-4 md:hidden">
            Features
          </div>
        </div>
        <div className="px-6 flex flex-col justify-end">
          <div className="py-2 text-slate-50 font-medium mt-4 md:hidden">
            Features
          </div>
        </div>

        {/* Custom Connection */}
        {features.map((feature, index) => (
          <FeatureRow
            key={index}
            name={feature.title}
            plans={feature.plans}
            description={feature.description}
          />
        ))}
      </div>
    </div>
  );
}
