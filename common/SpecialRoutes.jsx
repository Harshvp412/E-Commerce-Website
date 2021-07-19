import { Route, Redirect } from "react-router-dom";
import transformCase from "../utils/caseTransformer";
import getSummiID from "../utils/getSummitID";
import EventDetails from "../views/Events/EventDetails";
import Cookies from "js-cookie";
import { commonEventComponents, leaderEventComponents } from "../views/Events/AllEvents";

const SERVER_URL = "https://esummitiitm.org";

const PrivateRoute = (props) => {
	const { children, component: Component, redirectTo, ...rest } = props;
	const summitID = getSummiID();
	const isLoggedIn = /^ES21\d{4}$/.test(summitID);

	return (
		<Route
			{...rest}
			render={({ location }) => {
				if (isLoggedIn) {
					return children || <Component />;
				} else {
					window.location.href = SERVER_URL;
				}
			}}
		/>
	);
};

const PublicRoute = (props) => {
	const { children, component: Component, ...rest } = props;
	const summitID = getSummiID();
	const isLoggedIn = /^ES21\d{4}$/.test(summitID);

	return (
		<Route
			{...rest}
			render={() => {
				if (isLoggedIn) {
					return <Redirect to={`/portal`} />;
				} else {
					return children || <Component />;
				}
			}}
		/>
	);
};

const RegisterRoute = (props) => {
	const { children, component: Component, ...rest } = props;
	const eventName = rest.location.pathname.split("/").pop();
	const eventDisplayName = transformCase(eventName);
	const summitID = getSummiID();
	const isLoggedIn = /^ES21\d{4}$/.test(summitID);

	if (!isLoggedIn) {
		window.location.href = `${SERVER_URL}/event/${eventName}`;
		return null;
	}

	const participatedEvents = Cookies.getJSON("participatedEvents");
	const alreadyRegistered = participatedEvents.some((event) => event === eventName);

	return (
		<Route
			{...rest}
			sensitive
			render={() => {
				if (alreadyRegistered) {
					return <Redirect to={`/portal/event/${eventName}`} />;
				} else {
					return (
						children || (
							<Component
								event={eventName}
								eventDisplayName={eventDisplayName}
								summitID={summitID}
							/>
						)
					);
				}
			}}
		/>
	);
};

const EventRoute = (props) => {
	const { children, ...rest } = props;
	const eventName = rest.location.pathname.split("/").pop();
	const eventDisplayName = transformCase(eventName);

	const summitID = getSummiID();
	const isLoggedIn = /^ES21\d{4}$/.test(summitID);

	if (!isLoggedIn) {
		window.location.href = `${SERVER_URL}/event/${eventName}`;
		return null;
	}
	const participatedEvents = Cookies.getJSON("participatedEvents");
	const registrationDetails = Cookies.getJSON("registrationDetails");
	const registered = participatedEvents.includes(eventName);

	console.log(registrationDetails, "registrationDetails");

	return (
		<Route
			{...rest}
			sensitive
			render={() => {
				if (!registered) {
					return <Redirect to={`/portal/register/${eventName}`} />;
				} else {
					return (
						children || (
							<EventDetails
								eventName={eventName}
								eventDisplayName={eventDisplayName}
								summitID={summitID}
								registrationDetails={registrationDetails}
								commonComponent={commonEventComponents[eventName]}
								leaderComponent={leaderEventComponents[eventName]}
							/>
						)
					);
				}
			}}
		/>
	);
};
export { PrivateRoute, PublicRoute, RegisterRoute, EventRoute };
