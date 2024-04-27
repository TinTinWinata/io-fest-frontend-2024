export type TCameraFilterProps = {
  name: string;
  image: string;
  color: string;
  onClick?: (c: TCameraFilterProps) => void;
};

export default function CameraFilterButton(props: TCameraFilterProps) {
  return (
    <div
      onClick={() => props.onClick && props.onClick(props)}
      className={`rounded-md w-[200px]  h-full  center text-white ${props.color} select-none center transition-all duration-200 hover:text-lg `}
    >
      {props.name}
    </div>
  );
}
