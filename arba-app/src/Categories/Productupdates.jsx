import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  useDisclosure,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  FormControl,
  FormLabel,
  ModalCloseButton,
  Input,
  ModalFooter,
  Image,
  Spinner,
  Select,
} from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import {
  Addproduct,
  editproduct,
  getproducts,
  removeproduct,
} from "../redux/action";
import Loaderhandle from "../Handlesideeffect/Loader";

function Productupdates() {
  const [id, setId] = useState();
  const [edit, setEdit] = useState(false);
  const [product, setProduct] = useState({
    title: "",
    description: "",
    image: null,
    price: "",
  });
  const [loading, setLoading] = useState(true); // Loading state
  const { isOpen, onOpen, onClose } = useDisclosure();
  const products = useSelector((state) => state.user.products);
  const dispatch = useDispatch();
  const [sort,setSort]=useState("");
  const userDataObj = JSON.parse(localStorage.getItem("userdata"));
  const { userid } = userDataObj;
  

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  async function DeleteCategory(id) {
    dispatch(removeproduct(id)).then(() => {
      dispatch(getproducts());
    });
  }

  // function handlechange(e) {
  //   setProduct({ ...product, [e.target.name]: e.target.value });
  // }

    function handlechange(e) {
    if (e.target.name === "image") {
      // For file input
      setProduct({ ...product, image: e.target.files[0] });
    } else {
      // For other inputs
      setProduct({ ...product, [e.target.name]: e.target.value });
    }
  }


  function HandleSubmit(e,sort) {
       const {image,title,description,price}=product

       const formData = new FormData();
    formData.append("image", image);
    formData.append("description", description);
    formData.append("title", title);
    formData.append("price", price);
    formData.append("owner", userid);


    e.preventDefault();
    if (edit) {
      dispatch(editproduct(formData, id)).then(() => {
        dispatch(getproducts(sort));
      });
      setEdit(false);
    } else {
      dispatch(Addproduct(formData)).then(() => {
        dispatch(getproducts(sort));
      });
    }

    setProduct({
      title: "",
      description: "",
      image: "",
      price: null,
    });
    onClose();
  }

  function handleEdit(_id, el) {
    const { title, description, image, price } = el;
    setProduct({
      price,
      image,
      description,
      title,
    });
    setId(_id);
    setEdit(true);
    onOpen();
  }

  useEffect(() => {
    dispatch(getproducts(sort))
      .then(() => setLoading(false)) // Set loading to false after data is fetched
      .catch(() => setLoading(false)); // Set loading to false if there's an error
  }, [dispatch,sort]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loaderhandle/>
      </div>
    );
  }
  console.log(sort)



  return (
    <div className="flex flex-col gap-3">
      {/* <Text textAlign='left' >Categories</Text> */}
      <div className="flex justify-start items-center gap-4">
        <Button
          size="md"
          height="48px"
          width="200px"
          border="2px"
          borderColor="blue.100"
          className="bg-[#00abc5]"
          onClick={onOpen}
        >
          ADD PRODUCT
        </Button>

<div className="w-[20%] h-10 bg-[#edf2f7] rounded-sm">
        <Select className="rounded-sm" placeholder='Filter' onChange={(e)=>{setSort(e.target.value)}}>
  <option value='desc' className="py-4">Price High to Low</option>
  <option value='asc'>Price Low to High</option>
</Select>
</div>
      </div>
      <div className="border border-gray-200 rounded-md p-4">
        <table className="w-full border-collapse border border-gray-200">
          <thead className="bg-[#3182ce]">
            <tr>
              <th className="border border-[#b1aeae] p-2">Image</th>
              <th className="border border-[#b1aeae] p-2">Name</th>
              <th className="border border-[#b1aeae] p-2">Price</th>
              <th className="border border-[#b1aeae] p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((el, ind) => {
              return (
                <tr key={ind}>
                  <td className="border border-[#b1aeae] p-2 flex justify-center items-center">
                    <Image src={el.image} width={10} />
                  </td>
                  <td className="border border-[#b1aeae] p-2 h-[40px]">
                  {el.title.length > 20 ? `${el.title.substring(0, 20)}...` : el.title}
                    {/* {el.title} */}
                  </td>
                  <td className="border border-[#b1aeae] p-2 h-[40px]">
                    {el.price}
                  </td>
                  <td className="border border-[#b1aeae] p-2 flex justify-center h-[40px]">
                    <div className="flex pb-40">
                      <BiEdit
                        onClick={() => {
                          handleEdit(el._id, el);
                        }}
                        className="text-xl mr-1"
                      />
                      |{" "}
                      <MdDelete
                        onClick={() => {
                          DeleteCategory(el._id);
                        }}
                        className="text-xl ml-1"
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Categories</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                ref={initialRef}
                onChange={handlechange}
                name="title"
                placeholder="Enter Title"
                value={product.title}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Price</FormLabel>
              <Input
                onChange={handlechange}
                placeholder="Enter Price"
                name="price"
                value={product.price}
              />
            </FormControl>

            {/* <FormControl mt={4}>
              <FormLabel>Image</FormLabel>
              <Input
                onChange={handlechange}
                type="text"
                placeholder="Enter Image"
                name="image"
                value={product.image}
              />
            </FormControl> */}

            <FormControl mt={4}>
             <FormLabel>Image</FormLabel>
            <Input
                onChange={handlechange}
                type="file"
                name="image"
                accept="*/*"
                placeholder="Upload Image"
                multiple={false}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Input
                onChange={handlechange}
                placeholder="Enter Description"
                name="description"
                value={product.description}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={HandleSubmit} colorScheme="blue" mr={3}>
              {edit ? "Update" : "Submit"}
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default Productupdates;








// <==========================================
// import React, { useEffect, useRef, useState } from "react";
// import {
//   Button,
//   useDisclosure,
//   Modal,
//   ModalBody,
//   ModalContent,
//   ModalOverlay,
//   ModalHeader,
//   FormControl,
//   FormLabel,
//   ModalCloseButton,
//   Input,
//   ModalFooter,
// } from "@chakra-ui/react";
// import { MdDelete } from "react-icons/md";
// import { BiEdit } from "react-icons/bi";
// import { useDispatch, useSelector } from "react-redux";
// import { Addproduct, editproduct, getproducts, removeproduct } from "../redux/action";

// function Productupdates() {
//   const [id, setId] = useState();
//   const [edit, setEdit] = useState(false);

//   const [product, setProduct] = useState({
//     title: "",
//     description: "",
//     image: "", // Changed to null for file input
//     price: "",
//   });
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const products = useSelector((state) => state.user.products);
//   const dispatch = useDispatch();

//   const initialRef = useRef(null);
//   const finalRef = useRef(null);

//   async function DeleteCategory(id) {
//     dispatch(removeproduct(id)).then(() => {
//       dispatch(getproducts());
//     });
//   }

//   function handlechange(e) {
//     if (e.target.name === "image") {
//       // For file input
//       setProduct({ ...product, image: e.target.files[0] });
//     } else {
//       // For other inputs
//       setProduct({ ...product, [e.target.name]: e.target.value });
//     }
//   }

//   console.log(product)

//   function HandleSubmit(e) {
//     e.preventDefault();
//     if (edit) {
//       dispatch(editproduct(product, id)).then(() => {
//         dispatch(getproducts());
//       });
//       setEdit(false);
//     } else {
//       dispatch(Addproduct(product)).then(() => {
//         dispatch(getproducts());
//       });
//     }

//     setProduct({
//       title: "",
//       description: "",
//       image: "", // Reset image to null
//       price: "",
//     });
//   }

//   function handleEdit(_id, el) {
//     const { title, description, image, price } = el;
//     setProduct({
//       price,
//       image: null, // Reset image to null
//       description,
//       title,
//     });
//     setId(_id);
//     setEdit(true);
//     onOpen();
//   }

//   useEffect(() => {
//     dispatch(getproducts());
//   }, []);
  
//   return (
//     <div className="flex flex-col gap-3">
//       <div className="flex justify-start">
//         <Button
//           size="md"
//           height="48px"
//           width="200px"
//           border="2px"
//           borderColor="blue.100"
//           className="bg-[#00abc5]"
//           onClick={onOpen}
//         >
//           ADD PRODUCT
//         </Button>
//       </div>
//       <div className="border border-gray-200 rounded-md p-4">
//         <table className="w-full border-collapse border border-gray-200">
//           <thead className="bg-[#3182ce]">
//             <tr>
//               <th className="border border-[#b1aeae] p-2">Image</th>
//               <th className="border border-[#b1aeae] p-2">Name</th>
//               <th className="border border-[#b1aeae] p-2">Price</th>
//               <th className="border border-[#b1aeae] p-2">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {products.map((el, ind) => {
//               return (
//                 <tr key={ind}>
//                   <td className="border border-[#b1aeae] p-2">Image</td>
//                   <td className="border border-[#b1aeae] p-2">{el.title}</td>
//                   <td className="border border-[#b1aeae] p-2">{el.price}</td>
//                   <td className="border border-[#b1aeae] p-2 flex justify-center">
//                     <BiEdit
//                       onClick={() => {
//                         handleEdit(el._id, el);
//                       }}
//                       className="text-xl mr-1"
//                     />
//                     |{" "}
//                     <MdDelete
//                       onClick={() => {
//                         DeleteCategory(el._id);
//                       }}
//                       className="text-xl ml-1"
//                     />
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>

//       <Modal
//         initialFocusRef={initialRef}
//         finalFocusRef={finalRef}
//         isOpen={isOpen}
//         onClose={onClose}
//       >
//         <ModalOverlay />
//         <ModalContent>
//           <ModalHeader>{edit ? "Edit Product" : "Add Product"}</ModalHeader>
//           <ModalCloseButton />
//           <ModalBody pb={6}>
//             <FormControl>
//               <FormLabel>Title</FormLabel>
//               <Input
//                 ref={initialRef}
//                 onChange={handlechange}
//                 name="title"
//                 placeholder="Enter Title"
//                 value={product.title}
//               />
//             </FormControl>

//             <FormControl mt={4}>
//               <FormLabel>Price</FormLabel>
//               <Input
//                 onChange={handlechange}
//                 placeholder="Enter Price"
//                 name="price"
//                 value={product.price}
//               />
//             </FormControl>

//             <FormControl mt={4}>
//               <FormLabel>Image</FormLabel>
//               <Input
//                 onChange={handlechange}
//                 type="file"
//                 name="image"
//                 accept="image/*"
//                 placeholder="Upload Image"
//                 multiple={false}
//               />
//             </FormControl>

//             <FormControl mt={4}>
//               <FormLabel>Description</FormLabel>
//               <Input
//                 onChange={handlechange}
//                 placeholder="Enter Description"
//                 name="description"
//                 value={product.description}
//               />
//             </FormControl>
//           </ModalBody>

//           <ModalFooter>
//             <Button onClick={HandleSubmit} colorScheme="blue" mr={3}>
//               {edit ? "Update" : "Submit"}
//             </Button>
//             <Button onClick={onClose}>Cancel</Button>
//           </ModalFooter>
//         </ModalContent>
//       </Modal>
//     </div>
//   );
// }

// export default Productupdates;
