// src/pages/Article.js
import React from 'react';
import ArticlePage from './ArticlePage';

const articleData = {
  id: 1,
  title: 'Sample Article Title',
  content: `
    <p>This is the opening paragraph of the article. It provides an introduction and some initial information about the topic.</p>
    <p>This is the second paragraph of the article. It continues to build on the introduction and provide more details.</p>
    <p>This is the third paragraph of the article. As you continue reading, more details and insights are shared.</p>
    <p>This is the fourth paragraph of the article. The information becomes more in-depth and detailed.</p>
    <p>This is the fifth paragraph of the article. Additional insights and information are provided here.</p>
    <p>This is the sixth paragraph of the article. The content continues with more information.</p>
    <p>This is the seventh paragraph of the article. As you approach the middle of the article, more details are shared.</p>
    <p>This is the eighth paragraph of the article. The article continues to provide valuable insights.</p>
    <p>This is the ninth paragraph of the article. The content remains engaging and informative.</p>
    <p>This is the tenth paragraph of the article. The article is nearing its conclusion with final insights.</p>
    <p>This is the eleventh paragraph of the article. The conclusion provides a summary and final thoughts.</p>
  `,
  thumbnail: 'https://via.placeholder.com/300',
};

const Article = () => {
  return <ArticlePage article={articleData} />;
};

export default Article;
