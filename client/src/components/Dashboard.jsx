// import { useState } from "react";
// import { Button, Container, Row, Col, Modal, Form } from "react-bootstrap";

// const Dashboard = ({ isDarkMode }) => {
//     const [blogTitle, setBlogTitle] = useState("");
//     const [blogImage, setBlogImage] = useState("");
//     const [blogDescription, setBlogDescription] = useState("");
//     const [blogCatagory, setBlogCatagory] = useState("");
//     const [blogTags, setBlogTags] = useState("");
//     const [edit, setEdit] = useState(false);
//     // const [item, setItem] = useState(true);

//   const [show, setShow] = useState(false);

//   const handleClose = () => setShow(false);
//   const handleShow = (e) => {
//     if(e.target.textContent === "Add Blog Item")
//         {
//             setEdit(false);
//             setBlogTitle("");
//             setBlogDescription("");
//             setBlogCatagory("");
//         }    else {
//             setEdit(true);
//             setBlogTitle("My Awsome Title");
//             setBlogDescription("My Awsome Description");
//             setBlogCatagory("");
//         }
//     console.log(e.target.textContent);
//   }

    // const handleTitle = (e) => {
    //     setBlogTitle(e.target.value);
    // }
    // const handleTag = (e) => {
    //     setBlogTags(e.target.value);

    // }
    // const handleCatagory = (e) => {
    //     setBlogCatagory(e.target.value);

    // }
    // const handleDescription = (e) => {
    //     setBlogDescription(e.target.value);

    // }
    // const handleImage = (e) => {
    //     setBlogImage(e.target.value);

    // }
//   return (
//     <>
//       <Container
//         // className="d-flex align-items-center:justify-content-center p-5"
//         fluid
//       >
//         <Button variant="primary" onClick={handleShow}>
//           Add Blog Item
//         </Button>

//         <Modal
//           data-bs-theme={isDarkMode ? "dark" : "light"}
//           show={show}
//           onHide={handleClose}
//         >
//           <Modal.Header closeButton>
//             <Modal.Title>Add Blog Item</Modal.Title>
//           </Modal.Header>
//           <Modal.Header closeButton>
//             <Modal.Title>Edit Blog Item</Modal.Title>
//           </Modal.Header>


//           <Modal.Body>
//             <Form>
//               <Form.Group className="mb-3" controlId="Title">
//                 <Form.Label>Title</Form.Label>
//                 <Form.Control type="text" placeholder="Enter Title" value={blogTitle} />
//               </Form.Group>
//               <Form.Group className="mb-3" controlId="formDescription">
//                 <Form.Label>Description</Form.Label>
//                 <Form.Control as="textarea" placeholder="Enter Description" value={blogDescription} />
//               </Form.Group>
//               <Form.Group>
//                 <Form.Select controlId="Catagory" value={blogCategory} onChange={handleCatagory}>
//                     <option>Select Catagory</option>
//                     <option value="Food">Food</option>
//                     <option value="Fitness">Fitness</option>
//                     <option value="Sports">Sports</option>
//                     <option value="Tech">Tech</option>
//                 </Form.Select>
//               </Form.Group>

//               <Form.Group className="mb-3" controlId="Tags">
//                 <Form.Label>Tags</Form.Label>
//                 <Form.Control type="password" placeholder="Enter Tag" value={blogTags}/ >
//               </Form.Group>
//                 <Form.Group className="mb-3" controlId="Image">
//                     <Form.Label>Pick a Image</Form.Label>
//                     <Form.Control type="file" placeholder="Select an Image from file"  value={blogImage}/>
//                 </Form.Group>
              
//             </Form>
//           </Modal.Body>
//           <Modal.Footer>
//             <Button variant="outline-secondary" onClick={handleClose}>
//               Cancel
//             </Button>
//             <Button variant="outline-primary" onClick={handleClose}>
//               Save Changes
//             </Button>
//             <Button variant="outline-primary" onClick={handleClose}>
//                 Save and Publish
//             </Button>
//           </Modal.Footer>
//         </Modal>
//         {/* <Button variant="outline-primary" onClick={handleShow}>Edit Blog Item</Button> */}
//       </Container>
//     </>
//   );
// };

// export default Dashboard;


import { Button, Container, Modal, Form, Accordion, ListGroup } from "react-bootstrap";

