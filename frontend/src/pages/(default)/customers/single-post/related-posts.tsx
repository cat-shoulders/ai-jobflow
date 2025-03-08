import Particles from '@/components/theme/particles';
import Highlighter, { HighlighterItem02 } from '@/components/theme/highlighter';

export default function RelatedPosts() {
  const items = [
    {
      name: 'Customer name',
      img: 'images/customer-02.svg',
      bg: 'images/customer-bg-02.png',
      link: '/customers/single-post',
    },
    {
      name: 'Customer name',
      img: 'images/customer-03.svg',
      bg: 'images/customer-bg-03.png',
      link: '/customers/single-post',
    },
    {
      name: 'Customer name',
      img: 'images/customer-06.svg',
      bg: 'images/customer-bg-06.png',
      link: '/customers/single-post',
    },
  ];

  return (
    <aside>
      <h2 className="inline-flex font-bold text-lg bg-clip-text text-transparent bg-linear-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-8">
        Related stories
      </h2>
      <div className="mx-auto sm:max-w-[728px] lg:max-w-none">
        <Highlighter className="grid gap-4 lg:gap-6 sm:grid-cols-3 lg:grid-cols-3 group">
          {items.map((item, index) => (
            <div key={index}>
              <a href={item.link}>
                <HighlighterItem02>
                  <div className="relative h-full bg-slate-900 rounded-[inherit] z-20 overflow-hidden">
                    {/* Particles animation */}
                    <Particles className="absolute inset-0 -z-10" quantity={3} />
                    <div className="flex items-center justify-center h-32 lg:h-36">
                      <img
                        className="w-full h-full aspect-video object-cover"
                        src={item.bg}
                        width={352}
                        height={198}
                        alt="Customer Background"
                        aria-hidden="true"
                      />
                      <img className="absolute" src={item.img} alt={item.name} />
                    </div>
                  </div>
                </HighlighterItem02>
              </a>
            </div>
          ))}
        </Highlighter>
      </div>
    </aside>
  );
}
