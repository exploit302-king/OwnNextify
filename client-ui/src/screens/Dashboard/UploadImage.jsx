import React, { useState, useEffect } from 'react';
import { Button } from '@headlessui/react';
import { useAuth } from '../../context/auth';

const UploadImage = () => {
  const [auth, setAuth] = useAuth();
  const [selectedImage, setSelectedImage] = useState();
  const [preview, setPreview] = useState();

  // Load image from localStorage or from auth context
  useEffect(() => {
    setPreview(auth?.user?.profileImage || 'https://via.placeholder.com/150');
  }, [auth]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setSelectedImage(file);
      setPreview(imageURL);
      // localStorage.setItem('profileImage', imageURL); // Save image URL in localStorage
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedImage) {
      const formData = new FormData();
      formData.append('profileImage', selectedImage);

      try {
        // Make API call to upload image
        const response = await fetch(
          "http://localhost:8080/api/v1/users/upload-image",
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
            body: formData,
          });

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          const { imageUrl } = data; // Assuming the API returns the image URL

          // Update the user's profile image in auth context
          const updatedAuth = {
            ...auth,
            user: {
              ...auth.user,
              profileImage: imageUrl,
            },
          };

          setAuth(updatedAuth);

          localStorage.setItem("auth", JSON.stringify(updatedAuth));

          setPreview(imageUrl);
          alert('Profile image uploaded successfully!');
        } else {
          const errorData = await response.json();
          alert('Image upload failed: ' + errorData.message || 'Unknown error');
        }
      } catch (error) {
        console.error('Error uploading image:', error.message);
        alert('An error occurred. Please try again.');
      }
    } else {
      alert('Please select an image to upload.');
    }
  };

  return (
    <div className="flex items-center ml-60 justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-purple-600 mb-4">Upload Profile Image</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col items-center">
            <img
              src={preview}
              alt="Preview"
              className="w-32 h-32 rounded-full border-2 border-gray-300 object-cover mb-4"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              id="fileInput"
            />
            <label
              htmlFor="fileInput"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700"
            >
              Choose Image
            </label>
          </div>
          <Button
            type="submit"
            className="w-full py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 focus:outline-none focus:ring focus:ring-green-300"
          >
            Upload Image
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UploadImage;
