import {DOMAINURL} from '@/env'
import { GithubListContents } from "@/lib/github";

export default async function sitemap() {
    var sitemap_data =[
        {
          url: DOMAINURL,
          lastModified: new Date(),
          alternates: {
            languages: {
              en: `${DOMAINURL}/en`,
              cn: `${DOMAINURL}/cn`,
            },
          },
        },
        {
          url: `${DOMAINURL}/articles`,
          lastModified: new Date(),
          alternates: {
            languages: {
              en: `${DOMAINURL}/en/articles`,
              cn: `${DOMAINURL}/cn/articles`,
            },
          },
        },
        {
          url: `${DOMAINURL}/resources`,
          lastModified: new Date(),
          alternates: {
            languages: {
              en: `${DOMAINURL}/en/resources`,
              cn: `${DOMAINURL}/cn/resources`,
            },
          },
        },
      ]
    
    // articles sitemap
    var locales = ['en','zh']
    var pages=[]
    for (var i = 0; i < locales.length; i++) {
      const allArticlesData = await GithubListContents(`app/_articles/articles_${locales[i]}.json`);
      var allArticlesDatajson = JSON.parse(allArticlesData)
      for (var j = 0; j < allArticlesDatajson.length; j++) {
        allArticlesDatajson[j].lastModified = new Date().toISOString()
        allArticlesDatajson[j].changeFrequency = 'monthly'
        allArticlesDatajson[j].priority = 0.8
        allArticlesDatajson[j].url = `/${locales[i]}/articles/${allArticlesDatajson[j].fileName}`
        pages.push(allArticlesDatajson[j])
      }
    }
   pages.map((product) => (
    sitemap_data.push(
        {
            url: `${DOMAINURL}${product.url}`,
            lastModified: product.lastModified,
            priority: product.priority,
            changeFrequency: product.changeFrequency,
          }
    )
   ))


    return sitemap_data
  }