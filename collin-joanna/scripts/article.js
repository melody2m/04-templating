'use strict';

let articles = [];

function Article (rawDataObj) {
  this.author = rawDataObj.author;
  this.authorUrl = rawDataObj.authorUrl;
  this.title = rawDataObj.title;
  this.category = rawDataObj.category;
  this.body = rawDataObj.body;
  this.publishedOn = rawDataObj.publishedOn;
}

Article.prototype.toHtml = function() {

  let template = $('#article-template').html();
  let templateRender = Handlebars.compile(template);

  // REVIEW: If your template will use properties that aren't on the object yet, add them.
  // Since your template can't hold any JS logic, we need to execute the logic here.
  // The result is added to the object as a new property, which can then be referenced by key in the template.
  // For example, you might want to display how old a post is, or say "(draft)" if it has no publication date:
  this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);


  this.publishStatus = this.publishedOn ? `published ${this.daysAgo} days ago` : '(draft)';

  // REVIEW: The ternary operator above accomplishes this same logic.
  // if(this.publishedOn) {
  //   this.publishStatus = `published ${this.daysAgo} days ago`;
  // } else {
  //   this.publishStatus = '(draft)';
  // }
  return templateRender(this);

};

// COMMENT: Why are there parentheses around "(a,b)" in the .sort() method, but not around the "articleObject" or "article" arguments in the .forEach() methods?

// When using an arrow function, if there is only one argument then you do not need to include parentheses. In the sort() method, there are 2 arguments so parentheses must be included. In the forEach() method, there is only one argument so parentheses can be ommitted. 

rawData.sort((a,b) => {
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

rawData.forEach(articleObject => {
  articles.push(new Article(articleObject));
});

articles.forEach(article => {
  $('#articles').append(article.toHtml());
});
