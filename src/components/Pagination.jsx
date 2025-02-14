import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { nextPage, prevPage, selectPage } from "../store/bookSlice";

const Pagination = () => {
  const dispatch = useDispatch();
  const page = useSelector(selectPage);

  return (
    <div className="pagination">
      {/* 「前へ」ボタン（最初のページでは非活性） */}
      <button onClick={() => dispatch(prevPage())} disabled={page === 0}>
        前へ
      </button>
      {/* 現在のページ番号を表示（1-indexed 表示） */}
      <span>ページ {page + 1}</span>
      {/* 「次へ」ボタン */}
      <button onClick={() => dispatch(nextPage())}>次へ</button>
    </div>
  );
};

export default Pagination;