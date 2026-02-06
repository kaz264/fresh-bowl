# Supabase OAuth 프로바이더 설정 가이드

Google과 카카오톡 소셜 로그인을 활성화하려면 Supabase에서 OAuth 프로바이더를 설정해야 합니다.

## 1. Google OAuth 설정

### Supabase 대시보드

1. https://supabase.com/dashboard/project/ncxigsbiukthjkplgjxf로 이동
2. 왼쪽 메뉴에서 **Authentication** → **Providers** 클릭
3. **Google** 찾아서 활성화 토글
4. Redirect URL을 복사해두세요: `https://ncxigsbiukthjkplgjxf.supabase.co/auth/v1/callback`

### Google Cloud Console

1. https://console.cloud.google.com 접속
2. **APIs & Services** → **Credentials** 이동
3. **Create Credentials** → **OAuth 2.0 Client IDs** 선택
4. **Application type**: Web application
5. **Authorized redirect URIs**에 Supabase Redirect URL 추가
6. **Client ID**와 **Client Secret** 복사

### Supabase에 적용

1. Supabase Authentication → Providers → Google로 돌아가기
2. Client ID와 Client Secret 붙여넣기
3. **Save** 클릭

---

## 2. Kakao OAuth 설정

### Supabase 대시보드

1. https://supabase.com/dashboard/project/ncxigsbiukthjkplgjxf로 이동
2. **Authentication** → **Providers** 클릭
3. **Kakao** 찾아서 활성화 토글
4. Redirect URL 복사: `https://ncxigsbiukthjkplgjxf.supabase.co/auth/v1/callback`

### Kakao Developers

1. https://developers.kakao.com 접속 및 로그인
2. **내 애플리케이션** → **애플리케이션 추가하기**
3. 앱 이름 입력 (예: Fresh Bowl)
4. **앱 설정** → **플랫폼** → **Web 플랫폼 등록**
   - 사이트 도메인: `http://localhost:3000` (개발용)
5. **제품 설정** → **카카오 로그인** 활성화
6. **Redirect URI** 등록: Supabase Redirect URL 추가
7. **보안** → **Client Secret** 발급 (활성화 상태로 설정)
8. **앱 키**에서 **REST API 키** 복사

### Supabase에 적용

1. Supabase Authentication → Providers → Kakao로 돌아가기
2. **Client ID**: REST API 키
3. **Client Secret**: 발급받은 Client Secret
4. **Save** 클릭

---

## 3. 테스트

로컬 개발 서버가 실행 중인 상태에서:

1. http://localhost:3000/login 접속
2. "Google로 계속하기" 또는 "카카오톡으로 계속하기" 버튼 클릭
3. 각 플랫폼의 로그인 화면으로 리다이렉션
4. 로그인 완료 후 `/menu` 페이지로 자동 이동

---

## 주의사항

**로컬 개발 환경**에서는 Redirect URI에 `http://localhost:3000/menu`도 추가해야 할 수 있습니다.

**프로덕션 배포 시**:
- Google Cloud Console과 Kakao Developers에서
- 실제 도메인의 Redirect URI 추가 필요
- 예: `https://yourdomain.com/menu`
