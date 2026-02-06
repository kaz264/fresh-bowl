/**
 * Supabase 이메일 템플릿 업데이트 스크립트
 * 
 * 사용 방법:
 * 1. Supabase Dashboard에서 Service Role Key 복사
 * 2. 아래 SUPABASE_SERVICE_ROLE_KEY에 붙여넣기
 * 3. node scripts/update-email-templates.js 실행
 */

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ncxigsbiukthjkplgjxf.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || 'YOUR_SERVICE_ROLE_KEY_HERE';

const emailTemplates = {
  // 회원가입 인증 이메일
  confirm: {
    subject: 'Fresh Bowl 회원가입을 환영합니다! 🥗',
    template: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
    <div style="background: linear-gradient(135deg, #4ADE80 0%, #22c55e 100%); padding: 40px 20px; text-align: center; color: white;">
      <h1 style="margin: 0; font-size: 28px;">🥗 Fresh Bowl</h1>
      <p style="margin: 10px 0 0; font-size: 16px;">프리미엄 샐러드</p>
    </div>
    
    <div style="padding: 40px 30px;">
      <h2 style="color: #1f2937; margin-top: 0;">회원가입을 환영합니다!</h2>
      <p style="color: #4b5563; line-height: 1.6;">
        Fresh Bowl 가족이 되신 것을 환영합니다! 🎉<br>
        아래 버튼을 클릭하여 이메일 인증을 완료해주세요.
      </p>
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="{{ .ConfirmationURL }}" style="display: inline-block; background-color: #4ADE80; color: white; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600;">이메일 인증하기</a>
      </div>
      
      <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
        버튼이 작동하지 않으면 아래 링크를 복사하여 브라우저에 붙여넣어주세요:<br>
        <span style="word-break: break-all; color: #4ADE80;">{{ .ConfirmationURL }}</span>
      </p>
      
      <p style="color: #9ca3af; font-size: 13px; margin-top: 20px; border-top: 1px solid #e5e7eb; padding-top: 20px;">
        본인이 요청하지 않은 이메일이라면 무시하셔도 됩니다.
      </p>
    </div>
    
    <div style="background-color: #f9fafb; padding: 20px; text-align: center; font-size: 14px; color: #6b7280;">
      <p style="margin: 0;">© 2026 Fresh Bowl. All rights reserved.</p>
      <p style="margin: 10px 0 0;">
        <a href="https://fresh-bowl.vercel.app" style="color: #4ADE80; text-decoration: none;">웹사이트 방문</a> | 
        <a href="https://fresh-bowl.vercel.app/contact" style="color: #4ADE80; text-decoration: none;">문의하기</a>
      </p>
    </div>
  </div>
</body>
</html>
    `.trim()
  },

  // 매직 링크
  magic_link: {
    subject: 'Fresh Bowl 로그인 링크 🔐',
    template: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
    <div style="background: linear-gradient(135deg, #4ADE80 0%, #22c55e 100%); padding: 40px 20px; text-align: center; color: white;">
      <h1 style="margin: 0; font-size: 28px;">🥗 Fresh Bowl</h1>
    </div>
    
    <div style="padding: 40px 30px;">
      <h2 style="color: #1f2937; margin-top: 0;">로그인 링크</h2>
      <p style="color: #4b5563; line-height: 1.6;">
        아래 버튼을 클릭하여 Fresh Bowl에 로그인하세요.
      </p>
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="{{ .ConfirmationURL }}" style="display: inline-block; background-color: #4ADE80; color: white; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600;">로그인하기</a>
      </div>
      
      <p style="color: #9ca3af; font-size: 13px; margin-top: 20px; border-top: 1px solid #e5e7eb; padding-top: 20px;">
        본인이 요청하지 않은 이메일이라면 무시하셔도 됩니다.
      </p>
    </div>
    
    <div style="background-color: #f9fafb; padding: 20px; text-align: center; font-size: 14px; color: #6b7280;">
      <p style="margin: 0;">© 2026 Fresh Bowl. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
    `.trim()
  },

  // 비밀번호 재설정
  recovery: {
    subject: 'Fresh Bowl 비밀번호 재설정 요청',
    template: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
    <div style="background: linear-gradient(135deg, #4ADE80 0%, #22c55e 100%); padding: 40px 20px; text-align: center; color: white;">
      <h1 style="margin: 0; font-size: 28px;">🥗 Fresh Bowl</h1>
    </div>
    
    <div style="padding: 40px 30px;">
      <h2 style="color: #1f2937; margin-top: 0;">비밀번호 재설정</h2>
      <p style="color: #4b5563; line-height: 1.6;">
        비밀번호 재설정 요청을 받았습니다.<br>
        아래 버튼을 클릭하여 새 비밀번호를 설정하세요.
      </p>
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="{{ .ConfirmationURL }}" style="display: inline-block; background-color: #4ADE80; color: white; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600;">비밀번호 재설정하기</a>
      </div>
      
      <p style="color: #9ca3af; font-size: 13px; margin-top: 20px; border-top: 1px solid #e5e7eb; padding-top: 20px;">
        본인이 요청하지 않은 이메일이라면 무시하셔도 됩니다.
      </p>
    </div>
    
    <div style="background-color: #f9fafb; padding: 20px; text-align: center; font-size: 14px; color: #6b7280;">
      <p style="margin: 0;">© 2026 Fresh Bowl. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
    `.trim()
  }
};

async function updateEmailTemplates() {
  if (SUPABASE_SERVICE_ROLE_KEY === 'YOUR_SERVICE_ROLE_KEY_HERE') {
    console.error('❌ Service Role Key를 설정해주세요!');
    console.log('\n📝 Service Role Key 찾는 방법:');
    console.log('1. https://supabase.com/dashboard/project/ncxigsbiukthjkplgjxf/settings/api 접속');
    console.log('2. "Service Role Key (secret)" 섹션에서 키 복사');
    console.log('3. 이 파일의 SUPABASE_SERVICE_ROLE_KEY 변수에 붙여넣기');
    console.log('4. 다시 실행: node scripts/update-email-templates.js\n');
    process.exit(1);
  }

  console.log('🔄 이메일 템플릿 업데이트 시작...\n');

  for (const [type, config] of Object.entries(emailTemplates)) {
    try {
      const response = await fetch(
        `${SUPABASE_URL}/auth/v1/admin/email/template/${type}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
            'apikey': SUPABASE_SERVICE_ROLE_KEY
          },
          body: JSON.stringify({
            subject: config.subject,
            content: config.template,
            content_type: 'text/html'
          })
        }
      );

      if (response.ok) {
        console.log(`✅ ${type} 템플릿 업데이트 완료`);
      } else {
        const error = await response.text();
        console.error(`❌ ${type} 템플릿 업데이트 실패:`, error);
      }
    } catch (error) {
      console.error(`❌ ${type} 템플릿 업데이트 중 오류:`, error.message);
    }
  }

  console.log('\n✨ 이메일 템플릿 업데이트 완료!');
  console.log('🧪 테스트: 회원가입하여 이메일 확인해보세요.\n');
}

updateEmailTemplates();
