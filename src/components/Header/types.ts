export interface OwnProps {};

export interface StateProps {
    email: string;
    onShareMovieOK: (url: string) => void;
};

export type HeaderProps = OwnProps & StateProps;
