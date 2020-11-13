import * as React from 'react';
import Socket from './Socket';
import {useEffect, useState} from "react";
import ResultItem from "./ResultItem";
import PostButton from './PostButton';

export default function PriceHistoryResults(props) {
    const [pricehistory, setPricehistory] = useState([]);
    const [show, setShow] = useState(false);
    const [title, setTitle] = useState("");
    const [imgurl, setImgurl] = useState("");
    const [user, setUser] = useState("");
    const [profpic, setProfpic] = useState("");
    const [time, setTime] = useState("");

    useEffect(() => {
        console.log("we in useeffects");
        Socket.on('price history response', (data) => {
          if(props.ASIN == data['ASIN']) {
            setTitle(data['title'])
            setImgurl(data['imgurl'])
            setPricehistory(data['pricehistory']),
            setUser(data['username']),
            setProfpic(data['profpic']),
            setShow(true);
          }
        });

    }, []);

    return(
        <div>
            { show ?
                (
                <div>
                    <h3>Price Change History For this Item</h3>
                    <ul>
                        {pricehistory.map((item) => (
                            <li>{item.price_date}-${item.price}</li>
                        ))}
                    </ul>
                    <PostButton
                        ASIN={props.ASIN}
                        priceHistory={pricehistory}
                        title={title}
                        imgurl={imgurl}
                        user = {user}
                        profpic = {profpic}
                        time = {time}
                    />
                </div>
                ) : (null)
            }
        </div>
        );
}