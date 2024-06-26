import React, { useState } from "react";
import AnimationWrapper from "../common/AnimationWrapper";
import { animate } from "framer-motion";

const InputArea = ({ level, name, inputType, placeholder, id, value }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <AnimationWrapper initial={{ x: 300 }} animate={{ x: 0 }}>
      <div className="relative">
        <label
          htmlFor={id}
          className="block mb-2 text-sm text-gray-600 dark:text-gray-200"
        >
          {level}
        </label>
        <input
          style={{ border: "1px solid #ccc" }}
          type={
            inputType === "password"
              ? !passwordVisible
                ? "password"
                : "text"
              : ""
          }
          name={name}
          id={id}
          placeholder={placeholder}
          defaultValue={value}
          className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
        />
        {inputType === "password" ? (
          <i
            onClick={() => setPasswordVisible((currentVal) => !currentVal)}
            className={`${
              !passwordVisible ? "fi fi-rr-eye-crossed" : "fi fi-rr-eye"
            } absolute top-10 right-3`}
          ></i>
        ) : (
          ""
        )}
      </div>
    </AnimationWrapper>
  );
};

export default InputArea;
