import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: LucideIcon;
  className?: string;
}

export function StatsCard({ title, value, change, icon: Icon, className }: StatsCardProps) {
  const isPositive = change && change > 0;
  const isNegative = change && change < 0;

  return (
    <Card className={cn('bg-[#141414] border-white/10', className)}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#E4FF2C]/10 rounded-lg">
              <Icon className="w-5 h-5 text-[#E4FF2C]" />
            </div>
          </div>
          {change !== undefined && (
            <div
              className={cn(
                'flex items-center gap-1 px-2 py-1 rounded text-xs font-medium',
                isPositive && 'bg-green-500/20 text-green-400',
                isNegative && 'bg-red-500/20 text-red-400',
                !isPositive && !isNegative && 'bg-gray-500/20 text-gray-400'
              )}
            >
              {isPositive && <TrendingUp className="w-3 h-3" />}
              {isNegative && <TrendingDown className="w-3 h-3" />}
              {change > 0 ? '+' : ''}{change}%
            </div>
          )}
        </div>
        <div className="mt-4">
          <p className="text-white/50 text-sm">{title}</p>
          <p className="text-2xl font-bold text-white mt-1">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}
