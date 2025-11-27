import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, MousePointerClick, TrendingUp, Calendar } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import DashboardTitle from "@/components/DashboardTitle";

const stats = [
  {
    title: "Total Views",
    value: "12,345",
    change: "+12.3%",
    icon: Eye,
    trend: "up",
  },
  {
    title: "Total Clicks",
    value: "8,234",
    change: "+8.1%",
    icon: MousePointerClick,
    trend: "up",
  },
  {
    title: "Last 7 Days",
    value: "1,543",
    change: "+23.5%",
    icon: Calendar,
    trend: "up",
  },
  {
    title: "Click Rate",
    value: "66.7%",
    change: "+5.2%",
    icon: TrendingUp,
    trend: "up",
  },
];
const Dashboard = () => {
  return (
    <>
      <AppHeader />
      <div className="flex flex-1 flex-col relative">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <DashboardTitle title="Dashboard" details="Welcome back, John!" />
              <Button>
                <Eye className="w-4 h-4 mr-2" />
                Preview Page
              </Button>
            </div>

            <div className=" grid grid-cols-1 gap-4 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
              {stats.map((stat) => (
                <Card
                  key={stat.title}
                  className="shadow-md hover:shadow-lg transition-shadow"
                >
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </CardTitle>
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <stat.icon className="w-5 h-5 text-primary" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{stat.value}</div>
                    <p className="text-sm text-green-600 font-medium mt-1">
                      {stat.change} from last month
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-4 @xl/main:grid-cols-2 ">
              <Card className="shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>Analytics Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80 bg-muted/30 rounded-xl flex items-center justify-center">
                    <div className="text-center space-y-2">
                      <TrendingUp className="w-12 h-12 mx-auto text-muted-foreground" />
                      <p className="text-muted-foreground">
                        Chart visualization goes here
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Connect your analytics to see detailed insights
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        action: "Link clicked",
                        link: "Instagram",
                        time: "2 minutes ago",
                      },
                      {
                        action: "Profile viewed",
                        link: "Public Page",
                        time: "5 minutes ago",
                      },
                      {
                        action: "Link clicked",
                        link: "Twitter",
                        time: "12 minutes ago",
                      },
                      {
                        action: "Profile viewed",
                        link: "Public Page",
                        time: "1 hour ago",
                      },
                    ].map((activity, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between py-3 border-b last:border-0"
                      >
                        <div>
                          <p className="font-medium">{activity.action}</p>
                          <p className="text-sm text-muted-foreground">
                            {activity.link}
                          </p>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {activity.time}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
