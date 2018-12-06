import React from 'react'

const Login = ({ inputHandler, loginHandler, username, password }) => (
    <div>
        <h2>Kirjaudu</h2>
        <form onSubmit={loginHandler}>
            <div>
                käyttäjätunnus
                <input name="username"
                    type="text"
                    value={username}
                    onChange={inputHandler}
                />
            </div>
            <div>
                salasana
                <input name="password"
                    type="password"
                    value={password}
                    onChange={inputHandler}
                />
            </div>
            <button type="submit">Kirjaudu</button>
        </form>
    </div>
)

export default Login