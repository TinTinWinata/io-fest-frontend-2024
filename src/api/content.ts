import axios from 'axios';
import { IContentDetail } from '../interfaces/data-interface';

export async function getContentDetail(title: string) {
  let contentDetail = await axios.get<IContentDetail>(
    `${import.meta.env.VITE_API_URL}/content/getContentDetail/${title}/`
  );

  if (contentDetail.data) {
    contentDetail.data.content = contentDetail.data.content.replace(
      '\n',
      '\n\n'
    );
  }

  return contentDetail;
}