import { useState } from "react";
const Dashboard = ({ isDarkMode }) => {
    const [blogTitle, setBlogTitle] = useState("");
    const [blogImage, setBlogImage] = useState("");
    const [blogDescription, setBlogDescription] = useState("");
    const [blogCategory, setBlogCategory] = useState("");
    const [blogTags, setBlogTags] = useState("");
    const [edit, setEdit] = useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const [blogItems, setBlogItems] = useState([
        {
          Id: 1,
          Title: "Top Finishing and Crossing Drills",
          Publisher: "anonymous",
          Date: "01-13-2022",
          Text: "Developing finishing and crossing skills is an important aspect of soccer that can greatly constribute to your player.",
          Image:
                "./assets/Images/3soccerballs.jpg",
          Published: true
        },
        {
          Id: 2,
          Title: "6 Soccer Drills to Work on Defense",
          Publisher: "anonymous",
          Date: "01-14-2022",
          Text: "A strong defense is the backbone of any successful soccer team",
          Image:
                "./assets/Images/3soccerballs.jpg",
          Published: true
        },
        {
          Id: 3,
          Title: "5 Small Side Games",
          Publisher: "anonymous",
          Date: "01-15-2022",
          Text: "Small-sided games create a fast-paced and intense environment.",
          Image:
                "./assets/Images/3soccerballs.jpg",
          Published: true
        },
        {
          Id: 4,
          Title: "5 Fun 1 V 1 Youth Soccer Activites",
          Publisher: "anonymous",
          Date: "01-15-2022",
          Text: "One of the best ways to naturally bring out the competitive nature.",
          Image:
                "./assets/Images/3soccerballs.jpg",
          Published: false
        },
        {
          Id: 5,
          Title: "5 Fun warm up soccer drills",
          Publisher: "anonymous",
          Date: "01-15-2022",
          Text: "One of the challenges for youth soccer coaches is to make sure their players are always excited to come to practice.",
          Image:
                "./assets/Images/3soccerballs.jpg",
          Published: false
        },
      ]);
    const handleShow = (e) => {setShow(true)



        if(e.target.textContext === "Add Blog Item"){
            setEdit(false);
            SetBlogTitle("")
            setBlogDescription("")
            setBlogCategory("")
        }else{
            setEdit(true);
            SetBlogTitle("awesome title")
            setBlogDescription("awesome description")
            setBlogCategory("Fitness")
        }
   console.log(e.target.textContext, edit)
    }

    const handleTitle = (e) => {
        setBlogTitle(e.target.value);
    }
    const handleTags = (e) => {
        setBlogTags(e.target.value);

    }
    const handleCatagory = (e) => {
        setBlogCatagory(e.target.value);

    }
    const handleDescription = (e) => {
        setBlogDescription(e.target.value);

    }
    const handleImage = (e) => {
        setBlogImage(e.target.value);

    }
  return (
    <>
      <Container
      data-bs-theme={isDarkMode ? "dark" : "light"}
        className={isDarkMode ? "bg-dark text-light" : "bg-light"}
        fluid
      >
        <Button variant="outline-primary" onClick={handleShow}>
          Add Blog Item
        </Button>
        <Button variant="outline-primary" onClick={handleShow}>
          Edit Blog Item
        </Button>
        <Modal
          data-bs-theme={isDarkMode ? "dark" : "light"}
          show={show}
          onHide={handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>{edit ? "Edit" : "Add"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="Title" value={blogTitle}>
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="Enter Title" onChange={handleTitle}/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control as={'textarea'} placeholder="Enter Description" value={blogDescription} onChange={handleDescription} />
              </Form.Group>
              <Form.Group>
                <Form.Select controlId="Category" value={blogCategory} onChange={handleCatagory}>
                    <option>Select Category</option>
                    <option value="Food">Food</option>
                    <option value="Fitness">Fitness</option>
                    <option value="Sports">Sports</option>
                    <option value="Tech">Tech</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3" controlId="Tags">
                <Form.Label>Tags</Form.Label>
                <Form.Control type="text" placeholder="Enter Tag" value={blogTags} onChange={handleTags}/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="Image">
              <Form.Label>Pick an Image</Form.Label>
              <Form.Control type="file" placeholder="Select an Image from file" value={blogImage} onChange={handleImage}/>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleClose}>
              {edit ? "Save Changes" : "Save"}
            </Button>
            <Button variant="primary" onClick={handleClose}>
            {edit ? "Save Changes" : "Save"} and Publish
            </Button>
          </Modal.Footer>
        </Modal>

        <Accordion defaultActiveKey={['0', '1']}>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Accordion Item #1</Accordion.Header>
        <Accordion.Body>
          {
            blogItems.map(item => 
                <List.Group key={item.Id}>{item.Title}
                <Col className="d-flex justify-content-end mx-2">
                <Button variant="outline-danger mx-2" >Delete</Button>
                <Button variant="outline-info mx-2" ><Edit></Edit></Button>
                <Button variant="outline-primary mx-2" >Published</Button>
                </Col>
                </List.Group>
            )
          }
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Accordion Item #2</Accordion.Header>
        <Accordion.Body>
          {
            blogItems(item => item.Published &&
                <ListGroup key={item.Id}>{item.Title}
               
                <Col className="d-flex justify-content-end mx-2">
                <Button variant="outline-danger mx-2" >Delete</Button>
                <Button variant="outline-info mx-2" ><Edit></Edit></Button>
                <Button variant="outline-primary mx-2" >Published</Button>
                </Col>
                </ListGroup>
            )
          }
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
      </Container>
    </>
  );
};
export default Dashboard;







