'use strict';

const baseUrl = 'https://www.googleapis.com/books/v1/volumes?q=isbn:';
let isbn;

google.books.load();

function initialize(){
    // console.log('aaaaa');
    const urlQuery = new URLSearchParams(location.search);
    isbn = urlQuery.get('isbn');
    const url = baseUrl + isbn;
    console.log(url);
    getBookdata(url);
};

function getBookdata(url) {
    $.ajax({
        url: url,
        type: "get",
        cache: false,
        dataType: "json"
    }).done(function(data){
        console.log(data);
        $("#bookimg").attr('src', data.items[0].volumeInfo?.imageLinks.thumbnail);
        $("#title").html(data.items[0].volumeInfo.title);
        $("#publisher").html(data.items[0].volumeInfo.publisher);
        const date = data.items[0].volumeInfo.publishedDate;
        $("#author").html(data.items[0].volumeInfo.authors[0]);
        $("#date").html(date.replace(/-/g, '/'));
        $("#page").html(data.items[0].volumeInfo.pageCount + 'ページ');
        const price = data.items[0].saleInfo.retailPrice.amount;
        $("#price").html(price.toLocaleString() + '円');
        $("#description").html(data.items[0].volumeInfo.description);
        loadBookViewer(isbn);
    });
};

function loadBookViewer(isbn){
    const viewer = new google.books.DefaultViewer(document.getElementById('viewer'));
    viewer.load('ISBN:' + isbn);
}

google.books.setOnLoadCallback(initialize);
