
# Invoice Backend

### File Structure
##### app.js - main file
#####  model - contains database schema
#####  router - contains all routes
##### controllers - contains controllers of all routes



## API Reference

#### Create Invoice

```http
  POST /api/create
```

```
{
    "title": "First Invoice",
    "workhour": 5,
    "rate": 20,
    "amount": 400,
    "status": "Not paid",
    "duedate": "2022-02-10",
    "notes":["pay check : 0123584452 no", "contact office"],
    "expense": {"marketing" : 800, "dailycost": 900}
}
```

#### Update Invoice

```http
  PUT /api/update/:id
```

```
{
    "status": "paid"
}
```

#### Get All Invoices

```http
  GET /api/invoices
```

#### Alert Invoice
##### Returns All Invoices which are late and not paid
```http
  GET /api/alert
```
#### Create Invoice

```http
  POST /api/send/:id
```

```
{
    "email": "email123@gmail.com"
}
```

