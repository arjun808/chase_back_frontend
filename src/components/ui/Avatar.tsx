import React from 'react';

export interface AvatarProps {
  name: string;
  email?: string;
  src?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  name,
  email,
  src,
  size = 'md',
  className = '',
}) => {
  const sizeStyles = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-9 h-9 text-sm',
    lg: 'w-11 h-11 text-base',
    xl: 'w-14 h-14 text-lg font-semibold',
  };

  const getInitials = (fullName: string): string => {
    if (!fullName) return '?';
    const parts = fullName.trim().split(/\s+/);
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return fullName.substring(0, 2).toUpperCase();
  };

  const stringToGradient = (str: string): string => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const gradients = [
      'from-indigo-500 to-purple-600',
      'from-violet-500 to-pink-600',
      'from-cyan-500 to-blue-600',
      'from-emerald-500 to-teal-600',
      'from-amber-500 to-orange-600',
    ];
    const index = Math.abs(hash) % gradients.length;
    return gradients[index];
  };

  const gradientClass = stringToGradient(name || email || 'user');

  return (
    <div
      className={`relative inline-flex shrink-0 items-center justify-center rounded-full overflow-hidden select-none shadow-md ${sizeStyles[size]} ${className}`}
    >
      {src ? (
        <img
          src={src}
          alt={name}
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback to initials if image fails
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
      ) : null}
      <span
        className={`w-full h-full flex items-center justify-center font-medium text-white bg-gradient-to-br ${gradientClass}`}
      >
        {getInitials(name || email || 'CB')}
      </span>
    </div>
  );
};
