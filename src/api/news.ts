import axios from 'axios';

export async function getAllNews() {
  const newsItems = await axios.get<NewsItem[]>(
    `${import.meta.env.VITE_API_URL}/news/getAllNews/`
  );

  return newsItems;
}

export async function getNewsDetail(id: string) {
  const newsItem = await axios.get<NewsDetail | { message: string }>(
    `${import.meta.env.VITE_API_URL}/news/getNewsDetail/`,
    {
      params: {
        url: `https://www.cnnindonesia.com/${id}`,
      },
    }
  );

  return newsItem;
}
