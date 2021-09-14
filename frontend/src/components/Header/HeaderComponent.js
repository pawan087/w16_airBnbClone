import styles from "../../components/Header/HeaderComponent.module.css";

export default function HeaderComponent() {
  let imgUrl =
    "https://logos-world.net/wp-content/uploads/2020/07/Airbnb-Logo-2008-2014.png";
  return (
    <header className={styles.headerContainer}>
      <div>
        <img className={styles.logo} src={imgUrl} alt="airBnbClone-logo"></img>
      </div>
      <div>
        <input type="text" placeholder='Search around the world'/>
      </div>
      <div>Right</div>
    </header>
  );
}
