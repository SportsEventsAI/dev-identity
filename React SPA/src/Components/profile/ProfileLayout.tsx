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
