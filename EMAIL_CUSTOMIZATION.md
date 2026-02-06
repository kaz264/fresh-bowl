# Supabase 이메일 템플릿 커스터마이징 가이드 📧

회원가입 및 인증 이메일을 Fresh Bowl 브랜드에 맞게 변경하는 방법입니다.

---

## 🎯 변경할 수 있는 항목

1. **발신자 이름** (현재: Supabase → Fresh Bowl)
2. **이메일 제목**
3. **이메일 본문 (HTML/텍스트)**
4. **회신 이메일 주소**
5. **커스텀 SMTP 서버** (선택사항)

---

## 📝 방법 1: Supabase Dashboard에서 템플릿 수정

### 1단계: Supabase Dashboard 접속

1. https://supabase.com/dashboard/project/ncxigsbiukthjkplgjxf 접속
2. 왼쪽 메뉴에서 **Authentication** → **Email Templates** 클릭

### 2단계: 이메일 템플릿 커스터마이징

#### 📨 Confirm Signup (회원가입 인증)

**현재 기본 설정:**
- Subject: `Confirm Your Signup`
- From: `noreply@mail.app.supabase.io`

**Fresh Bowl 커스텀 템플릿:**

```html
<!-- Subject -->
Fresh Bowl 회원가입을 환영합니다! 🥗

<!-- Email Body -->
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background-color: #f9fafb;
      margin: 0;
      padding: 20px;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .header {
      background: linear-gradient(135deg, #4ADE80 0%, #22c55e 100%);
      padding: 40px 20px;
      text-align: center;
      color: white;
    }
    .header h1 {
      margin: 0;
      font-size: 28px;
      font-weight: 700;
    }
    .content {
      padding: 40px 30px;
    }
    .button {
      display: inline-block;
      background-color: #4ADE80;
      color: white;
      text-decoration: none;
      padding: 14px 32px;
      border-radius: 8px;
      font-weight: 600;
      margin: 20px 0;
      text-align: center;
    }
    .button:hover {
      background-color: #22c55e;
    }
    .footer {
      background-color: #f9fafb;
      padding: 20px;
      text-align: center;
      font-size: 14px;
      color: #6b7280;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🥗 Fresh Bowl</h1>
      <p style="margin: 10px 0 0; font-size: 16px;">프리미엄 샐러드</p>
    </div>
    
    <div class="content">
      <h2 style="color: #1f2937; margin-top: 0;">회원가입을 환영합니다!</h2>
      <p style="color: #4b5563; line-height: 1.6;">
        Fresh Bowl 가족이 되신 것을 환영합니다! 🎉<br>
        아래 버튼을 클릭하여 이메일 인증을 완료해주세요.
      </p>
      
      <div style="text-align: center;">
        <a href="{{ .ConfirmationURL }}" class="button">
          이메일 인증하기
        </a>
      </div>
      
      <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
        버튼이 작동하지 않으면 아래 링크를 복사하여 브라우저에 붙여넣어주세요:<br>
        <span style="word-break: break-all; color: #4ADE80;">{{ .ConfirmationURL }}</span>
      </p>
      
      <p style="color: #9ca3af; font-size: 13px; margin-top: 20px; border-top: 1px solid #e5e7eb; padding-top: 20px;">
        본인이 요청하지 않은 이메일이라면 무시하셔도 됩니다.
      </p>
    </div>
    
    <div class="footer">
      <p>© 2026 Fresh Bowl. All rights reserved.</p>
      <p style="margin-top: 10px;">
        <a href="https://fresh-bowl.vercel.app" style="color: #4ADE80; text-decoration: none;">웹사이트 방문</a> | 
        <a href="https://fresh-bowl.vercel.app/contact" style="color: #4ADE80; text-decoration: none;">문의하기</a>
      </p>
    </div>
  </div>
</body>
</html>
```

#### 🔑 Magic Link (매직 링크 로그인)

**Subject:**
```
Fresh Bowl 로그인 링크 🔐
```

**Body:** (위와 유사한 구조에 `{{ .Token }}` 사용)

#### 🔄 Change Email Address (이메일 변경)

**Subject:**
```
Fresh Bowl 이메일 주소 변경 확인
```

#### 🔒 Reset Password (비밀번호 재설정)

**Subject:**
```
Fresh Bowl 비밀번호 재설정
```

---

## 🔧 방법 2: 커스텀 SMTP 서버 사용

### 왜 필요한가?

- 발신자 이메일을 `hello@freshbowl.com` 같은 커스텀 도메인으로 변경
- 이메일 전송률 향상
- 브랜드 신뢰도 증가

### 설정 방법

1. **SMTP 서비스 선택**
   - Gmail SMTP (무료, 일일 제한 있음)
   - SendGrid (무료 티어: 100통/일)
   - Mailgun (무료 티어: 5,000통/월)
   - AWS SES (매우 저렴)

2. **Supabase에 SMTP 설정**

   Supabase Dashboard → Settings → Auth → SMTP Settings

   **예시 (Gmail):**
   ```
   Host: smtp.gmail.com
   Port: 587
   Username: your-email@gmail.com
   Password: (앱 비밀번호)
   Sender Email: your-email@gmail.com
   Sender Name: Fresh Bowl
   ```

   **예시 (SendGrid):**
   ```
   Host: smtp.sendgrid.net
   Port: 587
   Username: apikey
   Password: (SendGrid API Key)
   Sender Email: noreply@yourdomain.com
   Sender Name: Fresh Bowl
   ```

---

## ⚡ 빠른 설정 (SMTP 없이)

SMTP 서버 연결 없이 Supabase 기본 서버를 사용하되, **발신자 이름만 변경**:

1. Authentication → Email Templates
2. 각 템플릿마다 상단의 **"Sender Name"** 필드 수정:
   ```
   Sender Name: Fresh Bowl
   ```

3. 이메일 본문 HTML을 위의 템플릿으로 교체

---

## 📋 적용 체크리스트

- [ ] Confirm Signup 템플릿 수정
- [ ] Magic Link 템플릿 수정
- [ ] Reset Password 템플릿 수정
- [ ] Sender Name 변경 (Fresh Bowl)
- [ ] 테스트 회원가입으로 이메일 확인
- [ ] (선택) 커스텀 SMTP 설정

---

## 🧪 테스트 방법

1. 로컬 또는 배포된 사이트에서 회원가입 시도
2. 이메일 수신 확인
3. 디자인 및 링크 작동 확인

---

## 💡 주의사항

- **{{ .ConfirmationURL }}**: 회원가입 인증 링크 (필수)
- **{{ .Token }}**: 매직 링크 토큰 (필수)
- Supabase 무료 플랜은 시간당 이메일 발송 제한이 있을 수 있습니다
- 프로덕션 환경에서는 커스텀 SMTP 사용 권장

---

**적용 후 Fresh Bowl만의 전문적인 이메일로 사용자 경험을 향상시키세요!** 📧✨
