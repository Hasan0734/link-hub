import React, { useState } from "react";
import LinkCard from "./LinkCard";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "../ui/card";

const LinkList = () => {
    
  const [links, setLinks] = useState([
    {
      id: "1",
      title: "Portfolio",
      url: "https://portfolio.com",
      icon: "🎨",
      color: "#3B82F6",
      isActive: true,
      displayOrder: 0,
    },
    {
      id: "2",
      title: "Twitter",
      url: "https://twitter.com",
      icon: "🐦",
      color: "#1DA1F2",
      isActive: true,
      displayOrder: 1,
    },
    {
      id: "3",
      title: "GitHub",
      url: "https://github.com",
      icon: "💻",
      color: "#181717",
      isActive: true,
      displayOrder: 2,
    },
    {
      id: "4",
      title: "LinkedIn",
      url: "https://linkedin.com",
      icon: "💼",
      color: "#0A66C2",
      isActive: true,
      displayOrder: 3,
    },
  ]);

  const handleEdit = (link: any) => {
    // setEditingLink({ ...link });
    // setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setLinks(links.filter((l) => l.id !== id));
  };

  const handleToggle = (id: string) => {
    setLinks(
      links.map((l) => (l.id === id ? { ...l, isActive: !l.isActive } : l))
    );
  };



  return (
    <Card className="border-primary/20 bg-card/50 backdrop-blur-sm shadow-2xl">
      <CardHeader>
        <CardTitle>Your Links ({links.length})</CardTitle>
        <CardDescription>
          Drag to reorder, toggle to activate/deactivate
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {links.map((link) => (
            <LinkCard
              key={link.id}
              title={link.title}
              url={link.url}
              icon={[link.icon]}
              active={link.isActive}
              onEdit={() => handleEdit(link)}
              onDelete={() => handleDelete(link.id)}
              onToggle={() => handleToggle(link.id)}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default LinkList;
