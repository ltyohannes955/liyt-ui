import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: 'completed' | 'pending' | 'in-transit';
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const statusConfig = {
    completed: {
      label: 'Completed',
      className: 'bg-[#E4FF2C] text-[#0a0a0a] hover:bg-[#E4FF2C]/90',
    },
    pending: {
      label: 'Pending',
      className: 'bg-transparent border border-white/30 text-white hover:bg-white/5',
    },
    'in-transit': {
      label: 'On the way',
      className: 'bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30',
    },
  };

  const config = statusConfig[status];

  return (
    <Badge
      className={cn(
        'px-3 py-1 text-xs font-medium rounded-full',
        config.className,
        className
      )}
    >
      {config.label}
    </Badge>
  );
}
