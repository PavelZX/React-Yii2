import React from 'react'

const ArticleTable = props => (
    <table>
        <thead>
        <tr>
            <th>Заголовок</th>
            <th>Время создания</th>
            <th>Текст</th>
        </tr>
        </thead>
        <tbody>
        {props.articles.length > 0 ? (
            props.articles.map(article => (
                <tr key={article.id}>
                    <td>{article.title}</td>
                    <td>{article.created_at}</td>
                    <td>{article.body}</td>
                    <td>
                        <button
                            onClick={() => {
                                props.editRow(article)
                            }}
                            className="button muted-button"
                        >
                            Редактировать
                        </button>
                        <button
                            onClick={() => props.deleteArticle(article.id)}
                            className="button muted-button"
                        >
                            Удалить
                        </button>
                    </td>
                </tr>
            ))
        ) : (
            <tr>
                <td colSpan={3}>Нет публикаций</td>
            </tr>
        )}
        </tbody>
    </table>
);

export default ArticleTable
