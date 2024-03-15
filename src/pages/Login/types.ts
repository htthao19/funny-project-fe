import { RouteComponentProps } from 'react-router';

export interface OwnProps extends RouteComponentProps {}

export interface StateProps {
    isLogin: boolean
}

export type LoginProps = OwnProps & StateProps

export interface LoginState extends StateProps {}
