import {Tabs} from 'antd';
import MovieList from './MovieList';

const Admin = () => {
    const tabItems = [
        {
            key: '1',
            label: <span style={{ fontSize: "18px" }}>Movies</span>,
            children: <div><MovieList/></div>
        },
        {
            key: '2',
            label: <span style={{ fontSize: "18px" }}>Theatres</span>,
            children: <div>Theatres</div>
        }
        
    ]
  return (
    <div>
        <h1 className='font-semibold text-center'>Admin Portal</h1>
        <Tabs items={tabItems}/>
    </div>
  )
}

export default Admin