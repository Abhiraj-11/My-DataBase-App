import React from "react";
import loading from "../Gif/Loading.gif";

const Loading = () => {
  return (
    <section>
      <img src={loading} style={{ width: "300px" }} alt="" />
    </section>
  );
};

export default Loading;
