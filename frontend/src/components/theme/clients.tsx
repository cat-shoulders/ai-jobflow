import Particles from './particles';

const logos = [
  { src: 'images/client-01.svg', alt: 'Client 01' },
  { src: 'images/client-02.svg', alt: 'Client 02' },
  { src: 'images/client-03.svg', alt: 'Client 03' },
  { src: 'images/client-04.svg', alt: 'Client 04' },
  { src: 'images/client-05.svg', alt: 'Client 05' },
  { src: 'images/client-06.svg', alt: 'Client 06' },
  { src: 'images/client-07.svg', alt: 'Client 07' },
  { src: 'images/client-08.svg', alt: 'Client 08' },
  { src: 'images/client-09.svg', alt: 'Client 09' },
];

export default function Clients() {
  return (
    <section>
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* Particles animation */}
        <div className="absolute inset-0 max-w-6xl mx-auto px-4 sm:px-6">
          <Particles className="absolute inset-0 -z-10" quantity={5} />
        </div>

        <div className="py-12 md:py-16">
          <div className="overflow-hidden">
            <div className="inline-flex w-full flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
              <ul className="flex animate-infinite-scroll items-center justify-center md:justify-start [&_img]:max-w-none [&_li]:mx-8">
                {logos.map((logo, index) => (
                  <li key={index}>
                    <img src={logo.src} alt={logo.alt} />
                  </li>
                ))}
              </ul>
              <ul
                className="flex animate-infinite-scroll items-center justify-center md:justify-start [&_img]:max-w-none [&_li]:mx-8"
                aria-hidden="true"
              >
                {logos.map((logo, index) => (
                  <li key={index}>
                    <img src={logo.src} alt={logo.alt} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
