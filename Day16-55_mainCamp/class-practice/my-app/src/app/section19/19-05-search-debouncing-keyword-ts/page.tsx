'use client';

import { gql, useQuery } from '@apollo/client';
import { ChangeEvent, MouseEvent, useState } from 'react';
import _ from 'lodash';
import { FetchBoardsSearchDocument } from '@/commons/gql/graphql';

// 게시글 조회하기
const FETCH_BOARDS_SEARCH = gql`
  query fetchBoardsSearch($page: Int, $search: String) {
    fetchBoards(page: $page, search: $search) {
      _id
      writer
      title
      contents
      createdAt
    }
  }
`;
export default function StaticRoutingMovedPage() {
  // const [search, setSearch] = useState('');
  // 내가 찾고싶은 키워드의 색상을 바꾸는 방법
  const [keyword, setKeyword] = useState('');
  const { data, refetch } = useQuery(FetchBoardsSearchDocument);
  console.log(data);

  const onClickPage = (e: MouseEvent<HTMLSpanElement>) => {
    // 검색에서 refetch할때 search 검색어가 refetch에 저장되어 있는 상태이므로, 여기서 굳이 추가 안해도 됌
    refetch({ page: Number(e.currentTarget.id) });
  };
  // 0.5초 뒤에 요청 보냄
  const getDebounce = _.debounce((value) => {
    refetch({ search: value, page: 1 });
    setKeyword(value);
  }, 500);

  const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    // setSearch(e.currentTarget.value);
    getDebounce(e.target.value);
  };
  // const onClickSearch = () => {
  //   // search : search
  //   refetch({ search, page: 1 });
  // };
  return (
    <div>
      검색어 입력 : <input type="text" onChange={onChangeSearch} />
      {/* <button onClick={onClickSearch}>검색하기</button> */}
      {data?.fetchBoards.map((el) => (
        <div key={el._id}>
          <span style={{ margin: '10px' }}>
            {el.title
              .replaceAll(keyword, `@#$${keyword}@#$`)
              .split('@#$')
              .map((el, index) => (
                <span
                  key={`${el}_${index}`}
                  style={{ color: el === keyword ? 'red' : 'black' }}
                >
                  {el}
                </span>
              ))}
          </span>
          <span style={{ margin: '10px' }}>{el.writer}</span>
        </div>
      ))}
      {/* fill()안에는 아무거나 들어가도 됌. 어차피 값들이 다 생기게 될 거니까 */}
      {new Array(10).fill('철수').map((_, index) => (
        <span
          id={String(index + 1)}
          key={index + 1}
          onClick={onClickPage}
          style={{ margin: '10px' }}
        >
          {index + 1}
        </span>
      ))}
    </div>
  );
}
