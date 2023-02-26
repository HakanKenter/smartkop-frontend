import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import MetaData from '../layout/MetaData'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { updatePassword, loadUser, clearErrors } from '../../actions/userActions'
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants'

const UpdatePassword = () => {

    const [oldPassword, setOldPassword] = useState('')
    const [password, setPassword] = useState('')

    const alert = useAlert();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { error, isUpdated, loading } = useSelector(state => state.user)

    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            alert.success('Mot de passe modifié avec succès !')

            navigate('/me')

            dispatch({
                type: UPDATE_PASSWORD_RESET
            })
        }

    }, [dispatch, /* alert, error,*/ navigate, isUpdated])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('oldPassword', oldPassword);
        formData.set('password', password);

        dispatch(updatePassword(formData))
    }

    return (
        <Fragment>
            <MetaData title={`Modifier mot de passe`} />

            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mt-2 mb-5 f-24 text-center">Modifier mot de passe</h1>
                        <div className="form-group">
                            <label htmlFor="old_password_field">Ancien mot de passe</label>
                            <input
                                type="password"
                                id="old_password_field"
                                className="form-control"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                            />
                        </div>

                        <div classNameName="form-group">
                            <label htmlFor="new_password_field">Nouveau mot de passe</label>
                            <input
                                type="password"
                                id="new_password_field"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button 
                            type="submit" 
                            className="btn update-btn btn-block mt-4 mb-3 py-3"
                            disabled={loading ? true : false}
                        >Modifier</button>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default UpdatePassword