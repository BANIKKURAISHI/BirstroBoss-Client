

const Menuitem = ({item}) => {
    const {name,image ,recipe,price}=item
    return (
        <div className="flex space-x-5">
            <img style={{borderRadius:'0 200px 200px 200px'}} className="w-28" src={image} alt="" />
            <div>
                <h1 className="uppercase">{name}=========</h1>
                <h1>{recipe}</h1>
            </div>
            <h1>{price}</h1>
        </div>
    );
};

export default Menuitem;