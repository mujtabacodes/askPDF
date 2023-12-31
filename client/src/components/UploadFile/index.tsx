import React, { ChangeEvent, useState } from 'react'
import { Container, Form } from './styled'
import Button from '@components/Button'

const UploadFile = () => {
	const [file, setFile] = useState(useState<File | null>(null))

	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		// Capture the selected file from the input
		if (event.target.files && event.target.files.length > 0) {
			setFile(event.target.files[0])
		}
	}

	const handleSubmit = () => {
		// Create an object of formData
		const formData = new FormData()

		// Update the formData object
		formData.append('file', file)

		// Request made to the backend api
		// Send formData object
		// axios.post('api/uploadfile', formData)
		// 	.then(res => console.log(res))
	}
	return (
		<Container>
			<Form onSubmit={handleSubmit}>
				<input type='file' name='file' onChange={handleFileChange} />
				<Button>submit</Button>
			</Form>
		</Container>
	)
}

export default UploadFile
