function SavedWords(props) {
  return (
    <div className="row">
      <div className="col">
        Saved words: <span id="saved_words">{props.cont}</span>
      </div>
    </div>
  );
}

export default SavedWords;
