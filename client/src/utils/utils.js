export const getStatusAsText = (status) => {
    return status ? 'Needs more motivation' : 'This was already celebrated!';
}

export const getChangeStatusBtnCaption = (status) => {
    return status ? 'Close board' : 'Open Board';
}