import React, { useState } from 'react'
import { Container, Form, Response } from './styled'
import Button from '@components/Button'
import axios from 'axios' // Don't forget to import axios
import { T16Bold } from '@styles/typo'
import { uploadSingleFile } from '@/api'
import { useAuthSlice } from '@redux/hooks'

const UploadFile = () => {
	const [file, setFile] = useState<File | null>(null)
	const userDetails = useAuthSlice(e => e.userData)
	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFile = event.target.files?.[0]
		console.log(file)
		if (selectedFile) {
			// Check if the selected file is a PDF
			if (selectedFile.type === 'application/pdf') {
				setFile(selectedFile)
			} else {
				console.error('Please select a PDF file.')
				alert('Please select a PDF file.')
				// Clear the input field
				event.target.value = ''
				setFile(null)
			}
		}
	}

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		if (!file) {
			console.error('No file selected')
			return
		}

		try {
			const formData = new FormData()
			formData.append('file', file)
			console.log(file)

			const response = await axios.post(uploadSingleFile, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
					user_id: `${userDetails.user_id}`,
				},
			})
			if (response.status === 200) {
				alert('File upload successfully')
			} else {
				console.error('Registration failed')
			}
		} catch (error) {
			console.error('Error uploading file:', error)
		}
	}

	return (
		<Container>
			<Form onSubmit={handleSubmit}>
				<input type='file' name='file' onChange={handleFileChange} />
				<Button type='submit'>Submit</Button>
			</Form>
			<Response>
				<Form>
					<T16Bold>{`${file}`}</T16Bold>
				</Form>
			</Response>
		</Container>
	)
}

export default UploadFile
