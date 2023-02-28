THIS FETCH RECEIVES THE DATA IN sampleData.md AS A RESPONSE

https://docs.developer.yelp.com/reference/v3_business_search

const sdk = require('api')('@yelp-developers/v1.0#2vqu0dboldn2hxnb');

sdk.auth('Bearer PZE2q4mOvdMPr2LuGsUJ5InmxDea9UJl15KQI8AK7r4MoggvcbFl0qoOxpVBhDZjEteZKe8Jxpjjigp1qbcYpG3ghjdqY761jCRPZg1Rcfafu4QNuwm7whxkM0n9Y3Yx');
sdk.v3_business_search({
  location: '91006',
  term: 'food',
  categories: '',
  sort_by: 'distance',
  limit: '50'
})
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));