import { TiThSmallOutline } from "react-icons/ti";
import { GiCoffeeCup } from "react-icons/gi";
import { FaBurger } from "react-icons/fa6";
import { FaIceCream } from "react-icons/fa";
import { GiChickenOven } from "react-icons/gi";
import { GiHotMeal } from "react-icons/gi";
import { PiBowlFoodFill } from "react-icons/pi";
const Category =[
{
    id:1,
    name:"All",
    icon:<TiThSmallOutline className="w-[60px] h-[60px] text-green-500" />
},
{
    id:2,
    name:"Breakfast",
    icon:<PiBowlFoodFill  className="w-[60px] h-[60px] text-green-500" />
},
{
    id:3,
    name:"Veg",
    icon:<GiHotMeal className="w-[60px] h-[60px] text-green-500" />
},
{
    id:4,
    name:"Non-Veg",
    icon:<GiChickenOven className="w-[60px] h-[60px] text-green-500" />
},
{
    id:5,
    name:"Coffee",
    icon:<GiCoffeeCup className="w-[60px] h-[60px] text-green-500" />
},
{
    id:6,
    name:"JUnk-Food",
    icon:<FaBurger className="w-[60px] h-[60px] text-green-500" />
},
{
    id:7,
    name:"Ice-Cream",
    icon:<FaIceCream className="w-[60px] h-[60px] text-green-500" />
},
]

export default Category