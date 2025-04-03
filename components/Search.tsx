'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ISearch {
  placeholder?: string;
}
/**
 * 검색 컴포넌트
 */
const Search = ({ placeholder }: ISearch) => {
  const [value, setValue] = useState<string>('');

  /**
   * 검색했을 때 핸들러
   */
  const onSearch = () => {
    // TODO: 검색 내용 추후 적용 필요
    console.log('검색', value);
  };

  return (
    <div className="w-[800px]">
      <div className="flex items-center bg-[#e1e2df]/70 rounded-md px-4 py-4 shadow-md">
        {/* 아이콘 */}
        <Image
          src={'/icons/search.svg'}
          alt="검색 아이콘"
          width={24}
          height={24}
          className="mr-3 flex-shrink-0"
        />
        {/* 인풋검색창 */}
        <input
          type="text"
          value={value}
          autoFocus
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className="text-[20px] bg-transparent outline-none w-full text-gray-700 placeholder-gray-500"
          onKeyDown={(e) => {
            // 엔터 클릭 시 진행
            if (e.key === 'Enter') {
              onSearch();
            }
          }}
        />
      </div>
    </div>
  );
};
export default Search;
