import { useState } from "react";
import React from "react";
import { Button, VStack, HStack, Heading, Alert, AlertIcon, useToast } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { clearCart, selectTotalPrice } from "../../state/cartReducer";

import FormInput from "./FormInput";
import SuccessModal from "./SuccessModal";

import axios from "../../utils/_axios";
import loadScript from "../../utils/loadScript";
import getInitialUserData from "../../utils/getInitialUserData";
import EMPTY_DETAILS from "../../utils/emptyUserDetails";


const UserDetails = () => {
	const totalPrice = useSelector(selectTotalPrice);
	const cart = useSelector(({ cart }) => cart.items);
	const dispatch = useDispatch();

	const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

	const toast = useToast();
	const showToast = (status, title, description = "Please contact us or try again later.") => {
		toast({
			title,
			description,
			status,
			duration: status === "error" ? null : 4000,
			isClosable: true,
			position: "bottom-right",
		});
	};

	const { handleSubmit, errors, register, formState, reset: resetForm, watch } = useForm({
		defaultValues: getInitialUserData(),
	});
	const commonProps = (rules = {}) => ({
		errors,
		_ref: register({ required: "This field is required.", ...rules }),
	});

	async function onSubmit(userData) {
		const serializedUserData = JSON.stringify(userData, null, 2);
		window.localStorage.setItem("esummit-iitm-user-details", serializedUserData);

		if (totalPrice !== 0) {
			const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

			if (!res) {
				showToast(
					"error",
					"Payment handler failed to load.",
					"Retry later or contact us if this issue persists."
				);
			} else {
				try {
					const dataToPost = {
						items: cart.map(({ key, size, quantity }) => `${key}-${size}-${quantity}`),
						deliveryDetails: userData,
					};
					const res = await axios.post(`/order-create`, { items: dataToPost.items });
					const orderOptions = res.data;

					let finalOrderOptions = {
						...orderOptions,
						prefill: {
							name: userData.name,
							email: userData.email,
							contact: userData.phone,
						},

						handler: async function (response) {
							const paymentID = response.razorpay_payment_id;
							if (paymentID === undefined) {
								showToast("error", "Payment failed");
							} else {
								try {
									await axios.post("/add", {
										...dataToPost,
										totalPrice: orderOptions.amount / 100,
										paymentID,
									});
									toast.closeAll();
									dispatch(clearCart());
									setIsSuccessModalOpen(true);
								} catch (error) {
									console.log(error);
									showToast(
										"error",
										"Error occurred in Registering. Contact us if money was deducted from your account."
									);
								}
							}
						},
						modal: {
							ondismiss: function () {
								toast.closeAll();
							},
						},
						theme: { color: "#222222" },
					};
					const paymentObject = new window.Razorpay(finalOrderOptions);
					paymentObject.open();
					toast({
						duration: null,
						isClosable: false,
						position: "bottom",
						render: () => (
							<Alert variant="top-accent" status="warning" mb="2em">
								<AlertIcon />
								Do not close or reload this page.
							</Alert>
						),
					});
				} catch (err) {
					console.log(err);
					showToast("error", "An error ocurred in generating your order.");
				}
			}
		} else {
			showToast("success", "Details saved.", "We have saved your delivery details locally.");
		}
	}

	function clearUserData() {
		window.localStorage.removeItem("esummit-iitm-user-details");
		resetForm(EMPTY_DETAILS);
	}
	return (
		<VStack spacing={4} align="start">
			<HStack justify="space-between" w="100%">
				<Heading size="lg">Deliver to</Heading>
				<Button onClick={clearUserData} colorScheme="teal" disabled={shallowEqual(watch(), EMPTY_DETAILS)}>
					Clear Data
				</Button>
			</HStack>
			<form onSubmit={handleSubmit(onSubmit)}>
				<FormInput _key="name" displayName="Name" {...commonProps()} />
				<HStack wrap={{ base: "wrap", lg: "nowrap" }}>
					<FormInput
						_key="email"
						displayName="Email"
						{...commonProps({
							pattern: {
								value: /^\S+@\S+$/i,
								message: "Please enter a valid Email",
							},
						})}
					/>
					<FormInput
						_key="phone"
						displayName="Phone"
						{...commonProps({
							pattern: {
								value: /^\d{10}$/,
								message: "Please enter a valid mobile number",
							},
						})}
					/>
				</HStack>
				<FormInput _key="address" displayName="Address" {...commonProps()} />
				<HStack w="100%">
					<FormInput _key="city" displayName="City" {...commonProps()} />
					<FormInput
						_key="pinCode"
						displayName="PIN Code"
						{...commonProps({
							pattern: {
								value: /^\d{6}$/,
								message: "Please enter a valid PIN Code.",
							},
						})}
					/>
				</HStack>
				<FormInput _key="state" displayName="State" {...commonProps()} />

				<HStack justify="space-between" w="100%">
					<Heading size="lg" alignSelf="flex-end">
						{totalPrice ? `₹ ${totalPrice}` : ""}
					</Heading>
					<Button mt={4} colorScheme="teal" isLoading={formState.isSubmitting} type="submit">
						{totalPrice === 0 ? "Save Delivery Details" : "Proceed to Pay"}
					</Button>
				</HStack>
			</form>
			{isSuccessModalOpen && (
				<SuccessModal isOpen={isSuccessModalOpen} onClose={() => setIsSuccessModalOpen(false)} />
			)}
		</VStack>
	);
};

export default UserDetails;
