import React, { useState } from 'react';
import { UserPlus, UserCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../../../shared/components/ui';
import { profileService } from '../services/profileService';
import InitialsAvatar from '../../../shared/components/ui/InitialsAvatar';

export default function WhoToFollow({ initialUsers }) {
  const [users, setUsers] = useState(initialUsers);

  // Handle follow state toggle dynamically
  const handleFollowToggle = async (userId, isCurrentlyFollowing) => {
    try {
      if (isCurrentlyFollowing) {
        await profileService.unfollowUser(userId);
      } else {
        await profileService.followUser(userId);
      }
      setUsers(prevUsers => 
        prevUsers.map(user => {
          if (user.id === userId) {
            return {
              ...user,
              isFollowing: !user.isFollowing
            };
          }
          return user;
        })
      );
    } catch (err) {
      console.error('Failed to update follow status', err);
    }
  };

  return (
    <div className="w-full bg-white rounded-3xl border border-neutral-200/50 shadow-sm p-5 md:p-6 text-left">
      <div className="flex items-center justify-between border-b border-neutral-100 pb-3 mb-5">
        <h3 className="font-poppins font-bold text-base md:text-lg text-text-primary">
          Who to follow
        </h3>
        <button className="text-xs font-bold text-brand-500 hover:underline cursor-pointer">
          View all
        </button>
      </div>

      {/* Recommended Users list */}
      <div className="flex flex-col gap-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between gap-4 group"
          >
            {/* User profile avatar info */}
            <Link to={`/profile/${user.username}`} className="flex items-center gap-3 cursor-pointer group/link">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-neutral-200/40 shrink-0 shadow-sm">
                <InitialsAvatar 
                  avatarUrl={user.avatar} 
                  name={user.name || user.username || "User"} 
                  className="w-full h-full text-xs group-hover/link:scale-105 transition-transform duration-300"
                />
              </div>
              
              <div className="leading-tight text-left">
                <span className="block font-poppins font-bold text-text-primary text-xs md:text-sm group-hover/link:text-brand-900 transition-colors">
                  {user.name}
                </span>
                <span className="text-[10px] md:text-xs text-text-secondary">
                  @{user.username}
                </span>
              </div>
            </Link>

            {/* Follow button primitive */}
            <Button
              variant={user.isFollowing ? 'secondary' : 'outline'}
              size="sm"
              className={`py-1.5 px-4 font-bold ${
                user.isFollowing 
                  ? 'bg-neutral-100 border-neutral-200/50 text-text-secondary hover:bg-neutral-200/30' 
                  : 'border-brand-900/20 text-brand-900 hover:border-brand-900/50'
              }`}
              leftIcon={
                user.isFollowing 
                  ? <UserCheck className="w-3 h-3 text-text-secondary" />
                  : <UserPlus className="w-3 h-3 text-brand-900" />
              }
              onClick={() => handleFollowToggle(user.id, user.isFollowing)}
            >
              {user.isFollowing ? 'Following' : 'Follow'}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
