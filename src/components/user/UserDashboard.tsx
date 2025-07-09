import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { User, Calendar, CreditCard, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface SubscriptionStatus {
  plan: string;
  status: string;
  features: string[];
  startDate: string;
  endDate: string | null;
  message: string;
}

const UserDashboard: React.FC = () => {
  const { user, token } = useAuth();
  const [subscriptionStatus, setSubscriptionStatus] = useState<SubscriptionStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user && token) {
      fetchSubscriptionStatus();
    }
  }, [user, token]);

  const fetchSubscriptionStatus = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/users/subscription', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setSubscriptionStatus(data.subscription);
      } else {
        toast.error('Failed to fetch subscription status');
      }
    } catch (error) {
      console.error('Error fetching subscription status:', error);
      toast.error('Error fetching subscription status');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'expired':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'inactive':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'expired':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'inactive':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'free':
        return 'bg-gray-100 text-gray-800 border-gray-300';
      case 'pro':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'enterprise':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="text-gray-400 mt-4">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-400 mt-1">Welcome back, {user?.name}!</p>
        </div>
      </div>

      {/* User Info Card */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <User className="h-5 w-5" />
            Profile Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-400">Name</p>
              <p className="text-white font-medium">{user?.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Email</p>
              <p className="text-white font-medium">{user?.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Role</p>
              <Badge className={user?.role === 'admin' ? 'bg-purple-600' : 'bg-blue-600'}>
                {user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'N/A'}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Subscription Status Card */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Subscription Status
          </CardTitle>
          <CardDescription className="text-gray-400">
            Current subscription and feature access
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {subscriptionStatus && (
            <>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getStatusIcon(subscriptionStatus.status)}
                  <div>
                    <p className="text-white font-medium">{subscriptionStatus.message}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={getPlanColor(subscriptionStatus.plan)}>
                        {subscriptionStatus.plan.charAt(0).toUpperCase() + subscriptionStatus.plan.slice(1)} Plan
                      </Badge>
                      <Badge className={getStatusColor(subscriptionStatus.status)}>
                        {subscriptionStatus.status.charAt(0).toUpperCase() + subscriptionStatus.status.slice(1)}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              {subscriptionStatus.startDate && (
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Calendar className="h-4 w-4" />
                  <span>
                    Started: {new Date(subscriptionStatus.startDate).toLocaleDateString()}
                    {subscriptionStatus.endDate && (
                      <span className="ml-2">
                        • Expires: {new Date(subscriptionStatus.endDate).toLocaleDateString()}
                      </span>
                    )}
                  </span>
                </div>
              )}

              {subscriptionStatus.features && subscriptionStatus.features.length > 0 && (
                <div>
                  <p className="text-sm text-gray-400 mb-2">Available Features:</p>
                  <div className="flex flex-wrap gap-2">
                    {subscriptionStatus.features.map((feature, index) => (
                      <Badge key={index} variant="outline" className="text-gray-300 border-gray-600">
                        {feature.replace('_', ' ').charAt(0).toUpperCase() + feature.replace('_', ' ').slice(1)}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {subscriptionStatus.plan === 'free' && (
                <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">Upgrade to Pro</p>
                      <p className="text-sm text-gray-400">Get access to advanced features and priority support</p>
                    </div>
                    <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                      Upgrade Now
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" className="border-gray-600 hover:bg-gray-700">
              View Usage Statistics
            </Button>
            <Button variant="outline" className="border-gray-600 hover:bg-gray-700">
              Download Data
            </Button>
            <Button variant="outline" className="border-gray-600 hover:bg-gray-700">
              Contact Support
            </Button>
            <Button variant="outline" className="border-gray-600 hover:bg-gray-700">
              Billing History
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserDashboard;
