import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Footer2 = () => {

    const { user, loading } = useSelector(state => state.auth)

    return (

        <div className="footer-section">
            <footer className="section-footer bg-white border-top">
                <div className="container">
                    <section className="footer-main padding-y">
                        <div className="row">
                            <aside className="col-12 col-sm-12 col-lg-4 all-rights">
                                <article className="me-lg-4">
                                    <p className="mt-3"> © 2023 SmartKop. <br /> Tous droits réservés. </p>
                                </article>
                            </aside>
                            <aside className="col-12 col-sm-4 col-lg-2">
                                <h6 className="title">SMARTKOP</h6>
                                <ul className="list-menu mb-4">
                                    <li>
                                        <a href="#newProduct">Nouveau</a>
                                    </li>
                                    <li>
                                        <a href="#category-nav-block-recommended"> Recommandé </a>
                                    </li>
                                    <li>
                                        <a href="#best-seller">Meilleures notes</a>
                                    </li>
                                    <li>
                                        <Link to={`/products-search?search=carte`}>Carte graphique</Link>
                                    </li>
                                    <li>
                                        <Link to={`/products-search?search=macbook`}>Ordinateur</Link>
                                    </li>
                                    <li>
                                        <Link to={`/products-search?search=cable`}>Câble</Link>
                                    </li>
                                </ul>
                            </aside>
                            <aside className="col-12 col-sm-4 col-lg-3">
                                <h6 className="title">INFORMATIONS LEGALES</h6>
                                <ul className="list-menu mb-4">
                                    <li> <a href="legal-notice">Mentions légales</a></li>
                                    <li> <a href="cgv">Conditions Générales de Vente</a></li>
                                    <li> <a href="privacy-policy">Politique de confidentialité</a></li>
                                </ul>
                            </aside>
                            <aside className="col-12 col-sm-4 col-lg-3">
                                <h6 className="title">SUPPORT</h6>
                                    {user ? (
                                        <ul className="list-menu mb-4">

                                            <li><Link to="/me">Compte</Link></li>
                                            <li><Link to="/orders/me">Mes Commandes</Link></li>
                                        </ul>
                                        ): !loading && (
                                        <ul className="list-menu mb-4">
                                           <li><Link to="/login">Connexion</Link></li>
                                           <li><a href="mailto:hakan.kt@oulook.fr">Contacter le service client</a></li>
                                        </ul>
                                    )}
                            </aside>
                        </div>
                    </section>

                </div>
            </footer>

        </div>

    )
}

export default Footer2