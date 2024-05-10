import {
  Box,
  Flex,
  Avatar,
  HStack,
  // Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Icon,
  Toast,
  useToast,
  Image,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { MdConnectWithoutContact } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LOADING, LOGOUT_USER, NOT_LOADING } from "../redux/actiontype";
// import { Link } from "react-router-dom";
import { BsCartFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { getcart } from "../redux/action";
import Logo from "../Images/download44-removebg-preview.png"

const Links = [
  // { path: "/createtask", title: "Create-Task", type: true },
  // { path: "/taskcards", title: "Show-Task", type: true },
];

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [cartv,setCartv]=useState()
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const User = useSelector((state) => state.user.user);
  console.log(User.username);
  const cartno = useSelector((state) => state.user.cartsize);


  console.log(cartno);
  const { username } = User;

  useEffect(() => {
    dispatch(getcart());
   
  }, []);

  const token = useSelector((state) => state.user.token);
  // console.log(token);

  const Token = localStorage.getItem("Token");

  const handleLogout = () => {
    dispatch({ type: LOGOUT_USER });
    dispatch({ type: LOADING });
    setTimeout(() => {
      dispatch({ type: NOT_LOADING });
      Toast({
        status: "error",
        title: "Logged Out Successfully",
        duration: 3000,
      });
    }, 3000);
    // console.log("LoOOOut")
    localStorage.setItem("Token", "");
  };

  function handleRoute() {
    // if(!token){
    //   Navigate("/login");
    // }
  }

  function HandleHomeRoute() {
    Navigate("/");
  }

  function HandleProfile() {
    if (Token) {
      Navigate("/profile");
    } else {
      Navigate("/login");
    }
  }

  function handlestore() {
    if (Token) {
      Navigate("/store");
    } else {
      Navigate("/login");
    }
  }

  return (
    <>
      <Box
        bg={useColorModeValue("white", "gray.900")}
        px={4}
        fontFamily="monospace"
        borderWidth="1px"
        boxShadow="md"
        className="md:mb-[10px] sticky top-0 z-30"
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack
            spacing={8}
            alignItems={"center"}
            className="flex justify-center items-center"
          >
         <Image src={Logo} width={44} />
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
              onClick={handleRoute}
            >
              {Links.map((el, ind) => (
                <Link
                  className="link p-2 cursor-pointer rounded-[10px] text-[20px] hover:text-blue-500 hover:bg-gray-100"
                  to={el.path}
                >
                  {el.title}
                </Link>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"} className="flex  gap-2">
            <BsCartFill className="CART_ICON" onClick={()=>{
              Navigate("/cart");
            }} /> {cartno}
            <Menu>
              <MenuButton
              /*
                    as={Button}
                    rounded={"full"}
                    variant={"link"}
                    cursor={"pointer"}
                    minW={0}
                    //_focus={{ boxShadow: "0 0 1px 2px rgb(241, 90, 34)" }}
                    _focus={{ boxShadow: "none" }}
                    */
              >
                <Avatar size={"sm"} bg="grey" />
              </MenuButton>
              <MenuList>
                <MenuItem
                  onClick={() => {
                    Navigate("/login");
                  }}
                  _hover={{
                    bg: useColorModeValue("#D3D3D3", "rgba(0, 0, 0, 0.20)"),
                  }}
                  _focus={{
                    bg: useColorModeValue("#D3D3D3", "rgba(0, 0, 0, 0.20)"),
                  }}
                >
                  Login/Signup
                </MenuItem>
                <MenuItem
                  onClick={HandleProfile}
                  _hover={{
                    bg: useColorModeValue("#D3D3D3", "rgba(0, 0, 0, 0.20)"),
                  }}
                >
                  Profile
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  onClick={handleLogout}
                  _hover={{
                    bg: useColorModeValue("#D3D3D3", "rgba(0, 0, 0, 0.20)"),
                  }}
                >
                  Logout
                </MenuItem>

                <MenuItem
                  onClick={handlestore}
                  _hover={{
                    bg: useColorModeValue("#D3D3D3", "rgba(0, 0, 0, 0.20)"),
                  }}
                >
                  Store
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((el, ind) => (
                <Link key={ind} to={el.path}>
                  {el.title}
                </Link>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>

      {/* <Box p={4}>Main Content Here</Box> */}
    </>
  );
}
