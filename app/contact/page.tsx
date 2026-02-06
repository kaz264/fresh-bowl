'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, MapPin } from 'lucide-react';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Implement contact form submission
        alert('문의가 접수되었습니다. 빠른 시일 내에 답변드리겠습니다.');
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-4xl font-bold mb-4">문의하기</h1>
                <p className="text-gray-600 mb-8">
                    궁금하신 사항이 있으시면 언제든지 연락주세요. 최대한 빠르게 답변드리겠습니다.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6 mb-12">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2">
                            이름
                        </label>
                        <Input
                            id="name"
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                            이메일
                        </label>
                        <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="subject" className="block text-sm font-medium mb-2">
                            제목
                        </label>
                        <Input
                            id="subject"
                            type="text"
                            value={formData.subject}
                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="message" className="block text-sm font-medium mb-2">
                            메시지
                        </label>
                        <Textarea
                            id="message"
                            rows={6}
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            required
                        />
                    </div>

                    <Button type="submit" className="w-full">
                        문의 보내기
                    </Button>
                </form>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-6 bg-green-50 rounded-lg">
                        <Mail className="h-6 w-6 text-primary mb-2" />
                        <h3 className="font-semibold mb-1">이메일</h3>
                        <a href="mailto:contact@farm360.ai" className="text-gray-600 hover:text-primary">
                            contact@farm360.ai
                        </a>
                    </div>

                    <div className="p-6 bg-blue-50 rounded-lg">
                        <MapPin className="h-6 w-6 text-primary mb-2" />
                        <h3 className="font-semibold mb-1">주소</h3>
                        <p className="text-gray-600">
                            경기도 성남시 분당구<br />
                            판교역로 136 B2073호
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
