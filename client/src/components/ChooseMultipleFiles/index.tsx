import React, { useState } from 'react'
import {
	Container,
	Form,
	Heading,
	Icon,
	Response,
	styledButton as Button,
} from './styled'
import axios from 'axios'
import { T16Bold } from '@styles/typo'
import { uploadMultiplefiles, uploadSingleFile } from '@/api'
import { useAuthSlice } from '@redux/hooks'
import { IoCloudUploadSharp } from 'react-icons/io5'

const ChooseMultipleFiles = () => {
	const [files, setFiles] = useState<FileList | null>(null)
	const userDetails = useAuthSlice(e => e.userData)
	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFiles = event.target.files

		if (selectedFiles) {
			// Check if the selected files are PDF or any validation
			// You can iterate through the FileList if needed
			setFiles(selectedFiles)
		}
	}

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		if (!files || files.length === 0) {
			console.error('No file selected')
			return
		}

		try {
			const formData = new FormData()
			for (let i = 0; i < files.length; i++) {
				formData.append('files', files[i])
			}

			console.log('Files:', files)

			const response = await axios.post(uploadMultiplefiles, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
					user_id: `${userDetails.user_id}`,
				},
			})

			if (response.status === 200) {
				alert('File uploaded successfully')
				setFiles(null)
			} else {
				console.error('File upload failed')
			}
		} catch (error) {
			console.error('Error uploading file:', error)
		}
	}

	return (
		<Container>
			<Icon>
				<IoCloudUploadSharp />
			</Icon>
			<Heading>You can choose multiple files to upload</Heading>
			<Form onSubmit={handleSubmit}>
				<input type='file' name='file' onChange={handleFileChange} />
				<Button type='submit'>Upload</Button>
			</Form>
			<Response>
				<Form></Form>
			</Response>
		</Container>
	)
}

export default ChooseMultipleFiles
