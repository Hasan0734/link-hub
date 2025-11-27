import AppHeader from "@/components/AppHeader";
import DashboardTitle from "@/components/DashboardTitle";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart3,
  TrendingUp,
  Users,
  MousePointerClick,
  Plus,
} from "lucide-react";

const AnalyticsPage = () => {
  const pageVisits = [
    { date: "2024-01-01", visits: 45 },
    { date: "2024-01-02", visits: 52 },
    { date: "2024-01-03", visits: 61 },
    { date: "2024-01-04", visits: 48 },
    { date: "2024-01-05", visits: 73 },
    { date: "2024-01-06", visits: 89 },
    { date: "2024-01-07", visits: 102 },
  ];

  const topLinks = [
    { title: "Portfolio", clicks: 234, url: "https://portfolio.com" },
    { title: "Twitter", clicks: 189, url: "https://twitter.com" },
    { title: "GitHub", clicks: 156, url: "https://github.com" },
    { title: "LinkedIn", clicks: 143, url: "https://linkedin.com" },
  ];
  return (
    <>
      <AppHeader />
      <div className="flex flex-1 flex-col relative">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-5 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
            <div className="space-y-6">
              <DashboardTitle
                title="Analytics"
                details="Track your profile performance and engagement"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    title: "Total Visits",
                    value: "1,248",
                    change: "+12.5%",
                    icon: Users,
                    color: "from-primary to-accent",
                  },
                  {
                    title: "Total Clicks",
                    value: "892",
                    change: "+8.3%",
                    icon: MousePointerClick,
                    color: "from-accent to-primary",
                  },
                  {
                    title: "Avg. Click Rate",
                    value: "71.5%",
                    change: "+3.2%",
                    icon: TrendingUp,
                    color: "from-primary to-secondary",
                  },
                  {
                    title: "Active Links",
                    value: "24",
                    change: "+2",
                    icon: BarChart3,
                    color: "from-secondary to-accent",
                  },
                ].map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <Card
                      key={stat.title}
                      className="border-primary/20 bg-card/50 backdrop-blur-sm relative overflow-hidden"
                    >
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5`}
                      />
                      <CardHeader className="relative">
                        <div className="flex items-center justify-between">
                          <CardDescription>{stat.title}</CardDescription>
                          <Icon className="h-4 w-4 text-primary" />
                        </div>
                        <CardTitle className="text-3xl font-bold">
                          {stat.value}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="relative">
                        <p className="text-sm text-muted-foreground">
                          {stat.change} from last month
                        </p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              <Tabs defaultValue="visits" className="space-y-6">
                <TabsList>
                  <TabsTrigger value="visits">Page Visits</TabsTrigger>
                  <TabsTrigger value="clicks">Link Clicks</TabsTrigger>
                  <TabsTrigger value="top">Top Performers</TabsTrigger>
                </TabsList>

                <TabsContent value="visits" className="space-y-6">
                  <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle>Page Visits Over Time</CardTitle>
                      <CardDescription>Last 7 days</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 flex items-end gap-4">
                        {pageVisits.map((day, i) => (
                          <div
                            key={i}
                            className="flex-1 flex flex-col items-center gap-2"
                          >
                            <div
                              className="w-full bg-gradient-to-t from-primary to-accent rounded-t-lg transition-all duration-300 hover:opacity-80"
                              style={{ height: `${(day.visits / 102) * 100}%` }}
                            />
                            <span className="text-xs text-muted-foreground">
                              {new Date(day.date).toLocaleDateString("en-US", {
                                weekday: "short",
                              })}
                            </span>
                            <span className="text-sm font-medium">
                              {day.visits}
                            </span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="clicks" className="space-y-6">
                  <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle>Link Click Distribution</CardTitle>
                      <CardDescription>Total clicks per link</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {topLinks.map((link, i) => (
                          <div key={i} className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="font-medium">{link.title}</span>
                              <span className="text-muted-foreground">
                                {link.clicks} clicks
                              </span>
                            </div>
                            <div className="h-2 bg-accent/20 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500"
                                style={{
                                  width: `${(link.clicks / 234) * 100}%`,
                                }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="top" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle>Top Performing Links</CardTitle>
                        <CardDescription>
                          Most clicked links this month
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {topLinks.map((link, i) => (
                            <div
                              key={i}
                              className="flex items-center justify-between p-3 rounded-lg bg-accent/20"
                            >
                              <div>
                                <p className="font-medium">{link.title}</p>
                                <p className="text-sm text-muted-foreground">
                                  {link.url}
                                </p>
                              </div>
                              <span className="text-2xl font-bold text-primary">
                                {link.clicks}
                              </span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle>Recent Visitors</CardTitle>
                        <CardDescription>Latest profile visits</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {[1, 2, 3, 4, 5].map((i) => (
                            <div
                              key={i}
                              className="flex items-center justify-between p-3 rounded-lg bg-accent/20"
                            >
                              <div>
                                <p className="text-sm font-medium">
                                  192.168.1.{i}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  Chrome on Windows
                                </p>
                              </div>
                              <span className="text-xs text-muted-foreground">
                                {i}h ago
                              </span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AnalyticsPage;
