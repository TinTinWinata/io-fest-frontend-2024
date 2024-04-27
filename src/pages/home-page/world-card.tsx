import Paper from '../../components/paper';
import { IPlace } from '../../interfaces/data-interface';

interface IWorldCardProps {
  place: IPlace;
  onClick?: (data: IPlace) => void;
  viewAll: boolean;
}

export default function WorldCard({
  place,
  onClick,
  viewAll,
}: IWorldCardProps) {
  return (
    <Paper
      props={{
        onClick: () => onClick && onClick(place),
      }}
      className={`${
        viewAll
          ? 'w-full h-[250px] '
          : ' lg:w-[15%] lg:min-w-[15%] w-[70%] min-w-[70%] '
      } hover:bg-gray-800 flex-1 relative z-30 h-full flex flex-col overflow-hidden rounded-md `}
    >
      <div className="overflow-hidden relative w-full h-[350px]">
        <img
          src={place.image_url}
          className="select-none hover:h-[110%] transition-all duration-300 object-cover h-full absolute top-0 left-0 w-full"
          alt={place.title}
        />
      </div>
      <div className="flex flex-col p-4">
        <h1 className="text-primary-text text-lg overflow-hidden truncate font-semibold">
          {place.title}
        </h1>
        <div className="text-secondary-text text-sm truncate">
          {place.content_type}
        </div>
      </div>
    </Paper>
  );
}
