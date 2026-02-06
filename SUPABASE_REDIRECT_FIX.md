# Supabase 이메일 리다이렉트 URL 설정

## 🚨 문제
회원가입 후 이메일 인증 링크를 클릭하면 `localhost:3000`으로 이동합니다.

## ✅ 해결 방법

### 1단계: Supabase Dashboard 접속
https://supabase.com/dashboard/project/ncxigsbiukthjkplgjxf/auth/url-configuration

### 2단계: Site URL 설정
**Site URL**을 다음과 같이 변경:
```
https://fresh-bowl.vercel.app
```

### 3단계: Redirect URLs 추가
**Redirect URLs** 섹션에 다음 URL들을 추가:

```
https://fresh-bowl.vercel.app/**
https://fresh-bowl.vercel.app/menu
https://fresh-bowl.vercel.app/auth/callback
```

> **💡 참고**: `**`는 모든 하위 경로를 허용하는 와일드카드입니다.

### 4단계: Save 버튼 클릭

---

## 📋 설정 확인 사항

변경 후 다음을 확인하세요:

- ✅ Site URL: `https://fresh-bowl.vercel.app`
- ✅ Redirect URLs에 프로덕션 URL 포함
- ✅ 로컬 개발을 위해 `http://localhost:3000/**`도 유지

---

## 🧪 테스트

1. 새 계정으로 회원가입
2. 이메일에서 "이메일 인증하기" 클릭
3. `https://fresh-bowl.vercel.app`로 리다이렉트되는지 확인

---

## 🔧 로컬 개발 시

로컬에서 테스트하려면 Redirect URLs에 다음도 추가:
```
http://localhost:3000/**
```

**주의**: 프로덕션과 로컬 모두 작동하도록 두 URL을 모두 유지하세요!
