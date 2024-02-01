import React from 'react'
import Header from './components/Header'
import Menu from './components/Menu'

const MainLayer = () => {
	return (
		<div className='bg-gray-50 dark:bg-gray-900'>
			<div className='relative container mx-auto p-2 bg-no-repeat pb-[25%] bg-center'>
				<Header />
				<div className='m-40'>
					<Menu />
				</div>
			</div>
		</div>
	)
}

export default MainLayer
