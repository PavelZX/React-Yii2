import React, { useState, useEffect, Fragment } from 'react'
import AddArticleForm from './forms/AddArticleForm'
import EditArticleForm from './forms/EditArticleForm'
import ArticleTable from './tables/ArticleTable'
import ApiService from './api/api'

const App = () => {

	const api = new ApiService()
	const articleData = []
	const initialFormState = { id: null, title: '', created_at: '', body: '' }
	const showLimit = 30

	const [ articles, setArticle ] = useState(articleData)
	const [ currentArticle, setCurrentArticle ] = useState(initialFormState)
	const [ editing, setEditing ] = useState(false)

    useEffect(() => {
		api.getArticles()
			.then(data => {
				return data.map(api._transToArticles).slice(0, showLimit)
			})
			.then(data => setArticle(data))
    })

		const addArticle = article => {
		article.id = articles.length + 1

		const res = api.createArticle(article)
		res.then(data => {
			if (data) {
				setArticle([ ...articles, article ])
			} else {
				alert(`Error ${data}`)
			}
		}).catch(reason => console.log(`MESSAGE: ${reason.message}`))

	}

	const deleteArticle = id => {
		setEditing(false)

		const res = api.deleteArticle(id)
		res.then(data => {
			if (data) {
				setArticle(articles.filter(article => article.id !== id))
			} else {
				alert(`Error ${data}`)
			}
		}).catch(reason => console.log(`MESSAGE: ${reason.message}`))
	}

	const updateArticle = (id, updatedArticle) => {
		setEditing(false)

		const res = api.updateArticle(id, updatedArticle)
		res.then(data => {
			if (data) {
				setArticle(articles.map(article => (article.id === id ? updatedArticle : article)));
			} else {
				alert(`Error ${data}`)
			}
		}).catch(reason => console.log(`MESSAGE: ${reason.message}`))

	}

	const editArticleRow = article => {
		setEditing(true)

		setCurrentArticle({ id: article.id, body: article.body, title: article.title })
	}

	return (
		<div className="container">
			<h1>Записки выжившего</h1>
			<div className="flex-row">
				<div className="flex-large">
					{editing ? (
						<Fragment>
							<h2>Изменить статью</h2>
							<EditArticleForm
								editing={editing}
								setEditing={setEditing}
								currentArticle={currentArticle}
								updateArticle={updateArticle}
							/>
						</Fragment>
					) : (
						<Fragment>
							<h2>Добавить публикацию</h2>
							<AddArticleForm addArticle={addArticle} />
						</Fragment>
					)}
				</div>
				<div className="flex-large">
					<h2>Посмотреть статьи</h2>
					<ArticleTable articles={articles} editRow={editArticleRow} deleteArticle={deleteArticle} />
				</div>
			</div>
		</div>
	)
}

export default App
