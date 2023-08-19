import { useState } from "react";
import { files } from "./mockData";

import styles from "./index.module.scss";

const { file, btn, hide } = styles;
const INDENT = 8;

const File = ({ name, files = [], depth }) => {
  const [showFiles, setShowFiles] = useState(depth == 0);

  const onClick = () => setShowFiles((prev) => !prev);

  const renderBtn = () => {
    if (!name) return null;
    if (!files.length) return <button disabled className={`${btn} ${hide}`} />;
    return (
      <button onClick={onClick} className={btn}>
        {showFiles ? "-" : "+"}
      </button>
    );
  };

  const renderFile = (f, i) => <File {...f} depth={depth + 1} key={i} />;

  return (
    <div className={file} style={{ marginLeft: `${depth * INDENT}px` }}>
      {renderBtn()}
      {name}
      {showFiles && files.map(renderFile)}
    </div>
  );
};

const FileStructure = () => (
  <div className={styles.main}>
    <File files={files} depth={0} />
  </div>
);

export default FileStructure;
