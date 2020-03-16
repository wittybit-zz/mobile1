import React from 'react';
import './ListItems.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import FlipMove from 'react-flip-move';

function ListItems(props) {
    const items = props.items;
    const listItems = items.map(item => {
        return <div className="list" key={item.key}>
            <p onClick={() => {
                props.deleteItem(item.text)
            }}>
                <input type="text" id={item.key} value={item.text}
                />
                <span className="map-icon">

                    <FontAwesomeIcon className="faicons" onClick={() => {
                        props.deleteItem(item.text)
                    }} icon="location-arrow" />
                </span>
            </p>

        </div>
    })
    return <div>
        <FlipMove duration={300} easing="ease-in-out">
            {listItems}
        </FlipMove>

    </div>;
}

export default ListItems;