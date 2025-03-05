import React from "react";

const RunOperator = ({
  titleValue,
  titleChange,
  descriptionValue,
  descriptionChange,
  run,
}) => {
  return (
    <>
      <input
        type="text"
        value={titleValue}
        onChange={(e) => titleChange(e.target.value)}
      />
      <input
        type="text"
        value={descriptionValue}
        onChange={(e) => descriptionChange(e.target.value)}
      />
      <button onClick={run}>Edit course</button>
    </>
  );
};

export default RunOperator;
