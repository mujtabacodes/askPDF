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
const ChooseOneFile = () => {
	const [selectedOption, setSelectedOption] = useState('')
	const [files, setFiles] = useState([])
	const [fileUploaded, setFileUploaded] = useState(false)
	const userDetails = useAuthSlice(e => e.userData)
	const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSelectedOption(event.target.value)
	}
	const handleSubmit = () => {
		// alert(selectedOption)
		setFileUploaded(true)
	}

	const getFiles = () => {
		const userId = (userDetails as IUserDetails)?.user_id
		try {
			axios
				.get(getFilesAPI, {
					params: { userId }, // Set userId as a parameter object
				})
				.then(response => {
					// Handle the response here, for example:
					console.log('Files retrieved:', response.data)
					setFiles(response.data.files) // Assuming the response contains the files data
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
	}, [setFiles])
	return (
		<Container>
			{!fileUploaded ? (
				<div>
					{files.length > 0 ? (
						<React.Fragment>
							{files.map((fileName, index) => (
								<div key={index}>
									<input
										type='radio'
										id={`option${index}`}
										name='option'
										value={fileName} // Use the file name as the value
										onChange={handleOptionChange}
									/>
									<label htmlFor={`option${index}`} style={{ color: 'black' }}>
										{ExtractFileName(fileName)}
									</label>
								</div>
							))}
							{selectedOption && (
								<Button above={10} primary onClick={handleSubmit}>
									Start Chat
								</Button>
							)}
						</React.Fragment>
					) : (
						<p style={{ color: 'grey' }}>No files available</p>
					)}
				</div>
			) : (
				<div>
					<Chat fileName={selectedOption} />
					{/* <Chat /> */}
				</div>
			)}
		</Container>
	)
}

export default ChooseOneFile
