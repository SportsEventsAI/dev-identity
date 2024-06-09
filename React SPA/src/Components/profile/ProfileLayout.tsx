/**
 * @file src/components/Profile/ProfileLayout.tsx
 * @version 0.1.1
 * @date 2024-06-08
 * @summary Profilelayoutx
 * @contact geoff@sportsevents.ai
 * @github SportsEventsAI/dev-identity
 * @description This file contains the profilelayoutx related logic.
 * @author Geoffrey DeFilippi
 */
import React, { ReactNode } from 'react';
import styles from './profile.module.scss';

type ProfileLayoutProps = {
    children: ReactNode;
};

/**
 * Renders the profile layout component.
 *
 * @param {ProfileLayoutProps} props - The component props.
 * @returns {JSX.Element} The rendered profile layout component.
 */
const ProfileLayout = ({ children }: ProfileLayoutProps): JSX.Element => {
    return <div className={styles.profile_container}>{children}</div>;
};

export default ProfileLayout;
