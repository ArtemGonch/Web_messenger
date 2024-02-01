import React from 'react'

const Comments = () => {
	return (
		<div className='flex flex-col justify-between'>
			<p className='max-w-md text-2xl font-bold text-center md:text-2xl md:text-left'>
				Оставь комментарий
			</p>

			<div className='flex space-x-3'>
				<input
					type='text'
					className='flex-1 px-4 rounded focus:outline-none'
					placeholder='Напишите что-нибудь...'
				/>
				<button onClick={() => console.log('Форма отправлена')} className='px-6 py-2 text-white rounded bg-black hover:bg-gray-800 focus:outline-none'>
					Отправить
				</button>
			</div>

			<div className='hidden text-black md:block py-5'>
				Мессенджер &copy; 2023, Все права защищены
			</div>
		</div>
	)
}

export default Comments
