import * as React from 'react';
import Socket from './Socket';
import {useEffect, useState} from "react";
import ResultItem from "./ResultItem";
import PostButton from './PostButton';

export default function PriceHistoryResults(props) {
    const [pricehistory, setPricehistory] = useState([]);
    const [historyExists, setHistoryExists] = useState(false)
    const [show, setShow] = useState(false);
    const [title, setTitle] = useState("");
    const [imgurl, setImgurl] = useState("");
    const [user, setUser] = useState("temp user");
    const [time, setTime] = useState("temp time");

    useEffect(() => {
        console.log("we in useeffects");
        Socket.on('price history response', (data) => {
          if(props.ASIN == data['ASIN']) {
              if(data['status'] == '200') {
                setPricehistory(data['pricehistory'])
                setHistoryExists(true)
              } else {
                  setHistoryExists(false)
              }
            setTitle(data['title'])
            setImgurl(data['imgurl'])
            setShow(true);
          }
        });

    }, []);

    return(
        <div>
            { show ?
                (
                    <div>
                    { historyExists ?
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
                                    time = {time}
                                />
                            </div>
                        ) : (
                            <h3>This item's prices are not accessible</h3>
                        )
                    }
                    </div>
                ) : (null)
            }
        </div>
        );
}