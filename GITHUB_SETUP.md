# GitHub 연동 가이드 📋

## ✅ 완료된 작업
- Git 초기화 완료
- 35개 파일 커밋 완료
- 로컬 Git 리포지토리 준비 완료

---

## 🔧 다음 단계

### 1️⃣ GitHub에서 새 리포지토리 생성

**웹 브라우저에서:**
1. https://github.com/new 접속
2. 다음 정보 입력:
   - **Repository name**: `fresh-bowl` (또는 원하는 이름)
   - **Description**: `Premium Salad E-commerce Site - Next.js 15 + Supabase + Tailwind CSS`
   - **Public** 또는 **Private** 선택
3. ⚠️ **중요**: 다음 항목들을 **체크하지 마세요**:
   - ❌ Add a README file
   - ❌ Add .gitignore
   - ❌ Choose a license
4. **"Create repository"** 버튼 클릭

---

### 2️⃣ 로컬 프로젝트와 연결

리포지토리 생성 후, 아래 명령어를 터미널에서 실행하세요:

```bash
# 원격 저장소 추가 (리포지토리 이름을 fresh-bowl로 했을 경우)
git remote add origin https://github.com/kaz264/fresh-bowl.git

# 브랜치 이름을 main으로 변경
git branch -M main

# GitHub에 푸시
git push -u origin main
```

> **리포지토리 이름을 다르게 했다면?**
> 
> `fresh-bowl` 부분을 실제 생성한 리포지토리 이름으로 변경하세요.
> 예: `git remote add origin https://github.com/kaz264/seller-site.git`

---

### 3️⃣ 푸시 완료 확인

명령어 실행 후 다음과 같은 메시지가 나오면 성공입니다:

```
Enumerating objects: 48, done.
Counting objects: 100% (48/48), done.
...
To https://github.com/kaz264/fresh-bowl.git
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

---

## 🚀 다음은? Vercel 배포!

GitHub 푸시가 완료되면 바로 Vercel로 배포할 수 있습니다:

1. https://vercel.com 접속
2. "Add New Project" 클릭
3. GitHub에서 `fresh-bowl` 리포지토리 선택
4. 환경 변수 3개 추가:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://ncxigsbiukthjkplgjxf.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=(Supabase Anon Key)
   OPENROUTER_API_KEY=(OpenRouter API Key)
   ```
5. "Deploy" 클릭!

자세한 내용은 [`DEPLOYMENT.md`](file:///c:/vibe_coding/antigravity/seller_site/DEPLOYMENT.md) 참고하세요.

---

## 💡 문제 해결

### "fatal: remote origin already exists" 에러
```bash
git remote remove origin
git remote add origin https://github.com/kaz264/fresh-bowl.git
```

### 푸시 권한 에러
- GitHub 로그인 확인
- Personal Access Token이 필요할 수 있음 (Settings → Developer settings → Personal access tokens)

---

**준비 완료!** 🎉

이제 GitHub에서 리포지토리만 생성하고 위 명령어를 실행하시면 됩니다!
