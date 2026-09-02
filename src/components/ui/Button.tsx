'use client';

import React from 'react';
import { soundFx } from '@/lib/audio';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gold_glow';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className,
  onClick,
  disabled,
  ...props
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    soundFx.playClick();
    if (onClick) onClick(e);
  };

  const baseStyles =
    'relative inline-flex items-center justify-center font-medium tracking-wide transition-all duration-300 rounded-lg cursor-pointer overflow-hidden select-none disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none group active:scale-[0.98]';

  const sizeStyles = {
    sm: 'px-3.5 py-1.5 text-xs font-semibold gap-1.5',
    md: 'px-5 py-2.5 text-sm font-semibold gap-2',
    lg: 'px-7 py-3.5 text-base font-semibold gap-2.5',
  };

  const variantStyles = {
    primary:
      'bg-gradient-to-r from-[#C9A96E] via-[#D8B978] to-[#C9A96E] text-[#0B0F14] font-bold shadow-[0_0_20px_rgba(201,169,110,0.3)] hover:shadow-[0_0_30px_rgba(201,169,110,0.5)] hover:brightness-105 border border-[#F3E5AB]/40',
    secondary:
      'bg-[#1E293B] text-slate-100 hover:bg-[#334155] border border-slate-700/60 shadow-md',
    outline:
      'bg-transparent text-[#D8B978] border border-[#C9A96E]/50 hover:border-[#C9A96E] hover:bg-[#C9A96E]/10 shadow-sm',
    ghost:
      'bg-transparent text-slate-300 hover:text-white hover:bg-white/5',
    gold_glow:
      'bg-radial from-[#D8B978] to-[#8C6E38] text-[#070A0E] font-bold shadow-[0_0_30px_rgba(201,169,110,0.5)] hover:shadow-[0_0_45px_rgba(201,169,110,0.8)] border border-[#FFF4D0]',
  };

  return (
    <button
      className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      onClick={handleClick}
      disabled={disabled || isLoading}
      {...props}
    >
      {/* Subtle shine sweep on hover */}
      <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/25 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-out pointer-events-none" />

      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <>
          {leftIcon && <span className="transition-transform group-hover:-translate-x-0.5">{leftIcon}</span>}
          <span>{children}</span>
          {rightIcon && <span className="transition-transform group-hover:translate-x-0.5">{rightIcon}</span>}
        </>
      )}
    </button>
  );
};
