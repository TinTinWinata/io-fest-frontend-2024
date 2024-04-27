import Paper from '../../components/paper';

export interface IHistoryCardProps {
  title: string;
  date: string;
  description: string;
  image: string;
  index?: number;
}

export default function HistoryCard({
  title,
  date,
  description,
  image,
  index,
}: IHistoryCardProps) {
  const isEven = () => (index !== undefined ? index % 2 === 0 : false);
  return (
    <div
      className={`${
        isEven() ? '' : 'sm:flex-row-reverse'
      } flex-col-reverse sm:flex-row flex gap-5`}
    >
      <Paper className="font-bold w-full sm:w-[75%] center">
        <div className="px-6  sm:py-0 py-6 sm:px-20">
          <p className="text-lg sm:text-xl">{date}</p>
          <h1 className="text-xl sm:text-3xl">{title}</h1>
          <div className="font-semibold text-secondary-text">{description}</div>
        </div>
      </Paper>
      <img className="w-full sm:w-[25%]" src={image} />
    </div>
  );
}
