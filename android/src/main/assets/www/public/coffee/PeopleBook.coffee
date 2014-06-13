$(document).on "deviceready", ()->
  $(".actionbar .page-title").text "读书记录和书评"
  CenterTitle()

  window.nickname = unescape getQueryString "nickname"
  window.pageNum = 1

  $(document).on("click", "#readTab", null, ()->
    RequestReadBooks()
    return)

  $(document).on("click", "#wantTab", null, ()->
    RequestWantBooks()
    return)

  peopleWantBook = template "People/Books"
  $(".container").replaceWith peopleWantBook()

  RequestReadingBooks()
  return

RequestReadingBooks = ()->
  RequestAjax "GET", "/mj/people/#{window.nickname}/book/reading", {}, DidGetPeopleBookData, FailGetPeopleBookData
  return

DidGetPeopleBookData = (data, rawData)->
  peopleWantBook = template "People/BooksReading"
  htmlString = peopleWantBook(data.Data)
  if htmlString.search("Template Error") < 0
    $("#reading").html htmlString
  else
    ShowLoadingError()
    return

  if data.Data.IsMySelf
    $("#readTab").text "我读过的"
    $("#wantTab").text "我想读的"
  else
    $("#readTab").text "Ta读过的"
    $("#wantTab").text "Ta想读的"


  $(".readingBook").each (index)->
    $(this).find(".bookCover").height $(this).find(".bookCover").width() * 4 / 3
    return
  return

FailGetPeopleBookData = (data, rawData)->
  return

RequestReadBooks = ()->
  data = {
    name: window.nickname,
    pageNum: window.pageNum,
    numPerPage: 10
  }
  RequestAjax "GET", "/mj/people/#{window.nickname}/book/read", data, DidGetPeopleReadBookData, FailGetPeopleBookData, null, null, null
  return

DidGetPeopleReadBookData = (data, rawData)->
  window.pageNum++
  if $(".loadMore").length <= 0
    peopleReadBook = template "People/BooksRead"
    $("#read").html peopleReadBook data.Data

  $(".loadMore").unbind("click").on "click", (event)->
    RequestReadBooks()
    return
  
  for book in data.Data.Books
    htmlToInsert = template "public/Book"
    $(".loadMore").before htmlToInsert book

  $(".loadMore").appendTo $(".loadMore").parent()

  $(".loadMore").addClass "hide" if $(".book.read").length >= parseInt($("#read .sum").data("sum"))

  $(".ratingStar").raty {
    score: -> return $(this).data("score"),
    halfShow: false,
    starOff: 'http://shanpowbookcover.qiniudn.com/star-off-small.png',
    starOn: 'http://shanpowbookcover.qiniudn.com/star-on-small.png',
    hints: window.scoreHints,
    noRatedMsg: window.scoreNoRatedMsg,
    readOnly: true,
    size: 16,
    width: 110
  }

  return

RequestWantBooks = ()->
  data = {
    name: window.nickname,
    pageNum: window.pageNum,
    numPerPage: 10
  }
  RequestAjax "GET", "/mj/people/#{window.nickname}/book/want", data, DidGetPeopleWantBookData, FailGetPeopleBookData, null, null, null
  return

DidGetPeopleWantBookData = (data, rawData)->
  window.pageNum++
  peopleReadBook = template "People/BooksWant"
  $("#wanttoread").html peopleReadBook data.Data

  return

