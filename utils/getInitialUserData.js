import EMPTY_DETAILS from "./emptyUserDetails";

const getInitialUserData = () => {
	const serializedData = window.localStorage.getItem("esummit-iitm-user-details");
	const parsedUserData = serializedData ? JSON.parse(serializedData) : EMPTY_DETAILS;

	return parsedUserData;
};

export default getInitialUserData;
