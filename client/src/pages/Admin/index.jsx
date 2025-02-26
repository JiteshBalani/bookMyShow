import {Tabs} from 'antd';
import MovieList from './MovieList';
import TheatreList from './TheatreList';

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
            children: <div><TheatreList/></div>
        },
        // {
        //     key: '3',
        //     label: <span style={{ fontSize: "18px" }}>Shows</span>,
        //     children: <div>Shows</div>
        // }
        
    ]
  return (
    <div>
        <h1 className='font-semibold' style={{fontFamily: 'montserrat'}}>Admin Portal</h1>
        <Tabs items={tabItems}/>
    </div>
  )
}

export default Admin