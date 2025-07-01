import { BounceLoader } from "react-spinners";

import styles from "./Loader.module.scss";

function Loader() {
  return (
    <div className={styles.loaderContainer}>
      <BounceLoader
        color="#004cff"
        cssOverride={{ margin: "0 auto", borderColor: "#f1f1f1" }}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

export { Loader };
