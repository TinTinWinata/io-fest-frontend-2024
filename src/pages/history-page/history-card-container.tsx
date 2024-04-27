import HistoryCard, { IHistoryCardProps } from './history-card';

export interface IHistoryCardContainerProps {
  histories: IHistoryCardProps[];
  title: string;
}

export default function HistoryCardContainer({
  histories,
  title,
}: IHistoryCardContainerProps) {
  return (
    <div className="flex flex-col gap-1">
      <div className="text-[2em] sm:text-[3em] font-bold">{title}</div>
      <div className="flex flex-col gap-20 sm:gap-5">
        {histories.map((history, index) => (
          <HistoryCard {...history} key={index} index={index} />
        ))}
      </div>
    </div>
  );
}
