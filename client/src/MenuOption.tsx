import { ReactNode } from "react"

interface Props {
    name: string
    icon: ReactNode
    onClick: () => void
}

function MenuOption(props: Props) {
  return (
    <div onClick={props.onClick} style={{padding: '1rem 3rem', display: 'flex', alignItems: 'center', justifyContent: 'start', fontSize: '1.2rem', hover: {}}}>
        {props.icon}
        <span style={{marginLeft: '0.5rem'}}>{props.name}</span>
    </div>
  )
}

export default MenuOption
