import React, { memo, useState } from 'react';
import { Layout, Row, Col, Button, Modal, Input } from 'antd';

import { HeaderProps } from './types';
import './Header.css';

const Header: React.FC<HeaderProps> = memo(props => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [inputValue, setInputValue] = useState('');
	const showModal = () => {
		setIsModalOpen(true);
	};
	const handleOk = () => {
		setIsModalOpen(false);
		if (props.onShareMovieOK) {
			props.onShareMovieOK(inputValue);
		}
	};
	const handleCancel = () => {
		setIsModalOpen(false);
	};

	return (
		<Layout.Header>
			<Row justify='space-around' align='middle'>
				<Col flex='auto' className='logo'>
					Funny Movies
				</Col>
				<Col className='mr-4'>
					<Button onClick={showModal}>Share a movie</Button>
					<Modal 
						title="Share a youtube movie"
						open={isModalOpen}
						onOk={handleOk}
						onCancel={handleCancel}
						destroyOnClose={true}
					>
						<Input placeholder='Youtube URL' onChange={(e) => setInputValue(e.target.value)}></Input>
					</Modal>
				</Col>
				<Col flex='54px'>
					<p className='email'>{props.email}</p>
				</Col>
			</Row>
		</Layout.Header>
	);
});

export default Header
