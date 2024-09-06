import { Button, Container, Modal, Form, Accordion, ListGroup, Col,  } from "react-bootstrap";
import { useState, useEffect } from "react";
import Spinner from 'react-bootstrap/Spinner';
import { AddBlogItems, checkToken, getItemsByUserId, GetLoggedInUser, LoggedInData, updateBlogItems } from "../Services/DataService";
import {useNavigate} from 'react-router-dom';
const Dashboard = ({ isDarkMode, onLogin }) => {
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
    const [isLoading, setIsLoading] = useState(true);
    const [blogID, setBlogID] = useState(0);
    const [isDeleted, setIsDeleted] = useState(false);
    const [isPublished, setIsPublished] = useState(false);
    

    const [blogItems, setBlogItems] = useState([]);
    const handleShow = (e, {id,blogID, publisherName, userID,description, title, category, tag, image, edit, isDeleted, isPublished}) => {setShow(true)
        


        if(e.target.textContext === "Add Blog Item"){
            setEdit(false);
           
            console.log(e.target.textContext, edit);
        }else{
          console.log(e.target.textContext, edit);
          setEdit(true);
        }
        setBlogTitle(title);
        setBlogID(id);
        setUserID(userID);
        setPublisherName(publisherName);
        setIsDeleted(isDeleted);
        setIsPublished(isPublished);
        setBlogDescription(description);
        setBlogCategory(category);
        setBlogTags(tag);
        setBlogImage(image);
   
    };

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

    //Load Data
    const loadUserData = async () => {
      let userInfo = LoggedInData();
      onLogin(userInfo);
      setUserID(userInfo.userId);
      setPublisherName(userInfo.publisherName);
      console.log("User Info:", userInfo);
      setTimeout(async () => {
        let userBlogItems = await getItemsByUserId(userInfo.userId);
        setBlogItems(userBlogItems);
        setIsLoading(false);
        
        setBlogID(userID);
      console.log("Loaded blog items:", userBlogItems);
      },1000)
      
    }

    //useEffect is the first thing that fires onload.
    useEffect(() => {
      
    if(!checkToken())
    {
      navigate('/Login');
    }
    loadUserData();
    }, [])

    const handleImage = async (e) => {
      let file = e.target.files[0];
     const reader = new FileReader();
     reader.onloadend = () => {
      console.log(reader.result);
      setBlogImage(reader.result);
     }
     reader.readAsDataURL(file);

    }

    //function to help us handle publishj and unpublish
    const handlePublish = async  (item) => {
      item.isPublished = !item.isPublished;
      let result = await updateBlogItems(item);
      if(result)
      {
        const { userId } = JSON.parse(localStorage.getItem("UserData"));
        setBlogItems(userBlogItems);
      }else{
        alert(`Blog Item not ${edit ? "updated" : "Added"}`);
      }
    }
    
    const handleSave = async ({target:{textContent}}) => {
      let {publisherName, userId} = LoggedInData();
      
      const published = {
        Id: edit ? blogID : 0,
        UserId: userId,
        PublisherName: publisherName,
        Tag: blogTags,
        Title: blogTitle,
        Image: blogImage,
        Description: blogDescription,
        Date: new Date(),
        Category: blogCategory,
        IsPublished: textContent === "Save" || textContent == "Save Changes" ? false:true,
        IsDeleted: false

      }
      console.log(published)
      handleClose();
      let result = false;
      if(edit)
      {
        result = await updateBlogItems(published);
        
      }else {
        result = await AddBlogItems(published)
      }

    
      if(result)
      {
        let userBlogItems = await getItemsByUserId(userId)
        setBlogItems(userBlogItems);
        console.log(userBlogItems, "This is from our UserBlogItems");
      }else {
        alert(`Blog Items not ${edit ? "Update" : "Added"}`)
      }
    }

    const handleDelete = async (item) =>
      {
        // remember we are not actually deleting we're just seting the usestate to true or false
        item.isDeleted = !item.isDeleted;
        let result = await updateBlogItems(item);
        if(result)
        {
          let userBlogItems = await getItemsByUserId(item.userId);
          setBlogItems(userBlogItems);
        }else {
          alert(`Blog item not ${edit ? "Updated" : "Added"}`);
        }
      }

      


      // const handleSaveWithUnpublished = async () => {
      //   let {publisherName, userId} = LoggedInData();
      //   const notPublished = {
      //     Id: 0,
      //     UserId: userID,
      //     PublisherName: publisherName,
      //     Tag: blogTags,
      //     Title: blogTitle,
      //     Description: blogDescription,
      //     Date: new Date(),
      //     Category: blogCategory,
      //     IsPublished: false,
      //     IsDeleted: false
  
      //   }
      //   console.log(notPublished)
      //   handleClose();
      //   let result = await AddBlogItems(notPublished)
      //   if(result)
      //   {
      //     let userBlogItems = await getItemsByUserId(userId)
      //     setBlogItems(userBlogItems);
      //     console.log(userBlogItems, "This is from our UserBlogItems");
      //   }
      //   console.log(notPublished)
      // }

  return (
    <>

      <Container
      data-bs-theme={isDarkMode ? "dark" : "light"}
        className={isDarkMode ? "bg-dark text-light" : "bg-light"}
        fluid
      >
        <Button variant="outline-primary" onClick={(e) => handleShow(e,{id:0,userID:userID,title:"",description:"", category:"", tag:"", image:"", isDeleted:false, isPublished:false, publisherName:publisherName})}>
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
              <Form.Group className="mb-3" controlId="Title" >
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="Enter Title" onChange={handleTitle} value={blogTitle}/>
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
            <Button variant="primary" onClick={handleSave}>
              {edit ? "Save Changes" : "Save"}
            </Button>
            <Button variant="primary" onClick={handleSave}>
            {edit ? "Save Changes" : "Save"} and Publish
            </Button>
          </Modal.Footer>
        </Modal>
        {isLoading ? <><Spinner animation="border" variant="success" /><h2>dot loading....</h2> </> : 
        blogItems.length == 0 ? <><h2 className="text-center">No blog items found</h2> </> : 
        <Accordion defaultActiveKey={['0', '1']}>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Accordion Item #1</Accordion.Header>
        <Accordion.Body>
          {
            blogItems.map((item, i) => item.isPublished &&
            <ListGroup key={i}>{item.title}
                <Col className="d-flex justify-content-end mx-2">
                <Button variant="outline-danger mx-2" onClick={() => handleDelete(item)} >Delete</Button>
                <Button variant="outline-info mx-2" onClick={(e) => handleShow(e,item)} >Edit</Button>
                <Button variant="outline-primary mx-2" onClick={() => handlePublish( item)} >UnPublished</Button>
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
                <Button variant="outline-info mx-2" onClick={(e) => handleShow(e,item)} >Edit</Button>
                <Button variant="outline-primary mx-2" onClick={() => handlePublish( item)}>Published</Button>
                </Col>
                </ListGroup>
            )
          }
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
    }
   
      </Container>
    </>
  );
};

export default Dashboard;







