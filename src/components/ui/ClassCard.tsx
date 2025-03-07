
import { formatShortDate, isToday, isTomorrow } from '@/utils/data';
import { CalendarDays, Users, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ClassCardProps {
  id: number;
  name: string;
  description: string;
  intensity: string;
  instructor: {
    id: number;
    name: string;
    photo: string;
  };
  maxCapacity: number;
  date: Date;
  attendees: number;
}

const ClassCard = ({
  name,
  description,
  intensity,
  instructor,
  maxCapacity,
  date,
  attendees,
}: ClassCardProps) => {
  // Determine badge color based on intensity
  const getBadgeClass = () => {
    switch (intensity) {
      case 'Baja':
        return 'badge-low';
      case 'Media':
        return 'badge-medium';
      case 'Fuerte':
        return 'badge-high';
      default:
        return 'badge-medium';
    }
  };
  
  // Determine date badge text
  const getDateBadge = () => {
    if (isToday(date)) {
      return 'Hoy';
    }
    if (isTomorrow(date)) {
      return 'Mañana';
    }
    return '';
  };
  
  // Calculate capacity percentage
  const capacityPercentage = (attendees / maxCapacity) * 100;
  
  // Determine capacity status color
  const getCapacityStatusClass = () => {
    if (capacityPercentage >= 90) {
      return 'status-danger';
    }
    if (capacityPercentage >= 70) {
      return 'status-warning';
    }
    return 'status-success';
  };

  return (
    <div className="bg-white rounded-lg border border-border shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden relative">
      {/* Date indicator */}
      {getDateBadge() && (
        <div className="absolute top-3 right-3 bg-accent text-accent-foreground text-xs px-2 py-0.5 rounded-full font-medium">
          {getDateBadge()}
        </div>
      )}
      
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <span className={cn("inline-block mb-2", getBadgeClass())}>
              {intensity}
            </span>
            <h3 className="text-lg font-medium">{name}</h3>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{description}</p>
          </div>
        </div>
        
        <div className="mt-4 space-y-3">
          {/* Instructor */}
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full overflow-hidden bg-muted">
              <img 
                src={instructor.photo} 
                alt={instructor.name}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <div>
              <p className="text-sm font-medium">{instructor.name}</p>
              <p className="text-xs text-muted-foreground">Instructor</p>
            </div>
          </div>
          
          {/* Date and Time */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CalendarDays size={16} />
            <span>{formatShortDate(date)}</span>
          </div>
          
          {/* Attendees */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users size={16} />
              <span className={getCapacityStatusClass()}>
                {attendees}/{maxCapacity}
              </span>
            </div>
            
            {/* Duration indicator */}
            <div className="flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
              <Clock size={12} />
              <span>60 min</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Action buttons */}
      <div className="border-t border-border grid grid-cols-2 divide-x divide-border">
        <button className="py-2 text-sm text-accent-foreground font-medium hover:bg-muted/50 transition-colors">
          Editar
        </button>
        <button className="py-2 text-sm text-destructive font-medium hover:bg-muted/50 transition-colors">
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default ClassCard;
