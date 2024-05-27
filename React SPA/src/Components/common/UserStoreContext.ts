import React, { useContext } from 'react';

export type UserStore = {
	readonly: boolean;
	setReadonly: (value: boolean) => void;
};

/**
 * Default UserStore object.
 */
export const UserStoreDefault: UserStore = {
	/**
	 * Indicates if the UserStore is readonly.
	 */
	readonly: true,

	/**
	 * Sets the readonly property of the UserStore.
	 * @param value - The new value for the readonly property.
	 */
	setReadonly: (_value: boolean) => {},
};

/**
 * Context object for the UserStore.
 * @type {React.Context<UserStore>}
 */
const UserStoreContext = React.createContext<UserStore>(UserStoreDefault);
UserStoreContext.displayName = '<User global configs>'; // customized debugger/extension experience

export default UserStoreContext;
/**
 * Custom hook that provides access to the UserStore context.
 * @returns The UserStore context value.
 */
export const useUserStore = (): UserStore => useContext(UserStoreContext);
