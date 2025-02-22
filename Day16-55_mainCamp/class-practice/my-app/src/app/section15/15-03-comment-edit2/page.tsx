'use client';

import { gql, useQuery } from '@apollo/client';
import { MouseEvent, useState } from 'react';

// 게시글 조회하기
const FETCH_BOARDS = gql`
  query fetchBoards($page: Int) {
    fetchBoards(page: $page) {
      _id
      writer
      title
      contents
      createdAt
    }
  }
`;
export default function StaticRoutingMovedPage() {
  const { data } = useQuery(FETCH_BOARDS);
  const [selectedIndex, setSelectedIndex] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const onClickEdit = (e: MouseEvent<HTMLButtonElement>) => {
    const qqq = [...selectedIndex];
    qqq[Number(e.currentTarget.id)] = true;
    setSelectedIndex(qqq);
  };

  return (
    <div>
      {data?.fetchBoards.map((el, index) =>
        selectedIndex[index] !== true ? (
          <div key={el._id}>
            <span style={{ margin: '10px' }}>{el.title}</span>
            <span style={{ margin: '10px' }}>{el.writer}</span>
            <button id={index} onClick={onClickEdit}>
              수정하기
            </button>
          </div>
        ) : (
          // true면 눌렀다는거니까 아래 보여주는것.
          <input type="text" key={el._id} />
        )
      )}
    </div>
  );
}
