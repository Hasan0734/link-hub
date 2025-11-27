"use client";

import React, { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Save, Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import AppHeader from "@/components/AppHeader";

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    username: "johndoe",
    name: "John Doe",
    bio: "Product designer & developer passionate about creating beautiful digital experiences.",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock save
    alert("Profile updated successfully!");
  };
  return (
    <>
    <AppHeader title="Profile"/>
    <div className="flex flex-1 flex-col relative">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-5 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
          <div className="space-y-6 max-w-3xl">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Profile Settings
              </h1>
              <p className="text-muted-foreground mt-2">
                Manage your public profile information
              </p>
            </div>

            <form>
              <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    This information will be displayed on your public profile
                    page
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-6">
                    <Avatar className="h-24 w-24 ring-4 ring-primary/20">
                      <AvatarImage src={profile.avatarUrl} />
                      <AvatarFallback>{profile.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <Button type="button" variant="outline" size="sm">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Photo
                      </Button>
                      <p className="text-sm text-muted-foreground mt-2">
                        JPG, PNG or GIF. Max 2MB.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        value={profile.username}
                        onChange={(e) =>
                          setProfile({ ...profile, username: e.target.value })
                        }
                        placeholder="johndoe"
                      />
                      <p className="text-sm text-muted-foreground">
                        Your profile URL: linkhub.app/{profile.username}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="name">Display Name</Label>
                      <Input
                        id="name"
                        value={profile.name}
                        onChange={(e) =>
                          setProfile({ ...profile, name: e.target.value })
                        }
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={profile.bio}
                      onChange={(e) =>
                        setProfile({ ...profile, bio: e.target.value })
                      }
                      placeholder="Tell your visitors about yourself..."
                      rows={4}
                    />
                    <p className="text-sm text-muted-foreground">
                      {profile.bio.length}/200 characters
                    </p>
                  </div>

                  <Button type="submit" className="w-full md:w-auto">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </CardContent>
              </Card>
            </form>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ProfilePage;
