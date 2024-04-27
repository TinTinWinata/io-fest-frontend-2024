interface NewsItem {
  id: string;
  guidislink: boolean;
  link: string;
  published: string;
  published_parsed: number[];
  title: string;
  title_detail: {
    type: string;
    language: string | null;
    base: string;
    value: string;
  };
  summary: string;
  summary_detail: {
    type: string;
    language: string | null;
    base: string;
    value: string;
  };
  links: Link[];
  content: Content[];
}

interface Link {
  length?: string;
  type: string;
  href: string;
  rel: string;
}

interface Content {
  type: string;
  language: string | null;
  base: string;
  value: string;
}

interface NewsDetail {
  title: string;
  publish: string;
  photo: string;
  description: string[];
}
