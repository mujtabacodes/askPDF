import React, { ChangeEventHandler, useEffect, useState } from 'react'
import { Container } from './styled'
import Button from '@components/Button'
import axios from 'axios'
import { getFilesAPI } from '@/api'
import { useAuthSlice } from '@redux/hooks'
import Chat from '@components/Chat'

interface IUserDetails {
	user_id: string
}

const SelectFiles = () => {
	const [selectedOptions, setSelectedOptions] = useState<string[]>([])
	const [files, setFiles] = useState<string[]>([])
	const [fileUploaded, setFileUploaded] = useState(false)
	const userDetails = useAuthSlice(e => e.userData)

	const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const fileName = event.target.value

		// Update selected options based on checkbox state
		if (event.target.checked) {
			setSelectedOptions(prevSelectedOptions => [...prevSelectedOptions, fileName])
		} else {
			setSelectedOptions(prevSelectedOptions =>
				prevSelectedOptions.filter(option => option !== fileName),
			)
		}
	}

	const handleSubmit = () => {
		setFileUploaded(true)
	}

	const getFiles = () => {
		const userId = (userDetails as IUserDetails)?.user_id
		try {
			axios
				.get(getFilesAPI, {
					params: { userId },
				})
				.then(response => {
					console.log('Files retrieved:', response.data)
					setFiles(response.data.files)
				})
				.catch(error => {
					console.error('Error retrieving files:', error)
				})
		} catch (error) {
			console.error('Error occurred:', error)
		}
	}

	const ExtractFileName = (fileName: string) => {
		const cleanedFileName = fileName.substring(fileName.indexOf('-') + 1)
		console.log(cleanedFileName)
		return cleanedFileName
	}

	useEffect(() => {
		getFiles()
	}, [])

	return (
		<Container>
			{!fileUploaded ? (
				<div>
					{files.length > 0 ? (
						<>
							{files.map((fileName, index) => (
								<div key={index}>
									<input
										type='checkbox'
										id={`option${index}`}
										name='option'
										value={fileName}
										onChange={handleOptionChange}
									/>
									<label
										htmlFor={`option${index}`}
										style={{ color: 'black', cursor: 'pointer' }}
									>
										{ExtractFileName(fileName)}
									</label>
								</div>
							))}
							{selectedOptions.length > 0 && (
								<Button above={10} primary onClick={handleSubmit}>
									Start Chat
								</Button>
							)}
						</>
					) : (
						<p style={{ color: 'grey' }}>No files available</p>
					)}
				</div>
			) : (
				<div>
					<Chat fileNames={selectedOptions} />
				</div>
			)}
		</Container>
	)
}

export default SelectFiles
