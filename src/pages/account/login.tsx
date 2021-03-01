import React from 'react'

import { isLoggedIn } from '../../services/auth'

const Login: React.FC<any> = () => (
	<>
		{isLoggedIn() ? (<span>Welcome!</span>) : (<span>you need to log in...</span>)}
	</>
)

export default Login
