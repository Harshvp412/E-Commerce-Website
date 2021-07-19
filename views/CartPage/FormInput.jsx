import { FormControl, FormLabel, Input, FormErrorMessage, InputGroup, InputLeftAddon } from "@chakra-ui/react";
import React from "react";

const FormInput = ({ _key, displayName, rules = {}, errors, _ref }) => {
	return (
		<FormControl isInvalid={errors[_key]} mb="1em">
			<FormLabel htmlFor={_key}>{displayName}</FormLabel>
			<InputGroup colorScheme="blackAlpha">
				{_key === "phone" && <InputLeftAddon children="+91" />}
				<Input name={_key} placeholder={displayName} ref={_ref} variant="filled" />
			</InputGroup>
			<FormErrorMessage>{errors[_key] && errors[_key].message}</FormErrorMessage>
		</FormControl>
	);
};

export default FormInput;
