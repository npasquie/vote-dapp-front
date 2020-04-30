import React from "react";
import VoteTitle from "./VoteTitle";
import TopBar form "./TopBar";
import ElectionResult from "./ElectionResult";


function handleError(error) {
    console.log(error);
    return(
        <>
            Erreur. Ouvrez la console pour voir le rapport d'erreur.
        </>
    );
}
function Resultpage() {
  return(
    <div className="result-page">
      <TopBar/>
      <VoteTitle/>
      <ElectionResult/>
  );
}

ReactDOM.render(
    <Provider store={store}>
        <Resultpage/>
    </Provider>
    , document.getElementById('root')
);
