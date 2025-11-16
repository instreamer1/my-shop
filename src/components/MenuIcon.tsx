"use client";

import { memo } from "react";

export const SocialIcon = memo(function SocialIcon({ icon }: { icon: string }) {
  return (
    <span className="text-gray-600 font-semibold text-sm">
      {icon === 'instagram' && 'I'}
      {icon === 'tiktok' && 'T'}
      {icon === 'telegram' && 'T'}
    </span>
  );
});
SocialIcon.displayName = 'SocialIcon';

export const BackIcon = memo(function BackIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 19l-7-7 7-7"
      />
    </svg>
  );
});
BackIcon.displayName = "BackIcon";

export const CloseIcon = memo(function CloseIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
});
CloseIcon.displayName = "CloseIcon";

export const CatalogIcon = memo(function CatalogIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  );
});
CatalogIcon.displayName = "CatalogIcon";

export const ArrowRightIcon = memo(function ArrowRightIcon() {
  return (
    <svg
      className="w-4 h-4 text-gray-400"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5l7 7-7 7"
      />
    </svg>
  );
});
ArrowRightIcon.displayName = "ArrowRightIcon";

export const ProfileIcon = memo(function ProfileIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );
});
ProfileIcon.displayName = 'ProfileIcon';

// Компонент для отображения иконки контакта
export const ContactIcon = memo(function ContactIcon({ type }: { type: 'viber' | 'telegram' }) {
  return (
    <div className="w-5 h-5 mr-3 flex items-center justify-center">
      {type === 'viber' && (
        <span className="text-purple-600 font-semibold text-sm">V</span>
      )}
      {type === 'telegram' && (
        <span className="text-blue-500 font-semibold text-sm">T</span>
      )}
    </div>
  );
});
ContactIcon.displayName = 'ContactIcon';
