import { GithubListContents } from "@/lib/github";
import ArticleList from '@/components/ArticleList'
import { Metadata } from 'next'
export const runtime = 'edge';
export const metadata: Metadata = {
  title: 'xucongyong space,learn mathematics, finance quant, computer science. Psychology, neuroscience',
  description: 'xucongyong space,learn mathematics, finance quant, computer science. Psychology, neuroscience',
  keywords: ['hack', 'computer science','quant','mathematics','psychology','neuroscience'],
  authors: [
    { name: 'hackX', url: 'https://www.xucongyong.com' }
  ]
}



export default async function IndexPage(props: {
  params: { locale: string };
  searchParams: { category?: string };
}) {
  const { category } = props.searchParams;
  
  const allArticlesData = await GithubListContents(`app/_articles/articles_${props.params.locale}.json`);
  let allArticlesDatajson;
  if (typeof allArticlesData === 'string') {
    allArticlesDatajson = JSON.parse(allArticlesData);
  } else {
    allArticlesDatajson = [];
  }
  return (
    <div className="container mx-auto py-12">
      <ArticleList 
        articles={allArticlesDatajson}  // 传递过滤后的文章用于显示
        category={category}
        showMoreLink={false}
      />
    </div>
  );
}
