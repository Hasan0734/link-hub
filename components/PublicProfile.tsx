import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Instagram,
  Twitter,
  Globe,
  Youtube,
  Link as LinkIcon,
} from "lucide-react";

const PublicProfile = () => {
  const links = [
    {
      id: 1,
      title: "Instagram",
      url: "https://instagram.com/johndoe",
      icon: Instagram,
    },
    {
      id: 2,
      title: "Twitter",
      url: "https://twitter.com/johndoe",
      icon: Twitter,
    },
    {
      id: 3,
      title: "Personal Website",
      url: "https://johndoe.com",
      icon: Globe,
    },
    {
      id: 4,
      title: "YouTube Channel",
      url: "https://youtube.com/@johndoe",
      icon: Youtube,
    },
  ];

  const socialLinks = [
    { icon: Instagram, url: "#", label: "Instagram" },
    { icon: Twitter, url: "#", label: "Twitter" },
    { icon: Youtube, url: "#", label: "YouTube" },
  ];
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="max-w-2xl mx-auto px-4 py-12 sm:py-20">
        {/* Profile Header */}
        <div className="text-center mb-12 animate-fade-in">
          <Avatar className="w-24 h-24 mx-auto mb-4 ring-4 ring-white shadow-xl">
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <h1 className="text-3xl font-bold mb-2">@johndoe</h1>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            Product Designer & Developer 🎨✨
          </p>

          {/* Social Icons */}
          <div className="flex items-center justify-center gap-3 mt-6">
            {socialLinks.map((social, index) => (
              <Button
                key={index}
                variant="outline"
                size="icon"
                className="rounded-full w-12 h-12 hover:scale-110 transition-transform shadow-md"
                asChild
              >
                <a href={social.url} aria-label={social.label}>
                  <social.icon className="w-5 h-5" />
                </a>
              </Button>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="space-y-4">
          {links.map((link, index) => (
            <Button
              key={link.id}
              variant="outline"
              className="w-full h-auto py-6 rounded-2xl bg-white/80 backdrop-blur-sm hover:bg-white hover:scale-[1.02] transition-all shadow-md hover:shadow-xl text-lg font-semibold"
              asChild
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3"
              >
                <link.icon className="w-6 h-6" />
                {link.title}
              </a>
            </Button>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm"
          >
            <div className="w-6 h-6 bg-primary rounded-lg flex items-center justify-center">
              <LinkIcon className="w-3 h-3 text-primary-foreground" />
            </div>
            <span>Create your own LinkHub</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default PublicProfile;
