interface Props {
  text: string;
  icon?: JSX.Element;
  onClick?: () => void;
  disabled?: boolean;
  className: string;
}

export default function Button(props: Props) {
  return (
    <button
      className={`${props.disabled && "grayscale cursor-not-allowed"}
					${props.className}`}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.icon}
      {props.text}
    </button>
  );
}
