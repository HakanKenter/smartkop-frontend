import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

import MetaData from '../layout/MetaData'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { resetPassword, loadUser, clearErrors } from '../../actions/userActions'


const NewPassword = () => {

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const params = useParams()
    const alert = useAlert();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { error, success } = useSelector(state => state.forgotPassword)

    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (success) {
            alert.success('Mot de passe modifié avec succès !');
            navigate('/login');
        }

    }, [dispatch, alert, error, navigate, success])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('password', password);
        formData.set('confirmPassword', confirmPassword);

        dispatch(resetPassword(params.token, formData))
    }

    return (
        <Fragment>

            <MetaData title="Réinitialisation mot de passe" />

            <div className="row wrapper">
            <div className="col-10 col-lg-5">
                <form className="shadow-lg" onSubmit={submitHandler}>
                    <h1 className="mb-3 text-center f-24">Nouveau mot de passe</h1>

                    <div className="form-group">
                        <label htmlFor="password_field">Mot de passe</label>
                        <input
                            type="password"
                            id="password_field"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirm_password_field">Confirmer mot de passe</label>
                        <input
                            type="password"
                            id="confirm_password_field"
                            className="form-control"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    <button
                        id="new_password_button"
                        type="submit"
                        className="btn btn-block py-3"
                        >
                        Enregistrer
                    </button>

                </form>
            </div>
        </div>

        </Fragment>
    )
}

export default NewPassword