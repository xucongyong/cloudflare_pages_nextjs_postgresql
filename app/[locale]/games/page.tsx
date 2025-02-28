import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';
import {routing} from '@/i18n/routing';
export const runtime = 'edge';

// pages/index.js
import { Metadata } from 'next'
import {setRequestLocale} from 'next-intl/server';

export const metadata: Metadata = {
  title: 'Next - Open Source Dynamic Website CMS Without Database',
  description: 'A Next.js site with Tailwind & Shadcn/UI, using GitHub API for content management. No database needed for dynamic updates.',
}




export default function IndexPage({params}: {params: any}) {
  const t = useTranslations('HomePage');
  setRequestLocale(params.locale);
  // const allArticlesData =await getAllArticlesData(params.locale);
  
  // console.log(allArticlesData);
  return (
    
    <div className="flex flex-col items-center justify-center mx-auto">
        

        <section className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
        {t('title')}
        </h1>
        <Link href="/about">{t('about')}</Link>
      </section>

        {/* Advertisement */}
        <div className="flex flex-col items-center justify-center mx-auto"><p className="w-full text-xs text-center bg-orange-400">Advertisement</p><div id="container-a35f8e12de9740943fbb638f7641c67e" className="ad-container w-full"></div></div>
    <div className="flex items-center justify-center">

    <iframe 
    src="https://basketball-stars.io/game/basketball-stars/" 
    width="600"
    height="400"
    title="SprinkleIncredibox"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  ></iframe>

    
  <iframe 
    src="https://g.sprinkleincredibox.com/web-game/SprinkleIncredibox/index.html" 
    width="600"
    height="400"
    title="SprinkleIncredibox"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  ></iframe>
  </div>

    </div>
  )
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}