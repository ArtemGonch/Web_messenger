import React from 'react'


const Header = () => {
	return (
		<>
			<a
				href='#'
				className='hidden rounded baseline md:block p-3  text-white bg-black  hover:bg-grey-800'
			>
				<div className='flex'>

					<div className='flex flex-col-reverse items-center justify-between space-y-12 md:flex-col md:space-y-0 md:items-start'>
						{/* Logo */}
						<img src='svg/messenger.svg' className='center h-10' alt='' />
					</div>
				</div>
			</a>

		</>
	)
}

export default Header
