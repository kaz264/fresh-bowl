export default function TermsPage() {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto prose prose-lg">
                <h1 className="text-4xl font-bold mb-6">이용약관</h1>

                <p className="text-gray-600 mb-8">
                    최종 업데이트: 2026년 2월 6일
                </p>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">제1조 (목적)</h2>
                    <p className="text-gray-700 leading-relaxed">
                        이 약관은 Fresh Bowl(이하 "회사")이 제공하는 온라인 샐러드 주문 및 배송 서비스(이하 "서비스")의 이용과 관련하여 회사와 이용자 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">제2조 (정의)</h2>
                    <ol className="list-decimal pl-6 space-y-2 text-gray-700">
                        <li>"서비스"란 회사가 제공하는 온라인 샐러드 주문 및 배송 서비스를 말합니다.</li>
                        <li>"이용자"란 이 약관에 따라 회사가 제공하는 서비스를 받는 회원 및 비회원을 말합니다.</li>
                        <li>"회원"이란 회사와 서비스 이용계약을 체결한 자를 말합니다.</li>
                    </ol>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">제3조 (약관의 게시 및 변경)</h2>
                    <ol className="list-decimal pl-6 space-y-2 text-gray-700">
                        <li>회사는 이 약관의 내용을 이용자가 쉽게 알 수 있도록 서비스 초기화면에 게시합니다.</li>
                        <li>회사는 필요한 경우 관련 법령을 위배하지 않는 범위에서 이 약관을 변경할 수 있습니다.</li>
                        <li>약관이 변경되는 경우 회사는 변경사항을 시행일자 15일 전부터 공지합니다.</li>
                    </ol>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">제4조 (서비스의 제공 및 변경)</h2>
                    <ol className="list-decimal pl-6 space-y-2 text-gray-700">
                        <li>회사는 다음과 같은 업무를 수행합니다:
                            <ul className="list-disc pl-6 mt-2 space-y-1">
                                <li>샐러드 및 관련 상품의 판매</li>
                                <li>주문 및 결제 처리</li>
                                <li>배송 서비스</li>
                                <li>기타 회사가 정하는 업무</li>
                            </ul>
                        </li>
                        <li>회사는 상품의 품절 또는 기술적 사양의 변경 등의 경우 제공할 서비스의 내용을 변경할 수 있습니다.</li>
                    </ol>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">제5조 (주문 및 결제)</h2>
                    <ol className="list-decimal pl-6 space-y-2 text-gray-700">
                        <li>이용자는 회사가 정한 절차에 따라 상품을 주문합니다.</li>
                        <li>결제는 신용카드, 계좌이체 등 회사가 제공하는 방법으로 이루어집니다.</li>
                        <li>주문 완료 후에는 취소 및 변경이 제한될 수 있습니다.</li>
                    </ol>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">제6조 (배송)</h2>
                    <ol className="list-decimal pl-6 space-y-2 text-gray-700">
                        <li>회사는 주문 후 평균 30-40분 내에 배송을 완료합니다.</li>
                        <li>배송 지역 및 시간대에 따라 배송 시간이 달라질 수 있습니다.</li>
                        <li>천재지변 등 불가항력적 사유로 배송이 지연될 경우 이용자에게 통지합니다.</li>
                    </ol>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">제7조 (취소 및 환불)</h2>
                    <ol className="list-decimal pl-6 space-y-2 text-gray-700">
                        <li>조리 시작 전까지는 무료 취소가 가능합니다.</li>
                        <li>상품에 하자가 있는 경우 환불 또는 교환이 가능합니다.</li>
                        <li>단순 변심에 의한 취소는 조리 시작 후  불가능합니다.</li>
                    </ol>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">제8조 (개인정보보호)</h2>
                    <p className="text-gray-700 leading-relaxed">
                        회사는 이용자의 개인정보를 보호하기 위해 관련 법령을 준수하며, 자세한 사항은 개인정보처리방침을 참조하시기 바랍니다.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">제9조 (책임의 한계)</h2>
                    <ol className="list-decimal pl-6 space-y-2 text-gray-700">
                        <li>회사는 천재지변 또는 이에 준하는 불가항력으로 인해 서비스를 제공할 수 없는 경우 책임이 면제됩니다.</li>
                        <li>회사는 이용자의 귀책사유로 인한 서비스 이용 장애에 대해 책임을 지지 않습니다.</li>
                    </ol>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">제10조 (분쟁 해결)</h2>
                    <p className="text-gray-700 leading-relaxed">
                        이 약관과 관련하여 발생한 분쟁에 대해서는 대한민국 법을 준거법으로 하며, 소송이 필요한 경우 회사의 본점 소재지를 관할하는 법원을 전속 관할 법원으로 합니다.
                    </p>
                </section>

                <div className="mt-12 p-6 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">
                        <strong>시행일:</strong> 2026년 2월 6일<br />
                        <strong>문의:</strong> hello@fresh-bowl.com
                    </p>
                </div>
            </div>
        </div>
    );
}
