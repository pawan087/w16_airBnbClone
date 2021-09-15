import styles from "../../components/Banner/BannerComponent.module.css";

export default function BannerComponent() {
  let imgUrl =
    "https://a0.muscache.com/im/pictures/57b9f708-bb12-498c-bc33-769f8fc43e63.jpg?im_w=2560";
  return (
    <div className={styles.splashContainer}>
      <img className={styles.bannerImg} src={imgUrl}></img>
      <div className={styles.splashText}>
        <p>Not sure where to go? Perfect.</p>
        <button className={styles.splashBtn}>I'm flexible</button>
      </div>
    </div>
  );
}
