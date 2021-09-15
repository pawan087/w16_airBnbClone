export default function ResultsContainer(props) {
  // console.log('yee', props.results[0].name)
  // console.log('eey', props.results[0].Images[0].url)
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
      </section>
    </main>
  );
}
