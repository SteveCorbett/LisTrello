// Yes, I know my Trello API key is here but any web jockey could find
// it in 2 seconds by examining the API calls from the browser!
const state = {
  appName: "LisTrello",
  trelloKey: "8eb145825a2805f8c4861ccb66312d23",
  trelloApiUrl: "https://api.trello.com/1",
  trelloUserToken: null,
  boards: [],
  background: "#2238c9",
  currentBoard: null,
  currentLists: [],
  isSubmittingForm: false,
};

export default state;
