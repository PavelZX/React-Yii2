import React, { useState } from 'react'

const AddArticleForm = props => {
	const initialFormState = { id: null, body: '', title: '' }
	const [ article, setArticle ] = useState(initialFormState)

	const handleInputChange = event => {
		const { name, value } = event.target;

		setArticle({ ...article, [name]: value })
	};

	return (
		<form
			onSubmit={event => {
				event.preventDefault();
				if (!article.body || !article.title){
					return;
				}

				props.addArticle(article);
				setArticle(initialFormState);
			}}
		>
			<label>Заголовок</label>
			<input type="text" name="title" value={article.title} onChange={handleInputChange} />
			<label>Текст</label>
			<input type="text" name="body" value={article.body} onChange={handleInputChange} />
			<button>Добавить публикацию</button>
		</form>
	)
};


export default AddArticleForm
