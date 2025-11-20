import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { GripVertical, Pencil, Trash2 } from "lucide-react";

interface LinkCardProps {
  title: string;
  url: string;
  icon: React.ReactNode;
  active: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onToggle: () => void;
}

const LinkCard = ({ title, url, icon, active, onEdit, onDelete, onToggle }: LinkCardProps) => {
  return (
    <Card className="p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="cursor-grab">
          <GripVertical className="w-4 h-4 text-muted-foreground" />
        </Button>
        
        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
          {icon}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold truncate">{title}</h3>
          <p className="text-sm text-muted-foreground truncate">{url}</p>
        </div>

        <div className="flex items-center gap-2">
          <Switch checked={active} onCheckedChange={onToggle} />
          <Button variant="ghost" size="icon" onClick={onEdit}>
            <Pencil className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={onDelete}>
            <Trash2 className="w-4 h-4 text-destructive" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default LinkCard;
