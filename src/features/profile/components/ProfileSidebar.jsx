import React from 'react';
import { Edit } from 'lucide-react';
import { Button, Badge } from '../../../shared/components/ui';
import InitialsAvatar from '../../../shared/components/ui/InitialsAvatar';

export default function ProfileSidebar({
  user,
  sidebarItems,
  activeSidebarTab,
  setActiveSidebarTab,
  onEditClick,
  isOwnProfile = true
}) {
  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Avatar Details Card */}
      <div className="bg-white rounded-3xl border border-neutral-200/50 shadow-sm p-6 text-center relative group hover:shadow-md transition-shadow">
        {/* Profile Image with Pencil Edit button */}
        <div className="relative w-28 h-28 mx-auto mb-4">
          <div className="w-full h-full rounded-full overflow-hidden border-4 border-brand-50 shadow-md">
            <InitialsAvatar
              avatarUrl={user.avatar}
              name={user.name || user.fullName || "User"}
              className="w-full h-full text-2xl group-hover:scale-102 transition-transform duration-300"
            />
          </div>
          
          {/* Pencil Edit overlay icon */}
          {isOwnProfile && (
            <button
              onClick={onEditClick}
              className="absolute -top-1.5 -right-1.5 bg-white hover:bg-neutral-50 text-emerald-800 border border-neutral-200 w-8 h-8 rounded-full flex items-center justify-center shadow-md cursor-pointer hover:scale-105 transition-transform"
              aria-label="Edit Avatar"
            >
              <Edit className="w-3.5 h-3.5 text-emerald-700" />
            </button>
          )}
        </div>

        <h2 className="font-poppins font-bold text-lg md:text-xl text-text-primary mb-0.5 leading-tight">
          {user.name}
        </h2>
        <span className="block text-xs md:text-sm text-text-secondary font-medium mb-4">
          @{user.username}
        </span>
        
        <p className="text-xs md:text-sm text-text-secondary leading-relaxed mb-6 font-medium">
          {user.bio}
        </p>

        {/* Outline edit profile button */}
        {/* <Button
          variant="outline"
          size="md"
          className="w-full font-bold shadow-sm"
          onClick={onEditClick}
        >
          Edit Profile
        </Button> */}
      </div>

      {/* Sidebar Menu Options List (Active tabs switching) */}
      <div className="bg-white rounded-3xl border border-neutral-200/50 shadow-sm p-4 hidden lg:flex flex-col gap-1 text-left">
        {sidebarItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveSidebarTab(item.id)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl font-poppins font-bold text-xs md:text-sm transition-all cursor-pointer ${
              activeSidebarTab === item.id
                ? 'bg-brand-50 text-brand-900 border border-brand-100/50 shadow-sm shadow-brand-900/5'
                : 'text-text-secondary hover:bg-neutral-50 hover:text-brand-900'
            }`}
          >
            <div className="flex items-center gap-3.5">
              <span className={activeSidebarTab === item.id ? 'text-brand-900' : 'text-text-secondary'}>
                {item.icon}
              </span>
              <span>{item.label}</span>
            </div>
            
            {item.badge !== undefined && (
              <Badge
                variant={activeSidebarTab === item.id ? 'brand' : 'neutral'}
                size="sm"
                className="font-extrabold text-[10px] px-2 py-0.5"
              >
                {item.badge}
              </Badge>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
