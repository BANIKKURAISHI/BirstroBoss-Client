import Cover from "../Shere/cover/Cover";
import { Link } from 'react-router-dom';


const MenuCategory = ({items,title,coverImg}) => {
    return (
        <div>
            {title&&  <Cover img={coverImg} className="my-16" title={title}></Cover>}
              <div className="grid my-10   md:grid-cols-2 lg:grid-cols-2 gap-5">
    {
        items.map(item=><div key={item._id} >
             <div className="flex space-x-5">
            <img style={{borderRadius:'0 200px 200px 200px'}} className="w-28" src={item.image} alt="" />
            <div>
                <h1 className="uppercase">{item.name}=========</h1>
                <h1>{item.recipe}</h1>
            </div>
            <h1>{item.price}</h1>
        </div>
     
        </div>)
    }
  </div>
  <Link to={`/order/${title}`} className="btn btn-outline border-0 border-b-4 mt-5">Order now</Link>
        </div>
    );
};

export default MenuCategory;