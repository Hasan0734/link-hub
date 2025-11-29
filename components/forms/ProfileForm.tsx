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
import { ProfileDataType, UserTypes } from "@/lib/types";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  UserProfileSchema,
  UserProfileSchemaType,
} from "@/features/profiile/profile.schema";
import LabelAndInput from "../LabelAndInput";
import LabelAndTextarea from "../LabelAndTextarea";
import ImageCropDialog from "../ImageCropDialog";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { updateProfile } from "@/features/profiile/profile.actions";
import { toast } from "sonner";

interface PropsType {
  data: ProfileDataType | undefined;
  user: UserTypes | undefined;
}

const ProfileForm = ({ data, user }: PropsType) => {
  const { name, username, bio, avatarUrl } = data || {};
  const [profile, setProfile] = useState<File | undefined>(undefined);
  const [openDialog, setOpenDialog] = useState(false);
  const [croppedImage, setCroppedImage] = useState<string | undefined>(
    undefined
  );

  console.log(data);

  const form = useForm({
    resolver: zodResolver(UserProfileSchema),
    defaultValues: {
      name: name ? name : user?.name || undefined,
      username: username || undefined,
      bio: bio || undefined,
      avatarUrl: avatarUrl || undefined,
    },
  });


  async function onSubmit(data: UserProfileSchemaType) {
    // await authClient.updateUser({ name: data.name });
    const result = await updateProfile({ ...data, image: profile });

    if (result.success) {
      toast.success(result.message);
      return;
    } else {
      toast.error(result.message);
    }
  }

  const handlReset = () => {};

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
                    croppedImage ? croppedImage : data?.avatarUrl || undefined
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
                    Upload Photo
                  </Label>
                  {profile && (
                    <ImageCropDialog
                      handleReset={handlReset}
                      setCroppedImage={setCroppedImage}
                      open={openDialog}
                      setOpen={setOpenDialog}
                      selectedFile={profile}
                    />
                  )}
                  <Input
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      if (file) {
                        setProfile(file);
                        setCroppedImage(undefined);
                        const url = URL.createObjectURL(file);
                        setOpenDialog(true);
                      }
                    }}
                    className="mt-3 sr-only"
                    type="file"
                    name="avatarUrl"
                    id="avatarUrl"
                    // accept="image/png, image/jpeg, image/gif"
                    accept="image/*"
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  JPG, PNG or GIF. Max 2MB.
                </p>
              </div>
            </div>

            <LabelAndInput
              title="Display name"
              form={form}
              name="name"
              placeholder="John Doe"
            />
            <LabelAndInput
              title="Username"
              form={form}
              name="username"
              placeholder="johndoe"
              description={`Your profile URL: linkhub.app/${
                form.watch().username ? form.watch().username : ""
              }`}
            />

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
                className="max-h-[400px] min-h-36"
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
