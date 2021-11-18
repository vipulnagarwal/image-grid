function getPageId(n) {
  return "article-page-" + n;
}

function getDocumentHeight() {
  const body = document.body;
  const html = document.documentElement;

  return Math.max(
    body.scrollHeight,
    body.offsetHeight,
    html.clientHeight,
    html.scrollHeight,
    html.offsetHeight
  );
}

function getScrollTop() {
  return window.pageYOffset !== undefined
    ? window.pageYOffset
    : (document.documentElement || document.body.parentNode || document.body)
        .scrollTop;
}

function getArticleImage(page) {
  let hash =
    Math.floor(Math.random() * 9) * 100 + Math.floor(Math.random() * page);
  if (hash < 200) {
    hash = 500 + Math.floor(Math.random() * page);
  }
  const image = new Image();
  image.className =
    "img article-list__item__image article-list__item__image--loading";
  image.src = "https://picsum.photos/500/" + hash;

  image.onload = function () {
    image.classList.remove("article-list__item__image--loading");
  };

  return image;
}

function getArticle(page) {
  const articleImage = getArticleImage(page);
  const article = document.createElement("article");
  article.className = "article-list__item";
  article.appendChild(articleImage);

  return article;
}

function getArticlePage(page, articlesPerPage = 12) {
  const pageElement = document.createElement("div");
  pageElement.id = getPageId(page);
  pageElement.className = "article-list__page grid-wrapper";

  while (articlesPerPage--) {
    pageElement.appendChild(getArticle(page));
  }

  return pageElement;
}

function addPaginationPage(page) {
  const pageLink = document.createElement("a");
  pageLink.href = "#" + getPageId(page);
  pageLink.innerHTML = page;

  const listItem = document.createElement("li");
  listItem.className = "article-list__pagination__item";
  listItem.appendChild(pageLink);

  articleListPagination.appendChild(listItem);

  if (page === 2) {
    articleListPagination.classList.remove(
      "article-list__pagination--inactive"
    );
  }
}

function fetchPage(page) {
  articleList.appendChild(getArticlePage(page));
}

function addPage(page) {
  fetchPage(page);
  addPaginationPage(page);
}

const articleList = document.getElementById("article-list");
const articleListPagination = document.getElementById(
  "article-list-pagination"
);
let page = 1;

addPage(++page);

window.onscroll = function () {
  console.log(getDocumentHeight());
  console.log("getScrollTop()==>", getScrollTop());
  if (getScrollTop() < getDocumentHeight() - (window.innerHeight + 100)) {
    return;
  }
  addPage(++page);
};
