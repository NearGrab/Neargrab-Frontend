import apiClient from '../../../shared/services/apiClient';
import tempProfileData from '../data/tempProfile.json';

/**
 * Service interacting with Neargrab Backend APIs for profile, reviews, and metrics.
 */
export const profileService = {
  /**
   * Fetches all customer profile dashboard models.
   */
  async getProfileData(username = null) {
    try {
      let user, profile;
      if (username) {
        const res = await apiClient.get(`/api/v1/users/${username}/profile`);
        profile = res?.data;
        user = profile?.user;
      } else {
        const [userRes, profileRes] = await Promise.all([
          apiClient.get('/api/v1/me'),
          apiClient.get('/api/v1/me/profile')
        ]);
        user = userRes?.data;
        profile = profileRes?.data;
      }

      if (!user) {
        return tempProfileData;
      }

      // Map backend fields to the keys expected by UI components
      const stats = profile?.stats || {};
      const currentUser = {
        id: user.id || '',
        name: user.name || 'User Name',
        username: user.username || 'username',
        bio: profile?.bio || '',
        avatar: user.avatar?.url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
        location: {
          city: user.city || 'Navsari',
          state: user.state || 'Gujarat',
          radius: profile?.preferencesJson?.radiusKm ? `Within ${profile.preferencesJson.radiusKm} km` : 'Within 3 km'
        },
        followingCount: stats.followingCount ?? 0,
        followersCount: stats.followersCount ?? 0,
        reviewsCount: stats.reviewsCount ?? 0,
        avgRatingGiven: stats.avgRatingGiven ?? 0,
        memberSince: user.createdAt 
          ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
          : 'March 2024',
        helpfulVotes: stats.helpfulVotes ?? 0,
        areasExplored: stats.areasExplored ?? 0,
        shopsVisited: stats.shopsVisited ?? 0
      };

      const impact = {
        shopsSupported: stats.shopsVisited ?? 0,
        helpfulVotes: stats.helpfulVotes ?? 0,
        areasExplored: stats.areasExplored ?? 0
      };

      // Dynamically calculate high-fidelity badges based on real stats
      const badges = [];
      if (stats.areasExplored > 0) {
        badges.push({
          id: 1,
          name: "Local Explorer",
          level: Math.min(3, stats.areasExplored),
          type: "brand"
        });
      }
      if (stats.reviewsCount > 0) {
        badges.push({
          id: 2,
          name: "Review Star",
          level: Math.min(5, stats.reviewsCount),
          type: "amber"
        });
      }
      if (stats.helpfulVotes > 0) {
        badges.push({
          id: 3,
          name: "Helpful Human",
          level: Math.min(3, Math.ceil(stats.helpfulVotes / 5)),
          type: "brand"
        });
      }
      if (currentUser.memberSince) {
        badges.push({
          id: 4,
          name: "Early Supporter",
          level: 1,
          type: "brand"
        });
      }

      // Map backend reviews to the format expected by the ReviewsList component
      const reviews = (profile?.reviews || []).map(r => {
        let pImg = 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=300&q=80';
        if (r.product?.images?.[0]?.media?.url) {
          pImg = r.product.images[0].media.url;
        } else if (r.product?.image?.url) {
          pImg = r.product.image.url;
        }

        const rImgs = (r.media || []).map(m => m.media?.url).filter(Boolean);

        return {
          id: r.id,
          productName: r.product?.name || 'Shop Review',
          storeName: r.shop?.name || 'Local Store',
          distance: r.shop?.address?.serviceRadiusKm ? `${parseFloat(r.shop.address.serviceRadiusKm)} km` : '0.5 km',
          rating: Number(r.rating),
          verified: r.verifiedPurchase,
          comment: r.comment,
          time: new Date(r.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          helpfulCount: r._count?.votes || 0,
          productImage: pImg,
          images: rImgs
        };
      });

      return {
        currentUser,
        impact,
        badges: badges.length > 0 ? badges : tempProfileData.badges,
        reviews,
        whoToFollow: profile?.whoToFollow || tempProfileData.whoToFollow,
        isFollowing: profile?.isFollowing || false
      };
    } catch (err) {
      console.warn('Failed to load profile data from backend, falling back to mock:', err);
      return tempProfileData;
    }
  },

  /**
   * Updates basic fields of user (name, username, city)
   */
  async updateAccount(data) {
    const response = await apiClient.patch('/api/v1/me', data);
    return response?.data;
  },

  /**
   * Updates user profile details (bio, language, dateOfBirth)
   */
  async updateProfile(data) {
    const response = await apiClient.patch('/api/v1/me/profile', data);
    return response?.data;
  },

  /**
   * Follows a user by ID
   */
  async followUser(userId) {
    const response = await apiClient.post(`/api/v1/users/${userId}/follow`);
    return response?.data;
  },

  /**
   * Unfollows a user by ID
   */
  async unfollowUser(userId) {
    const response = await apiClient.delete(`/api/v1/users/${userId}/follow`);
    return response?.data;
  }
};
