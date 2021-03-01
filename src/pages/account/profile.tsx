import React from 'react'

import { user } from '../../services/auth'

const Profile: React.FC = () => (
	<>
		<h1>Hi {user()?.user_metadata?.full_name}!</h1>
	</>
)

export default Profile
