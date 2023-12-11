import { useDispatch, useSelector, useStore } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as ActionCreators from '../actions'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch
export const useAppSelector = useSelector
export const useAppStore = useStore

export const useAction = () => {
    const dispatch = useAppDispatch();
    return bindActionCreators(ActionCreators, dispatch);
}