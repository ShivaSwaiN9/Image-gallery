import React from "react";
import { AiOutlineClose } from "react-icons/ai";

const Modal = ({ imageUrl, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-70 transition-opacity ease-in-out duration-300"></div>
      <div className="relative max-w-xl bg-white  rounded-lg shadow-lg overflow-hidden transition-opacity ease-in-out duration-300 transform translate-y-0 opacity-100">
        <div className="max-h-full overflow-auto">
          <img
            src={imageUrl}
            alt="Image"
            className="w-full max-h-96" // Adjust the max height as needed
          />
        </div>
        <button
          onClick={onClose}
          className="absolute top-1 right-1 text-white hover:text-blue-800 transition-colors duration-300"
        >
          <AiOutlineClose size={23} />
        </button>
      </div>
    </div>
  );
};

export default Modal;
