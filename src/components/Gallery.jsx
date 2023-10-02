import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import imageList from "../utils/images.json";
import axios from "axios";
import SearchBar from "../components/SearchBar";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    loadLocalImages();
  }, []);

  const loadLocalImages = () => {
    setImages(imageList.slice(0, 16));
  };

  const fetchImages = async () => {
    try {
      if (query) {
        const response = await axios.get(
          `https://api.unsplash.com/search/photos/?client_id=m_H-vfexYH2g4aHl5gYT1GFi_ekIim2pdEQ5RwAb1EQ&query=${query}&per_page=12&page=${page}`
        );

        const newImages = response.data.results.map((result) => ({
          id: result.id,
          author: result.user.name,
          download_url: result.urls.regular,
        }));

        // If it's the first page of results, set the new images, otherwise append them
        if (page === 1) {
          setImages(newImages);
        } else {
          setImages([...images, ...newImages]);
        }

        setPage(page + 1);
      } else {
        // Load more local images
        setImages((prevImages) => [
          ...prevImages,
          ...imageList.slice(page * 16, (page + 1) * 16),
        ]);
        setPage(page + 1);
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const handleLoadMore = () => {
    fetchImages();
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const handleSearch = async (query) => {
    try {
      setQuery(query);
      setPage(1); // Reset the page to 1
      if (query) {
        const response = await axios.get(
          `https://api.unsplash.com/search/photos/?client_id=m_H-vfexYH2g4aHl5gYT1GFi_ekIim2pdEQ5RwAb1EQ&query=${query}&per_page=12&page=${1}`
        );
        const newImages = response.data.results.map((result) => ({
          id: result.id,
          author: result.user.name,
          download_url: result.urls.regular,
        }));
        setImages(newImages); // Set the new search results
      } else {
        // Show local images again
        loadLocalImages();
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const handleHomeClick = () => {
    // Reset the query to an empty string and fetch the initial local images
    setQuery("");
    loadLocalImages();
    setPage(1);
  };

  return (
    <div className="container mx-auto py-8">
      <SearchBar onSearch={handleSearch} onClear={handleHomeClick} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((image) => (
          <div
            key={image.id}
            className="relative cursor-pointer transform hover:scale-105 transition-transform duration-300 hover:shadow-lg"
          >
            <img
              src={image.download_url}
              alt={image.author}
              className="w-full h-auto rounded-md"
              onClick={() => handleImageClick(image.download_url)}
            />
            <p className="text-center mt-2 text-gray-800 text-sm font-semibold">
              {image.author}
            </p>
          </div>
        ))}
      </div>
      {images.length > 0 && (
        <div className="text-center mt-6">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300 hover:shadow-md"
            onClick={handleLoadMore}
          >
            Load More
          </button>
        </div>
      )}
      {selectedImage && (
        <Modal imageUrl={selectedImage} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default Gallery;
