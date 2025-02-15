import {useState, useEffect} from 'react'
import { getAllTheatres } from '../../api/theatres';
import { Button, Input, Table, Badge, Tooltip } from 'antd';
import TheatreForm from './TheatreForm';
import TheatreInfo from './TheatreInfo';
import {SearchOutlined} from '@ant-design/icons';


const TheatreList = () => {

    const[theatres, setTheatres] = useState([]);
    const [filteredTheatres, setFilteredTheatres] = useState([]);
    const [error, setError] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [theatreInfoOpen, setTheatreInfoOpen] = useState(false);
    const [selectedTheatre, setSelectedTheatre] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    const getTheatresData = async() => {
        try {
            const response = await getAllTheatres();
            const allTheatres = response.data || [];
            setTheatres(allTheatres);
            setFilteredTheatres(allTheatres);
        } catch(error) {
            setError(error);
            console.log("Failes to fetch the theatres.", error);
        }
    };

    const handleSearch = (e) => {
        const search =  e.target.value.toLowerCase();
        setSearchQuery(search);
  
        if(search.trim() === '') setFilteredTheatres(theatres);
        else {
          const filtered = theatres.filter((theatre) =>
            theatre.name.toLowerCase().includes(search)
          );
          setFilteredTheatres(filtered)
        }
      };

      const onTheatreUpdate = async() => {
        await getTheatresData();
      }
  
      useEffect(()=>{
          getTheatresData();
      }, []);

      const tableHeadings = [
        {
          title: "Theatre Name",
          dataIndex: "name",
        },
        {
          title: "Address",
          dataIndex: "address",
        },
        {
          title: "Contact no.",
          dataIndex: "phone",
        },
        {
          title: "Email ID",
          dataIndex: "email",
        },
        {
          title: "Owner",
          dataIndex: "owner",
          render: (data) => {
            return <Tooltip title={data?.email} color='blue'><span >{data?.name}</span></Tooltip>
          }
        },
        {
          title: "Status",
          dataIndex: "isActive",
          render: (data) => {
            return data? <Badge text="Active" color="green"/> : <Badge text='Inactive' color='red'/>
          }
        }
      ]
  return (
    <>
    <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '16px',
                marginBottom: '16px'
            }}>
                <Input 
                    size="small" 
                    placeholder='Search a theatre' 
                    suffix={<SearchOutlined />}
                    style={{
                        fontWeight: 300, 
                        fontSize: "1rem",
                        width: '250px'  // Fixed width for search bar
                    }}
                    onChange={handleSearch}
                    value={searchQuery}
                />
                <span style={{fontSize:"1rem"}}>Total theatres: {theatres.length}</span>

                <span style={{fontSize:"1rem", fontStyle:"italic"}}>Bring the cursor on owner name to get their email ID</span>

                <Button type='primary' style={{fontWeight:600}} 
                  onClick={() => {
                    setModalOpen(true);
                }}>
                    Add Theatre
                </Button>
                
            </div>

    {/* add movie modal */}
    { modalOpen && <TheatreForm modalOpen={modalOpen} setModalOpen={setModalOpen} onTheatreUpdate={onTheatreUpdate} /> }

    <Table columns={tableHeadings} 
            // loading={loading} 
            dataSource={filteredTheatres}
            rowKey="_id"
            className='cursor-pointer'
            onRow={(record) => ({
              onClick: () => {
                setSelectedTheatre(record);
                setTheatreInfoOpen(true);
              }
            })}
    />
    {/* update movie modal */}
    { theatreInfoOpen && <TheatreInfo 
      theatreInfoOpen={theatreInfoOpen} 
      setTheatreInfoOpen={setTheatreInfoOpen} 
      selectedTheatre={selectedTheatre} 
      onTheatreUpdate={onTheatreUpdate} /> }

  </>
  )
}

export default TheatreList