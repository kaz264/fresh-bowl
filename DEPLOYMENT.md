# Fresh Bowl 배포 가이드 🚀

Next.js 앱을 프로덕션 환경에 배포하는 방법을 안내합니다.

---

## 🎯 추천: Vercel (가장 쉬움)

Vercel은 Next.js를 만든 회사의 호스팅 플랫폼으로, Next.js 앱 배포에 최적화되어 있습니다.

### 1단계: GitHub에 코드 업로드

```bash
# Git 초기화 (아직 안 했다면)
git init

# .gitignore가 있는지 확인 (이미 생성되어 있음)
# .env.local은 자동으로 무시됨

# 모든 파일 추가
git add .

# 커밋
git commit -m "Initial commit: Fresh Bowl salad shop"

# GitHub에 새 리포지토리 생성 후
git remote add origin https://github.com/your-username/fresh-bowl.git
git branch -M main
git push -u origin main
```

### 2단계: Vercel 배포

1. **Vercel 가입**
   - https://vercel.com 접속
   - GitHub 계정으로 로그인

2. **새 프로젝트 Import**
   - "Add New..." → "Project" 클릭
   - GitHub 리포지토리 선택 (fresh-bowl)
   - "Import" 클릭

3. **환경 변수 설정**
   - "Environment Variables" 섹션에서 다음 추가:
   
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://ncxigsbiukthjkplgjxf.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   OPENROUTER_API_KEY=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
   ```

4. **Deploy 버튼 클릭**
   - 자동으로 빌드 및 배포 시작
   - 2-3분 후 배포 완료!

5. **도메인 확인**
   - Vercel이 자동으로 도메인 생성: `https://fresh-bowl.vercel.app`
   - 커스텀 도메인도 무료로 연결 가능

---

## 🔄 배포 후 OAuth 설정 업데이트

### Google OAuth

1. Google Cloud Console → Credentials
2. Authorized redirect URIs에 추가:
   ```
   https://ncxigsbiukthjkplgjxf.supabase.co/auth/v1/callback
   https://your-vercel-domain.vercel.app/menu
   ```

### Kakao OAuth

1. Kakao Developers → 플랫폼 설정
2. Web 플랫폼에 도메인 추가:
   ```
   https://your-vercel-domain.vercel.app
   ```
3. Redirect URI에 추가:
   ```
   https://ncxigsbiukthjkplgjxf.supabase.co/auth/v1/callback
   ```

---

## 🎨 배포 후 자동 업데이트

GitHub에 코드를 푸시하면 **자동으로 재배포**됩니다:

```bash
# 코드 수정 후
git add .
git commit -m "업데이트 내용"
git push

# Vercel이 자동으로 감지하고 재배포!
```

---

## 🆓 다른 배포 옵션

### Netlify (Vercel 대안)

1. https://netlify.com 접속
2. GitHub 연결
3. 환경 변수 설정
4. 배포

**빌드 설정:**
- Build command: `npm run build`
- Publish directory: `.next`

### 커스텀 서버 (VPS/AWS/GCP)

Docker를 사용한 배포:

```dockerfile
# Dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

```bash
# 빌드 및 실행
docker build -t fresh-bowl .
docker run -p 3000:3000 --env-file .env.local fresh-bowl
```

---

## ✅ 배포 체크리스트

배포 전 확인사항:

- [ ] `.env.local.example` 파일이 있음 (실제 키는 제외)
- [ ] Supabase 데이터베이스 스키마 실행 완료
- [ ] 이미지 URL이 모두 작동함
- [ ] 로컬에서 `npm run build` 성공
- [ ] 환경 변수를 Vercel/Netlify에 모두 추가
- [ ] OAuth Redirect URI 업데이트 (소셜 로그인 사용 시)

---

## 🎉 완료!

배포가 완료되면:
- ✅ 전 세계 어디서나 접속 가능
- ✅ HTTPS 자동 적용
- ✅ Git push 시 자동 재배포
- ✅ 무료 플랜으로 시작 가능

**배포된 사이트 예시 URL:**
- `https://fresh-bowl.vercel.app`
- `https://fresh-bowl.netlify.app`

커스텀 도메인 연결 시:
- `https://freshbowl.com`

---

## 🆘 문제 해결

### 빌드 에러 발생 시

1. 로컬에서 먼저 테스트:
   ```bash
   npm run build
   ```

2. TypeScript 에러 확인:
   ```bash
   npx tsc --noEmit
   ```

3. 환경 변수 누락 확인

### 이미지 로딩 안 됨

`next.config.ts`에서 이미지 도메인 확인:
```typescript
images: {
  remotePatterns: [
    { hostname: 'images.unsplash.com' },
    { hostname: 'ncxigsbiukthjkplgjxf.supabase.co' },
  ],
}
```

### Supabase 연결 안 됨

환경 변수가 Vercel에 제대로 설정되었는지 확인:
- Settings → Environment Variables

---

**추가 질문이 있으시면 언제든 물어보세요!** 🚀
