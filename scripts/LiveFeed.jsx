import * as React from 'react';
import { useEffect, useState } from 'react';
import Socket from './Socket';

export default function LiveFeed(props) {
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    Socket.on('post price history', (data) => {
      setPostList(data.postList);
      // console.log(data.postList);
    });
  }, []);

  return (
    <div className="livefeed">
      <h1> Live Feed </h1>
      {postList.map((history) => (
        <div key={history[0].price}>
          {history.map((item) => (
            <li>
              {item.price_date}
              -$
              {item.price}
            </li>
          ))}
          <form>
            <input id="message_input" placeholder="Enter your message" />
            <button type="button">Send</button>
          </form>
        </div>
      ))}
    </div>
  );
}
