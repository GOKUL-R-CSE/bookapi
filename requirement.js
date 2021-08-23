/*
Requirements
Book
 - ISBN             - String
 - Title            - String
 - Author           - [Number]
 - Language         - String
 - Publications     - Number
 - NumOfPages       - Number
 - Categories       - [String]
Author
 - id               - Number
 - name             - String
 - books            - [Sting]
Publications
 - id               - Number
 - name             - String
 - books            - [Sting]
---- APIs ------
Book
 - GET
    - to get all books -> done
    - to get specific books -> done
    - to get a list of books based on category -> done
    - to get a list of books based on author -> done
 - POST
    - to add new book ->done
 - PUT
    - to update book details  ->
    - to update/add new author -> done
 - DELETE
    - delete a book -> done
    - delete an author from the book -> done
Authors
 - GET
    - to get all authors -> done
    - to get specific author -> done
    - to get list of author based on a book -> done
 - POST
    - to add new author -> done
    - to update/add new book 
 - PUT
    - update author details
 - DELETE
    - delete an author -> done
Publication
 - GET
    - to get all publication -> done
    - to get specific publication -> done
    - to get a list of publication based on a book. -> done
 - POST
    - Add new publication -> done
 - PUT
    - update publication 
    - to update/add new book
 - DELETE
    - delete a book from publication -> done
    - delete a publication -> done
*/