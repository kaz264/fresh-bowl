export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-6">Fresh Bowl 소개</h1>

                <div className="prose prose-lg max-w-none">
                    <section className="mb-12">
                        <h2 className="text-2xl font-semibold mb-4 text-primary">우리의 이야기</h2>
                        <p className="text-gray-700 leading-relaxed">
                            Fresh Bowl은 바쁜 현대인들에게 건강하고 신선한 식사를 제공하기 위해 시작되었습니다.
                            매일 아침 엄선된 유기농 재료로 정성껏 준비하는 프리미엄 샐러드로
                            여러분의 하루를 더욱 특별하게 만들어드립니다.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-semibold mb-4 text-primary">우리의 약속</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="p-6 bg-green-50 rounded-lg">
                                <h3 className="font-semibold text-lg mb-2">100% 유기농</h3>
                                <p className="text-gray-600">
                                    인증된 유기농 농장에서 직접 공급받은 신선한 재료만을 사용합니다.
                                </p>
                            </div>
                            <div className="p-6 bg-green-50 rounded-lg">
                                <h3 className="font-semibold text-lg mb-2">영양 균형</h3>
                                <p className="text-gray-600">
                                    전문 영양사가 설계한 균형잡힌 메뉴로 건강한 한 끼를 제공합니다.
                                </p>
                            </div>
                            <div className="p-6 bg-green-50 rounded-lg">
                                <h3 className="font-semibold text-lg mb-2">매일 신선</h3>
                                <p className="text-gray-600">
                                    주문과 동시에 신선하게 준비하여 최상의 맛과 영양을 보장합니다.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-primary">연락처</h2>
                        <div className="space-y-2 text-gray-700">
                            <p><strong>이메일:</strong> hello@fresh-bowl.com</p>
                            <p><strong>전화:</strong> 02-1234-5678</p>
                            <p><strong>주소:</strong> 서울시 강남구 테헤란로 123</p>
                            <p><strong>영업시간:</strong> 평일 10:00 - 20:00</p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
