import React, { useState, useEffect } from 'react'

const EditArticleForm = props => {
  const [ article, setArticle ] = useState(props.currentArticle);

  useEffect(
    () => {
      setArticle(props.currentArticle)
    },
    [ props ]
  );
  // You can tell React to skip applying an effect if certain values haven’t changed between re-renders. [ props ]

  const handleInputChange = event => {
    const { name, value } = event.target;

    setArticle({ ...article, [name]: value })
  };

  return (
    <form
      onSubmit={event => {
        event.preventDefault();

        props.updateArticle(article.id, article)
      }}
    >
      <label>Заголов</label>
      <input type="text" name="title" value={article.title} onChange={handleInputChange} />
      <label>Текст</label>
      <input type="text" name="body" value={article.body} onChange={handleInputChange} />
      <button>Обновить публикацию</button>
      <button onClick={() => props.setEditing(false)} className="button muted-button">
        Отмена
      </button>
    </form>
  )
}

export default EditArticleForm
