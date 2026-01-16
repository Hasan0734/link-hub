import AppHeader from "@/components/AppHeader";
import DashboardTitle from "@/components/DashboardTitle";
import ProfileForm from "@/components/forms/ProfileForm";
import { getAuth } from "@/lib/getAuth";
import { getProfileData } from "@/data/getProfile";
import { ProfileDataType } from "@/lib/types";

const ProfilePage = async () => {
  const session = await getAuth();

  if (!session?.user.id) {
    return null;
  }

  const profileData = await getProfileData(
    session.user.id
  );


  return (
    <>
      <AppHeader />
      <div className="flex flex-1 flex-col relative">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-5 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
            <div className="space-y-6 max-w-3xl">
              <DashboardTitle
                title="Profile Settings"
                details="Manage your public profile information"
              />
              <ProfileForm data={profileData} user={session?.user}/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
