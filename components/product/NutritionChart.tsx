'use client';

import { NutritionInfo } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface NutritionChartProps {
    nutrition: NutritionInfo;
}

export function NutritionChart({ nutrition }: NutritionChartProps) {
    const items = [
        { label: '칼로리', value: nutrition.calories, unit: 'kcal', color: 'bg-red-400', max: 500 },
        { label: '탄수화물', value: nutrition.carbs, unit: 'g', color: 'bg-yellow-400', max: 50 },
        { label: '단백질', value: nutrition.protein, unit: 'g', color: 'bg-blue-400', max: 40 },
        { label: '지방', value: nutrition.fat, unit: 'g', color: 'bg-green-400', max: 30 },
    ];

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">영양 성분</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {items.map((item) => (
                    <div key={item.label} className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="font-medium">{item.label}</span>
                            <span className="text-muted-foreground">
                                {item.value}{item.unit}
                            </span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                                className={`h-full ${item.color} transition-all duration-500 rounded-full`}
                                style={{ width: `${Math.min((item.value / item.max) * 100, 100)}%` }}
                            />
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
