import React from 'react'
import Comments from './components/Comments.js'
import Gif from './components/Gif.js'

const Footer = () => {
	return (
		<footer className='bg-yellow-100'>
			<div className='container flex flex-col-reverse justify-between px-6 py-10 mx-auto space-y-8 md:flex-row md:space-y-0'>
				<div className='flex'>
					<Comments />
					<div className='flex flex-col-reverse items-center justify-between space-y-12 md:flex-col md:space-y-0 md:items-start'>
						<img src='svg/site_logo2.svg' className='center h-10' alt='' />
					</div>
				</div>
				<Gif />
			</div>
		</footer>
	)
}

export default Footer
