import { getLocale } from 'next-intl/server';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import ArticleListNav from '@/components/ArticleListNav';
import dynamic from 'next/dynamic';
import {Markdown} from '@/components/Markdown';
// import Markdown from 'react-markdown'

import { GithubListContents } from "@/lib/github";
import matter from "gray-matter";
export const runtime = 'edge';
const MarkdownNav = dynamic(() => import('@/components/MarkdownNav'), {
  ssr: false
});

export async function generateMetadata({ params }) {
  var locale = await getLocale();
  const postData = await GithubListContents(`app/_articles/${locale}/${params.slug[0]}.md`);
  const { content, data } = matter(postData);
  return {
    title: `${data.title}`,
    description: data.description || `Read about ${data.title}`,
  };
}

// using the `params` returned by `generateStaticParams`
export default async function Page({ params }) {
  var locale = await getLocale();
  var postData = await GithubListContents(`app/_articles/${locale}/${params.slug[0]}.md`);


  return (
    // <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Left sidebar navigation */}
          <ArticleListNav locale={locale}/>
        {/* Main content */}
        <article className="flex-1 max-w-2xl mx-auto">
          <Markdown content={postData} />
          <div className="mt-12">
          <Link href={"/"+locale+"/articles"} className="text-blue-600 hover:text-blue-800 transition-colors inline-flex items-center gap-2">
              <ArrowLeft size={20} />
              Back to articles
            </Link>
          </div>
        </article>

        {/* Right sidebar - Table of Contents */}
        <div className="hidden lg:block lg:w-1/6 xl:w-1/8 flex-shrink-0">
          <MarkdownNav content={postData} />
        </div>
      </div>
    // </div>
  );
}
