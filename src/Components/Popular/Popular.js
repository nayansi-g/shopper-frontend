import { useEffect, useState } from 'react';
import './Popular.css';
import Item from '../Item/Item';
import data_product from '../Assets/data';

const Popular = () => {

    const [popularItems, setPopularItems] = useState([]);

    useEffect(() => {
        fetch("https://shopper-ecommerce-55781390a868.herokuapp.com/allproducts?type=top_collection&filter=women&count=4").then(res => res.json()).then(data => setPopularItems(data)).catch(err => console.log(err))
    }, [])

    return <div className="popular">
        <h1>POPULAR IN WOMEN</h1>
        <hr />
        <div className='popular-items'>
            {popularItems.map((elem) => {
                return <Item key={elem.id} elem={elem} />
            })}
        </div>

    </div>
}
export default Popular;