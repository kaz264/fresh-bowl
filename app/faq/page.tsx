import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQPage() {
    const faqs = [
        {
            question: "배송은 얼마나 걸리나요?",
            answer: "주문 후 평균 30-40분 내에 배송됩니다. 지역에 따라 시간이 다소 차이가 있을 수 있습니다."
        },
        {
            question: "샐러드는 어떻게 보관하나요?",
            answer: "수령 후 즉시 드시는 것을 권장합니다. 보관이 필요한 경우 냉장 보관하시고 당일 내 드시는 것이 가장 맛있습니다."
        },
        {
            question: "배송비는 얼마인가요?",
            answer: "30,000원 이상 주문 시 무료배송입니다. 그 이하는 3,000원의 배송비가 부과됩니다."
        },
        {
            question: "알레르기가 있는데 주문할 수 있나요?",
            answer: "각 상품 페이지에 상세한 재료 정보가 표시되어 있습니다. 특정 재료에 알레르기가 있으시면 주문 전 확인 부탁드립니다."
        },
        {
            question: "취소 및 환불은 어떻게 하나요?",
            answer: "조리 시작 전까지는 무료 취소가 가능합니다. 조리 시작 후에는 취소가 어려우니 양해 부탁드립니다."
        },
        {
            question: "드레싱은 따로 주문할 수 있나요?",
            answer: "네, 각 샐러드마다 기본 드레싱이 포함되어 있으며, 추가 드레싱은 개당 1,000원에 주문 가능합니다."
        },
        {
            question: "단체 주문이 가능한가요?",
            answer: "10개 이상 단체 주문 시 할인 혜택이 있습니다. 문의하기를 통해 연락 주시면 상담해드리겠습니다."
        },
        {
            question: "영양 성분 정보를 확인할 수 있나요?",
            answer: "모든 상품의 상세 페이지에서 칼로리, 단백질, 탄수화물, 지방 등의 영양 성분 정보를 확인하실 수 있습니다."
        }
    ];

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold mb-4">자주 묻는 질문</h1>
                <p className="text-gray-600 mb-8">
                    Fresh Bowl에 대해 자주 묻는 질문들을 모았습니다.
                    찾으시는 답변이 없다면 문의하기를 통해 연락 주세요.
                </p>

                <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger className="text-left">
                                {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-gray-600">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>

                <div className="mt-12 p-6 bg-green-50 rounded-lg">
                    <h2 className="font-semibold text-lg mb-2">더 궁금하신 점이 있으신가요?</h2>
                    <p className="text-gray-600 mb-4">
                        위 질문 외에 궁금하신 점이 있으시면 언제든지 문의해주세요.
                    </p>
                    <a
                        href="/contact"
                        className="inline-block px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                    >
                        문의하기
                    </a>
                </div>
            </div>
        </div>
    );
}
