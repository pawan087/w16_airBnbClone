import { useHistory } from "react-router-dom";

import styles from "../../components/Banner/BannerComponent.module.css";

export default function BannerComponent() {
  const history = useHistory();

  const linkMe = (e) => {
    e.preventDefault();
    history.push(`/spots`);
  };

  let imgUrl =
    "https://a0.muscache.com/im/pictures/57b9f708-bb12-498c-bc33-769f8fc43e63.jpg?im_w=2560";

  return (
    <div className={styles.splashContainer}>
      <img className={styles.bannerImg} alt='splashImg' src={imgUrl}></img>

      <div className={styles.splashText}>
        <p>Not sure where to go? Perfect.</p>

        <button onClick={(e) => linkMe(e)} className={styles.splashBtn}>
          I'm flexible
        </button>
      </div>
    </div>
  );
}
