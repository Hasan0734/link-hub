import AppHeader from "@/components/AppHeader";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Check, Crown, Zap } from "lucide-react";
import DashboardTitle from "@/components/DashboardTitle";

const plans = [
  {
    name: "Free",
    priceMonthly: 0,
    priceYearly: 0,
    maxPages: 1,
    maxLinksPerPage: 10,
    maxShortUrls: 5,
    customDomains: 0,
    analyticsAccess: false,
    features: ["1 Page", "10 Links", "5 Short URLs", "Basic Analytics"],
  },
  {
    name: "Pro",
    priceMonthly: 9,
    priceYearly: 90,
    maxPages: 5,
    maxLinksPerPage: 50,
    maxShortUrls: 100,
    customDomains: 1,
    analyticsAccess: true,
    features: [
      "5 Pages",
      "50 Links per Page",
      "100 Short URLs",
      "1 Custom Domain",
      "Advanced Analytics",
      "Priority Support",
    ],
    popular: true,
  },
  {
    name: "Business",
    priceMonthly: 29,
    priceYearly: 290,
    maxPages: 999,
    maxLinksPerPage: 999,
    maxShortUrls: 999,
    customDomains: 10,
    analyticsAccess: true,
    features: [
      "Unlimited Pages",
      "Unlimited Links",
      "Unlimited Short URLs",
      "10 Custom Domains",
      "Advanced Analytics",
      "Priority Support",
      "API Access",
      "White Label",
    ],
  },
];

const currentPlan = "Free";
const usage = {
  pagesUsed: 1,
  linksUsed: 7,
  shortUrlsUsed: 3,
};

const Subcription = () => {
  return (
    <>
      <AppHeader  />

      <div className="flex flex-1 flex-col relative">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-5 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
            <div className="space-y-8">
              <DashboardTitle
                title="Subscription & Billing"
                details="Manage your plan and usage limits"
              />

              <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Current Plan: {currentPlan}</CardTitle>
                      <CardDescription>
                        Monitor your usage and limits
                      </CardDescription>
                    </div>
                    <Badge className="bg-gradient-to-r from-primary to-accent">
                      Active
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Pages</span>
                        <span className="font-medium">
                          {usage.pagesUsed} / 1
                        </span>
                      </div>
                      <Progress value={(usage.pagesUsed / 1) * 100} />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Links</span>
                        <span className="font-medium">
                          {usage.linksUsed} / 10
                        </span>
                      </div>
                      <Progress value={(usage.linksUsed / 10) * 100} />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          Short URLs
                        </span>
                        <span className="font-medium">
                          {usage.shortUrlsUsed} / 5
                        </span>
                      </div>
                      <Progress value={(usage.shortUrlsUsed / 5) * 100} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div>
                <h2 className="text-2xl font-bold mb-6">Available Plans</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {plans.map((plan) => (
                    <Card
                      key={plan.name}
                      className={`border-primary/20 bg-card/50 backdrop-blur-sm relative ${
                        plan.popular
                          ? "ring-2 ring-primary shadow-lg scale-105"
                          : ""
                      }`}
                    >
                      {plan.popular && (
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                          <Badge className="">
                            <Crown className="h-3 w-3 mr-1" />
                            Most Popular
                          </Badge>
                        </div>
                      )}

                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          {plan.name === "Business" && (
                            <Zap className="h-5 w-5 text-primary" />
                          )}
                          {plan.name}
                        </CardTitle>
                        <div className="mt-4">
                          <span className="text-4xl font-bold">
                            ${plan.priceMonthly}
                          </span>
                          <span className="text-muted-foreground">/month</span>
                        </div>
                        {plan.priceYearly > 0 && (
                          <p className="text-sm text-muted-foreground">
                            or ${plan.priceYearly}/year (save $
                            {plan.priceMonthly * 12 - plan.priceYearly})
                          </p>
                        )}
                      </CardHeader>

                      <CardContent className="space-y-4">
                        <ul className="space-y-3">
                          {plan.features.map((feature) => (
                            <li
                              key={feature}
                              className="flex items-center gap-2 text-sm"
                            >
                              <Check className="h-4 w-4 text-primary shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>

                        <Button
                          className="w-full"
                          variant={
                            currentPlan === plan.name
                              ? "outline"
                              : plan.popular
                              ? "default"
                              : "outline"
                          }
                          disabled={currentPlan === plan.name}
                        >
                          {currentPlan === plan.name
                            ? "Current Plan"
                            : "Upgrade"}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Subcription;
