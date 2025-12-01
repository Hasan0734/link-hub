import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Trash2 } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import DashboardTitle from "@/components/DashboardTitle";
import AccountInformation from "@/components/forms/AccountInformation";
import { redirect } from "next/navigation";
import { getAuth } from "@/lib/getAuth";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import PasswordForm from "@/components/forms/PasswordForm";

const Settings = async () => {
  const session = await getAuth();

  if (!session) {
    redirect("/login");
  }

  console.log(session)

  return (
    <>
      <AppHeader />

      <div className="flex flex-1 flex-col relative">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
            <div className="space-y-6 max-w-3xl">
              <DashboardTitle
                title="Settings"
                details="Manage your account preferences"
              />

              <AccountInformation user={session.user} />

              <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Notifications</CardTitle>
                  <CardDescription>
                    Manage your notification preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive email updates about your account
                      </p>
                    </div>
                    <Switch
                    // checked={settings.emailNotifications}
                    // onCheckedChange={(checked: boolean) =>
                    //   setSettings({
                    //     ...settings,
                    //     emailNotifications: checked,
                    //   })
                    // }
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Marketing Emails</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive emails about new features and updates
                      </p>
                    </div>
                    <Switch
                    // checked={settings.marketingEmails}
                    // onCheckedChange={(checked) =>
                    //   setSettings({ ...settings, marketingEmails: checked })
                    // }
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Security</CardTitle>
                  <CardDescription>
                    Manage your account security settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <Switch
                    // checked={settings.twoFactorAuth}
                    // onCheckedChange={(checked) =>
                    //   setSettings({ ...settings, twoFactorAuth: checked })
                    // }
                    />
                  </div>

                  <Separator />

                  <PasswordForm />
                </CardContent>
              </Card>

              <Card className="border-destructive/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-destructive">
                    Danger Zone
                  </CardTitle>
                  <CardDescription>
                    Irreversible actions for your account
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-destructive/20 rounded-lg">
                    <div>
                      <p className="font-medium">Delete Account</p>
                      <p className="text-sm text-muted-foreground">
                        Permanently delete your account and all data
                      </p>
                    </div>
                    <Button variant="destructive">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
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

export default Settings;
