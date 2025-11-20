import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Instagram, 
  Twitter, 
  Facebook, 
  Youtube, 
  Linkedin, 
  Github,
  Globe,
  Mail
} from "lucide-react";

interface AddLinkDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (link: { title: string; url: string; icon: string }) => void;
  editLink?: { title: string; url: string; icon: string } | null;
}

const AddLinkDialog = ({ open, onOpenChange, onSave, editLink }: AddLinkDialogProps) => {
  const [title, setTitle] = useState(editLink?.title || "");
  const [url, setUrl] = useState(editLink?.url || "");
  const [selectedIcon, setSelectedIcon] = useState(editLink?.icon || "globe");

  const icons = [
    { name: "globe", icon: Globe },
    { name: "instagram", icon: Instagram },
    { name: "twitter", icon: Twitter },
    { name: "facebook", icon: Facebook },
    { name: "youtube", icon: Youtube },
    { name: "linkedin", icon: Linkedin },
    { name: "github", icon: Github },
    { name: "mail", icon: Mail },
  ];

  const handleSave = () => {
    onSave({ title, url, icon: selectedIcon });
    setTitle("");
    setUrl("");
    setSelectedIcon("globe");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{editLink ? "Edit Link" : "Add New Link"}</DialogTitle>
          <DialogDescription>
            Add a link to your profile. Choose an icon and enter the details below.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="My Website"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="url">URL</Label>
            <Input
              id="url"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Icon</Label>
            <div className="grid grid-cols-4 gap-3">
              {icons.map((iconOption) => {
                const IconComponent = iconOption.icon;
                return (
                  <button
                    key={iconOption.name}
                    type="button"
                    className={`p-4 rounded-xl border-2 transition-all hover:border-primary ${
                      selectedIcon === iconOption.name
                        ? "border-primary bg-primary/10"
                        : "border-border"
                    }`}
                    onClick={() => setSelectedIcon(iconOption.name)}
                  >
                    <IconComponent className="w-6 h-6 mx-auto" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            {editLink ? "Save Changes" : "Add Link"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddLinkDialog;
