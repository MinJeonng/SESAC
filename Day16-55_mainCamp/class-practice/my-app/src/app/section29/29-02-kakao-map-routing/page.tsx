'use client';

import Link from 'next/link';

export default function KaKaoMapRouting() {
  return (
    <>
      {/* SPA 이동방식: router.push, Link 등 */}
      <Link href="/section29/29-02-kakao-map-routing-moved">페이지 이동</Link>
      <br />

      {/* MPA 이동방식: location.href, <a/> 등 */}
      {/*  */}
      <a href="/section29/29-02-kakao-map-routing-moved">페이지 이동</a>

      {/* 검색엔진 최적화(SEO) : 검색엔진을 위해 의미있는 태그를 쓰기 */}
      <h1></h1>
      <section></section>
      <main></main>
    </>
  );
}
