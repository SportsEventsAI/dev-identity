import React from 'react';

const HomePage = () => {
    return (
        <>
            <div>
                <h1>Dev Identity Demo</h1>
            </div>
            <div className="jumbotron">
                <h1 className="display-4">MSAL 2.x Demo</h1>
                <p className="lead">
                    Integrating Concepts like <em>custom hooks</em>, <em>effects</em>,&nbsp;
                    <em>context</em>, <em>form editing w/ field array</em>,{' '}
                    <em>custom & async debounced form validation</em> and many others.
                </p>
                <hr className="my-4" />
                <p>This demo uses the following packages</p>
                <ul>
                    <li>React</li>
                    <li>Typescript</li>
                    <li>Redux</li>
                    <li>MSAL 2.0 - AD B2C</li>
                    <li>VITE</li>
                </ul>
            </div>
        </>
    );
};
export default HomePage;
