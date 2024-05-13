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
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, PhoneIcon, SearchIcon } from "@chakra-ui/icons";
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
  { path: "/product", title: "All Product", type: true },
  { path: "/aboutus", title: "About Us", type: true },
];

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [cartv,setCartv]=useState()
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const User = useSelector((state) => state.user.user);
  // console.log(User.username);
  const cartno = useSelector((state) => state.user.cartsize);


  // console.log(cartno);
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
  function HandleRoute({ value }) {
    const navigate = useNavigate();
  
    useEffect(() => {
      const Token = localStorage.getItem("Token");
      if (Token) {
        Navigate(`/${value}`);
      } else {
        Navigate("/login");
      }
    }, [value, Navigate]);
  
    return <></>; // Placeholder return, as this component doesn't render anything
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
         <Image className='cursor-pointer' src={Logo} width={44} onClick={()=>{
          Navigate('/')
         }}/>
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
                  onClick={()=>{HandleRoute(el.path)}}
                >
                  {el.title}
                </Link>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems="center" className="flex gap-4">
      <div>
        <InputGroup>
          <InputLeftElement pointerEvents='none'>
            <SearchIcon color='gray.300' />
          </InputLeftElement>
          <Input type='tel' placeholder='Search' />
        </InputGroup>
      </div>
      <div className="flex gap-1">
        <BsCartFill className="CART_ICON" onClick={() => Navigate("/cart")} style={{ fontSize: '24px' }} />
        {cartno > 0 && <span className="cart-qty">{cartno}</span>}
      </div>
      <Menu>
        <MenuButton>
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
