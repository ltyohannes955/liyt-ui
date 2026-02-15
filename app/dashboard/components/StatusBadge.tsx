import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const statusConfig: Record<string, { label: string; className: string }> = {
    delivered: {
      label: 'Completed',
      className: 'bg-[#E4FF2C] text-[#0a0a0a] hover:bg-[#E4FF2C]/90',
    },
    completed: {
      label: 'Completed',
      className: 'bg-[#E4FF2C] text-[#0a0a0a] hover:bg-[#E4FF2C]/90',
    },
    pending: {
      label: 'Pending',
      className: 'bg-transparent border border-white/30 text-white hover:bg-white/5',
    },
    awaiting_recipient: {
      label: 'Awaiting Confirmation',
      className: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 hover:bg-yellow-500/30',
    },
    accepted: {
      label: 'Accepted',
      className: 'bg-blue-500/20 text-blue-400 border border-blue-500/30 hover:bg-blue-500/30',
    },
    picked_up: {
      label: 'Picked Up',
      className: 'bg-purple-500/20 text-purple-400 border border-purple-500/30 hover:bg-purple-500/30',
    },
    in_transit: {
      label: 'In Transit',
      className: 'bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30',
    },
    cancelled: {
      label: 'Cancelled',
      className: 'bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30',
    },
  };

  const config = statusConfig[status] || {
    label: status,
    className: 'bg-transparent border border-white/30 text-white hover:bg-white/5',
  };

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
