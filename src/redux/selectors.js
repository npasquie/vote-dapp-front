export const getBallotCreationArgs = state => {
    let b = state.ballotCreate;
    return({
        name: b.name,
        question: b.question,
        endDate: b.endDate,
        mails: b.mails,
        extEnabled: b.extEnabled,
        candidateNames: state.candidates.candidateNames
    });};