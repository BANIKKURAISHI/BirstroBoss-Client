
import SectionTitle from "./SectionTitle";
import Menuitem from "./Menuitem";
import useMenu from "../../Hooks/useMenu";

const Popular = () => {
    const [menu]=useMenu()
    const popular =menu.filter(data=>data.category ==='popular')

    return (
       <section>
        <SectionTitle
        subHeading={'From our menu'}
        heading={'Popular items'}>

        </SectionTitle>
  <div className="grid my-10  md:grid-cols-2 lg:grid-cols-2 gap-5">
    {
        popular.map(item=><Menuitem key={item._id} item={item}></Menuitem>)
    }
  </div>
  <button className="btn btn-outline items-center border-0 border-b-4 mt-5">View full menu</button>
       </section>
    );
};

export default Popular;
