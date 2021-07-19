import { Button, VStack, HStack, Heading, Image, Text, Spacer, IconButton, Icon } from "@chakra-ui/react";
import React from "react";
import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "wouter";

import { decrementQuantityByAmount, incrementQuantityByAmount, removeItem, clearCart } from "../../state/cartReducer";

const CheckoutCart = () => {
	const cart = useSelector((state) => state.cart.items);
	const dispatch = useDispatch();

	if (cart.length === 0) {
		return (
			<VStack align="flex-start">
				<Heading size="lg">Your Cart</Heading>
				<Spacer />
				<Text color="gray.500">
					You haven't added any items to your cart yet.
					<br /> Please go to{" "}
					<Text color="teal.600" as={Link} to="/courses">
						our courses page
					</Text>{" "}
					to add some!
				</Text>
				<Spacer />
			</VStack>
		);
	}
	return (
		<VStack spacing={4} align="start" w="100%">
			<HStack w="100%">
				<Heading size="lg">Your Cart</Heading>
				<Spacer />
				<Button onClick={() => dispatch(clearCart())} colorScheme="teal">Clear</Button>
			</HStack>
			{cart.map(({ key, size, quantity }, i) => {
				
				const id = key + "-" + size;
				return (
					<HStack key={id} w="100%">
						
						<VStack w="100%" align="flex-start">
							<Heading as="span" size="sm">
							
							</Heading>
							<HStack w="100%">
								<span>
									Size: <Text as="strong">{size}</Text>
								</span>
								<span>
									Quantity: <Text as="strong">{quantity}</Text>
								</span>
								<Spacer />
								<Button
									size="sm"
									disabled={quantity === 1}
									onClick={(e) => dispatch(decrementQuantityByAmount({ id, amount: 1 }))}>
									-
								</Button>
								<Button
									size="sm"
									onClick={(e) => dispatch(incrementQuantityByAmount({ id, amount: 1 }))}>
									+
								</Button>
								<IconButton
									icon={<Icon as={FaTrash} />}
									size="sm"
									onClick={(e) => dispatch(removeItem(id))}
								/>
							</HStack>
						</VStack>
					</HStack>
				);
			})}
		</VStack>
	);
};

export default CheckoutCart;
