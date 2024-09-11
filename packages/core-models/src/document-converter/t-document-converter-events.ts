export type TDocumentConverterEvents = {
    loadingDocError: [error: Error];
    loadingDocStart: [];
    loadingDocSuccess: [];
    convertingDocError: [error: Error];
    convertingDocStart: [];
    convertingDocSuccess: [];
    savingOutputError: [error: Error];
    savingOutputStart: [];
    savingOutputSuccess: [];
};
