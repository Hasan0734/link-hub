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
import { ProfileDataType } from "@/lib/types";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  UserProfileSchema,
  UserProfileSchemaType,
} from "@/features/profiile/profile.schema";
import LabelAndInput from "../LabelAndInput";
import LabelAndTextarea from "../LabelAndTextarea";

const ProfileForm = ({ data }: { data: ProfileDataType | undefined }) => {
  const { name, username, bio, avatarUrl } = data || {};
  const [profile, setProfile] = useState<File | null>(null);
  const [generatedUrl, setGeneratedUrl] = useState("");

  const form = useForm({
    resolver: zodResolver(UserProfileSchema),
    defaultValues: {
      name: name || undefined,
      username: username || undefined,
      bio: bio || undefined,
      avatarUrl: avatarUrl || undefined,
    },
  });

  async function onSubmit(data: UserProfileSchemaType) {
    console.log(data);
  }

  console.log(profile);

  return (
    <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
        <CardDescription>
          This information will be displayed on your public profile page
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex items-center gap-6">
              <Avatar className="h-24 w-24 ring-4 ring-primary/20">
                <AvatarImage
                  src={
                    generatedUrl ? generatedUrl : data?.avatarUrl || undefined
                  }
                />
                <AvatarFallback>{data?.name?.[0] ?? "?"}</AvatarFallback>
              </Avatar>
              <div>
                <div className="relative">
                  <Label
                    htmlFor="avatarUrl"
                    className="border border-input px-2 py-2 rounded-md bg-input/50 hover:bg-input cursor-pointer transition-all duration-200"
                  >
                    <Upload className="h-4 w-4 mr-1" />
                    {profile?.name
                      ? `$${profile.name.slice(0, 16)}...`
                      : "Upload Photo"}
                  </Label>
                  <Input
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      setProfile(file);
                      if (file) {
                        const url = URL.createObjectURL(file);
                        setGeneratedUrl(url);
                      }
                    }}
                    className="mt-3 sr-only"
                    type="file"
                    name="avatarUrl"
                    id="avatarUrl"
                    accept="image/png, image/jpeg, image/gif"
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  JPG, PNG or GIF. Max 2MB.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <LabelAndInput
                title="Name"
                form={form}
                name="name"
                placeholder="John Doe"
              />
              <LabelAndInput
                title="Username"
                form={form}
                name="username"
                placeholder="johndoe"
              />
            </div>

            <div>
              <LabelAndTextarea
                rows={4}
                title="Bio"
                form={form}
                name="bio"
                placeholder="Tell your visitors about yourself..."
                description={`${
                  (form.watch().bio || "").length
                }/200 characters`}
                maxLength={200}
                className="max-h-[400px]"
              />

              {(form.watch().bio || "").length > 200 && (
                <p className="text-xs text-red-500 mt-2">
                  You have reched your bio charcter limst. If you want to
                  continue you need get subscriptions.
                </p>
              )}
            </div>

            <Button type="submit" className="w-full md:w-auto">
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ProfileForm;
