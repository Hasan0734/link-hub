import { ArrowLeft, ExternalLink, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

// Mock data - would come from database
const mockPages: Record<string, Record<string, { title: string; description: string; links: { title: string; url: string }[]; createdAt: string }>> = {
  johndoe: {
    "my-projects": {
      title: "My Projects",
      description: "A collection of my best work and side projects",
      links: [
        { title: "Portfolio Website", url: "https://example.com/portfolio" },
        { title: "GitHub Repos", url: "https://github.com/johndoe" },
        { title: "Design Work", url: "https://dribbble.com/johndoe" },
      ],
      createdAt: "2024-01-15",
    },
    "resources": {
      title: "Useful Resources",
      description: "Curated list of resources I find helpful",
      links: [
        { title: "Learning Platform", url: "https://example.com/learn" },
        { title: "Tools I Use", url: "https://example.com/tools" },
      ],
      createdAt: "2024-02-20",
    },
  },
};

const UserPage = () => {
//   const { username, pageSlug } = useParams<{ username: string; pageSlug: string }>();

  const userPages = mockPages["johndoe"] 
  const page = userPages ? userPages["my-projects"] : null;

  if (!page) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center">
          <CardContent className="pt-8 pb-8">
            <h1 className="text-2xl font-bold text-foreground mb-2">Page Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The page "/{"johndoe"}/{"my-pages"}" doesn't exist.
            </p>
            <Button asChild variant="outline">
              <Link href={`/${"johndoe"}`}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to @{"johndoe"}'s profile
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100">
      <div className="container max-w-2xl mx-auto py-8 px-4">
        {/* Back to profile */}
        <Button asChild variant="ghost" className="mb-6">
          <Link href={`/${"johndoe"}`}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            @{"johndoe"}
          </Link>
        </Button>

        {/* Page Header */}
        <Card className="mb-6 border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {page.title}
            </CardTitle>
            <p className="text-muted-foreground">{page.description}</p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
              <Calendar className="w-4 h-4" />
              Created {new Date(page.createdAt).toLocaleDateString()}
            </div>
          </CardHeader>
        </Card>

        {/* Page Links */}
        <div className="space-y-3">
          {page.links.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer group">
                <CardContent className="py-4 px-6 flex items-center justify-between">
                  <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                    {link.title}
                  </span>
                  <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserPage;
