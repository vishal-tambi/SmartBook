
import Navbar from "@/components/Navbar";
import UserProfileCard from "@/components/UserProfileCard";

const UserProfile = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-24 pb-12 px-4">
        <UserProfileCard />
      </div>
    </div>
  );
};

export default UserProfile;
