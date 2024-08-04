/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Container, PostForm } from "../components";
import { useActionData, useNavigate, useParams } from "react-router-dom";
import appwriteSerive from "../appwrite/config";
function EditPost() {
  const [post, setPosts] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      appwriteSerive.getPost(slug).then((post) => {
        if (post) {
          setPosts(post);
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  return post ? (
    <div className="py-8">
      <Container>
        <PostForm posr={post} />
      </Container>
    </div>
  ) : null;
}

export default EditPost;
