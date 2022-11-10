import { Card } from 'antd'
import stl from './index.less'


interface Props {
  style?: React.CSSProperties|any;
  bodyStyle?: React.CSSProperties|any;
  children: React.ReactNode;
}
const Page: React.FC<Props> = (props) => {
  const {style, bodyStyle} = props
  return (
    <Card style={{ marginBottom:20, paddingLeft: 8, paddingRight: 8,...style }} bodyStyle={{ padding: 22, ...bodyStyle }} >
      {props.children}
    </Card>
  )
}

export default Page