import styles from "../../components/TestSearch/ResultsContainer.module.css";
import InfoCard from "./InfoCard";

export default function ResultsContainer(props) {
  // console.log('yee', props.results[0].name)
  // console.log('eey', props.results[0].Images[0].url)
  const x = new Date(props.startDate);
  const y = new Date(props.endDate);
  const dayCount = (y - x) / 60 / 60 / 1000 / 24;

  return (
    <main>
      <section>
        {!props.results.length && props.startDate && props.endDate && (
          <p>
            Sorry, there are no spots available in {props.input} between{" "}
            {props.startDate} and {props.endDate}.
          </p>
        )}
        {props.results.length > 0 && (
          <p>{props.results.length} Spot(s) Available</p>
        )}

        {props.results.length > 0 && (
          <h1 className={styles.resultsHeader}>Stays in {props.input}</h1>
        )}

        {props.results.map((spot) => (
          <div className={styles.resultsContainer}>
            <InfoCard
              key={spot.id}
              price={spot.price}
              name={spot.name}
              address={spot.address}
              country={spot.country}
              city={spot.city}
              imgUrl={spot.Images[0].url}
            />
          </div>
        ))}
      </section>
    </main>
  );
}
