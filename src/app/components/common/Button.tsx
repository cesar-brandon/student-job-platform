interface Props{
		text: string;
		onClick?: () => void;
		disabled?: boolean;
		className: string;
}

export default function Button(props: Props) {
		return (
				<button  className={`${props.className}`} disabled={props.disabled} onClick={props.onClick}>
						{props.text}	
				</button>
		)
}
