const express = require("express");
const app = express();
const { calculateLimitAndOffset, paginate } = require('paginate-info');
const data = require( './data.js');

const PORT = 3000;

app.get('/', (req, res) => {
    res.json({
        error: false,
        message: 'welcome'
    });
});

app.get('/users', (req, res) => {
    const { query: { currentPage, pageSize } } = req;
    const { limit, offset } = calculateLimitAndOffset(currentPage, pageSize);
    const count = data.length;
    const paginatedData = data.slice(offset, offset + limit);
    const paginationInfo = paginate(currentPage, count, paginatedData);
  
    return res.status(200).json({
      success: true,
      message: "successfully fetch users",
      data: { result: paginatedData, meta: paginationInfo }
    });
});

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});
