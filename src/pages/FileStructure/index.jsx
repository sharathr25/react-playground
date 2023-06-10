import { useState } from "react";
import styles from "./index.module.scss";

const files = [
  {
    name: "file 1",
    children: [
      {
        name: "child file 11",
      },
      {
        name: "child file 12",
      },
    ],
  },
  { name: "file2" },
  {
    name: "file 3",
    children: [
      {
        name: "child file 31",
      },
      {
        name: "child file 32",
        children: [
          {
            name: "child file 321",
          },
          {
            name: "child file 322",
          },
        ],
      },
    ],
  },
  { name: "file4" },
];

const File = ({ name, children = [], depth, showChildsInitially = false }) => {
  const [showChilds, setShowChilds] = useState(showChildsInitially);

  const onClick = () => {
    setShowChilds((prev) => !prev);
  };

  return (
    <div className={styles.file} style={{ marginLeft: `${depth * 10}px` }}>
      {name && (
        <div className={styles.name}>
          {children.length ? (
            <button onClick={onClick} className="file__btn">
              {showChilds ? "-" : "+"}
            </button>
          ) : (
            <div className={styles["btn-placeholder"]} />
          )}
          {name}
        </div>
      )}
      {showChilds && children.map((c) => <File {...c} depth={depth + 1} />)}
    </div>
  );
};

const FileStructure = () => {
  return (
    <div className={styles.main}>
      <File children={files} depth={0} showChildsInitially={true} />
    </div>
  );
};

export default FileStructure;
