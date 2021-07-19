import { Flex, Grid, GridItem, useBreakpoint, SlideFade } from "@chakra-ui/react";
import React from "react";
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import UserDetails from "./UserDetails";
import CheckoutCart from "./CheckoutCart";


const CheckoutPage = ({ numItems }) => {
	const breakpoint = useBreakpoint();
	return (
        <div>
            <Header
        color="dark"
        brand="SSBcares"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 200,
          color: "white"
        }}
    
      />
       <br/>
       <br/>
       <br/>
		<Flex p="1em" mb="1em" align="center" justify="center" wrap="wrap">
			<SlideFade in={true} offsetY="20px">
				<Grid templateColumns="repeat(8, 1fr)" gap={0}>
					{["lg", "xl", "2xl"].includes(breakpoint) && <GridItem colSpan={1}></GridItem>}
					<GridItem colSpan={{ base: 8, lg: 3 }} maxW={{ base: "100%", lg: "30vw" }} p="1em">
                 
                    <CheckoutCart />
					</GridItem>
					<GridItem colSpan={{ base: 8, lg: 3 }} p="1em">
                    <UserDetails />
					</GridItem>
				</Grid>
			</SlideFade>
		</Flex>
        </div>
	);
};

export default CheckoutPage;
