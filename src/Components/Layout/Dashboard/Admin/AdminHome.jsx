import { useQuery } from '@tanstack/react-query';
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { FaBook, FaDollarSign, FaReceipt, FaUser } from 'react-icons/fa';
import {PieChart, Pie,  Cell, BarChart, Bar,  XAxis, YAxis, CartesianGrid } from 'recharts';


const colors = ['#0088FE', '#ffffff', '#FFBB28', '#FF8042', 'red', 'pink'];

 const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];




const AdminHome =() => {
    const {user}=useAuth()
    const axiosSecure=useAxiosSecure()
    const {data=[]} =useQuery({
        queryKey:['admin-static'],
        queryFn: async()=>{
          const res =await axiosSecure.get('/admin-static')
          return res.data
        }
    })
    const {data:order=[]} =useQuery({
      queryKey:['order-static'],
      queryFn: async()=>{
        const res =await axiosSecure.get('/order-static')
        return res.data
      }
  })

  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
    ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
    Z`;
  };
  
  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;
  
    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };


  ///////pie charts
 

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const pieCharts =order.map(data=>{
  return {name:data.category,value:data.revenue}
})

    return (
        <div>
        <div>Welcome ,</div>
       
        <h2>
        
        </h2>
        {
            user?.displayName?user?.displayName :'Back'
        }
      
            <div className="stats shadow m-32" >
  
               
                <div className="stat">
                  
                  <div className="stat-title">Revenue</div>
                  <div className="stat-value flex flex-row ">{data.revenue}<FaDollarSign className='my-1 text-purple-700'></FaDollarSign></div>
                  <div className="stat-desc">Jan 1st - Feb 1st</div>
                </div>
                <div className="stat ">
                 
                  <div className="stat-title">Users</div>
                  <div className="stat-value flex flex-row ">{data.users} <FaUser className='my-1 ml-5 text-purple-700'></FaUser></div>
                  <div className="stat-desc">Jan 1st - Feb 1st</div>
                </div>
                
                <div className="stat">
                  
                  <div className="stat-title">Items</div>
                  <div className="stat-value flex flex-row ">{data.menuItems } <FaBook className='my-1 ml-5 text-purple-700'></FaBook></div>
                  <div className="stat-desc">↗︎ 400 (22%)</div>
                </div>
                
                <div className="stat">
                  
                  <div className="stat-title">Receive Orders</div>
                  <div className="stat-value  flex flex-row ">{data.orders} <FaReceipt className='my-1 ml-5 text-purple-700'></FaReceipt></div>
                  <div className="stat-desc">↘︎ 90 (14%)</div>
                </div>
                
              </div>
        
    <div className='flex justify-between'>
      <div className="w-1/2 my-10">
      <BarChart
      width={400}
      height={300}
      data={order}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="category" />
      <YAxis />
      <Bar dataKey="quantity" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
        {order.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index %6]} />
        ))}
      </Bar>
    </BarChart>   
      </div>
      <div className="w-1/2">
     
        <PieChart width={400} height={400}>
          <Pie
            data={pieCharts}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {pieCharts.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
     



      </div>
    </div>



        </div>


    );
};

export default AdminHome;