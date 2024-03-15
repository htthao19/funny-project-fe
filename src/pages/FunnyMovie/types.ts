import { RouteComponentProps } from 'react-router';

export interface OwnProps extends RouteComponentProps {}

export interface StateProps {}

export type FunnyMovieProps = OwnProps & StateProps

export interface FunnyMovieState extends StateProps {}
