import styles from "../../components/TestSearch/InfoCard.module.css";

export default function InfoCard({
  address,
  country,
  price,
  name,
  city,
  imgUrl,
}) {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.imgContainer}>
        <img
          className={styles.img}
          layout="fill"
          objectFit="cover"
          src={imgUrl}
        />
      </div>

      <div className={styles.results}>
        <div className={styles.detailContainer}>
          <p>{city}</p>
          <div className={styles.heartIcon}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </div>
        </div>

        <h4 className={styles.spotName}>{name}</h4>

        <div className={styles.divisor} />

        <p className={styles.detail}>
          {address} {city} {country}
        </p>

        <div>
          <div>
            <p>{price}</p>
            <p>TOTAL</p>
          </div>
        </div>
      </div>
    </div>
  );
}
