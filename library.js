let localLen = localStorage.length;
let temp = [];
const element = elementId("bTable");
function local(i) { return JSON.parse(localStorage.getItem(i)) };
function elementId(id) { return document.getElementById(id) };
function showHtml(i) { return (`<td>${i}</td><td><a href="#" id='${i}' onclick='popInfo(this.id);'>${i.title}</a></td>
<td>${i.content}</td><td>${i.author}</td><td>${i.date}</td>`) };
(function() {
  for(let i = 1; i <= localLen; i++) {
      element.innerHTML += showHtml(i);
  };
  for(let i = 0; i < 5 - localLen; i++) {
    element.innerHTML += `<td>-</td><td>-</td><td>-</td><td>-</td><td>-</td>`;
  };
})();
function popInfo(id) {
  elementId("title").value = local(id).title;
  elementId("content").value = local(id).content;
  elementId("author").value = local(id).author;
  elementId("date").value = local(id).date;
  temp.push(Number(id));
};
function inputBook() {
  let title = elementId("title").value;
  let content = elementId("content").value;
  let author = elementId("author").value;
  let date = elementId("date").value;
  temp.length === 0 ? key = localLen + 1 : key = temp[temp.length - 1];
  let book = { key, title, content, author, date };
  localStorage.setItem(key, JSON.stringify(book));
  location.reload();
};
function searchBook(data, sDate, eDate) {
  element.innerHTML = ``;
  if(!data && !sDate) {
      location.reload();
  } else {
    for(let i = 1; i <= localLen; i++) {
      let popData = localStorage.getItem(i).includes(data);
      if(sDate ? popData && sDate <= new Date(local(i).date) && eDate >= new Date(local(i).date) : popData) {
        element.innerHTML += showHtml(i);
      };
    };
  };
};
function deleteBook() {
  for(let i = temp[temp.length - 1]; i <= localLen; i++) {
    if(i === localLen) { break };
    localStorage.setItem(i, localStorage.getItem(i + 1));
  };
  localStorage.removeItem(localLen);
  location.reload();
};