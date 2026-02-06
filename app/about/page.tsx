export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-bold mb-4">Fresh Bowl</h1>
                    <p className="text-xl text-gray-600">AI 기반 지능형 수직 농업 × 프리미엄 샐러드</p>
                </div>

                <div className="prose prose-lg max-w-none">
                    <section className="mb-12 bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-xl">
                        <h2 className="text-2xl font-semibold mb-4 text-green-700">우리의 미션</h2>
                        <p className="text-gray-700 leading-relaxed text-lg">
                            Fresh Bowl은 <strong>신선함과 건강함</strong>을 최우선으로 생각하며
                            지속 가능한 식량 생산을 실현합니다. Fresh Bowl은 우리 농장에서 직접 재배한
                            가장 맛있는 프리미엄 샐러드를 제공하는 브랜드입니다.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-semibold mb-6 text-primary">Fresh Bowl 이야기</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="p-6 bg-white border-2 border-green-100 rounded-lg shadow-sm">
                                <div className="text-3xl font-bold text-green-600 mb-2">2~4배</div>
                                <h3 className="font-semibold text-lg mb-2">높은 수확률</h3>
                                <p className="text-gray-600">
                                    기존 수직농장 대비 최대 4배 높은 수확률로 생산성을 극대화합니다.
                                </p>
                            </div>

                            <div className="p-6 bg-white border-2 border-blue-100 rounded-lg shadow-sm">
                                <div className="text-3xl font-bold text-blue-600 mb-2">AI</div>
                                <h3 className="font-semibold text-lg mb-2">자동화 플랫폼</h3>
                                <p className="text-gray-600">
                                    지능형 수직 농업 시스템으로 일관된 고품질 생산이 가능합니다.
                                </p>
                            </div>

                            <div className="p-6 bg-white border-2 border-green-100 rounded-lg shadow-sm">
                                <div className="text-3xl mb-2">🌱</div>
                                <h3 className="font-semibold text-lg mb-2">무농약 재배</h3>
                                <p className="text-gray-600">
                                    실내 수경재배로 농약 없이 신선하고 안전한 먹거리를 생산합니다.
                                </p>
                            </div>

                            <div className="p-6 bg-white border-2 border-blue-100 rounded-lg shadow-sm">
                                <div className="text-3xl mb-2">💧</div>
                                <h3 className="font-semibold text-lg mb-2">에너지 효율화</h3>
                                <p className="text-gray-600">
                                    혁신 신소재와 AI를 통한 에너지 절감 및 시설 비용 효율화를 달성합니다.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-semibold mb-4 text-primary">우리가 해결하는 문제</h2>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <span className="text-red-500 font-bold text-xl">×</span>
                                <div>
                                    <strong>기후 변화</strong> - 실내 농업으로 기후 영향 최소화
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="text-red-500 font-bold text-xl">×</span>
                                <div>
                                    <strong>물 부족</strong> - 수경재배로 물 사용량 90% 절감
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="text-red-500 font-bold text-xl">×</span>
                                <div>
                                    <strong>경작지 부족</strong> - 수직 농법으로 공간 효율 극대화
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="text-red-500 font-bold text-xl">×</span>
                                <div>
                                    <strong>농약 사용</strong> - 통제된 환경에서 무농약 재배
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="mb-12 bg-blue-50 p-6 rounded-lg">
                        <h2 className="text-2xl font-semibold mb-4 text-blue-700">우리의 비전</h2>
                        <ul className="space-y-2 text-gray-700">
                            <li>✓ 탄소 중립 실현</li>
                            <li>✓ 식량 안보 강화</li>
                            <li>✓ 농업 공익 기능 강화</li>
                            <li>✓ 지속 가능한 미래 농업 산업화</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-primary">연락처</h2>
                        <div className="space-y-2 text-gray-700">
                            <p><strong>회사명:</strong> Fresh Bowl</p>
                            <p><strong>이메일:</strong> hello@freshbowl.ai</p>
                            <p><strong>주소:</strong> 경기도 성남시 분당구 판교역로 136 B2073호</p>
                            <p><strong>웹사이트:</strong> <a href="https://www.freshbowl.ai/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">www.freshbowl.ai</a></p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
