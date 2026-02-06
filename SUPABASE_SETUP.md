# Supabase 데이터베이스 설정 가이드

프로젝트가 준비되었습니다! 이제 Supabase에서 데이터베이스를 설정해야 합니다.

## 단계별 설정

1. **Supabase 대시보드 접속**
   - https://supabase.com/dashboard 로 이동
   - 프로젝트: `ncxigsbiukthjkplgjxf` 선택

2. **SQL Editor로 이동**
   - 왼쪽 메뉴에서 "SQL Editor" 클릭

3. **스키마 실행**
   - `lib/supabase/schema.sql` 파일의 내용을 복사
   - SQL Editor에 붙여넣기
   - "Run" 버튼 클릭

4. **테이블 확인**
   - "Table Editor"로 이동
   - `products`, `cart_items`, `orders` 테이블 생성 확인
   - 샘플 데이터 6개 확인

## 개발 서버 실행

데이터베이스 설정 후:

```bash
npm run dev
```

브라우저에서 http://localhost:3000 접속

## 주요 기능 테스트

1. **메인 페이지** - AI 추천 기능 테스트
2. **메뉴 페이지** - 샐러드 목록 확인
3. **상세 페이지** - 영양 성분 차트 확인
4. **장바구니** - 상품 추가/수정/삭제
5. **로그인** - 회원가입 및 로그인

즐거운 개발되세요! 🥗
