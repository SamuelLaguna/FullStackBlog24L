import { Button, Container, Modal, Form, Accordion, ListGroup, Col,  } from "react-bootstrap";
import { useState, useEffect } from "react";

import { AddBlogItems, checkToken, getItemsByUserId, GetLoggedInUser, LoggedInData } from "../Services/DataService";
import {useNavigate} from 'react-router-dom';
const Dashboard = ({ isDarkMode }) => {
    const [blogTitle, setBlogTitle] = useState("");
    const [blogImage, setBlogImage] = useState("");
    const [blogDescription, setBlogDescription] = useState("");
    const [blogCategory, setBlogCategory] = useState("");
    const [blogTags, setBlogTags] = useState("");
    const [edit, setEdit] = useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [userID, setUserID] = useState(0);
    const [publisherName, setPublisherName] = useState('');

    const [blogItems, setBlogItems] = useState([]);
    const handleShow = (e) => {setShow(true)



        if(e.target.textContext === "Add Blog Item"){
            setEdit(false);
            SetBlogTitle("")
            setBlogDescription("")
            setBlogCategory("")
        }else{
            setEdit(true);
            setBlogTitle("awesome title")
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
        setBlogCategory(e.target.value);

    }
    const handleDescription = (e) => {
        setBlogDescription(e.target.value);

    }
    // const handleImage = (e) => {
    //     setBlogImage(e.target.value);

    // }

    



    let navigate = useNavigate();
    //useEffect is the first thing that fires onload.
    useEffect(() => {
      
    if(!checkToken())
    {
      navigate('/Login');
    }
    }, [])

    const handleImage = async (e) => {
      let file = e.target.files[0];
     const reader = new FileReader();
     reader.onloadend = () => {
      console.log(reader.result);
     }
     reader.readAsDataURL(file);

    }
    
    const handleSaveWithPublish = async () => {
      let {publisherName, userId} = LoggedInData();
      
      const published = {
        Id: 0,
        UserId: userId,
        PublisherName: publisherName,
        Tag: blogTags,
        Title: blogTitle,
        Description: blogDescription,
        Date: new Date(),
        Category: blogCategory,
        IsPublished: true,
        IsDeleted: false

      }
      console.log(published)
      handleClose();
      let result = await AddBlogItems(published)
      if(result)
      {
        let userBlogItems = await getItemsByUserId(userId)
        setBlogItems(userBlogItems);
        console.log(userBlogItems, "This is from our UserBlogItems");
      }
    }


      const handleSaveWithUnpublished = () => {
        let {publisherName, userId} = LoggedInData();
        const notPublished = {
          Id: 0,
          UserId: userID,
          PublisherName: publisherName,
          Tag: blogTags,
          Title: blogTitle,
          Description: blogDescription,
          Date: new Date(),
          Category: blogCategory,
          IsPublished: false,
          IsDeleted: false
  
        }
        console.log(notPublished)
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
              <Form.Group controlId="Category">
                <Form.Label  >Category</Form.Label>
                <Form.Select  value={blogCategory} onChange={handleCatagory}>
                    <option>Select Category</option>
                    <option value="Food">Food</option>
                    <option value="Fitness">Fitness</option>
                    <option value="Sports">Sports</option>
                    <option value="Tech">Tech</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3" controlId="Tags" >
                <Form.Label>Tags</Form.Label>
                <Form.Control type="text" placeholder="Enter Tag" value={blogTags} onChange={handleTags}/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="Image">
              <Form.Label>Pick an Image</Form.Label>
              <Form.Control type="file" placeholder="Select an Image from file" accept="image/png,image/jpg"  onChange={handleImage}/>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSaveWithUnpublished}>
              {edit ? "Save Changes" : "Save"}
            </Button>
            <Button variant="primary" onClick={handleSaveWithPublish}>
            {edit ? "Save Changes" : "Save"} and Publish
            </Button>
          </Modal.Footer>
        </Modal>

        <Accordion defaultActiveKey={['0', '1']}>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Accordion Item #1</Accordion.Header>
        <Accordion.Body>
          {
            blogItems.map((item, i) => item.isPublished &&
            <ListGroup key={i}>{item.title}
                <Col className="d-flex justify-content-end mx-2">
                <Button variant="outline-danger mx-2" >Delete</Button>
                <Button variant="outline-info mx-2" >Edit</Button>
                <Button variant="outline-primary mx-2" >Published</Button>
                </Col>
                </ListGroup>
            )
          }
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Accordion Item #2</Accordion.Header>
        <Accordion.Body>
          {
            blogItems.map((item, i) => item.isPublished &&
                <ListGroup key={i}>{item.title}
               
                <Col className="d-flex justify-content-end mx-2">
                <Button variant="outline-danger mx-2" >Delete</Button>
                <Button variant="outline-info mx-2" >Edit</Button>
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







