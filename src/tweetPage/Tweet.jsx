import React from 'react';
import ReactButtons from './reactButtons';

function Tweet() {
  // const [replies, setReplies] = useState(0);
  return (
    <div className="tweet flex w-[598px] flex-row bg-white  px-[16px] pt-[12px] dark:bg-pure-black dark:text-white">
      <div className="leftColumn mr-[12px] h-[40px] w-[40px] ">left</div>
      <div className="rightColumn w-[512px]">
        <div className="userName">name username</div>
        <div className="caption"> if any</div>
        <div className="media"> if any</div>
        <div className="buttons flex flex-row ">
          <ReactButtons
            type="Reply"
            data={100}
          />
          <ReactButtons
            type="Repost"
            data={100}
          />
          <ReactButtons
            type="Like"
            data={100}
          />
        </div>
      </div>
    </div>
  );
}

export default Tweet;
