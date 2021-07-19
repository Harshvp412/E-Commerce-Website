import { useEffect, useState } from "react";
import React from "react";
import { Link, useLocation } from "wouter";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, Button, Icon } from "@chakra-ui/react";
import { FaExternalLinkAlt } from "react-icons/fa";

const SuccessModal = ({ isOpen, onClose }) => {
	const [, setLocation] = useLocation();

	const initialSeconds = 15;
	const [seconds, setSeconds] = useState(initialSeconds);
	useEffect(() => {
		const timer = setInterval(() => {
			setSeconds(seconds - 1);
		}, 1000);
		return () => {
			clearInterval(timer);
			if (seconds <= 1) {
				setLocation("/");
			}
		};
	});

	return (
		<Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader color="green.300">Successfully registered!</ModalHeader>
				<ModalBody>
					We have succesfully received your payment. Please check your mail for the confirmation of the same.
					<br />
					<br />
					You will be redirected to the shop homepage in {seconds} seconds.
				</ModalBody>
				<ModalFooter>
					<Button rightIcon={<Icon as={FaExternalLinkAlt} />} as={Link} to="/">
						Take me there now
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default SuccessModal;
