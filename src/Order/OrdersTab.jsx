import FoodCard from "../Components/Shere/FoodCard";
import { Link } from "react-router-dom";

const OrdersTab = ({items}) => {
    return (
        <div>
            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
    {
        items.map(item=><FoodCard key={item._id} item={item}></FoodCard>)
    }
    </div>
    <Link to="/order" className="btn btn-outline border-0 border-b-4 mt-5">Order now</Link>
        </div>
    );
};

export default OrdersTab;