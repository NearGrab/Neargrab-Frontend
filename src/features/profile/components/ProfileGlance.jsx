import React from 'react';
import { 
  ChevronRight, 
  Calendar, 
  MessageSquare, 
  Heart, 
  TrendingUp, 
  Star, 
  Map, 
  Store 
} from 'lucide-react';

export default function ProfileGlance({ user }) {
  return (
    <div className="bg-white rounded-3xl border border-neutral-200/50 shadow-sm p-5 md:p-6 text-left hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between border-b border-neutral-100 pb-3 mb-5">
        <h3 className="font-poppins font-bold text-base md:text-lg text-text-primary">
          Profile at a glance
        </h3>
        <ChevronRight className="w-4.5 h-4.5 text-text-secondary" />
      </div>

      {/* Rows List properties */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between text-xs md:text-sm">
          <div className="flex items-center gap-2.5 text-text-secondary">
            <Calendar className="w-4 h-4 text-text-secondary" />
            <span className="font-semibold">Member Since</span>
          </div>
          <span className="font-bold text-text-primary">
            {user.memberSince}
          </span>
        </div>

        <div className="flex items-center justify-between text-xs md:text-sm border-t border-neutral-100/50 pt-3">
          <div className="flex items-center gap-2.5 text-text-secondary">
            <MessageSquare className="w-4 h-4 text-text-secondary" />
            <span className="font-semibold">Total Reviews</span>
          </div>
          <span className="font-bold text-text-primary">
            {user.reviewsCount}
          </span>
        </div>

        <div className="flex items-center justify-between text-xs md:text-sm border-t border-neutral-100/50 pt-3">
          <div className="flex items-center gap-2.5 text-text-secondary">
            <Heart className="w-4 h-4 text-text-secondary" />
            <span className="font-semibold">Helpful Votes</span>
          </div>
          <span className="font-bold text-text-primary">
            {user.helpfulVotes}
          </span>
        </div>

        <div className="flex items-center justify-between text-xs md:text-sm border-t border-neutral-100/50 pt-3">
          <div className="flex items-center gap-2.5 text-text-secondary">
            <TrendingUp className="w-4 h-4 text-text-secondary" />
            <span className="font-semibold">Avg Rating Given</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="font-bold text-text-primary">
              {user.avgRatingGiven} / 5
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs md:text-sm border-t border-neutral-100/50 pt-3">
          <div className="flex items-center gap-2.5 text-text-secondary">
            <Map className="w-4 h-4 text-text-secondary" />
            <span className="font-semibold">Areas Explored</span>
          </div>
          <span className="font-bold text-text-primary">
            {user.areasExplored}
          </span>
        </div>

        <div className="flex items-center justify-between text-xs md:text-sm border-t border-neutral-100/50 pt-3">
          <div className="flex items-center gap-2.5 text-text-secondary">
            <Store className="w-4 h-4 text-text-secondary" />
            <span className="font-semibold">Shops Visited</span>
          </div>
          <span className="font-bold text-text-primary">
            {user.shopsVisited}
          </span>
        </div>
      </div>
    </div>
  );
}
