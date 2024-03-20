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
import { uploadMultiplefiles } from '@/api'
import { useAuthSlice } from '@redux/hooks'
import { IoCloudUploadSharp } from 'react-icons/io5'
import Chat from '@components/Chat'

interface IUserDetails {
	user_id: string
}

const ChooseMultipleFiles = () => {
	const [uploadedFile, setUploadedFile] = useState(false)
	const [files, setFiles] = useState<FileList | null>(null)
	const [filesList, setFilesList] = useState<string[]>([])
	const userDetails = useAuthSlice(e => e.userData) as IUserDetails
	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFiles = event.target.files

		if (selectedFiles) {
			for (let i = 0; i < selectedFiles.length; i++) {
				if (selectedFiles[i].type !== 'application/pdf') {
					console.error('Please select a PDF file.')
					alert('Please select a PDF file.')
					// Clear the input field
					event.target.value = ''
					setFiles(null)
					return // Exit the loop if any file is not a PDF
				}
			}

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
					'user-id': userDetails.user_id,
				},
			})

			if (response.status === 200) {
				alert('File uploaded successfully')
				setFilesList(response.data.files_list)
				setUploadedFile(true)
			} else {
				console.error('File upload failed')
			}
		} catch (error) {
			console.error('Error uploading file:', error)
		}
	}

	return (
		<React.Fragment>
			{!uploadedFile ? (
				<Container>
					<Icon>
						<IoCloudUploadSharp />
					</Icon>
					<Heading>You can choose multiple files to upload</Heading>
					<Form onSubmit={handleSubmit}>
						<input type='file' name='file' onChange={handleFileChange} multiple />
						<Button type='submit'>Upload</Button>
					</Form>
					{/* <Response>{selectedFiles ? <Chat fileName={`${selectedFiles}`} /> : ''}</Response> */}
				</Container>
			) : (
				<Chat fileNames={filesList} />
			)}
		</React.Fragment>
	)
}

export default ChooseMultipleFiles
