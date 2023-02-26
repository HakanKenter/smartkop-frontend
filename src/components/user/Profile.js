import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'

const Profile = () => {

    const { user, loading } = useSelector(state => state.auth)

    return (
        <Fragment>
            {loading ? <Loader/> : (
                <Fragment>
                    <MetaData title={`Mon Profil`} />

                    <h2 className="text-center f-24 m-60">Mon Profil</h2>
                    <div className="row justify-content-around mt-5 user-info" style={{"marginBottom": "80px"}}>
                        <div className="col-12 col-md-3 text-center">
                            <figure className='avatar avatar-profile'>
                                <img className="rounded-circle img-fluid" src={user.avatar.url} alt={user.name} />
                            </figure>
                            <Link to="/me/update" id="edit_profile" className="btn btn-primary btn-block my-5">
                                Éditer mon profil
                            </Link>
                        </div>
                
                        <div className="col-12 col-md-5 user-info-text">
                            <h4>Nom</h4>
                            <p>{user.name}</p>
                
                            <h4>Email</h4>
                            <p>{user.email}</p>

                            <h4>Création</h4>
                            <p>{String(user.createdAt).substring(0, 10)}</p>

                            {user.role !== 'admin' && (
                                <Link to="/orders/me" className="btn btn-danger btn-block mt-5">
                                    Mes Commandes
                                </Link>
                            )}

                            <Link to="/password/update" className="btn btn-primary btn-block mt-3">
                                Changer le mot de passe
                            </Link>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}

export default Profile